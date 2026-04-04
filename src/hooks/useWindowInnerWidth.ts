import { useViewportSize } from "@mantine/hooks";

/**
 * Returns current window inner width.
 * Uses Mantine's `useViewportSize` which handles SSR-safe initialization
 * and cleans up the event listener automatically.
 */
const useWindowInnerWidth = (): number => {
  const { width } = useViewportSize();
  return width;
};

export default useWindowInnerWidth;
