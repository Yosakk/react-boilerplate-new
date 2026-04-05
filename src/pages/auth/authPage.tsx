import AuthLeftSection from "@/components/layout/auth/leftSection";
import AuthRightSection from "@/components/layout/auth/rightSection";
import { Outlet, useMatch } from "react-router-dom";
import { Suspense, type JSX } from "react";
import { LoadingOverlay } from "@mantine/core";

export const authPageRouteName = "/auth";
export const onboardingPageRouteName = "/onboarding";

const PageFallback = () => (
  <LoadingOverlay
    visible
    zIndex={1000}
    overlayProps={{ blur: 2 }}
    loaderProps={{ type: "dots", size: "lg" }}
  />
);

export default function AuthPage(): JSX.Element {
  const isOnboarding = !!useMatch("/onboarding/*");

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-[37%_minmax(0,1fr)] h-screen">
      <AuthLeftSection className="h-screen" />
      <AuthRightSection className="bg-white">
        <Suspense fallback={<PageFallback />}>
          <Outlet
            context={{
              basePath: isOnboarding
                ? onboardingPageRouteName
                : authPageRouteName,
            }}
          />
        </Suspense>
      </AuthRightSection>
    </div>
  );
}
