import { Backward, LoginEmail, LoginPhone, SeedyAuthLogin } from '@/assets/auth';
import Divider from '@/components/ui/divider';
import { useAppDispatch, useAppSelector } from '@/store';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { resetOnboarding } from '@/store/onboarding';
import GoogleSSO from './authGoogleSSO';
export const authSignUpPageRouteName = "/auth/signup";

const AuthSignUp = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const submissionId = useAppSelector((s) => s.onboarding?.submissionId);
    const [guardOpen, setGuardOpen] = React.useState(false);
    const [pendingPath, setPendingPath] = React.useState<string | null>(null);
    const isIOS = (): boolean =>
        typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const handleGoOnboarding = () => {
        setGuardOpen(false);
        navigate('/onboarding');
    };

    const handleTryGo = (path: string) => {
        if (!submissionId) {
            setPendingPath(path);
            setGuardOpen(true);
        } else {
            navigate(path);
        }
    };

    const handleBack = () => {
        if (submissionId) {
            dispatch(resetOnboarding());
        }
        navigate("/onboarding");
    };

    return (
        <div className={` flex flex-col items-center space-y-3`}>
            <div className='w-full flex justify-start items-center'>
                <div className="w-full flex justify-start">
                    <img
                        src={Backward}
                        alt="Backward"
                        className="cursor-pointer hover:scale-110 duration-200"
                        onClick={handleBack}
                    />
                </div>
            </div>
            <p className="font-poppins font-semibold bg-gradient-to-b text-center from-[#3AC4A0] to-[#177C62] bg-clip-text text-transparent text-2xl md:text-3xl">
                {t('authRegisterAccount.page1.text1')}
            </p>
            <p className="font-poppins text-neutral-medium font-medium text-sm md:text-md text-center mt-3">
                {t('authRegisterAccount.page1.text2')}
            </p>
            <img
                src={SeedyAuthLogin}
                alt="SeedyLogin"
                className="w-[150px]"
            />
            <GoogleSSO
                label={t("authRegisterAccount.page1.text3")}
            />
            {/* {isIOS() ? (
                // <AppleLoginButton />
            ) : null} */}
            <Divider lineClassName="bg-gray-300" children={t('authRegisterAccount.page1.text4')} />
            <div className='flex justify-center items-center gap-2'>
                <button
                    type="button"
                    onClick={() => handleTryGo('/auth/signup/email')}
                    className='border-gray-300 hover:border-gray-700 border duration-200 rounded-full w-[50px] h-[50px] flex justify-center items-center cursor-pointer'
                >
                    <img src={LoginEmail} alt="LoginEmail" className="w-[20px]" />
                </button>
                <button
                    type="button"
                    onClick={() => handleTryGo('/auth/signup/phone')}
                    className='border-gray-300 hover:border-gray-700 border duration-200 rounded-full w-[50px] h-[50px] flex justify-center items-center cursor-pointer'
                >
                    <img src={LoginPhone} alt="LoginPhone" className="w-[20px]" />
                </button>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-x-1 text-center">
                <p className="font-poppins text-neutral-soft text-md my-2">
                    {t('authRegisterAccount.page1.text5')}
                </p>
                <Link
                    to="login/existing"
                    className="font-medium font-poppins bg-gradient-to-b from-[#3AC4A0] to-[#177C62] bg-clip-text text-transparent my-2 cursor-pointer break-words"
                >
                    {t('authRegisterAccount.page1.text6')}
                </Link>
            </div>
            <Dialog open={guardOpen} onOpenChange={setGuardOpen}>
                <DialogContent className="bg-white rounded-xl border-0 p-6 sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="font-poppins text-lg">
                            {t("authRegister.authGuard.modal.title")}
                        </DialogTitle>
                        <DialogDescription className="font-poppins">
                            {t("authRegister.authGuard.modal.desc")}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <button
                            type="button"
                            onClick={() => setGuardOpen(false)}
                            className="px-4 py-2 rounded-lg border border-gray-300 text-sm cursor-pointer"
                        >
                            {t("authRegister.authGuard.modal.cancel")}
                        </button>
                        <button
                            type="button"
                            onClick={handleGoOnboarding}
                            className="px-4 py-2 rounded-lg text-white cursor-pointer text-sm bg-gradient-to-b from-[#3AC4A0] to-[#177C62]"
                        >
                            {t("authRegister.authGuard.modal.goOnboarding")}
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AuthSignUp