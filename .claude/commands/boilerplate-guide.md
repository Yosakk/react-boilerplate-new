# Boilerplate Template Guide

You are an expert on this React + TypeScript boilerplate. When invoked, deeply understand the project structure and answer questions or make changes accordingly.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript 5.8 |
| Build | Vite 7 |
| Routing | React Router v7 |
| State | Redux Toolkit + redux-persist (cookie storage) |
| API | RTK Query (base: `src/_services/api.ts`) |
| UI | **Mantine v7** (primary) + Radix UI (headless primitives) |
| Styling | Tailwind CSS v4 + Mantine CSS vars |
| Forms | react-hook-form v7 + Yup v1 |
| i18n | i18next + react-i18next (EN / ID) |
| Auth | JWT (access + refresh), Google OAuth, OTP |

## Directory Map

```
src/
├── _helper/          # Pure utility functions (twMerge, formatters, phone, device)
├── _interfaces/      # TypeScript interfaces (auth, user, pagination, onboarding)
├── _services/        # RTK Query services + errorHandler
│   ├── api.ts        # Base query, 401 logout, dev logging
│   ├── auth/         # login, create, validate, OTP endpoints
│   └── user/         # get user info
├── assets/           # Images and static files
├── components/
│   ├── layout/
│   │   ├── auth/     # AuthPage: left carousel + right form
│   │   └── dashboard/# AppShell (AppShell.Navbar + AppShell.Header + AppShell.Main)
│   └── ui/           # Mantine-wrapped form components
│       ├── button.tsx          # Mantine Button
│       ├── select.tsx          # Mantine Select
│       ├── dialog.tsx          # Radix Dialog (kept for complex flows)
│       ├── input/
│       │   ├── input.tsx       # Mantine TextInput + RHF FieldError
│       │   ├── password.tsx    # Mantine PasswordInput + RHF FieldError
│       │   ├── textarea.tsx    # Mantine Textarea + RHF FieldError
│       │   ├── checkbox.tsx    # Mantine Checkbox + RHF FieldError
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
│   ├── index.ts            # Central export (all hooks)
│   ├── useWindowInnerWidth.ts  # Viewport width via Mantine
│   ├── useMediaQuery.ts    # Breakpoint hooks (xs/sm/md/lg/xl)
│   ├── useLocalStorage.ts  # Typed localStorage via Mantine
│   ├── useNotification.ts  # Mantine notifications (success/error/info/warning)
│   └── useFormField.ts     # RHF field props helper for Mantine inputs
├── locales/          # i18n translations (en/ id/)
├── pages/
│   ├── auth/
│   │   ├── hooks/auth/     # useLoginForm, useSignUpForm, useOTPForm, useAuthSSO
│   │   ├── hooks/onboarding/ # useOnboardingQuestions, useMobileSplash
│   │   └── section/        # Auth page components (authLogin, authSignup, etc.)
│   ├── example/      # Dashboard demo page
│   └── terms-condition/
├── routes/
│   ├── index.tsx     # Route guard + ExistingLoginGuard
│   └── routes.tsx    # Public & protected route definitions
├── store/
│   ├── index.ts      # Redux store + persistor + typed hooks
│   ├── auth/         # authSlice (accessToken, refreshToken, phoneNumber)
│   ├── onboarding/   # onboardingSlice (submissionId)
│   └── user/         # userExistingSlice (name, email, phoneNumber, 7d TTL)
├── theme/
│   └── mantine.ts    # MantineProvider theme (colors, radius, spacing, component styles)
└── main.tsx          # App entry: Provider > GoogleOAuth > Helmet > Mantine > Router
```

## Key Patterns

### Adding a new page
1. Create `src/pages/<feature>/index.tsx`
2. Add route in `src/routes/routes.tsx` under `protectedRoutesAdmin` or `publicRoutes`
3. Add menu entry in `src/data/menu/index.tsx` if it needs sidebar navigation

### Adding a new API endpoint
1. Add endpoint in the relevant `src/_services/<domain>/index.ts`
2. The `Api` base uses RTK Query — follow existing `build.query` / `build.mutation` pattern
3. For mutations, handle errors with `errorHandler(err)` from `@/_services/errorHandler`

### Adding a form
```tsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input/input";
import { PasswordInput } from "@/components/ui/input/password";
import { Button } from "@/components/ui/button";

const schema = yup.object({ email: yup.string().email().required() });

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <form onSubmit={handleSubmit(console.log)}>
      <Input {...register("email")} label="Email" error={errors.email} />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### Using notifications
```ts
import { useNotification } from "@/hooks";
const notify = useNotification();
notify.success({ message: "Saved!" });
notify.error({ title: "Failed", message: err.message });
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

## Auth Flow
1. `/auth` → choose signup method (email / phone / Google SSO)
2. `SignupFormProvider` wraps multi-step form with Yup schema + remote validation
3. Steps: profile → otpMethod → otpVerify → pin → age → avatar
4. On complete → `POST /auth/v1/create` → auto login → save tokens → `/dashboard`
5. Tokens stored in Redux auth slice, persisted to cookies

## Component Design Rules
- All inputs extend Mantine components and accept `error?: FieldError | string`
- `radius="xl"` is the default for inputs and buttons (set in theme)
- Use `useDisclosure()` from `@mantine/hooks` for modal/drawer open state
- Use `useNotification()` from `@/hooks` instead of `toast()` or direct `notifications.show()`
- Use `cn()` from `@/_helper/twMerge` to merge Tailwind classes safely
- RTK Query errors must pass through `errorHandler()` — never show raw errors to users

## Environment Variables
```
VITE_API_URL         → API base URL
VITE_MEDIA_HOST      → CDN/media base URL
VITE_GOOGLE_CLIENT_ID → Google OAuth client ID
VITE_APPLE_CLIENT_ID  → Apple OAuth client ID (reserved)
```
