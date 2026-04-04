import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useForm, FormProvider, type UseFormReturn } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    useCreateNewUserMutation,
    useLazyValidateEmailQuery,
    useLazyValidatePhoneNumberQuery,
    useLazyValidateRefCodeQuery,
    useLazyValidateSeedsTagQuery,
    useLoginMutation,
} from "@/_services/auth";
import { useTranslation } from "react-i18next";
import { errorHandler } from "@/_services/errorHandler";
import type { LoginReqI, NewUserReqI } from "@/_interfaces/auth.interfaces";
import parsePhoneNumberFromString from "libphonenumber-js";
import { useLocation, useNavigate } from "react-router-dom";
import { SuggestSeedsTag } from "@/_helper/seeds-tag";
import { useAppDispatch } from "@/store";
import { getDeviceMeta } from "@/_helper/auth-device";
import { saveTokenAuth } from "@/store/auth";
import { tncPageRouteName } from "@/pages/terms-condition";

export type SignupType = "email" | "phone";
type Step = "profile" | "otpMethod" | "otpVerify" | "pin" | "age" | "avatar";
const TNC_FLAG_KEY = 'seeds.tnc.accepted';

type ProviderProps = {
    children: React.ReactNode;
    signupType: SignupType;
    onboardingId?: string;
    mode?: 'normal' | 'sso';
};

export type SignupFormValues = {
    phoneNumber: string;
    phoneCountry: string;
    email: string;
    name: string;
    seedsTag: string;
    refCode: string;
    birthDate: string;
    password: string;
    confirmPassword: string;
    provider: { provider: string; identifier?: string };
    onboardingId: string;
    tncAccepted: boolean;
    pin: string;
    age: number | null;
    avatar: string;
};

type Ctx = {
    methods: UseFormReturn<SignupFormValues>;
    signupType: SignupType;
    isValidating: boolean;
    validateOnBlur: {
        email: (v: string) => Promise<boolean>;
        phoneNumber: (v: string) => Promise<boolean>;
        seedsTag: (v: string) => Promise<boolean>;
        refCode: (v: string) => Promise<boolean>;
    };
    validateAllRemote: (vals: Partial<SignupFormValues>) => Promise<boolean>;
    isLoading: boolean;
    submitFinal: (finalRefCode?: string) => Promise<void>;
    step: Step;
    setStep: (s: Step) => void;
    refOpen: boolean;
    setRefOpen: (v: boolean) => void;
    refCode: string;
    setRefCode: (v: string) => void;
    isSSO: boolean;
    openTncFromSignup: () => void;
};

const Ctx = createContext<Ctx | null>(null);

const str = yup.string().transform(v => (v == null ? "" : v)).defined();

const normalizePhoneForRequired = (raw: unknown) => {
    const s = String(raw ?? "");
    const digits = s.replace(/\D/g, "");
    return digits.length >= 6 ? s : "";
};

export function SignupFormProvider({
    children,
    signupType,
    onboardingId,
    mode = 'normal',
}: ProviderProps) {
    const { t } = useTranslation();
    const isSSO = mode === 'sso';
    const navigate = useNavigate();
    const location = useLocation();
    const navState = (location.state as any) || null;
    const didSSOPrefill = useRef(false);



    const schema: yup.ObjectSchema<SignupFormValues> = yup.object({
        phoneNumber: str
            .transform(normalizePhoneForRequired)
            .when([], {
                is: () => !isSSO && signupType === "phone",
                then: s => s
                    .required(t("authRegister.authPersonalData.validationVer2.phone.required"))
                    .test(
                        "valid-phone",
                        t("authRegister.authPersonalData.validationVer2.phone.invalidOrUsed"),
                        function (value) {
                            const { phoneCountry } = this.parent as SignupFormValues;
                            if (!value) return false;
                            const country = (phoneCountry || "ID").toUpperCase();
                            const raw = String(value);
                            let parsed =
                                raw.trim().startsWith("+")
                                    ? parsePhoneNumberFromString(raw)
                                    : parsePhoneNumberFromString(raw, country as any);
                            if (!parsed) {
                                const digits = raw.replace(/\D/g, "");
                                parsed = parsePhoneNumberFromString(digits, country as any);
                            }

                            return parsed?.isValid() ?? false;
                        }
                    ),
                otherwise: s => s,
            }),
        phoneCountry: str.default("ID"),
        email: str.when([], {
            is: () => !isSSO && signupType === "email",
            then: s => s.email(t("authRegister.authPersonalData.validationVer2.email.invalidFormat"))
                .required(t("authRegister.authPersonalData.validationVer2.email.required")),
            otherwise: s => s,
        }),
        name: str.min(2, t("authRegister.authPersonalData.validationVer2.name.min", { min: 2 }))
            .max(100, t("authRegister.authPersonalData.validationVer2.name.max", { max: 100 }))
            .required(t("authRegister.authPersonalData.validationVer2.name.required")),
        seedsTag: str.required(t("authRegister.authPersonalData.validationVer2.seedsTag.required"))
            .matches(/^[A-Za-z0-9_]+$/, t("authRegister.authPersonalData.validationVer2.seedsTag.regex"))
            .test(
                "len-3-15",
                t("authRegister.authPersonalData.validationVer2.seedsTag.length"),
                (v) => !v || (v.length >= 3 && v.length <= 15)
            ),
        refCode: str,
        birthDate: str,
        password: isSSO
            ? str
            : str.required(t("authRegister.authPersonalData.validationVer2.password.required"))
                .matches(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/, t("authRegister.authPersonalData.validationVer2.password.rules")),
        confirmPassword: isSSO
            ? str
            : str.required(t("authRegister.authPersonalData.validationVer2.confirmPassword.required"))
                .oneOf([yup.ref("password")], t("authRegister.authPersonalData.validationVer2.confirmPassword.mismatch")),
        provider: yup.object({ provider: str.required(), identifier: str }),
        onboardingId: str,
        tncAccepted: yup.boolean().oneOf([true], t("authRegister.authPersonalData.validationVer2.tnc.required")).required(),
        pin: str,
        age: yup.number().nullable().default(null),
        avatar: str,
    }).required();

    const methods = useForm<SignupFormValues>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {
            phoneNumber: "",
            phoneCountry: "ID",
            email: "",
            name: "",
            seedsTag: "",
            refCode: "",
            birthDate: "",
            password: "",
            confirmPassword: "",
            provider: { provider: isSSO ? "google" : signupType, identifier: "" },
            onboardingId: onboardingId || "",
            tncAccepted: false,
            pin: "",
            age: null,
            avatar: "",
        },
    });

    const [step, setStep] = useState<Step>("profile");
    const [refOpen, setRefOpen] = useState(false);
    const [refCode, setRefCode] = useState("");

    const [createNewUser, { isLoading }] = useCreateNewUserMutation();

    useEffect(() => {
        if (onboardingId != null) {
            methods.setValue("onboardingId", onboardingId, { shouldDirty: false });
        }
    }, [onboardingId, methods]);

    useEffect(() => {
        if (!isSSO || didSSOPrefill.current) return;

        const profile = navState?.profile;
        const accessToken = navState?.accessToken;
        const provider = (navState?.provider);

        const current = methods.getValues();
        const next = {
            ...current,
            name: profile?.name ?? current.name,
            email: profile?.email ?? current.email,
            provider: {
                provider,
                identifier: accessToken || current.provider?.identifier || "",
            },
            onboardingId: navState?.onboarding_id || current.onboardingId,
        };

        if (!current.seedsTag) {
            next.seedsTag = SuggestSeedsTag(profile?.name || profile?.email || "");
        }

        methods.reset(next, { keepDirty: false, keepTouched: false });
        didSSOPrefill.current = true;
    }, [isSSO, methods, navState]);

    const [validateEmail, emailState] = useLazyValidateEmailQuery();
    const [validatePhone, phoneState] = useLazyValidatePhoneNumberQuery();
    const [validateRef, refState] = useLazyValidateRefCodeQuery();
    const [validateTag, tagState] = useLazyValidateSeedsTagQuery();

    const isValidating = emailState.isFetching || phoneState.isFetching || refState.isFetching || tagState.isFetching;

    async function checkRemote<T extends keyof SignupFormValues>(
        validator: (v: string, preferCache?: boolean) => any,
        v: string,
        field: T,
        takenMsg: string,
        fallbackMsg: string
    ) {
        if (!v) return true;
        try {
            const res = await validator(v, true).unwrap?.() ?? await validator(v, true);
            const ok = typeof res === "boolean" ? res : (res?.valid ?? res?.ok ?? res?.available ?? res?.isValid ?? true);
            if (!ok) {
                methods.setError(field, { type: "remote", message: takenMsg });
                return false;
            }
            methods.clearErrors(field);
            return true;
        } catch {
            methods.setError(field, { type: "remote", message: fallbackMsg });
            return false;
        }
    }

    const validateOnBlur = {
        email: (v: string) =>
            checkRemote(validateEmail, v, "email",
                t("authRegister.authPersonalData.validationVer2.email.taken"),
                t("authRegister.authPersonalData.validationVer2.email.invalidOrUsed")),
        phoneNumber: (v: string) =>
            checkRemote(validatePhone, v, "phoneNumber",
                t("authRegister.authPersonalData.validationVer2.phone.taken"),
                t("authRegister.authPersonalData.validationVer2.phone.invalidOrUsed")),
        seedsTag: (v: string) =>
            checkRemote(validateTag, v, "seedsTag",
                t("authRegister.authPersonalData.validationVer2.seedsTag.taken"),
                t("authRegister.authPersonalData.validationVer2.seedsTag.invalidOrUsed")),
        refCode: (v: string) =>
            checkRemote(validateRef, v, "refCode",
                t("authRegister.authPersonalData.validationVer2.refCode.notFound"),
                t("authRegister.authPersonalData.validationVer2.refCode.invalid")),
    };

    async function validateAllRemote(vals: Partial<SignupFormValues>) {
        const jobs: Promise<boolean>[] = [];
        if (signupType === "email" && vals.email) jobs.push(validateOnBlur.email(vals.email));
        if (signupType === "phone" && vals.phoneNumber) jobs.push(validateOnBlur.phoneNumber(vals.phoneNumber));
        if (vals.seedsTag) jobs.push(validateOnBlur.seedsTag(vals.seedsTag));
        if (vals.refCode) jobs.push(validateOnBlur.refCode(vals.refCode));
        const ok = await Promise.all(jobs);
        return ok.every(Boolean);
    }

    const dispatch = useAppDispatch();
    const [login] = useLoginMutation();

    const submitFinal = async (finalRefCode?: string) => {
        try {
            const v = methods.getValues();
            const okRemote = await validateAllRemote(v);
            if (!okRemote) return;

            const payload: NewUserReqI = {
                phoneNumber: signupType === "phone" ? v.phoneNumber.trim() : "",
                email: signupType === "email" ? v.email.trim() : "",
                name: v.name.trim(),
                seedsTag: v.seedsTag.trim(),
                age: Number(v.age ?? 0),
                avatar: v.avatar ?? "",
                refCode: (finalRefCode ?? v.refCode ?? "").trim(),
                password: v.password,
                provider: {
                    provider: v.provider?.provider || signupType,
                    identifier: v.provider?.identifier ?? "",
                },
                pin: v.pin,
                onboardId: v.onboardingId,
                ...(v.birthDate ? { birthDate: v.birthDate } : {}),
            };

            await createNewUser(payload).unwrap();

            const { os_name, platform } = getDeviceMeta();

            const loginBody: LoginReqI = isSSO
                ? {
                    phone_number: "",
                    email: "",
                    password: "",
                    pin: "",
                    oauth_provider: v.provider?.provider || "google",
                    oauth_identifier: v.provider?.identifier || "",
                    os_name,
                    platform,
                    visitor_id: "",
                    onboarding_id: v.onboardingId || "",
                }
                : {
                    phone_number: signupType === "phone" ? v.phoneNumber.trim() : "",
                    email: signupType === "email" ? v.email.trim() : "",
                    password: v.password,
                    pin: "",
                    oauth_provider: "",
                    oauth_identifier: "",
                    os_name,
                    platform,
                    visitor_id: "",
                    onboarding_id: v.onboardingId || "",
                };

            const res = await login(loginBody).unwrap();
            dispatch(saveTokenAuth(res));
            navigate("/dashboard");
        } catch (e) {
            errorHandler(e);
        }
    };

    useEffect(() => {
        if (sessionStorage.getItem(TNC_FLAG_KEY) === '1') {
            methods.setValue('tncAccepted', true, { shouldDirty: true, shouldValidate: true });
            sessionStorage.removeItem(TNC_FLAG_KEY);
        }
    }, [methods]);

    const openTncFromSignup = () => {
        const returnUrl = encodeURIComponent(location.pathname + location.search);
        navigate(`${tncPageRouteName}?return=${returnUrl}&setForm=1`);
    };


    const value: Ctx = {
        methods,
        signupType,
        isValidating,
        validateOnBlur,
        validateAllRemote,
        isLoading,
        submitFinal,
        step,
        setStep,
        refOpen,
        setRefOpen,
        refCode,
        setRefCode,
        isSSO,
        openTncFromSignup,
    };


    return (
        <Ctx.Provider value={value}>
            <FormProvider {...methods}>{children}</FormProvider>
        </Ctx.Provider>
    );
}

export function useSignupForm() {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error("useSignupForm must be used within <SignupFormProvider/>");
    return ctx;
}
