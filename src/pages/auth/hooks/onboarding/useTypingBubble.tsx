// hooks/onboarding/useTypingBubble.ts
import { useEffect, useMemo, useRef, useState } from "react";

export interface MessageSpan {
  text: string;
  isBold?: boolean;
  newLine?: boolean;
}

type Granularity = "char" | "word";

type Options = {
  speed?: number;
  typeOnceKey?: string | number;
  granularity?: Granularity;
  allowSkip?: boolean;
  respectReducedMotion?: boolean;
};

export function useTypingBubble(message: MessageSpan[], speed = 40, opts: Options = {}) {
  const {
    typeOnceKey,
    granularity = "word",
    allowSkip = true,
    respectReducedMotion = true,
  } = opts;

  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [finalSpans, setFinalSpans] = useState<MessageSpan[]>([]);
  const [done, setDone] = useState(false);

  const timerRef = useRef<number | null>(null);
  const typedKeysRef = useRef<Set<string | number>>(new Set());

  const prefersReduced = useMemo(() => {
    if (!respectReducedMotion || typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, [respectReducedMotion]);

  const tokenize = (s: string) =>
    granularity === "word" ? s.split(/(\s+)/) : s.split("");

  const completeAll = () => {
    const all: MessageSpan[] = [];
    for (const span of message) {
      if (span.newLine || !span.text) {
        all.push(span);
      } else {
        all.push({ ...span, text: span.text });
      }
    }
    setFinalSpans(all);
    setDisplayedText("");
    setMessageIndex(message.length);
    setCharIndex(0);
    setDone(true);
  };

  useEffect(() => {
    if (typeOnceKey != null && typedKeysRef.current.has(typeOnceKey)) {
      completeAll();
      return;
    }

    if (prefersReduced) {
      completeAll();
      return;
    }

    setDisplayedText("");
    setCharIndex(0);
    setMessageIndex(0);
    setFinalSpans([]);
    setDone(false);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [message, typeOnceKey, prefersReduced]);

  useEffect(() => {
    if (done) return;
    if (messageIndex >= message.length) {
      if (typeOnceKey != null) typedKeysRef.current.add(typeOnceKey);
      setDone(true);
      return;
    }

    const currentSpan = message[messageIndex];
    const fullText = currentSpan?.text ?? "";

    if (currentSpan?.newLine || fullText.length === 0) {
      setFinalSpans((prev) => [...prev, currentSpan]);
      setDisplayedText("");
      setCharIndex(0);
      setMessageIndex((prev) => prev + 1);
      return;
    }

    const tokens = tokenize(fullText);
    timerRef.current = window.setTimeout(() => {
      if (charIndex < tokens.length) {
        setDisplayedText((prev) => prev + tokens[charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setFinalSpans((prev) => [...prev, { ...currentSpan, text: fullText }]);
        setDisplayedText("");
        setCharIndex(0);
        setMessageIndex((prev) => prev + 1);
      }
    }, speed);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [charIndex, messageIndex, message, speed, granularity, done]);

  return {
    displayedText,
    finalSpans,
    currentSpan: messageIndex < message.length ? message[messageIndex] : null,
    currentIsNewLine: messageIndex < message.length ? !!message[messageIndex].newLine : false,
    currentIsBold: messageIndex < message.length ? !!message[messageIndex].isBold : false,
    skip: allowSkip ? () => completeAll() : undefined,
    done,
  };
}
