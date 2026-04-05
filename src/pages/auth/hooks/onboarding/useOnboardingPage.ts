import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { AnswerOption } from "@/_interfaces/onboarding.interfaces";
import { useMobileSplash } from "./useMobileSplash";

type AnswersMap = Record<number, AnswerOption[]>;

export function useOnboardingPage() {
  const { i18n } = useTranslation();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AnswersMap>({});

  const { showSplash, isFading } = useMobileSplash({
    breakpoint: "(max-width: 767.98px)",
    progressMs: 2500,
    fadeMs: 350,
  });

  const questionsApiRef = useRef<{
    reset: () => void;
  } | null>(null);

  const language = i18n.language?.toLowerCase().startsWith("id") ? "id" : "en";

  const params = useMemo(() => ({ page: 1, limit: 10, language }), [language]);

  const handleComplete = useCallback(
    (allAnswers: AnswersMap, api: { reset: () => void }) => {
      setAnswers(allAnswers);
      questionsApiRef.current = api;
    },
    []
  );

  const handleRestart = useCallback(() => {
    setAnswers({});
    questionsApiRef.current?.reset?.();
    setStep(2);
  }, []);

  return {
    step,
    setStep,
    answers,
    showSplash,
    isFading,
    params,
    handleComplete,
    handleRestart,
  };
}
