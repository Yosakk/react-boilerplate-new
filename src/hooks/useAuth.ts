import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import { deleteTokenAuth, saveTokenAuth } from "@/store/auth";
import { clearUserExisting } from "@/store/user";
import type { LoginResI } from "@/_interfaces/auth.interfaces";

/**
 * Centralized auth hook — avoids scattering token checks and logout logic
 * across multiple components.
 *
 * @example
 * const { isAuthenticated, logout } = useAuth();
 */
export function useAuth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { accessToken, refreshToken } = useAppSelector((s) => s.auth);

  const isAuthenticated = Boolean(accessToken);

  const login = useCallback(
    (tokens: LoginResI) => {
      dispatch(saveTokenAuth(tokens));
    },
    [dispatch]
  );

  const logout = useCallback(
    (redirectTo = "/auth/login") => {
      dispatch(deleteTokenAuth());
      dispatch(clearUserExisting());
      navigate(redirectTo, { replace: true });
    },
    [dispatch, navigate]
  );

  return {
    isAuthenticated,
    accessToken,
    refreshToken,
    login,
    logout,
  } as const;
}
