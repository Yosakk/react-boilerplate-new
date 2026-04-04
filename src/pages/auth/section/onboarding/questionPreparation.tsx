import { useTranslation } from "react-i18next";
import { Polygon, SeedyChat, SeedyMoneyBuddy, SeedyQuestion } from "@/assets/onboarding";
import TypingBubble from "./typingBubble";
import { useQuestionPreparation } from "../../hooks/onboarding/usePreparationQuestion";
import type { OnboardingReqI } from "@/_interfaces/onboarding.interfaces";
import { useLazyOnboardingQuery } from "@/_services/onboarding";
import { errorHandler } from "@/_services/errorHandler";

interface QuestionPreparationI {
  showQuestion?: boolean;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  params: OnboardingReqI;
}

const QuestionPreparation: React.FC<QuestionPreparationI> = ({ showQuestion, setStep, params }) => {
  const { t } = useTranslation();
  const { isShown } = useQuestionPreparation({ showQuestion, autoDelayMs: 2000 });
  const [trigger, { isLoading, isFetching }] = useLazyOnboardingQuery();
  const loading = isLoading || isFetching;

  const handleStart = async () => {
    try {
      await trigger(params).unwrap();
      setStep(2);
    } catch (e) {
      errorHandler(e);
    }
  };
  return (
    <div className="w-full flex flex-col items-center gap-4">
      {!isShown ? (
        <div className="w-full flex flex-col justify-center items-center">
          <div className="flex justify-center items-center bg-[#7EFFA8] relative rounded-md p-2 gap-2 mb-12">
            <img src={SeedyChat} alt="SeedyChat" className="w-[40px] h-auto shrink-0" />
            <div className="flex flex-col justify-start items-start">
              <p className="font-poppins text-neutral-medium font-semibold text-sm md:text-md">Seedy</p>
              <div className="w-full md:w-[280px] font-poppins text-neutral-medium font-medium text-sm md:text-md">
                <TypingBubble message={[{ text: t("onboarding.welcomeButton.text1") }]} />
              </div>
              <img
                src={Polygon}
                alt="Polygon"
                className="w-[20px] h-auto fade-in-onboard absolute bottom-[-14px] left-[10px] rotate-[30deg]"
              />
            </div>
          </div>
          <img src={SeedyMoneyBuddy} alt="SeedyMoneyBuddy" className="w-[250px] h-auto fade-in-onboard" />
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-full flex flex-col justify-center items-center my-7 ">
            <div className="flex justify-center items-center bg-[#7EFFA8] relative rounded-md p-2 gap-2 mb-12">
              <img src={SeedyChat} alt="SeedyChat" className="w-[40px] h-auto shrink-0" />
              <div className="w-full flex flex-col justify-start items-start">
                <p className="font-poppins text-neutral-medium font-semibold text-sm md:text-md">Seedy</p>
                <div className="w-full md:w-[280px] font-poppins text-neutral-medium font-medium text-sm md:text-md">
                  <TypingBubble message={[{ text: t("onboarding.welcomeButton.text2") }]} />
                </div>
                <img
                  src={Polygon}
                  alt="Polygon"
                  className="w-[20px] h-auto fade-in-onboard absolute bottom-[-14px] left-[10px] rotate-[35deg]"
                />
              </div>
            </div>
            <img src={SeedyQuestion} alt="SeedyQuestion" className="w-[250px] h-auto fade-in-onboard" />
          </div>
          <button
            onClick={handleStart}
            disabled={loading}
            aria-busy={loading}
            className={[
              "font-semibold font-poppins text-base text-white",
              "bg-gradient-to-b from-[#3AC4A0] to-[#177C62] border-2 border-[#88FFA69E]",
              "rounded-xl normal-case w-full md:w-[400px] p-2",
              "transition-all duration-200 hover:shadow-lg active:scale-[0.98]",
              "disabled:opacity-60 disabled:cursor-not-allowed",
              loading ? "cursor-wait" : "cursor-pointer",
            ].join(" ")}
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span>{t("onboarding.question.loading", "Loading…")}</span>
              </span>
            ) : (
              t("onboarding.question.start")
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionPreparation;
