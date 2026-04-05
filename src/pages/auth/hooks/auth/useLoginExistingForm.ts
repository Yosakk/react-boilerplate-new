import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/store";
import { useLoginMutation } from "@/_services/auth";
import { saveTokenAuth } from "@/store/auth";
import type { LoginReqI } from "@/_interfaces/auth.interfaces";
import { getDeviceMeta } from "@/_helper/auth-device";

type UseExistingLoginFormOptions = {
  autoNavigate?: boolean;
  onSuccess?: () => void;
};

export function useExistingLoginForm(
  options: UseExistingLoginFormOptions = {}
) {
  const { autoNavigate = true, onSuccess } = options;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const existing = useAppSelector((s) => s.userExisting);
  const userNameExisting = useMemo(
    () => existing?.name || "",
    [existing?.name]
  );

  const [openPin, setOpenPin] = useState(false);
  const [pinError, setPinError] = useState<string | null>(null);

  const [login, { isLoading }] = useLoginMutation();
  const { os_name, platform } = getDeviceMeta();

  const submitPin = useCallback(
    async (pin: string): Promise<boolean> => {
      try {
        setPinError(null);

        const req: LoginReqI = {
          phone_number: existing?.phoneNumber ?? "",
          email: existing?.email ?? "",
          password: "",
          oauth_provider: "",
          oauth_identifier: "",
          onboarding_id: "",
          os_name,
          platform,
          visitor_id: "",
          pin,
        };

        const res = await login(req).unwrap();

        if (!res || !res.access_token) {
          setPinError(t("authLogin.validation.login"));
          return false;
        }
        dispatch(saveTokenAuth(res));
        onSuccess?.();
        if (autoNavigate) {
          navigate("/dashboard");
        }

        return true;
      } catch (err: any) {
        const msg: string =
          err?.data?.message ?? err?.error ?? err?.message ?? "";
        if (
          err?.status === 401 ||
          (typeof msg === "string" && msg.includes("crypto/bcrypt"))
        ) {
          setPinError(t("loginRevamp.text18"));
          return false;
        }
        setPinError(msg || t("authLogin.validation.login"));
        return false;
      }
    },
    [
      autoNavigate,
      dispatch,
      existing?.email,
      existing?.phoneNumber,
      login,
      navigate,
      os_name,
      platform,
      onSuccess,
      t,
    ]
  );

  return {
    userNameExisting,
    openPin,
    setOpenPin,
    pinError,
    isLoading,
    submitPin,
    dialogBindings: {
      open: openPin,
      onOpenChange: setOpenPin,
      onSubmit: async (pin: string) => {
        await submitPin(pin);
      },
      loading: isLoading,
      errorText: pinError,
    },
  };
}
