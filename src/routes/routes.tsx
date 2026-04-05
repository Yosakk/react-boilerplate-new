import { lazy, Suspense } from "react";
import { Navigate, type RouteObject } from "react-router-dom";
import { ExistingLoginGuard } from ".";
import AuthPage from "@/pages/auth";
import { LoadingOverlay } from "@mantine/core";

// ── Lazy-loaded pages ────────────────────────────────────────────
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
const DashboardHome = lazy(() => import("@/pages/dashboard/homePage"));
const AnalyticsPage = lazy(() => import("@/pages/dashboard/analyticsPage"));
const UsersPage = lazy(() => import("@/pages/dashboard/usersPage"));
const ReportsPage = lazy(() => import("@/pages/dashboard/reportsPage"));
const SettingsPage = lazy(() => import("@/pages/dashboard/settingsPage"));
const Example = lazy(() => import("@/pages/example"));

// ── Public routes (unauthenticated) ──────────────────────────────
const publicRoutes: RouteObject[] = [
  {
    path: "/auth",
    element: <AuthPage />,
    children: [
      { index: true, element: <AuthSignUp /> },
      {
        path: "signup/:method",
        element: <SignupPersonalPage />,
      },
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
    path: "/onboarding",
    element: <AuthPage />,
    children: [{ index: true, element: <OnboardingPage /> }],
  },
  {
    path: "/",
    element: <Navigate to="/auth" replace />,
  },
  {
    path: "*",
    element: <Navigate to="/auth" replace />,
  },
];

// ── Protected routes (authenticated) ─────────────────────────────
const protectedRoutesAdmin: RouteObject[] = [
  {
    path: "/dashboard",
    element: (
      <Suspense
        fallback={
          <LoadingOverlay
            visible
            zIndex={1000}
            overlayProps={{ blur: 2 }}
            loaderProps={{ type: "dots", size: "lg" }}
          />
        }
      >
        <DashboardLayout />
      </Suspense>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "analytics", element: <AnalyticsPage /> },
      { path: "users", element: <UsersPage /> },
      { path: "reports", element: <ReportsPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "example", element: <Example /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
];

export { publicRoutes, protectedRoutesAdmin };
