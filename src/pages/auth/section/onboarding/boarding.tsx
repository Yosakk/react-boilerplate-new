import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

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
          setStep(1);
        }}
        className="font-semibold font-poppins text-base text-white bg-gradient-to-b from-seeds-green-light to-seeds-green border-2 border-seeds-glow-border rounded-xl normal-case w-full md:w-[400px] p-2 cursor-pointer"
      >
        {t("onboarding.welcomeButton.start")}
      </button>
      <Link
        to="/auth/login"
        className="font-semibold text-center font-poppins text-base bg-gradient-to-b from-seeds-green-light to-seeds-green border-2 border-seeds-green-light bg-clip-text text-transparent rounded-xl normal-case w-full md:w-[400px] p-2 cursor-pointer"
      >
        {t("onboarding.welcomeButton.login")}
      </Link>
    </div>
  );
};

export default AuthBoarding;
