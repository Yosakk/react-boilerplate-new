import { useEffect, useState } from "react";

type UseMobileSplashOptions = {
  breakpoint?: string;
  progressMs?: number;
  fadeMs?: number;
  enabled?: boolean;
};

export function useMobileSplash(options: UseMobileSplashOptions = {}) {
  const {
    breakpoint = "(max-width: 767.98px)",
    progressMs = 2500,
    fadeMs = 350,
    enabled,
  } = options;

  const [showSplash, setShowSplash] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = enabled ?? window.matchMedia(breakpoint).matches;
    if (!isMobile) return;

    setShowSplash(true);

    const t1 = window.setTimeout(() => setIsFading(true), progressMs);
    const t2 = window.setTimeout(() => setShowSplash(false), progressMs + fadeMs);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [breakpoint, progressMs, fadeMs, enabled]);

  return { showSplash, isFading };
}
