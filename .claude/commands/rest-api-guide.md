# REST API & Services Guide

You are an expert on this project's API layer. When invoked, deeply understand the RTK Query setup, endpoints, error handling, and how to add new services.

## Architecture Overview

```
src/_services/
├── api.ts              # Base query config, 401 interceptor, refresh-token mutex
├── errorHandler.ts     # Centralized error → Mantine notification
├── auth/index.ts       # Auth endpoints (login, signup, OTP, validation)
├── user/index.ts       # User info endpoint
├── onboarding/index.ts # Onboarding questions & submission
└── sso/index.ts        # Google OAuth helper (fetchGoogleUserInfo)
```

## Base Query (`api.ts`)

| Config | Value |
|--------|-------|
| Base URL | `VITE_API_URL` env var (fallback: `window.location.origin`) |
| Auth | `Authorization: Bearer <token>` auto-injected (except `refresh` endpoint) |
| Content-Type | `application/json` (always) |
| 401 handling | Attempts refresh via `/auth/v1/refresh` with mutex lock, then retries original request. If refresh fails → `deleteTokenAuth()` (force logout) |
| Dev logging | Logs all requests & responses in `import.meta.env.DEV` |

### Refresh Token Flow
1. Request returns 401
2. Mutex prevents concurrent refresh attempts
3. POST `/auth/v1/refresh` with `{ refresh_token }` body
4. On success → store new tokens via `saveTokenAuth()` → retry original request
5. On failure → `deleteTokenAuth()` (force logout)

## Existing Endpoints

### Auth Service (`_services/auth/`)
| Endpoint | Type | Method | URL | Input → Output |
|----------|------|--------|-----|----------------|
| `login` | mutation | POST | `/auth/v1/login` | `LoginReqI → LoginResI` |
| `createNewUser` | mutation | POST | `/auth/v1/create` | `NewUserReqI → void` |
| `validateEmail` | query | GET | `/auth/v1/validate/email?email=` | `string → ValidateMessageResI` |
| `validatePhoneNumber` | query | GET | `/auth/v1/validate/phone?phone=` | `string → ValidateMessageResI` |
| `validateSeedsTag` | query | GET | `/auth/v1/validate/seeds-tag?seeds-tag=` | `string → ValidateMessageResI` |
| `validateRefCode` | query | GET | `/auth/v1/validate/ref-code?ref-code=` | `string → ValidateMessageResI` |
| `resendOTP` | mutation | PUT | `/auth/v1/otp/resend` | `OTPReqI → OTPResI` |
| `verifyOTP` | mutation | POST | `/auth/v1/otp/verify/{method}` | `VerifyOTPReqI → VerifyOTPResI` |

**Generated hooks:** `useLoginMutation`, `useCreateNewUserMutation`, `useLazyValidateEmailQuery`, `useLazyValidatePhoneNumberQuery`, `useLazyValidateSeedsTagQuery`, `useLazyValidateRefCodeQuery`, `useResendOTPMutation`, `useVerifyOTPMutation`

### User Service (`_services/user/`)
| Endpoint | Type | Method | URL | Input → Output |
|----------|------|--------|-----|----------------|
| `getUserInfo` | query | GET | `/user/v1/` | `void → UserAuthenticatedResI` |

**Generated hooks:** `useGetUserInfoQuery`, `useLazyGetUserInfoQuery`
**Cache tag:** `["User"]`

### Onboarding Service (`_services/onboarding/`)
| Endpoint | Type | Method | URL | Input → Output |
|----------|------|--------|-----|----------------|
| `onboarding` | query | GET | `/onboard/v1/question` | `OnboardingReqI → OnboardingResI` |
| `submitOnboarding` | mutation | POST | `/onboard/v1/submit` | `OnboardingAnswerReqI → OnboardingAnswerResI` |

**Side effect:** `submitOnboarding` dispatches `setOnboardingSubmissionId(data.id)` on success.
**Generated hooks:** `useOnboardingQuery`, `useSubmitOnboardingMutation`, `useLazyOnboardingQuery`

### SSO Service (`_services/sso/`)
| Function | Type | URL | Input → Output |
|----------|------|-----|----------------|
| `fetchGoogleUserInfo` | async function | `googleapis.com/oauth2/v3/userinfo` | `accessToken → GoogleUserInfo \| null` |

Not an RTK Query endpoint — standalone async function for Google OAuth flow.

## Key Interfaces

### Request Types
```ts
LoginReqI {
  phone_number, email, password, pin,
  oauth_provider, oauth_identifier,
  os_name, platform, visitor_id, onboarding_id
}

NewUserReqI {
  phoneNumber, email, name, seedsTag, age, avatar,
  refCode, password, provider: { provider, identifier },
  pin, onboardId, birthDate?
}

OnboardingReqI { page, limit, language }
OnboardingAnswerReqI { id, data: { question, answer[] }[] }
OTPReqI { phoneNumber, method }
VerifyOTPReqI { msisdn, otp, pinId }
```

### Response Types
```ts
LoginResI {
  access_token, refresh_token, expired_at,
  need_reset_password, need_set_password, is_onboarding
}

UserAuthenticatedResI {
  id, phoneNumber, email, birthDate, name, seedsTag,
  refCode, avatar, preferredLanguage, preferredCurrency,
  bio, pin (boolean), followers, following, posts,
  region, verified, badge, claims, ...
}

ValidateMessageResI { message }
OTPResI { data: OTPI, verihubs_session_id }
OnboardingResI { data: OnboardingI[], metadata }
```

## Error Handling (`errorHandler.ts`)

Centralized handler that maps HTTP errors to Mantine notifications:

| Status | Title | Behavior |
|--------|-------|----------|
| 401 | Session Expired | "Please log in again." |
| 403 | Forbidden | "You don't have permission..." |
| 404 | Not Found | Uses `data.message` or default |
| 400/422 | Validation Error | Flattens `data.errors` object, shows first message |
| FETCH_ERROR | Network Error | "Cannot connect to server..." |
| PARSING_ERROR | Response Error | "Unexpected response..." |
| Other | Error | Uses `data.message` or generic |

## How to Add a New Service

### 1. Define interfaces in `_interfaces/`
```ts
// src/_interfaces/product.interfaces.ts
export interface ProductI {
  id: string;
  name: string;
  price: number;
}

export interface ProductListReqI {
  page: number;
  limit: number;
  search?: string;
}

export interface ProductListResI {
  data: ProductI[];
  meta: Meta;  // from pagination.interface.ts
}
```

### 2. Create service file
```ts
// src/_services/product/index.ts
import { Api } from "../api";
import type { ProductI, ProductListReqI, ProductListResI } from "@/_interfaces/product.interfaces";

const prefix = "/product/v1";

export const productApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<ProductListResI, ProductListReqI>({
      query: (params) => ({ url: `${prefix}/`, method: "GET", params }),
      providesTags: ["Product"],
    }),
    getProductById: build.query<ProductI, string>({
      query: (id) => ({ url: `${prefix}/${id}`, method: "GET" }),
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),
    createProduct: build.mutation<ProductI, Partial<ProductI>>({
      query: (body) => ({ url: `${prefix}/`, method: "POST", body }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: build.mutation<ProductI, { id: string; body: Partial<ProductI> }>({
      query: ({ id, body }) => ({ url: `${prefix}/${id}`, method: "PUT", body }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Product", id }],
    }),
    deleteProduct: build.mutation<void, string>({
      query: (id) => ({ url: `${prefix}/${id}`, method: "DELETE" }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
```

### 3. Register tag types (if new)
Add to `Api` in `api.ts`:
```ts
tagTypes: ["User", "Product"],
```

### 4. Add reducer to store (automatic)
RTK Query `injectEndpoints` auto-registers — no store changes needed.

### 5. Use in components
```tsx
// Query
const { data, isLoading, error } = useGetProductsQuery({ page: 1, limit: 10 });

// Mutation with error handling
const [createProduct, { isLoading }] = useCreateProductMutation();
try {
  await createProduct(body).unwrap();
  notify.success({ message: "Product created!" });
} catch (err) {
  errorHandler(err);
}
```

## Patterns & Best Practices

### Error handling in mutations
```tsx
import { errorHandler } from "@/_services/errorHandler";
import { useNotification } from "@/hooks";

const notify = useNotification();
const [doAction, { isLoading }] = useSomeMutation();

const handleSubmit = async (data: FormData) => {
  try {
    const result = await doAction(data).unwrap();
    notify.success({ message: "Done!" });
  } catch (err) {
    errorHandler(err);
  }
};
```

### Lazy queries for validation
```tsx
const [triggerValidate] = useLazyValidateEmailQuery();

const checkEmail = async (email: string) => {
  try {
    await triggerValidate(email).unwrap();
    return true; // email available
  } catch {
    return false; // email taken
  }
};
```

### Cache invalidation
- Use `providesTags` on queries and `invalidatesTags` on mutations
- Tag format: `["TagName"]` for list, `[{ type: "TagName", id }]` for individual
- Mutations that change data should invalidate relevant tags

### Side effects in `onQueryStarted`
```tsx
submitOnboarding: build.mutation({
  query: (body) => ({ url: `${prefix}/submit`, method: "POST", body }),
  async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
    try {
      const { data } = await queryFulfilled;
      dispatch(someAction(data.id));
    } catch { return; }
  },
}),
```
