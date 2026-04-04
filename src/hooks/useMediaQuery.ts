import { useMediaQuery as useMantineMediaQuery } from "@mantine/hooks";

/** Tailwind-aligned breakpoints (em-based) */
export const breakpoints = {
  xs: "36em", // 576px
  sm: "48em", // 768px
  md: "62em", // 992px
  lg: "75em", // 1200px
  xl: "88em", // 1408px
} as const;

type Breakpoint = keyof typeof breakpoints;

/**
 * Returns true when viewport is at or above the given breakpoint.
 * Uses Mantine's SSR-safe useMediaQuery under the hood.
 *
 * @example
 * const isMd = useMediaQuery("md"); // true if >= 992px
 */
export function useMediaQuery(bp: Breakpoint): boolean {
  const matches = useMantineMediaQuery(`(min-width: ${breakpoints[bp]})`, true, {
    getInitialValueInEffect: false,
  });
  return matches ?? false;
}

/**
 * Returns true when viewport is below the given breakpoint (mobile-first).
 */
export function useIsMobile(bp: Breakpoint = "sm"): boolean {
  const isAbove = useMediaQuery(bp);
  return !isAbove;
}
