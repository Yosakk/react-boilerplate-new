// useOTPForm.ts
import { useCallback, useMemo, useState } from "react";
import { useSignupForm } from "@/pages/auth/hooks/auth/useSignUpForm";
import { useResendOTPMutation, useVerifyOTPMutation } from "@/_services/auth";
import type { OTPReqI, OTPResI } from "@/_interfaces/auth.interfaces";

export type OtpMethod = "sms" | "whatsapp";

export function useOtpFlow() {
  const { methods } = useSignupForm();
  const [resendOTP, { isLoading: resendLoading, error: resendError, reset }] = useResendOTPMutation();
  const [verifyOTP, { isLoading: verifyLoading, error: verifyError }] = useVerifyOTPMutation();

  const [pinId, setpinId] = useState<string>("");

  const [method, setMethod] = useState<OtpMethod | "">("");
  const phoneNumber = String(methods.watch("phoneNumber") ?? "");
  const phoneLabel = phoneNumber;

  const start = useCallback(
    async (m: OtpMethod): Promise<OTPResI> => {
      if (!phoneNumber) throw new Error("Phone number empty");
      const payload: OTPReqI = { phoneNumber, method: m };
      setMethod(m);
      const res = await resendOTP(payload).unwrap();
      const sid = res.data.session_id;
      if (sid) setpinId(sid);
      return res;
    },
    [phoneNumber, resendOTP]
  );

  const resend = useCallback(async (): Promise<OTPResI> => {
    if (!method) throw new Error("OTP method not selected");
    if (!phoneNumber) throw new Error("Phone number empty");
    const payload: OTPReqI = { phoneNumber, method };
    const res = await resendOTP(payload).unwrap();
    const sid = res.data.session_id;
    if (sid) setpinId(sid);
    return res;
  }, [method, phoneNumber, resendOTP]);

  const resendWith = useCallback(
    async (m: OtpMethod): Promise<OTPResI> => {
      if (!phoneNumber) throw new Error("Phone number empty");
      const payload: OTPReqI = { phoneNumber, method: m };
      setMethod(m);
      const res = await resendOTP(payload).unwrap();
      const sid = res.data.session_id;
      if (sid) setpinId(sid);
      return res;
    },
    [phoneNumber, resendOTP]
  );

  const verify = useCallback(
    async (code: string) => {
      if (!method) throw new Error("OTP method not selected");
      if (!phoneNumber) throw new Error("Phone number empty");
      if (!pinId)
        throw new Error("pinId missing. Please resend/start first.");

      return await verifyOTP({
        method,
        msisdn: phoneNumber,
        otp: code,
        pinId,
      }).unwrap();
    },
    [method, phoneNumber, pinId, verifyOTP]
  );

  const clear = useCallback(() => {
    setMethod("");
    setpinId("");
    reset();
  }, [reset]);

  const loading = useMemo(
    () => resendLoading || verifyLoading,
    [resendLoading, verifyLoading]
  );
  const error = resendError ?? verifyError;

  return {
    phoneNumber,
    phoneLabel,
    method,
    setMethod,
    start,
    resend,
    verify,
    resendWith,
    clear,
    canStart: !!phoneNumber,
    canContinue: !!phoneNumber && !!method,
    loading,
    error,
  };
}
