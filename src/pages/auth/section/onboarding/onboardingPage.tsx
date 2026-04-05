import React from "react";
import OnboardingCarousel from "./carousel";
import AuthBoarding from "./boarding";
import QuestionPreparation from "./questionPreparation";
import OnboardingQuestions from "./question";
import QuestionDoneContainer from "./questionDoneView";
import SplashScreen from "./splashScreen";
import { useOnboardingPage } from "../../hooks/onboarding/useOnboardingPage";

export const onboardingCarouselPageRouteName = "/onboarding";

const OnboardingPage: React.FC = () => {
  const {
    step,
    setStep,
    answers,
    showSplash,
    isFading,
    params,
    handleComplete,
    handleRestart,
  } = useOnboardingPage();

  return (
    <div>
      {step === 0 && (
        <>
          {showSplash && <SplashScreen isFading={isFading} />}
          <OnboardingCarousel />
          <AuthBoarding className="mt-8" setStep={setStep} step={step} />
        </>
      )}

      {step === 1 && <QuestionPreparation setStep={setStep} params={params} />}

      {step === 2 && (
        <OnboardingQuestions
          setStep={setStep}
          params={params}
          onComplete={handleComplete}
        />
      )}

      {step === 3 && (
        <div className="mt-8">
          <QuestionDoneContainer onRestart={handleRestart} answers={answers} />
        </div>
      )}
    </div>
  );
};

export default OnboardingPage;
