import React, { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import OnboardingCarousel from "./carousel";
import AuthBoarding from "./boarding";
import QuestionPreparation from "./questionPreparation";
import OnboardingQuestions from "./question";
import QuestionDoneContainer from "./questionDoneView";
import type { AnswerOption } from "@/_interfaces/onboarding.interfaces";
import SplashScreen from "./splashScreen";
import { useMobileSplash } from "../../hooks/onboarding/useMobileSplash";

export const onboardingCarouselPageRouteName = "/onboarding";

type AnswersMap = Record<number, AnswerOption[]>;

const OnboardingPage: React.FC = () => {
  const { i18n } = useTranslation();
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<AnswersMap>({});

  const { showSplash, isFading } = useMobileSplash({
    breakpoint: "(max-width: 767.98px)",
    progressMs: 2500,
    fadeMs: 350,
  });

  const questionsApiRef = useRef<{ reset: () => void } | null>(null);

  const language = i18n.language?.toLowerCase().startsWith("id") ? "id" : "en";
  const params = useMemo(() => ({ page: 1, limit: 10, language }), [language]);

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
          onComplete={(allAnswers, api) => {
            setAnswers(allAnswers);
            questionsApiRef.current = api;
          }}
        />
      )}

      {step === 3 && (
        <div className="mt-8">
          <QuestionDoneContainer
            onRestart={() => {
              setAnswers({});
              questionsApiRef.current?.reset?.();
              setStep(2);
            }}
            answers={answers}
          />
        </div>
      )}
    </div>
  );
};

export default OnboardingPage;
