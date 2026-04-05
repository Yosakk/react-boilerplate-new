import {
  Stack,
  Text,
  Group,
  Anchor,
  Divider as MantineDivider,
  rem,
} from "@mantine/core";
import { Input } from "@/components/ui/input/input";
import { PasswordInput } from "@/components/ui/input/password";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import GoogleSSO from "./authGoogleSSO";
import useLoginForm from "../../hooks/auth/useLoginForm";
import IconButton from "@/components/IconButton";
import { Backward, LoginEmail, LoginPhone } from "@/assets/auth";
import { BasePhoneInput } from "@/components/ui/input/phoneNumber";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import { resetOnboarding } from "@/store/onboarding";
import { tncPageRouteName } from "@/pages/terms-condition";

export const authLoginPageRouteName = "/auth/login";

const AuthLogin = () => {
  const { t } = useTranslation();
  const {
    errors,
    isLoading,
    loginHandler,
    register,
    setValue,
    method,
    isEmail,
    selectMethod,
    identityVal,
    passwordStrength,
  } = useLoginForm({ initialMethod: "email" });
  const submissionId = useAppSelector((s) => s.onboarding?.submissionId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const altMethodLabel = isEmail
    ? t("authLogin.phone")
    : t("loginRevamp.text5");
  const switchLabel = isEmail
    ? `${t("loginRevamp.text3")} ${t("authLogin.phone")}`
    : `${t("loginRevamp.text3")} Email`;

  const switchIcon = isEmail ? (
    <img src={LoginPhone} alt="Phone" className="w-[25px] h-[25px]" />
  ) : (
    <img src={LoginEmail} alt="Email" className="w-[25px] h-[25px]" />
  );

  const handleBack = () => {
    if (submissionId) dispatch(resetOnboarding());
    navigate("/onboarding");
  };

  const handleTnc = () => {
    const returnUrl = encodeURIComponent(authLoginPageRouteName);
    navigate(`${tncPageRouteName}?return=${returnUrl}&setForm=0`);
  };

  return (
    <Stack gap="sm" align="center">
      {/* Back button */}
      <div className="w-full flex justify-start">
        <img
          src={Backward}
          alt="Back"
          className="cursor-pointer hover:scale-110 duration-200"
          onClick={() => navigate(-1)}
        />
      </div>

      {/* Heading */}
      <Text
        fw={600}
        className="font-poppins bg-gradient-to-b from-[#3AC4A0] to-[#177C62] bg-clip-text text-transparent w-full"
        ta={{ base: "left", lg: "center" }}
        size="xl"
        mt="xs"
      >
        {t("loginRevamp.text1")}
      </Text>
      <Text
        c="dimmed"
        size="sm"
        ta={{ base: "left", lg: "center" }}
        className="w-full"
      >
        {t("loginRevamp.text2")}
      </Text>

      {/* SSO + method switch */}
      <GoogleSSO label={t("loginRevamp.text3") + " Google"} />
      <IconButton
        label={switchLabel}
        onClick={() => selectMethod(isEmail ? "phone" : "email")}
        disabled={isLoading}
        variant="outline"
        size="md"
        rounded="lg"
        className="mt-1"
        widthClassName="w-full h-[50px] md:w-[60%] max-w-[400px]"
        icon={switchIcon}
      />

      <MantineDivider
        label={t("loginRevamp.orContinueWith", { method: altMethodLabel })}
        labelPosition="center"
        className="w-full md:w-[70%]"
        my="xs"
      />

      {/* Login form */}
      <form
        onSubmit={loginHandler}
        className="flex flex-col w-full lg:w-[70%]"
        noValidate
      >
        <Stack gap="sm">
          {isEmail ? (
            <Input
              {...register("identity")}
              type="email"
              inputMode="email"
              autoComplete="username"
              placeholder={`${t("loginRevamp.text23")} ${t("loginRevamp.text5")}`}
              label={t("loginRevamp.text5")}
              required
              error={errors.identity}
            />
          ) : (
            <BasePhoneInput
              id="phone-input"
              name="phoneNumber"
              label={t("authLogin.phone")}
              required
              value={identityVal}
              onChange={(val: string, country) => {
                setValue("identity", val, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
                if (country?.code) {
                  setValue("country", country.code.toUpperCase(), {
                    shouldDirty: true,
                    shouldValidate: false,
                  });
                }
              }}
              format="e164_noplus"
              error={errors.identity}
            />
          )}

          <PasswordInput
            label={t("loginRevamp.text6")}
            placeholder={t("authLogin.passwordPlaceholder")}
            {...register("password")}
            error={errors.password}
            required
          />

          {/* Password strength indicator */}
          {passwordStrength > 0 && (
            <Group gap={rem(4)}>
              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className="h-1 flex-1 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor:
                      passwordStrength >= level
                        ? passwordStrength <= 1
                          ? "#ef4444"
                          : passwordStrength <= 2
                            ? "#f59e0b"
                            : passwordStrength <= 3
                              ? "#3b82f6"
                              : "#22c55e"
                        : "#e5e7eb",
                  }}
                />
              ))}
            </Group>
          )}

          <Button type="submit" loading={isLoading} fullWidth size="md" mt="xs">
            {t("loginRevamp.text8")}
          </Button>
        </Stack>
      </form>

      {/* TnC */}
      <Text size="xs" c="dimmed" ta="center" mt="xs">
        {t("loginRevamp.text9")}{" "}
        <Anchor size="xs" fw={600} c="dark" onClick={handleTnc}>
          {t("loginRevamp.text10")}
        </Anchor>{" "}
        {t("loginRevamp.text11")}{" "}
        <Anchor size="xs" fw={600} c="dark" onClick={handleTnc}>
          {t("loginRevamp.text12")}
        </Anchor>
      </Text>

      {/* Register link */}
      <Group gap={rem(4)} justify="center" mt="xs">
        <Text size="sm" c="dimmed">
          {t("loginRevamp.text13")}
        </Text>
        <Anchor
          size="sm"
          fw={500}
          className="bg-gradient-to-b from-[#3AC4A0] to-[#177C62] bg-clip-text text-transparent"
          onClick={handleBack}
        >
          {t("loginRevamp.text14")}
        </Anchor>
      </Group>
    </Stack>
  );
};

export default AuthLogin;
