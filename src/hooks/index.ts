// ── Custom hooks ──────────────────────────────────────────────────────
export { default as useWindowInnerWidth } from "./useWindowInnerWidth";
export { useMediaQuery, useIsMobile, breakpoints } from "./useMediaQuery";
export { useLocalStorage } from "./useLocalStorage";
export { useNotification } from "./useNotification";
export { useFormField } from "./useFormField";
export { useAuth } from "./useAuth";
export { usePageTitle } from "./usePageTitle";

// ── Re-export frequently used Mantine hooks (single import point) ─────
export {
  useDisclosure,
  useToggle,
  useDebouncedValue,
  useDebouncedCallback,
  usePrevious,
  useInterval,
  useTimeout,
  useClipboard,
  useOs,
  useColorScheme,
  useHotkeys,
  useScrollIntoView,
  useIntersection,
  useClickOutside,
  useFocusTrap,
  useMergedRef,
  useViewportSize,
} from "@mantine/hooks";
