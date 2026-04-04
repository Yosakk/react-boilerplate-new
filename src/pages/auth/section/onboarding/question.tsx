import { FormProvider } from "react-hook-form";
import OnboardingQuestionsView from "./questionView";
import type { OnboardingReqI } from "@/_interfaces/onboarding.interfaces";
import type { AnswerOption } from "@/_interfaces/onboarding.interfaces";
import { useOnboardingQuestionsForm } from "../../hooks/onboarding/useOnboardingQuestions";

type AnswersMap = Record<number, AnswerOption[]>;

type Props = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  params: OnboardingReqI;
  onComplete?: (answers: AnswersMap, api: { reset: () => void }) => void;
};

export default function OnboardingQuestions({ setStep, params, onComplete }: Props) {
  const { viewProps, handlers, methods } =
    useOnboardingQuestionsForm({ params, setStep });

  const reset = () => {
    methods.reset({ answers: {} });
  };

  const finishAndLift = () => {
    const all = methods.getValues("answers") as AnswersMap;
    onComplete?.(all, { reset });
    handlers.onFinish();
  };

  return (
    <FormProvider {...methods}>
      <OnboardingQuestionsView
        {...viewProps}
        onToggleOption={handlers.onToggleOption}
        onNext={handlers.onNext}
        onPrev={handlers.onPrev}
        onFinish={finishAndLift}
      />
    </FormProvider>
  );
}
