import type { RootState } from "@/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { FetchBaseQueryError, BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query/react";
import { deleteTokenAuth } from "@/store/auth";

export interface ApiResponseI<T> {
  data: T;
}

export interface ApiErrorResponseI {
  message: string;
  statusCode: number;
}

const API_BASE_URL = import.meta.env?.VITE_API_URL || window?.location?.origin || "/";

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

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  if (import.meta.env.DEV) {
    console.info("[RTK Api fetch]:", args);
  }
  const result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    if (result.error.status === 401) {
      // toast("Please re-login for continue process");
      api.dispatch(deleteTokenAuth());
    }
    // showToast((result.error.data as ApiErrorResponseI).message || 'Unknown Error');
  }
  if (import.meta.env.DEV) {
    console.info("[RTK Api result]:", result);
  }
  return result;
};

export const Api = createApi({
  baseQuery: baseQueryWithInterceptor,
  reducerPath: "api",
  tagTypes: ["User"],
  endpoints: () => ({}),
});
