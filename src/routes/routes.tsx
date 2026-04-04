import { Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import AuthPage, { authPageRouteName } from "../pages/auth";
import Example from "@/pages/example";
import DashboardLayout from "@/components/layout/dashboard";
import AuthSignUp from "@/pages/auth/section/auth/authSignup";
import LoginExisting, {
  authLoginExistingPageRouteName,
} from "@/pages/auth/section/auth/authLoginExisting";
import AuthLogin, { authLoginPageRouteName } from "@/pages/auth/section/auth/authLogin";
import SignupPersonalPage from "@/pages/auth/section/auth/register/signupPersonalData";
import OnboardingPage, { onboardingCarouselPageRouteName } from "@/pages/auth/section/onboarding";
import { ExistingLoginGuard } from ".";
import LegalPage, { tncPageRouteName } from "@/pages/terms-condition";

const publicRoutes: Array<RouteObject> = [
  {
    path: authPageRouteName,
    element: <AuthPage />,
    children: [
      { index: true, element: <AuthSignUp /> },
      { path: "signup/:method", element: <SignupPersonalPage /> },
      {
        path: authLoginExistingPageRouteName,
        element: (
          <ExistingLoginGuard>
            <LoginExisting />
          </ExistingLoginGuard>
        ),
      },
      { path: authLoginPageRouteName, element: <AuthLogin /> },
      { path: tncPageRouteName, element: <LegalPage /> },
    ],
  },
  {
    path: onboardingCarouselPageRouteName,
    element: <AuthPage />,
    children: [{ index: true, element: <OnboardingPage /> }],
  },
  { path: "*", element: <Navigate to="/auth" /> },

  { path: "/", element: <AuthPage /> },
];

const protectedRoutesAdmin: RouteObject[] = [
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Example /> },
      { path: "example", element: <Example /> },
    ],
  },
];

export { publicRoutes, protectedRoutesAdmin };
