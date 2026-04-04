import { useLocation, useParams } from "react-router-dom";
import AuthPersonalData from "./authPersonalData";
import CreateSeedsPinSection from "./authPin";
import AuthAgeStep from "./authAge";
import AuthAvatar from "./authAvatar";
import ReferralDialog from "./authReferal";
import { SignupFormProvider, useSignupForm } from "@/pages/auth/hooks/auth/useSignUpForm";
import { useAppSelector, type RootState } from "@/store";
import AuthOTPSection from "./phone/authOTP";
import AuthChooseOTP from "./phone/authChooseOTP";
import { useOtpFlow } from "@/pages/auth/hooks/auth/useOTPForm";

function SignupWrapper() {
  const {
    methods,
    step,
    setStep,
    refOpen,
    setRefOpen,
    refCode,
    setRefCode,
    isLoading,
    submitFinal,
    signupType,
  } = useSignupForm();

  const otp = useOtpFlow();

  const isSSO = methods.getValues("provider.provider") === "google";

  if (step === "profile") {
    return (
      <AuthPersonalData
        onPrepared={() => {
          if (isSSO) {
            setStep("pin");
            return;
          }
          if (signupType === "phone") setStep("otpMethod");
          else setStep("pin");
        }}
      />
    );
  }

  if (step === "otpMethod") {
    return (
      <AuthChooseOTP
        phoneLabel={otp.phoneNumber}
        loading={otp.loading}
        onBack={() => setStep("profile")}
        onContinue={async (m) => {
          otp.setMethod(m);
          await otp.start(m);
          setStep("otpVerify");
        }}
      />
    );
  }

  if (step === "otpVerify") {
    return (
      <AuthOTPSection
        method={otp.method !== "" ? otp.method : "sms"}
        phoneLabel={otp.phoneNumber}
        length={4}
        resendCooldownSec={60}
        loading={otp.loading}
        onSubmit={async (code) => {
          await otp.verify(code);
          setStep("pin");
        }}
        onResendSMS={async () => {
          await otp.resendWith("sms");
        }}
        onResendWA={async () => {
          await otp.resendWith("whatsapp");
        }}
      />
    );
  }

  if (step === "pin") {
    return (
      <CreateSeedsPinSection
        withConfirm
        loading={isLoading}
        onSubmit={(p) => {
          methods.setValue("pin", p, { shouldDirty: true });
          setStep("age");
        }}
      />
    );
  }

  if (step === "age") {
    return (
      <AuthAgeStep
        loading={isLoading}
        onBack={() => setStep("pin")}
        onSkip={() => setStep("avatar")}
        onSubmit={(valAge) => {
          methods.setValue("age", valAge, { shouldDirty: true });
          setStep("avatar");
        }}
      />
    );
  }

  return (
    <>
      <AuthAvatar
        onBack={() => setStep("age")}
        onContinue={({ id, cdnUrl }) => {
          methods.setValue("avatar", cdnUrl, { shouldDirty: true });
          setRefOpen(true);
        }}
      />
      <ReferralDialog
        open={refOpen}
        onOpenChange={setRefOpen}
        loading={isLoading}
        defaultRefCode={refCode}
        onSkip={async () => {
          setRefOpen(false);
          await submitFinal(undefined);
        }}
        onContinue={async (code) => {
          setRefCode(code);
          methods.setValue("refCode", code, { shouldDirty: true });
          setRefOpen(false);
          await submitFinal(code);
        }}
      />
    </>
  );
}

export default function SignupPersonalPage() {
  const { method } = useParams<{ method: string }>();
  const signupType = method === "phone" ? "phone" : "email";

  const submissionId = useAppSelector((s: RootState) => s.onboarding.submissionId);
  const location = useLocation();
  const navState = location.state || null;
  const mode = navState?.mode === "sso" ? "sso" : "normal";

  return (
    <SignupFormProvider signupType={signupType} onboardingId={submissionId || ""} mode={mode}>
      <SignupWrapper />
    </SignupFormProvider>
  );
}
