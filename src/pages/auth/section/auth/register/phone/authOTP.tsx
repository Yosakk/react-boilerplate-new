import InputOTP from "@/components/ui/input/OTP";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

type OtpMethod = "sms" | "whatsapp";

type Props = {
  method: OtpMethod;
  phoneLabel?: string;
  length?: number;
  helper?: string;
  errorMsg?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onSubmit?: (otp: string) => void;
  onResendSMS?: () => Promise<void> | void;
  onResendWA?: () => Promise<void> | void;
  resendCooldownSec?: number;
};

export default function AuthOTP({
  method,
  phoneLabel,
  length = 4,
  helper,
  errorMsg,
  loading = false,
  disabled = false,
  className = "",
  onSubmit,
  onResendSMS,
  onResendWA,
  resendCooldownSec = 60,
}: Props) {
  const { t } = useTranslation();

  const [otp, setOtp] = useState("");
  const [cooldown, setCooldown] = useState<number>(resendCooldownSec);
  const otpInputRef = useRef<HTMLInputElement>(null);

  const MAX = Math.max(1, length);
  const canContinue = otp.length === MAX && !loading && !disabled;
  const canResend = cooldown <= 0 && !loading && !disabled;

  useEffect(() => {
    requestAnimationFrame(() => otpInputRef.current?.focus());
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => {
      setCooldown((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canContinue) return;
    onSubmit?.(otp);
  };

  const resendSame = async () => {
    if (!canResend) return;
    if (method === "whatsapp") await onResendWA?.();
    else await onResendSMS?.();
    setCooldown(resendCooldownSec);
    setOtp("");
    requestAnimationFrame(() => otpInputRef.current?.focus());
  };

  const resendAlt = async () => {
    if (!canResend) return;
    if (method === "whatsapp") await onResendSMS?.();
    else await onResendWA?.();
    setCooldown(resendCooldownSec);
    setOtp("");
    requestAnimationFrame(() => otpInputRef.current?.focus());
  };

  const otherMethodLabel = method === "whatsapp" ? "SMS" : "Whatsapp";

  return (
    <section
      className={`w-full flex items-center justify-center py-10 ${className}`}
    >
      <form
        onSubmit={submit}
        className="w-full text-center px-6 sm:px-8"
        noValidate
      >
        <h1 className="font-poppins font-semibold text-2xl md:text-3xl bg-gradient-to-b from-seeds-green-light to-seeds-green bg-clip-text text-transparent">
          {t("authRegisterAccount.page4.text1")}{" "}
          {t("authRegisterAccount.page4.text2")}{" "}
          {method === "whatsapp" ? "Whatsapp" : "SMS"}{" "}
          {t("authRegisterAccount.page4.text11")}
        </h1>

        <p className="mt-2 text-neutral-500">
          {method === "whatsapp"
            ? t("authRegisterAccount.page4.text3")
            : t("authRegisterAccount.page4.text4")}
          <br />
          <span className="font-semibold text-seeds-blue">+{phoneLabel}</span>
        </p>

        <div className="mt-8">
          <InputOTP
            ref={otpInputRef}
            value={otp}
            onChange={setOtp}
            length={MAX}
            disabled={disabled || loading}
          />
        </div>

        <p className="mt-6 text-sm text-neutral-500">
          {t("authRegisterAccount.page4.text5")}{" "}
          <span className="text-emerald-600 font-semibold">
            {cooldown}
            {t("authRegisterAccount.page4.text12")}
          </span>
        </p>

        <p className="mt-3 text-sm text-neutral-500">
          {t("authRegisterAccount.page4.text6")}{" "}
          <button
            type="button"
            onClick={resendSame}
            disabled={!canResend}
            className={`font-semibold cursor-pointer ${
              canResend
                ? "text-emerald-700 hover:opacity-80"
                : "text-neutral-400 cursor-not-allowed"
            }`}
          >
            {t("authRegisterAccount.page4.text7")}
          </button>
        </p>

        <p className="mt-2 text-sm">
          <button
            type="button"
            onClick={resendAlt}
            disabled={!canResend}
            className={`font-semibold cursor-pointer  ${
              canResend
                ? "text-emerald-700 hover:opacity-80"
                : "text-neutral-400 cursor-not-allowed"
            }`}
          >
            {t("authRegisterAccount.page4.text8")}
            <span className="lowercase mr-1">
              {t("authRegisterAccount.page4.text9")}
            </span>
            {otherMethodLabel}
          </button>
        </p>

        <div className="mt-6">
          <button
            type="submit"
            disabled={!canContinue}
            className={[
              "w-full py-3 rounded-2xl font-medium",
              "bg-gradient-to-b from-seeds-green-light to-seeds-green text-white",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "shadow-[0_6px_18px_rgba(23,124,98,0.25)]",
            ].join(" ")}
          >
            {loading
              ? t("common.loading")
              : t("authRegisterAccount.page4.text10")}
          </button>
        </div>
      </form>
    </section>
  );
}
