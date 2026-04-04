
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface Props {
    className: string;
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
}

const AuthBoarding: React.FC<Props> = ({ className, step, setStep }: Props) => {
    const { t } = useTranslation();

    return (
        <div className={`flex flex-col items-center gap-4 ${className}`}>
            <button
                onClick={() => {
                    setStep(1)
                }}
                className="font-semibold font-poppins text-base text-white bg-gradient-to-b from-[#3AC4A0] to-[#177C62] border-2 border-[#88FFA69E] rounded-xl normal-case w-full md:w-[400px] p-2 cursor-pointer"
            >
                {t('onboarding.welcomeButton.start')}
            </button>
            <Link
                to={'/auth'}
                className="font-semibold text-center font-poppins text-base bg-gradient-to-b from-[#3AC4A0] to-[#177C62] border-2 border-[#3AC4A0] bg-clip-text text-transparent rounded-xl normal-case w-full md:w-[400px] p-2 cursor-pointer"
            >
                {t('onboarding.welcomeButton.login')}
            </Link>
        </div>
    );
};

export default AuthBoarding;
