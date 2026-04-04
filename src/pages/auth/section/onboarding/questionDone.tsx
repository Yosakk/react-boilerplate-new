import { type JSX } from "react";
import { Polygon, SeedyQuestionDone } from "@/assets/onboarding";
import TypingBubble from "./typingBubble";
import { cn } from "@/_helper/twMerge";

type MessageSpan = {
  text: string;
  isBold?: boolean;
  newLine?: boolean;
};

type Props = {
  className?: string;
  message1: MessageSpan[];
  message2: MessageSpan[];
  onPrimary: () => void;
  onSecondary: () => void;
  primaryLabel: string;
  secondaryLabel: string;
};

export default function QuestionDoneView({
  className,
  message1,
  message2,
  onPrimary,
  onSecondary,
  primaryLabel,
  secondaryLabel,
}: Props): JSX.Element {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <img
        src={SeedyQuestionDone}
        alt="Seedy Question Done"
        className="w-[200px] h-auto fade-in-onboard"
        loading="lazy"
      />

      <div className="w-[75%] md:w-[60%] md:max-w-[374px] relative rounded-lg bg-[#7EFFA8]">
        <div className="font-poppins text-neutral-medium font-medium text-sm md:text-md p-4">
          <TypingBubble message={message1} />
        </div>
        <img
          src={Polygon}
          alt="bubble-pointer"
          className="w-[20px] absolute top-2 bottom-0 left-[-16px]"
          loading="lazy"
        />
      </div>

      <div className="w-[75%] md:w-[60%] md:max-w-[374px] relative rounded-lg bg-[#7EFFA8]">
        <div className="font-poppins text-neutral-medium font-medium text-sm md:text-md p-4">
          <TypingBubble message={message2} />
        </div>
        <img
          src={Polygon}
          alt="bubble-pointer"
          className="w-[20px] absolute top-2 bottom-0 left-[-16px]"
          loading="lazy"
        />
      </div>

      <div className="w-full flex flex-col items-center gap-4 ">
        <button
          type="button"
          onClick={onPrimary}
          className="font-semibold font-poppins text-base text-white bg-gradient-to-b from-[#3AC4A0] to-[#177C62] border-2 border-[#88FFA69E] rounded-xl normal-case w-full md:w-[60%] md:max-w-[400px] py-3"
        >
          {primaryLabel}
        </button>

        <button
          type="button"
          onClick={onSecondary}
          className="font-semibold font-poppins text-base bg-gradient-to-b from-[#3AC4A0] to-[#177C62] border-2 border-[#3AC4A0] bg-clip-text text-transparent rounded-xl normal-case w-full md:w-[60%] md:max-w-[400px] py-3"
        >
          {secondaryLabel}
        </button>
      </div>
    </div>
  );
}
