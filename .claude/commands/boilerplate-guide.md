# Boilerplate Template Guide

You are an expert on this React + TypeScript boilerplate. When invoked, deeply understand the project structure and answer questions or make changes accordingly.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript 5.8 |
| Build | Vite 7 |
| Routing | React Router v7 (lazy-loaded routes + Suspense) |
| State | Redux Toolkit + redux-persist (cookie storage) |
| API | RTK Query with refresh-token interceptor (`src/_services/api.ts`) |
| UI | **Mantine v7** (primary) + Radix UI (headless primitives) |
| Styling | Tailwind CSS v4 + Mantine theme tokens |
| Forms | react-hook-form v7 + **Zod** + @hookform/resolvers v5 |
| i18n | i18next + react-i18next (EN / ID) |
| Auth | JWT (access + refresh with auto-retry), Google OAuth, OTP |
| Linting | ESLint flat config + Prettier (format-on-save via VSCode) |

## Directory Map

```
src/
├── _helper/          # Pure utility functions (twMerge, formatters, phone, device)
├── _interfaces/      # TypeScript interfaces (auth, user, pagination, onboarding)
├── _services/        # RTK Query services + errorHandler + refresh-token interceptor
│   ├── api.ts        # Base query, 401→refresh→retry, mutex lock, dev logging
│   ├── errorHandler.ts # Centralized error → Mantine notification
│   ├── auth/         # login, create, validate, OTP endpoints
│   ├── user/         # get user info
│   ├── onboarding/   # onboarding questions & submission
│   └── sso/          # Google OAuth helper (fetchGoogleUserInfo)
├── assets/           # Images and static files
├── components/
│   ├── layout/
│   │   ├── auth/     # AuthPage: left carousel + right form
│   │   └── dashboard/# Mantine AppShell (header + sidebar + main)
│   └── ui/           # Mantine-wrapped form components (styles from theme)
│       ├── button.tsx          # Mantine Button
│       ├── select.tsx          # Mantine Select + FieldError
│       ├── dialog.tsx          # Radix Dialog
│       ├── input/
│       │   ├── input.tsx       # Mantine TextInput + FieldError
│       │   ├── password.tsx    # Mantine PasswordInput + FieldError
│       │   ├── textarea.tsx    # Mantine Textarea + FieldError
│       │   ├── checkbox.tsx    # Mantine Checkbox + FieldError
│       │   ├── OTP.tsx         # OTP digit input
│       │   ├── pin.tsx         # PIN input
│       │   └── phoneNumber.tsx # International phone input
│       └── validation/
│           └── error.tsx       # Mantine Text error (role="alert" + aria-live)
├── data/
│   ├── menu/         # Sidebar menu config (name, path, icon, child?)
│   └── phone/        # Country phone data
├── fonts/            # Poppins font import
├── hooks/
│   ├── index.ts            # Central export (all custom + Mantine hooks)
│   ├── useAuth.ts          # Auth state: isAuthenticated, login(), logout()
│   ├── usePageTitle.ts     # document.title management with cleanup
│   ├── useWindowInnerWidth.ts  # Viewport width via Mantine
│   ├── useMediaQuery.ts    # Breakpoint hooks (xs/sm/md/lg/xl)
│   ├── useLocalStorage.ts  # Typed localStorage via Mantine
│   ├── useNotification.ts  # Mantine notifications (success/error/info/warning)
│   └── useFormField.ts     # RHF field props helper for Mantine inputs
├── locales/          # i18n translations (en/ id/) — 80+ modules each
├── pages/
│   ├── auth/
│   │   ├── hooks/auth/     # useLoginForm, useSignUpForm, useOTPForm, useAuthSSO
│   │   ├── hooks/onboarding/ # useOnboardingQuestions, useMobileSplash
│   │   └── section/        # Auth page components (authLogin, authSignup, etc.)
│   ├── example/      # Dashboard demo page (Mantine component showcase)
│   └── terms-condition/
├── routes/
│   ├── index.tsx     # Suspense wrapper + route guard + ExistingLoginGuard
│   └── routes.tsx    # Lazy-loaded route definitions + route path constants
├── store/
│   ├── index.ts      # Redux store + persistor + typed hooks
│   ├── auth/         # authSlice (accessToken, refreshToken, phoneNumber)
│   ├── onboarding/   # onboardingSlice (submissionId)
│   └── user/         # userExistingSlice (name, email, phoneNumber, 7d TTL)
├── theme/
│   └── mantine.ts    # MantineProvider theme (colors, radius, spacing, component defaults)
├── ErrorBoundary.tsx # Global error boundary with visual error display
└── main.tsx          # App entry: StrictMode > ErrorBoundary > Mantine > Redux > Router
```

## Key Patterns

### Adding a new page
**Use `/create-page` skill for full guide.** Summary:
1. Create `src/pages/<feature>/<Feature>Page.tsx` (component)
2. Create `src/pages/<feature>/hooks/use<Feature>Page.ts` (all logic)
3. Create `src/pages/<feature>/index.tsx` (barrel export ONLY)
4. Add lazy import + route constant in `src/routes/routes.tsx`
5. Run `make i18n` after adding translation module
6. Add menu entry in `src/data/menu/index.tsx` if sidebar needed

### Adding a new API endpoint
1. Define interfaces in `src/_interfaces/<domain>.interfaces.ts`
2. Create or extend service in `src/_services/<domain>/index.ts` using `Api.injectEndpoints()`
3. Use `build.query` for GET, `build.mutation` for POST/PUT/DELETE
4. Use `providesTags`/`invalidatesTags` for cache management
5. Handle errors with `errorHandler(err)` from `@/_services/errorHandler`
6. See `/rest-api-guide` skill for full endpoint reference and CRUD examples

### Adding a form (Zod + react-hook-form)
```tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().email("Invalid email").min(1, "Required"),
});
type FormValues = z.infer<typeof schema>;

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  return (
    <form onSubmit={handleSubmit(console.log)}>
      <Input {...register("email")} label="Email" error={errors.email} />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

**IMPORTANT:** Use Zod for ALL validation — Yup has been removed.

### Using notifications
```ts
import { useNotification } from "@/hooks";
const notify = useNotification();
notify.success({ message: "Saved!" });
notify.error({ title: "Failed", message: err.message });
```

### Auth hook
```ts
import { useAuth } from "@/hooks";
const { isAuthenticated, login, logout } = useAuth();
// login(loginResponse) — stores tokens
// logout() — clears tokens + redirects to /auth/login
```

### Page title
```ts
import { usePageTitle } from "@/hooks";
usePageTitle("Dashboard"); // → "Dashboard | Seeds"
```

### Redux typed hooks
```ts
import { useAppSelector, useAppDispatch } from "@/store";
const token = useAppSelector(s => s.auth.accessToken);
const dispatch = useAppDispatch();
```

### Translation
```ts
import { useTranslation } from "react-i18next";
const { t } = useTranslation();
t("authLogin.validation.blank")
```

## Route Constants

```ts
import { AUTH_ROUTES, DASHBOARD_ROUTES, ONBOARDING_ROUTE } from "@/routes/routes";

AUTH_ROUTES.root        // "/auth"
AUTH_ROUTES.login       // "/auth/login"
AUTH_ROUTES.loginExisting // "/auth/login-existing"
AUTH_ROUTES.signup      // "/auth/signup/:method"
AUTH_ROUTES.tnc         // "/auth/tnc"
DASHBOARD_ROUTES.root   // "/dashboard"
DASHBOARD_ROUTES.example // "example"
ONBOARDING_ROUTE        // "/onboarding"
```

## Auth Flow
1. `/auth` → choose signup method (email / phone / Google SSO)
2. Multi-step form: profile → otpMethod → otpVerify → pin → age → avatar
3. On complete → `POST /auth/v1/create` → auto login → save tokens → `/dashboard`
4. Tokens stored in Redux auth slice, persisted to cookies
5. 401 responses auto-trigger refresh token → retry flow (mutex-locked)

## Architecture Rules (MUST follow)
- **`index.tsx` = barrel only** — re-exports only, no React imports, no components
- **Page components = JSX only** — zero `useEffect`/`useState`/`useMemo`/`useCallback`
- **All logic lives in hooks** — separated: `use<Feature>Api.ts` (RTK Query) + `use<Feature>Page.ts` (UI logic)
- **Validation = Zod** — Yup has been REMOVED
- **Max line length = 80** — enforced by Prettier
- **Translations auto-generated** — run `make i18n` after adding modules
- **Routes lazy-loaded** — all pages use `React.lazy()` + `Suspense`
- **Route children = relative paths** — never absolute under a parent route

## Available Skills
| Skill | Purpose |
|-------|---------|
| `/create-page` | Create a new page (full checklist) |
| `/create-feature` | Create a full feature (API + hooks + page) |
| `/rest-api-guide` | API endpoint reference + CRUD examples |
| `/improve-uiux` | UI/UX improvement checklist |
| `/i18n-guide` | Translation guide + `make i18n` |

## Component Design Rules
- All inputs extend Mantine components and accept `error?: FieldError | string`
- Base styles (label weight, error margin, width: 100%) are set in **theme** — do NOT add inline `styles` to input components
- `radius="xl"` is the default for inputs and buttons (set in theme)
- Use `useDisclosure()` from `@mantine/hooks` for modal/drawer open state
- Use `useNotification()` from `@/hooks` instead of direct `notifications.show()`
- Use `useAuth()` from `@/hooks` for login/logout instead of dispatching directly
- Use `cn()` from `@/_helper/twMerge` to merge Tailwind classes safely
- RTK Query errors must pass through `errorHandler()` — never show raw errors to users
- All route pages are **lazy-loaded** — wrapped in `Suspense` with `LoadingOverlay` fallback

## Environment Variables
```
VITE_API_URL         → API base URL
VITE_MEDIA_HOST      → CDN/media base URL
VITE_GOOGLE_CLIENT_ID → Google OAuth client ID
VITE_APPLE_CLIENT_ID  → Apple OAuth client ID (reserved)
```
