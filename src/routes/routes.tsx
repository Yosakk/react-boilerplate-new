import { lazy } from "react";
import { Navigate, type RouteObject } from "react-router-dom";
import { ExistingLoginGuard } from ".";

// ── Lazy-loaded pages (code-split per route) ──────────────────────────
const AuthPage = lazy(() => import("@/pages/auth"));
const AuthSignUp = lazy(() => import("@/pages/auth/section/auth/authSignup"));
const AuthLogin = lazy(() => import("@/pages/auth/section/auth/authLogin"));
const LoginExisting = lazy(
  () => import("@/pages/auth/section/auth/authLoginExisting")
);
const SignupPersonalPage = lazy(
  () => import("@/pages/auth/section/auth/register/signupPersonalData")
);
const OnboardingPage = lazy(() => import("@/pages/auth/section/onboarding"));
const LegalPage = lazy(() => import("@/pages/terms-condition"));
const DashboardLayout = lazy(() => import("@/components/layout/dashboard"));
const Example = lazy(() => import("@/pages/example"));

// ── Route path constants ──────────────────────────────────────────────
export const AUTH_ROUTES = {
  root: "/auth",
  login: "/auth/login",
  loginExisting: "/auth/login-existing",
  signup: "/auth/signup/:method",
  tnc: "/auth/tnc",
} as const;

export const DASHBOARD_ROUTES = {
  root: "/dashboard",
  example: "example",
} as const;

export const ONBOARDING_ROUTE = "/onboarding";

// ── Public routes (unauthenticated) ───────────────────────────────────
const publicRoutes: RouteObject[] = [
  {
    path: AUTH_ROUTES.root,
    element: <AuthPage />,
    children: [
      { index: true, element: <AuthSignUp /> },
      { path: "signup/:method", element: <SignupPersonalPage /> },
      {
        path: "login-existing",
        element: (
          <ExistingLoginGuard>
            <LoginExisting />
          </ExistingLoginGuard>
        ),
      },
      { path: "login", element: <AuthLogin /> },
      { path: "tnc", element: <LegalPage /> },
    ],
  },
  {
    path: ONBOARDING_ROUTE,
    element: <AuthPage />,
    children: [{ index: true, element: <OnboardingPage /> }],
  },
  { path: "/", element: <Navigate to={AUTH_ROUTES.root} replace /> },
  { path: "*", element: <Navigate to={AUTH_ROUTES.root} replace /> },
];

// ── Protected routes (authenticated) ──────────────────────────────────
const protectedRoutesAdmin: RouteObject[] = [
  {
    path: DASHBOARD_ROUTES.root,
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Example /> },
      { path: DASHBOARD_ROUTES.example, element: <Example /> },
    ],
  },
  { path: "*", element: <Navigate to={DASHBOARD_ROUTES.root} replace /> },
];

export { publicRoutes, protectedRoutesAdmin };
