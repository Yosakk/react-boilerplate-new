import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm, useWatch } from "react-hook-form";
import { useOnboardingQuery, useSubmitOnboardingMutation } from "@/_services/onboarding";
import type {
  AnswerOption,
  OnboardingI,
  OnboardingReqI,
  OnboardingAnswerI,
  OnboardingAnswerReqI,
} from "@/_interfaces/onboarding.interfaces";
import type { MessageSpan } from "./useTypingBubble";
import { errorHandler } from "@/_services/errorHandler";

type Args = {
  params: OnboardingReqI;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  submitId?: string;
};

type AnswersMap = Record<number, AnswerOption[]>;
type FormValues = { answers: AnswersMap };

export function useOnboardingQuestionsForm({ params, setStep, submitId = "" }: Args) {
  const { t } = useTranslation();

  const { data, isLoading, isError } = useOnboardingQuery(params);
  const [submitOnboarding, submitState] = useSubmitOnboardingMutation();
  const methods = useForm<FormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { answers: {} },
  });

  const { setValue, getValues, setError, clearErrors, control } = methods;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions: OnboardingI[] = data?.data ?? [];
  const totalQuestions = questions.length;
  const question = questions[currentQuestionIndex];
  const qNum = question?.question_number ?? currentQuestionIndex + 1;

  const answers = useWatch({ control, name: "answers" }) as AnswersMap;
  const selectedForThisQuestion: AnswerOption[] = answers?.[qNum] ?? [];

  const options: AnswerOption[] = useMemo(
    () =>
      (question?.options ?? []).map((o) => ({
        header: o.header,
        body: o.body,
        image: o.image,
      })),
    [question]
  );

  const replacerNo1 = Array.isArray(answers?.[1]) ? (answers[1][0]?.header ?? "") : "";
  const questionText = (question?.question ?? "").replace(/\[no_1_answer\]/g, replacerNo1);

  const helpNoteText =
    currentQuestionIndex === 3 || currentQuestionIndex === 4
      ? t("onboarding.question.text1")
      : t("onboarding.question.text2");

  const isMultiSelect = qNum === 4 || qNum === 5;

  const answeredResponse = (): MessageSpan[] => {
    const answer1 = Array.isArray(answers?.[1]) ? (answers[1][0]?.header ?? "") : "";
    const answer2 = Array.isArray(answers?.[2]) ? (answers[2][0]?.header ?? "") : "";
    const answer3 = Array.isArray(answers?.[3]) ? (answers[3][0]?.header ?? "") : "";

    if (qNum === 1) {
      return [
        { text: t("onboarding.question.answers.text1") + " " },
        { text: answer1, isBold: true },
      ];
    }
    if (qNum === 2) {
      return [
        { text: t("onboarding.question.answers.text2.part1") + " " },
        { text: answer2, isBold: true },
        { text: t("onboarding.question.answers.text2.part2") + " " },
      ];
    }
    if (qNum === 3) {
      return [
        { text: t("onboarding.question.answers.text3.part1") + " " },
        { text: answer3, isBold: true },
        { text: t("onboarding.question.answers.text3.part2") + " " },
      ];
    }
    if (qNum === 4) return [{ text: t("onboarding.question.answers.text4") }];
    return [];
  };

  const typingMessage: MessageSpan[] =
    selectedForThisQuestion.length > 0 && qNum !== 5 ? answeredResponse() : [];

  const writeAnswersFor = (questionNumber: number, next: AnswerOption[]) => {
    const all = (getValues("answers") ?? {}) as AnswersMap;
    const newMap: AnswersMap = { ...all };
    if (next.length) newMap[questionNumber] = next;
    else delete newMap[questionNumber];

    setValue("answers", newMap, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
    clearErrors("answers");
  };

  const onToggleOption = (opt: AnswerOption) => {
    const prev = selectedForThisQuestion;
    const exists = prev.some((a) => a.header === opt.header);

    let next: AnswerOption[];
    if (isMultiSelect) {
      next = exists ? prev.filter((a) => a.header !== opt.header) : [...prev, opt];
    } else {
      next = exists ? [] : [opt];
    }

    writeAnswersFor(qNum, next);
  };

  const canGoNext = (selectedForThisQuestion?.length ?? 0) > 0;
  const isLast = currentQuestionIndex >= totalQuestions - 1;

  const onPrev = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex((i) => i - 1);
    else setStep(0);
  };

  const validateCurrent = () => {
    const curr = (getValues("answers")?.[qNum] ?? []) as AnswerOption[];
    if (!curr || curr.length === 0) {
      setError(`answers.${qNum}` as any, {
        type: "min",
        message: t("onboarding.validation.required") ?? "Please select at least one option",
      });
      return false;
    }
    clearErrors(`answers.${qNum}` as any);
    return true;
  };

  const buildSubmitPayload = (): OnboardingAnswerReqI => {
    const all = getValues("answers") as AnswersMap;

    const firstAnswerHeader = all?.[1]?.[0]?.header ?? "";
    const questionMap: Record<number, string> = Object.fromEntries(
      (questions ?? []).map((q) => [
        q.question_number,
        (q.question ?? "").replace(/\[no_1_answer\]/g, firstAnswerHeader),
      ])
    );

    const data: OnboardingAnswerI[] = Object.keys(all)
      .map(Number)
      .sort((a, b) => a - b)
      .map((num) => ({
        question: questionMap[num] ?? `Question ${num}`,
        answer: (all[num] ?? []).map((a) => ({
          header: a.header ?? "",
          body: a.body ?? "",
          image: a.image ?? "",
        })),
      }))
      .filter((item) => item.answer.length > 0);

    return { id: submitId, data };
  };

  const onNext = () => {
    if (!validateCurrent()) return;
    if (currentQuestionIndex < totalQuestions - 1) setCurrentQuestionIndex((i) => i + 1);
  };

  const onFinish = async () => {
    if (!validateCurrent()) return;

    try {
      const payload = buildSubmitPayload();
      if (!payload.data.length) throw new Error("No answers to submit.");
      await submitOnboarding(payload).unwrap();
      setStep(3);
    } catch (err) {
      errorHandler(err);
    }
  };

  const viewProps = {
    question,
    totalQuestions,
    currentQuestionIndex,
    selectedForThisQuestion,
    options,
    typingMessage,
    questionText,
    helpNoteText,
    isMultiSelect,
    canGoNext,
    isLast,
    submitting: submitState.isLoading,
  };

  const handlers = { onToggleOption, onNext, onPrev, onFinish };

  return {
    isLoading,
    isError,
    viewProps,
    handlers,
    methods,
    // kalau perlu, expose submit state:
    submitLoading: submitState.isLoading,
    submitError: submitState.error,
  };
}
