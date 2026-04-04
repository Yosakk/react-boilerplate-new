import { type JSX, useCallback } from "react";
import { useTypingBubble, type MessageSpan } from "../../hooks/onboarding/useTypingBubble";

interface Props {
  message: MessageSpan[];
}

export default function TypingBubble({ message }: Props): JSX.Element {
  const { displayedText, finalSpans, currentSpan, currentIsNewLine, currentIsBold, skip } =
    useTypingBubble(message, 30, {
      granularity: "char",
      allowSkip: true,
      respectReducedMotion: true,
    });

  const onClick = useCallback(() => {
    skip?.();
  }, [skip]);

  return (
    <div className="flex items-start w-full">
      <div className="relative w-full">
        <div
          className="text-sm font-poppins text-black leading-relaxed min-h-[1.5rem] cursor-text"
          aria-live="polite"
          onClick={onClick}
          title={skip ? "Click to reveal" : undefined}
        >
          {finalSpans.map((span, i) =>
            span.newLine ? (
              <br key={`final-br-${i}`} />
            ) : (
              <span
                key={`final-span-${i}`}
                className={span.isBold ? "font-semibold" : "font-normal"}
              >
                {span.text}
              </span>
            )
          )}

          {currentSpan &&
            (currentIsNewLine ? (
              <br />
            ) : (
              <span className={currentIsBold ? "font-semibold" : "font-normal"}>
                {displayedText}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
