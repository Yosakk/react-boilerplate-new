import type { RootState } from "@/store";
import {
  createApi,
  fetchBaseQuery,
  type FetchBaseQueryError,
  type BaseQueryFn,
  type FetchArgs,
} from "@reduxjs/toolkit/query/react";
import { deleteTokenAuth, saveTokenAuth } from "@/store/auth";
import { Mutex } from "async-mutex";

// ── Types ─────────────────────────────────────────────────────────────
export interface ApiResponseI<T> {
  data: T;
}

export interface ApiErrorResponseI {
  message: string;
  statusCode: number;
}

// ── Config ────────────────────────────────────────────────────────────
const API_BASE_URL =
  import.meta.env?.VITE_API_URL || window?.location?.origin || "/";

const mutex = new Mutex();

export const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = (getState() as RootState).auth.accessToken;

    if (token && endpoint !== "refresh") {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

// ── Interceptor with refresh-token retry ──────────────────────────────
const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  if (import.meta.env.DEV) {
    console.info("[RTK Api fetch]:", args);
  }

  // Wait if a refresh is already in progress
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Try to refresh the token — only one request at a time
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const state = api.getState() as RootState;
        const refreshToken = state.auth.refreshToken;

        if (refreshToken) {
          const refreshResult = await baseQuery(
            {
              url: "/auth/v1/refresh",
              method: "POST",
              body: { refresh_token: refreshToken },
            },
            { ...api, endpoint: "refresh" },
            extraOptions
          );

          if (refreshResult.data) {
            // Store new tokens
            api.dispatch(
              saveTokenAuth(
                refreshResult.data as {
                  access_token: string;
                  refresh_token: string;
                }
              )
            );
            // Retry original request
            result = await baseQuery(args, api, extraOptions);
          } else {
            // Refresh failed — force logout
            api.dispatch(deleteTokenAuth());
          }
        } else {
          api.dispatch(deleteTokenAuth());
        }
      } finally {
        release();
      }
    } else {
      // Another refresh is in-flight; wait then retry
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  if (import.meta.env.DEV) {
    console.info("[RTK Api result]:", result);
  }

  return result;
};

// ── API slice ─────────────────────────────────────────────────────────
export const Api = createApi({
  baseQuery: baseQueryWithInterceptor,
  reducerPath: "api",
  tagTypes: ["User"],
  endpoints: () => ({}),
});
