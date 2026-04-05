import type {
  AnswerOption,
  OnboardingI,
} from "@/_interfaces/onboarding.interfaces";
import Polygon from "@/assets/onboarding/polygon.png";

import TypingBubble from "./typingBubble";
import { useTranslation } from "react-i18next";
import { BlueWarning } from "@/assets/auth";
import { SeedyLens } from "@/assets/onboarding";
import type { MessageSpan } from "../../hooks/onboarding/useTypingBubble";

type Props = {
  question?: OnboardingI;
  totalQuestions: number;
  currentQuestionIndex: number;
  selectedForThisQuestion: AnswerOption[];
  options: AnswerOption[];
  typingMessage: MessageSpan[];
  questionText: string;
  submitting: boolean;
  helpNoteText: string;
  isMultiSelect: boolean;
  canGoNext: boolean;
  isLast: boolean;
  onToggleOption: (opt: AnswerOption) => void;
  onNext: () => void;
  onPrev: () => void;
  onFinish: () => void;
};

export default function OnboardingQuestionsView({
  question,
  totalQuestions,
  currentQuestionIndex,
  selectedForThisQuestion,
  options,
  typingMessage,
  submitting,
  questionText,
  helpNoteText,
  isMultiSelect,
  canGoNext,
  isLast,
  onToggleOption,
  onNext,
  onPrev,
  onFinish,
}: Props) {
  const { t } = useTranslation();
  const qNum = question?.question_number ?? currentQuestionIndex + 1;

  const bubbleMessage = isMultiSelect
    ? [{ text: questionText }]
    : typingMessage.length
      ? typingMessage
      : [{ text: questionText }];

  const typingKey = isMultiSelect
    ? String(qNum)
    : `${qNum}-${JSON.stringify(selectedForThisQuestion)}`;

  return (
    <div className="overflow-y-auto px-3 md:px-0">
      <div className="flex gap-2 justify-center items-center">
        {totalQuestions > 0 && (
          <div
            className="w-full h-1.5 md:h-2 bg-[#E9E9E9]/30 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={totalQuestions}
            aria-valuenow={currentQuestionIndex + 1}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#3AC4A0] to-[#177C62] transition-[width] duration-500 ease-out relative"
              style={{
                width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
              }}
            >
              <span className="absolute inset-0 rounded-full pointer-events-none progress-stripes" />
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 justify-center items-center mt-2">
        <img
          src={SeedyLens}
          alt="SeedyLens"
          className="w-[80px] md:w-[150px] shrink-0"
        />
        <div>
          <div className="w-fit h-fit relative bg-[#7EFFA8] rounded-md">
            <div className="w-full md:w-[350px] font-poppins text-neutral-medium font-medium text-sm md:text-md p-4">
              <TypingBubble key={typingKey} message={bubbleMessage} />
            </div>
            <img
              src={Polygon}
              alt="bubble-arrow"
              className="w-[20px] absolute top-0 bottom-0 m-auto left-[-16px]"
            />
          </div>

          <div className="hidden md:flex justify-start items-center gap-2 mt-2">
            <img src={BlueWarning} alt="info" className="w-[20px]" />
            <p className="font-poppins text-sm text-[#2B4CCD]">
              {helpNoteText}
            </p>
          </div>
        </div>
      </div>

      {/* mobile-only info row size tweaks */}
      <div className="flex md:hidden justify-start items-center gap-2 mt-2">
        <img src={BlueWarning} alt="info" className="w-[18px]" />
        <p className="font-poppins text-xs text-[#2B4CCD]">{helpNoteText}</p>
      </div>

      <div
        className={[
          "grid gap-3 md:gap-4 mt-4",
          // mobile-only: q3 & q4 jadi 1 kolom; desktop tetap seperti semula
          qNum === 1 && "grid-cols-2 lg:grid-cols-3",
          qNum === 2 && "grid-cols-2 lg:grid-cols-3",
          qNum === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-2",
          qNum === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:px-[10%]",
          qNum === 5 && "grid-cols-3 xl:px-[10%] 2xl:px-[20%]",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {options.map((opt) => {
          const selected = selectedForThisQuestion.some(
            (a) => a.header === opt.header
          );
          return (
            <div
              key={opt.header}
              className={[
                "p-[3px] rounded-lg",
                selected
                  ? "bg-gradient-to-b from-[#3AC4A0] to-[#177C62]"
                  : "bg-[#E7E7E7A6] hover:bg-gradient-to-b hover:from-[#3AC4A0] hover:to-[#177C62] duration-500",
                qNum === 5 && "aspect-square",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <button
                onClick={() => onToggleOption(opt)}
                className={[
                  "flex flex-col gap-0 p-3 md:p-4 cursor-pointer rounded-md text-left bg-[#F9F9F9] hover:bg-white duration-200 w-full h-full",
                  qNum === 3
                    ? "justify-start items-start"
                    : "justify-center items-center",
                ].join(" ")}
              >
                {!!opt.image && (
                  <img
                    src={opt.image}
                    alt="option"
                    className="w-[48px] md:w-[70px] h-auto"
                  />
                )}

                {qNum !== 5 ? (
                  <p
                    className={[
                      "font-medium bg-gradient-to-b from-[#3AC4A0] to-[#177C62] bg-clip-text text-transparent",
                      qNum === 3 ? "text-left" : "text-center mt-1",
                      "text-sm md:text-base",
                    ].join(" ")}
                  >
                    {opt.header}
                  </p>
                ) : opt.header === "Friends/ Family" ||
                  opt.header === "Teman/ Keluarga" ? (
                  <p className="text-xs md:text-sm text-center font-medium bg-gradient-to-b from-[#3AC4A0] to-[#177C62] bg-clip-text text-transparent">
                    {opt.header}
                  </p>
                ) : null}

                {!!opt.body && (
                  <p
                    className={[
                      "text-neutral-medium font-normal",
                      qNum === 3 ? "text-left" : "text-center mt-1",
                      "text-xs md:text-sm",
                    ].join(" ")}
                  >
                    {opt.body}
                  </p>
                )}
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center mt-6">
        <p
          onClick={onPrev}
          className="font-poppins font-semibold bg-gradient-to-b text-center from-[#3AC4A0] to-[#177C62] bg-clip-text text-transparent cursor-pointer hidden md:flex"
        >
          {t("onboarding.question.text3")}
        </p>

        <div className="w-full md:w-fit p-[2px] rounded-xl bg-gradient-to-b from-[#5EFF95] to-[#70FFA0]">
          {!isLast ? (
            <button
              type="button"
              onClick={onNext}
              disabled={!canGoNext}
              className={[
                "font-poppins text-sm w-full p-2 rounded-xl capitalize text-white",
                "bg-gradient-to-b from-[#3AC4A0] to-[#177C62]",
                "disabled:opacity-60 disabled:cursor-not-allowed",
                "transition-all duration-200 hover:shadow-lg active:scale-[0.98] cursor-pointer",
              ].join(" ")}
            >
              {t("onboarding.question.text4")}
            </button>
          ) : (
            <button
              type="button"
              onClick={onFinish}
              disabled={!canGoNext || submitting}
              aria-busy={submitting}
              className={[
                "font-poppins text-sm w-full p-2 rounded-xl capitalize text-white",
                "bg-gradient-to-b from-[#3AC4A0] to-[#177C62]",
                "disabled:opacity-60 disabled:cursor-not-allowed",
                "transition-all duration-200 hover:shadow-lg active:scale-[0.98]",
                submitting ? "cursor-wait" : "cursor-pointer",
              ].join(" ")}
            >
              {submitting ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <span>Submitting…</span>
                </span>
              ) : (
                t("onboarding.question.text4")
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
