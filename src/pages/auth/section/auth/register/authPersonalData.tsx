import { Backward, BlueWarning } from "@/assets/auth";
import { Input } from "@/components/ui/input/input";
import { PasswordInput } from "@/components/ui/input/password";
import { BasePhoneInput } from "@/components/ui/input/phoneNumber";
import { useSignupForm } from "@/pages/auth/hooks/auth/useSignUpForm";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface SignupProps {
  onPrepared: () => void;
}

export default function AuthPersonalData({ onPrepared }: SignupProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    methods,
    isValidating,
    validateOnBlur,
    signupType,
    validateAllRemote,
    isSSO,
    openTncFromSignup,
  } = useSignupForm();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const submitting = isValidating;

  const submitProfile = handleSubmit(async () => {
    const localOk = await methods.trigger(undefined, { shouldFocus: true });
    if (!localOk) return;
    const vals = methods.getValues();
    const remoteOk = await validateAllRemote(vals);
    if (!remoteOk) return;
    onPrepared();
  });

  return (
    <form
      className="flex flex-col items-center"
      onSubmit={submitProfile}
      noValidate
    >
      {!isSSO && (
        <div className="w-full flex justify-start">
          <img
            src={Backward}
            alt="Backward"
            className="cursor-pointer hover:scale-110 duration-200"
            onClick={() => navigate(-1)}
          />
        </div>
      )}

      <div className="flex flex-col gap-2 justify-center items-center w-full md:w-[80%]">
        <p className="font-poppins font-semibold bg-gradient-to-b text-center from-[#3AC4A0] to-[#177C62] bg-clip-text text-transparent text-2xl md:text-3xl mt-4">
          {t("authRegisterAccount.page2.text1")}
        </p>
        <p className="font-poppins text-neutral-medium font-medium text-sm md:text-md text-center mt-2">
          {t("authRegisterAccount.page2.text2")}
        </p>

        <div className="w-full flex flex-col gap-2 justify-center items-center mt-5">
          {!isSSO &&
            (signupType === "email" ? (
              <div className="w-full">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      name="email"
                      type="email"
                      placeholder={t("authRegisterAccount.page2.text21")}
                      label={t("authRegisterAccount.page2.text5")}
                      className="rounded-md"
                      error={errors.email}
                      required
                      onBlur={(e) => {
                        field.onBlur();
                        validateOnBlur.email(e.target.value);
                      }}
                    />
                  )}
                />
              </div>
            ) : (
              <div className="w-full">
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field }) => (
                    <BasePhoneInput
                      // {...field}
                      id="phone-input"
                      name="phoneNumber"
                      label={t("authLogin.phone")}
                      required
                      value={field.value}
                      onChange={field.onChange}
                      className="rounded-md"
                      format="e164_noplus"
                      error={errors.phoneNumber}
                      onBlur={() => {
                        field.onBlur();
                        validateOnBlur.phoneNumber(
                          String(methods.getValues("phoneNumber") ?? "")
                        );
                      }}
                    />
                  )}
                />
              </div>
            ))}

          <div className="w-full">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  name="name"
                  placeholder={t("authRegisterAccount.page2.text10")}
                  label={t("authRegisterAccount.page2.text3")}
                  className="rounded-md"
                  error={errors.name}
                  required
                />
              )}
            />
          </div>

          <div className="w-full">
            <Controller
              name="seedsTag"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  name="seedsTag"
                  placeholder="Ex: seeds123"
                  className="rounded-md"
                  label={t("authRegisterAccount.page2.text4")}
                  error={errors.seedsTag}
                  required
                  onBlur={(e) => {
                    field.onBlur();
                    validateOnBlur.seedsTag(e.target.value);
                  }}
                />
              )}
            />
          </div>
        </div>

        <div className="w-full flex justify-start items-start gap-2">
          <img
            src={BlueWarning}
            alt="BlueWarning"
            className="w-[20px] mt-[1px]"
          />
          <p className="font-poppins text-sm text-[#2B4CCD]">
            {t("authRegisterAccount.page2.text6")}
          </p>
        </div>
        {!isSSO && (
          <div className="w-full space-y-4">
            <div className="w-full">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <PasswordInput
                    {...field}
                    name="password"
                    className="rounded-md"
                    required
                    label={t("authLogin.createPassword")}
                    placeholder={t("authLogin.passwordPlaceholder")}
                    error={errors.password}
                  />
                )}
              />
            </div>
            <div className="w-full">
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <PasswordInput
                    {...field}
                    name="confirmPassword"
                    className="rounded-md"
                    required
                    label={t("authLogin.confirmPassword")}
                    placeholder={t("authLogin.confirmPasswordPlaceholder")}
                    error={errors.confirmPassword}
                  />
                )}
              />
            </div>
          </div>
        )}

        <div className="w-full flex gap-2 justify-start items-start mt-4">
          <Controller
            name="tncAccepted"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                className="w-[18px] h-[18px] cursor-pointer mt-[1px]"
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
          <p className="w-full font-poppins text-sm text-neutral-medium">
            <span className="cursor-pointer" onClick={openTncFromSignup}>
              {t("authRegisterAccount.page2.text7")}{" "}
            </span>
            <span
              className="font-semibold font-poppins cursor-pointer"
              style={{ color: "#2B4CCD" }}
              onClick={openTncFromSignup}
            >
              {t("authRegisterAccount.page2.text8")}{" "}
              {t("authRegisterAccount.page2.text9")}
            </span>
          </p>
        </div>
        {errors.tncAccepted && (
          <div className="w-full">
            <p className="text-red-500 text-sm mt-1">
              {errors.tncAccepted.message}
            </p>
          </div>
        )}

        <div className="w-full md:w-[80%] p-[2px] rounded-xl bg-gradient-to-b from-[#5EFF95] to-[#70FFA0] mt-8">
          <button
            type="submit"
            disabled={submitting}
            className="
                            font-poppins text-sm w-full
                            bg-gradient-to-b from-[#3AC4A0] to-[#177C62]
                            text-white rounded-xl capitalize
                            disabled:opacity-60 p-3 cursor-pointer
                            transition-colors duration-200
                            hover:from-[#2ea884] hover:to-[#0f5b47]
                        "
          >
            {submitting
              ? "Processing..."
              : t("authRegisterAccount.page2.text16")}
          </button>
        </div>
      </div>
    </form>
  );
}
