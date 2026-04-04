import AuthLeftSection from "@/components/layout/auth/leftSection";
import AuthRightSection from "@/components/layout/auth/rightSection";
import { Outlet, useMatch } from "react-router-dom";
import { type JSX } from "react";

export const authPageRouteName = "/auth";
export const onboardingPageRouteName = "/onboarding";

export default function AuthPage(): JSX.Element {
  const isOnboarding = !!useMatch("/onboarding/*");

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-[37%_minmax(0,1fr)] h-screen">
      <AuthLeftSection className="h-screen"/>
      <AuthRightSection className="bg-white">
        <Outlet context={{ basePath: isOnboarding ? onboardingPageRouteName : authPageRouteName }} />
      </AuthRightSection>
    </div>
  );
}
