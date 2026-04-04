import "react-toastify/dist/ReactToastify.css";
import { protectedRoutesAdmin, publicRoutes } from "./routes";
import { Navigate, useRoutes } from "react-router-dom";
import { useAppSelector } from "@/store";
import type { JSX } from "react";

const AppRoutes = () => {
    const { accessToken } = useAppSelector(state => state.auth);

    const permittedRoutes = accessToken ? protectedRoutesAdmin : publicRoutes;
    const element = useRoutes(permittedRoutes);

    return <div>{element}</div>;
};

export default AppRoutes;


export function ExistingLoginGuard({ children }: { children: JSX.Element }) {
    const hasEverLoggedIn = useAppSelector(
        s => Boolean(s.userExisting?.name || s.userExisting?.email || s.userExisting?.phoneNumber)
    );
    if (!hasEverLoggedIn) return <Navigate to="/auth/login" replace />;
    return <>{children}</>;
}