import { useRef, useState, useMemo, useCallback } from "react";
import type { PinInputRef } from "@/components/ui/input/pin";
import { useTranslation } from "react-i18next";
import { useSignupForm } from "@/pages/auth/hooks/auth/useSignUpForm";

export type CreatePinStep = "create" | "confirm";

type Options = {
  withConfirm?: boolean;
  onSubmit?: (pin: string) => void;
  loading?: boolean;
  disabled?: boolean;
  max?: number;
};

export function useCreateSeedsPin({
  withConfirm = false,
  onSubmit,
  loading = false,
  disabled = false,
  max = 6,
}: Options = {}) {
  const { t } = useTranslation();
  const { methods } = useSignupForm();

  const pinRef = useRef<PinInputRef>(null);

  const [step, setStep] = useState<CreatePinStep>("create");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState<string | null>(null);

  const canContinue =
    (step === "create" ? pin.length : confirmPin.length) === max &&
    !loading &&
    !disabled;

  const currentTitle = useMemo(
    () => (step === "create" ? t("authRegisterAccount.page6.text1") : t("authRegisterAccount.page6.text3")),
    [step, t]
  );
  const currentSubtitle = useMemo(
    () => (step === "create" ? t("authRegisterAccount.page6.text2") : t("authRegisterAccount.page6.text4")),
    [step, t]
  );
  const ctaLabel = useMemo(() => t("authRegisterAccount.page6.text7"), [t]);

  const focus = useCallback(() => requestAnimationFrame(() => pinRef.current?.focus()), []);

  const resetAndFocus = useCallback(() => {
    if (step === "create") {
      setPin("");
    } else {
      setConfirmPin("");
    }
    focus();
  }, [step, focus]);

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault?.();
      if (!canContinue) return;
      if (!withConfirm) {
        methods.setValue("pin", pin, { shouldDirty: true });
        onSubmit?.(pin);
        return;
      }
      if (step === "create") {
        setStep("confirm");
        setConfirmPin("");
        setError(null);
        focus();
        return;
      }
      if (confirmPin !== pin) {
        setError(t("authRegisterAccount.page6.text6"));
        resetAndFocus();
        return;
      }

      methods.setValue("pin", pin, { shouldDirty: true });
      onSubmit?.(pin);
    },
    [
      canContinue,
      withConfirm,
      methods,
      onSubmit,
      pin,
      step,
      confirmPin,
      t,
      focus,
      resetAndFocus,
    ]
  );

  const goEdit = useCallback(() => {
    setStep("create");
    setConfirmPin("");
    setError(null);
    focus();
  }, [focus]);

  const onChangePin = useCallback((v: string) => {
    setPin(v);
    if (error) setError(null);
  }, [error]);

  const onChangeConfirm = useCallback((v: string) => {
    setConfirmPin(v);
    if (error) setError(null);
  }, [error]);

  return {
    currentTitle,
    currentSubtitle,
    ctaLabel,
    step,
    pin,
    confirmPin,
    error,
    canContinue,
    loading,
    disabled,
    max,
    pinRef,
    handleSubmit,
    goEdit,
    onChangePin,
    onChangeConfirm,
    focus,
  };
}
