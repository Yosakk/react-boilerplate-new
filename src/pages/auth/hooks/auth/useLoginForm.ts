import { useForm, type SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import type { LoginReqI } from "@/_interfaces/auth.interfaces";
import { useLoginMutation } from "@/_services/auth";
import { errorHandler } from "@/_services/errorHandler";
import { saveTokenAuth } from "@/store/auth";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/store";
import { getDeviceMeta } from "@/_helper/auth-device";
import { parsePhoneNumberFromString, isValidPhoneNumber } from "libphonenumber-js";

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

  const schema: yup.ObjectSchema<FormValues> = useMemo(() => {
    const basePassword = yup
      .string()
      .required(t("authLogin.validation.blank"))
      .min(8, t("authLogin.validation.password"))
      .matches(/[A-Z]/, t("authLogin.validation.password"))
      .matches(/[a-z]/, t("authLogin.validation.password"));

    if (isEmail) {
      return yup
        .object({
          identity: yup
            .string()
            .transform((v) => (v ?? "").trim())
            .required(t("authLogin.validation.blank"))
            .email(t("authLogin.validation.identityEmailInvalid")),
          password: basePassword,
          country: yup.string().optional(),
        })
        .required();
    }

    return yup
      .object({
        identity: yup
          .string()
          .transform((v) => (v ?? "").trim())
          .required(t("authLogin.validation.blank"))
          .test(
            "phone-country-aware",
            t("authLogin.validation.identityPhoneNumberValid"),
            function (val) {
              if (!val) return false;
              const phone = `+${val}`;
              const country = (this.parent?.country || "").toUpperCase();
              try {
                if (country) {
                  return isValidPhoneNumber(phone, country as any);
                }
                const p = parsePhoneNumberFromString(phone);
                return p?.isValid() ?? false;
              } catch {
                return false;
              }
            }
          ),
        password: basePassword,
        country: yup.string().optional(),
      })
      .required();
  }, [t, isEmail]);

  const resolver = useMemo(() => yupResolver(schema), [schema]);

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
    defaultValues: { identity: "", password: "", country: "" },
  });

  const identityVal = watch("identity") ?? "";
  const passwordVal = watch("password") ?? "";

  const selectMethod = useCallback(
    (m: "email" | "phone") => {
      setMethod(m);
      setValue("identity", "", { shouldDirty: true, shouldValidate: false });
      clearErrors("identity");
    },
    [setValue, clearErrors]
  );

  /** Password strength: 0–4 */
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
