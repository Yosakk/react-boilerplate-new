import Divider from '@/components/ui/divider';
import { Input } from '@/components/ui/input/input';
import { PasswordInput } from '@/components/ui/input/password';
import { useTranslation } from 'react-i18next';
import GoogleSSO from './authGoogleSSO';
import useLoginForm from '../../hooks/auth/useLoginForm';
import IconButton from '@/components/IconButton';
import { Backward, LoginEmail, LoginPhone } from '@/assets/auth';
import { BasePhoneInput } from '@/components/ui/input/phoneNumber';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import { resetOnboarding } from '@/store/onboarding';
import { tncPageRouteName } from '@/pages/terms-condition';

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
    } = useLoginForm({ initialMethod: 'email' });
    const submissionId = useAppSelector((s) => s.onboarding?.submissionId);
    const dispatch = useAppDispatch();
    const altMethodLabel = isEmail ? t("authLogin.phone") : t("loginRevamp.text5");
    const switchLabel = isEmail
        ? `${t("loginRevamp.text3")} ${t("authLogin.phone")}`
        : `${t("loginRevamp.text3")} Email`;

    const switchIcon = isEmail
        ? <img src={LoginPhone} alt="Phone" className="w-[25px] h-[25px]" />
        : <img src={LoginEmail} alt="Email" className="w-[25px] h-[25px]" />;

    const navigate = useNavigate();

    const handleBack = () => {
        if (submissionId) {
            dispatch(resetOnboarding());
        }
        navigate("/onboarding");
    };

    return (
        <div className="flex flex-col items-center">
            <div className="w-full flex justify-start">
                <img
                    src={Backward}
                    alt="Backward"
                    className="cursor-pointer hover:scale-110 duration-200"
                    onClick={() => navigate(-1)}
                />
            </div>

            <p className="font-poppins font-semibold bg-gradient-to-b text-start lg:text-center w-full from-[#3AC4A0] to-[#177C62] bg-clip-text text-transparent text-2xl md:text-3xl mt-4">
                {t("loginRevamp.text1")}
            </p>
            <p className="font-poppins text-neutral-medium font-medium text-sm md:text-md text-start lg:text-center mt-2">
                {t("loginRevamp.text2")}
            </p>

            <GoogleSSO label={t("loginRevamp.text3") + " Google"} />

            <IconButton
                label={switchLabel}
                onClick={() => selectMethod(isEmail ? 'phone' : 'email')}
                disabled={isLoading}
                variant="outline"
                size="md"
                rounded="lg"
                className="mt-3"
                widthClassName="w-full h-[50px] md:w-[60%] max-w-[400px]"
                icon={switchIcon}
            />

            <Divider lineClassName="bg-gray-300" className='my-4' width='w-full md:w-[70%]'>{t("loginRevamp.orContinueWith", { method: altMethodLabel })}</Divider>

            <form
                onSubmit={loginHandler}
                className="flex flex-col w-full lg:w-[70%] space-y-3"
                noValidate
            >
                <div>
                    {isEmail ? (
                        <Input
                            {...register("identity")}
                            type="email"
                            inputMode="email"
                            autoComplete="username"
                            placeholder={`${t("loginRevamp.text23")} ${t("loginRevamp.text5")}`}
                            label={t("loginRevamp.text5")}
                            required
                            className="rounded-md"
                            containerClassName="w-full"
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
                                setValue('identity', val, { shouldDirty: true, shouldValidate: true });
                                if (country?.code) {
                                    setValue('country', country.code.toUpperCase(), { shouldDirty: true, shouldValidate: false });
                                }
                            }}
                            className="rounded-md"
                            format="e164_noplus"
                            error={errors.identity}
                        />
                    )}
                </div>

                <div>
                    <PasswordInput
                        label={t("loginRevamp.text6")}
                        placeholder={t('authLogin.passwordPlaceholder')}
                        {...register("password")}
                        error={errors.password}
                        className="rounded-md"
                        containerClassName="w-full"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="capitalize font-semibold font-poppins md:text-sm text-[10px] leading-[14px] text-white w-full border-2 py-3 hover:border-[#70FFA0] border-[#5EFF95] mt-2 bg-gradient-to-r from-[#3AC4A0] to-[#177C62] transition duration-200 hover:opacity-90 rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Loading..." : t("loginRevamp.text8")}
                </button>
            </form>

            <div className="flex gap-1 justify-center items-center mt-4">
                <p
                    className="cursor-pointer font-poppins text-neutral-soft font-normal text-center max-w-[400px]"
                >
                    {t("loginRevamp.text9")}{' '}
                    <span
                        className="font-semibold text-black"
                        onClick={() => {
                            const returnUrl = encodeURIComponent(authLoginPageRouteName);
                            navigate(`${tncPageRouteName}?return=${returnUrl}&setForm=0`);
                        }}
                    >
                        {t("loginRevamp.text10")}
                    </span>{' '}
                    {t("loginRevamp.text11")}{' '}
                    <span
                        className="font-semibold text-black"
                        onClick={() => {
                            const returnUrl = encodeURIComponent(authLoginPageRouteName);
                            navigate(`${tncPageRouteName}?return=${returnUrl}&setForm=0`);
                        }}
                    >
                        {t("loginRevamp.text12")}
                    </span>
                </p>

            </div>

            <div className="flex flex-col  md:flex-row gap-1 justify-center items-center mt-4">
                <p className="font-poppins text-neutral-soft text-md text-center">
                    {t("loginRevamp.text13")}
                </p>
                <p
                    onClick={handleBack}
                    className="font-medium font-poppins bg-gradient-to-b text-center from-[#3AC4A0] to-[#177C62] bg-clip-text text-transparent my-2 cursor-pointer"
                >
                    {t("loginRevamp.text14")}
                </p>
            </div>
        </div>
    );
};

export default AuthLogin;
