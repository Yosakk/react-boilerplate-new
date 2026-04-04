// Re-export all custom hooks for easy importing

export { default as useWindowInnerWidth } from "./useWindowInnerWidth";
export { useMediaQuery, useIsMobile, breakpoints } from "./useMediaQuery";
export { useLocalStorage } from "./useLocalStorage";
export { useNotification } from "./useNotification";
export { useFormField } from "./useFormField";

// Re-export frequently used Mantine hooks so consumers have one import point
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
} from "@mantine/hooks";
