/**
 * Mock API handler — intercepts RTK Query requests
 * and returns static data when VITE_MOCK_API=true.
 *
 * Maps URL patterns to mock responses with a small
 * simulated delay for realistic loading states.
 */

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import {
  MOCK_LOGIN_RESPONSE,
  MOCK_VALIDATE_RESPONSE,
  MOCK_OTP_RESPONSE,
  MOCK_VERIFY_OTP_RESPONSE,
  MOCK_USER_INFO,
  MOCK_ONBOARDING_RESPONSE,
  MOCK_ONBOARDING_SUBMIT_RESPONSE,
} from "./data";

export const IS_MOCK = import.meta.env.VITE_MOCK_API === "true";

const MOCK_DELAY_MS = 500;

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

type MockRoute = {
  match: (url: string, method: string) => boolean;
  response: unknown;
};

const routes: MockRoute[] = [
  // Auth
  {
    match: (u, m) => u.includes("/auth/v1/login") && m === "POST",
    response: MOCK_LOGIN_RESPONSE,
  },
  {
    match: (u, m) => u.includes("/auth/v1/create") && m === "POST",
    response: { message: "User created" },
  },
  {
    match: (u) => u.includes("/auth/v1/validate/"),
    response: MOCK_VALIDATE_RESPONSE,
  },
  {
    match: (u) => u.includes("/auth/v1/otp/resend"),
    response: MOCK_OTP_RESPONSE,
  },
  {
    match: (u) => u.includes("/auth/v1/otp/verify"),
    response: MOCK_VERIFY_OTP_RESPONSE,
  },
  {
    match: (u) => u.includes("/auth/v1/refresh"),
    response: MOCK_LOGIN_RESPONSE,
  },
  // User
  {
    match: (u) => u.includes("/user/v1"),
    response: MOCK_USER_INFO,
  },
  // Onboarding
  {
    match: (u, m) => u.includes("/onboard/v1/submit") && m === "POST",
    response: MOCK_ONBOARDING_SUBMIT_RESPONSE,
  },
  {
    match: (u) => u.includes("/onboard/v1/question"),
    response: MOCK_ONBOARDING_RESPONSE,
  },
];

export const mockBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args) => {
  await delay(MOCK_DELAY_MS);

  const url = typeof args === "string" ? args : args.url;
  const method =
    typeof args === "string" ? "GET" : (args.method ?? "GET").toUpperCase();

  const route = routes.find((r) => r.match(url, method));

  if (route) {
    if (import.meta.env.DEV) {
      console.info(`[Mock API] ${method} ${url}`, route.response);
    }
    return { data: route.response };
  }

  // Unmatched route — return 404
  console.warn(`[Mock API] No handler for ${method} ${url}`);
  return {
    error: {
      status: 404,
      data: {
        message: `Mock: no handler for ${method} ${url}`,
      },
    } as FetchBaseQueryError,
  };
};
