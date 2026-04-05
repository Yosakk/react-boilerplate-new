import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { PinInputRef } from "@/components/ui/input/pin";

type Params = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (pin: string) => Promise<void> | void;
  externalError?: string | null;
  loading?: boolean;
  titleNode?: React.ReactNode;
  subtitleNode?: React.ReactNode;
  max?: number;
};

export function usePinDialogController({
  open,
  onOpenChange,
  onSubmit,
  externalError,
  loading = false,
  titleNode,
  subtitleNode,
  max = 6,
}: Params) {
  const { t } = useTranslation();

  const [pin, setPin] = useState("");
  const [localErr, setLocalErr] = useState<string | null>(null);

  const pinRef = useRef<PinInputRef>(null);

  const effectiveError = useMemo(
    () => localErr ?? externalError ?? null,
    [localErr, externalError]
  );
  useEffect(() => {
    if (!open) {
      setPin("");
      setLocalErr(null);
    }
  }, [open]);

  useEffect(() => {
    if (externalError) {
      setPin("");
      pinRef.current?.clear?.();
      pinRef.current?.focus?.();
    }
  }, [externalError]);

  const handleChange = useCallback(
    (next: string) => {
      setPin(next);
      if (localErr) setLocalErr(null);
    },
    [localErr]
  );

  const handleComplete = useCallback((val: string) => {
    setPin(val);
  }, []);

  const submit = useCallback(async () => {
    if (pin.length !== max || loading) {
      setLocalErr(t("loginRevamp.text18"));
      setPin("");
      pinRef.current?.clear?.();
      pinRef.current?.focus?.();
      return;
    }

    try {
      await onSubmit(pin);
    } catch (_err) {
      setLocalErr(t("loginRevamp.text18"));
      setPin("");
      pinRef.current?.clear?.();
      pinRef.current?.focus?.();
    }
  }, [pin, max, loading, onSubmit, t]);

  const headerTitle = useMemo(
    () => titleNode ?? t("loginRevamp.text15"),
    [titleNode, t]
  );
  const headerSubtitle = useMemo(
    () => subtitleNode ?? t("loginRevamp.text16"),
    [subtitleNode, t]
  );

  return {
    pin,
    setPin,
    pinRef,
    effectiveError,
    loading,
    handleChange,
    handleComplete,
    submit,
    onOpenChange,
    max,
    headerTitle,
    headerSubtitle,
  };
}
