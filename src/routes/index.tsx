import { Suspense, type JSX } from "react";
import { protectedRoutesAdmin, publicRoutes } from "./routes";
import { Navigate, useRoutes } from "react-router-dom";
import { useAppSelector } from "@/store";
import { LoadingOverlay } from "@mantine/core";

/** Fallback shown while lazy-loaded route chunks are downloaded */
const RouteFallback = () => (
  <LoadingOverlay
    visible
    zIndex={1000}
    overlayProps={{ blur: 2 }}
    loaderProps={{ type: "dots", size: "lg" }}
  />
);

const AppRoutes = () => {
  const { accessToken } = useAppSelector((state) => state.auth);

  const permittedRoutes = accessToken ? protectedRoutesAdmin : publicRoutes;
  const element = useRoutes(permittedRoutes);

  return <Suspense fallback={<RouteFallback />}>{element}</Suspense>;
};

export default AppRoutes;

export function ExistingLoginGuard({ children }: { children: JSX.Element }) {
  const hasEverLoggedIn = useAppSelector((s) =>
    Boolean(
      s.userExisting?.name ||
      s.userExisting?.email ||
      s.userExisting?.phoneNumber
    )
  );
  if (!hasEverLoggedIn) return <Navigate to="/auth/login" replace />;
  return <>{children}</>;
}
