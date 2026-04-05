import { useEffect, useRef, useState } from "react";

type Options = {
  showQuestion?: boolean;
  autoDelayMs?: number;
};

export function useQuestionPreparation({
  showQuestion,
  autoDelayMs = 1500,
}: Options) {
  const [localShow, setLocalShow] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (showQuestion === undefined) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setLocalShow(false);
      timerRef.current = window.setTimeout(
        () => setLocalShow(true),
        autoDelayMs
      );

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      };
    }

    setLocalShow(!!showQuestion);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [showQuestion, autoDelayMs]);

  const isShown = showQuestion ?? localShow;

  const cancelAuto = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const restartAuto = () => {
    cancelAuto();
    setLocalShow(false);
    timerRef.current = window.setTimeout(() => setLocalShow(true), autoDelayMs);
  };

  return { isShown, setLocalShow, cancelAuto, restartAuto };
}
