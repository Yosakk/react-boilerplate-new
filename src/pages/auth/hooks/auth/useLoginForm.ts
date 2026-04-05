import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import type { LoginReqI } from "@/_interfaces/auth.interfaces";
import { useLoginMutation } from "@/_services/auth";
import { errorHandler } from "@/_services/errorHandler";
import { saveTokenAuth } from "@/store/auth";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/store";
import { getDeviceMeta } from "@/_helper/auth-device";
import { parsePhoneNumberFromString } from "libphonenumber-js";

type FormValues = {
  identity: string;
  password: string;
  country?: string;
};

type UseLoginFormOpts = {
  initialMethod?: "email" | "phone";
};

const useLoginForm = (opts: UseLoginFormOpts = {}) => {
  const { initialMethod = "email" } = opts;
  const [method, setMethod] = useState<"email" | "phone">(initialMethod);
  const isEmail = method === "email";

  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { os_name, platform } = getDeviceMeta();

  const schema = useMemo(() => {
    const basePassword = z
      .string()
      .min(1, t("authLogin.validation.blank"))
      .min(8, t("authLogin.validation.password"))
      .regex(/[A-Z]/, t("authLogin.validation.password"))
      .regex(/[a-z]/, t("authLogin.validation.password"));

    if (isEmail) {
      return z.object({
        identity: z
          .string()
          .transform((v) => v.trim())
          .pipe(
            z
              .string()
              .min(1, t("authLogin.validation.blank"))
              .email(t("authLogin.validation.identityEmailInvalid"))
          ),
        password: basePassword,
        country: z.string().optional(),
      });
    }

    return z.object({
      identity: z
        .string()
        .transform((v) => v.trim())
        .pipe(
          z
            .string()
            .min(1, t("authLogin.validation.blank"))
            .refine((val) => {
              if (!val) return false;
              const phone = `+${val}`;
              try {
                const p = parsePhoneNumberFromString(phone);
                return p?.isValid() ?? false;
              } catch {
                return false;
              }
            }, t("authLogin.validation.identityPhoneNumberValid"))
        ),
      password: basePassword,
      country: z.string().optional(),
    });
  }, [t, isEmail]);

  const resolver = useMemo(() => zodResolver(schema), [schema]);

  const {
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields, dirtyFields },
    register,
    watch,
    setValue,
    clearErrors,
    setError,
    trigger,
    control,
  } = useForm<FormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver,
    defaultValues: {
      identity: "",
      password: "",
      country: "",
    },
  });

  const identityVal = watch("identity") ?? "";
  const passwordVal = watch("password") ?? "";

  const selectMethod = useCallback(
    (m: "email" | "phone") => {
      setMethod(m);
      setValue("identity", "", {
        shouldDirty: true,
        shouldValidate: false,
      });
      clearErrors("identity");
    },
    [setValue, clearErrors]
  );

  const passwordStrength = useMemo((): number => {
    if (!passwordVal) return 0;
    let score = 0;
    if (passwordVal.length >= 8) score++;
    if (/[A-Z]/.test(passwordVal)) score++;
    if (/[a-z]/.test(passwordVal)) score++;
    if (/[0-9]/.test(passwordVal)) score++;
    if (/[^A-Za-z0-9]/.test(passwordVal)) score++;
    return Math.min(score, 4);
  }, [passwordVal]);

  const submit: SubmitHandler<FormValues> = async ({ identity, password }) => {
    const trimmed = (identity ?? "").trim();
    const req: LoginReqI = {
      phone_number: isEmail ? "" : trimmed,
      email: isEmail ? trimmed.toLowerCase() : "",
      password,
      pin: "",
      oauth_provider: "",
      oauth_identifier: "",
      os_name,
      platform,
      visitor_id: "",
      onboarding_id: "",
    };

    try {
      const res = await login(req).unwrap();
      dispatch(saveTokenAuth(res));
      navigate("/dashboard");
    } catch (err: any) {
      errorHandler(err);
    }
  };

  return {
    loginHandler: handleSubmit(submit),
    register,
    errors,
    isLoading: isLoading || isSubmitting,
    rememberMe,
    setRememberMe,
    setValue,
    watch,
    method,
    isEmail,
    selectMethod,
    identityVal,
    passwordVal,
    passwordStrength,
    touchedFields,
    dirtyFields,
    trigger,
    control,
    setError,
    clearErrors,
  };
};

export default useLoginForm;
