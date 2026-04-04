import { Api } from "../api";
import type {
  LoginReqI,
  LoginResI,
  NewUserReqI,
  OTPReqI,
  OTPResI,
  ValidateMessageResI,
  VerifyOTPReqI,
  VerifyOTPResI,
} from "@/_interfaces/auth.interfaces";
import type { OtpMethod } from "@/pages/auth/hooks/auth/useOTPForm";

const prefix = "/auth/v1";

export const userApi = Api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResI, LoginReqI>({
      query: (body) => ({ url: `${prefix}/login`, method: "POST", body }),
    }),
    createNewUser: build.mutation<void, NewUserReqI>({
      query: (body) => ({ url: `${prefix}/create`, method: "POST", body }),
    }),
    validateEmail: build.query<ValidateMessageResI, string>({
      query: (email) => ({
        url: `${prefix}/validate/email`,
        method: "GET",
        params: { email },
      }),
      keepUnusedDataFor: 60,
    }),
    validatePhoneNumber: build.query<ValidateMessageResI, string>({
      query: (phone) => ({
        url: `${prefix}/validate/phone`,
        method: "GET",
        params: { phone },
      }),
    }),
    validateSeedsTag: build.query<ValidateMessageResI, string>({
      query: (seedsTag) => ({
        url: `${prefix}/validate/seeds-tag?seeds-tag=${seedsTag}`,
        method: "GET",
      }),
    }),
    validateRefCode: build.query<ValidateMessageResI, string>({
      query: (refCode) => ({
        url: `${prefix}/validate/ref-code?ref-code=${refCode}`,
        method: "GET",
      }),
    }),
    resendOTP: build.mutation<OTPResI, OTPReqI>({
      query: (body) => ({ url: `${prefix}/otp/resend`, method: "PUT", body }),
    }),
    verifyOTP: build.mutation<VerifyOTPResI, VerifyOTPReqI & { method: OtpMethod }>({
      query: ({ method, ...body }) => ({
        url: `${prefix}/otp/verify/${method}`,
        method: "POST",
        body,
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useCreateNewUserMutation,
  useLazyValidateEmailQuery,
  useLazyValidatePhoneNumberQuery,
  useLazyValidateSeedsTagQuery,
  useLazyValidateRefCodeQuery,
  useResendOTPMutation,
  useVerifyOTPMutation,
} = userApi;
