import { useLocalStorage as useMantineLocalStorage } from "@mantine/hooks";

/**
 * Typed wrapper around Mantine's useLocalStorage.
 * Handles JSON serialization/deserialization automatically.
 *
 * @example
 * const [theme, setTheme] = useLocalStorage("app-theme", "light");
 */
export function useLocalStorage<T>(key: string, defaultValue: T) {
  return useMantineLocalStorage<T>({
    key,
    defaultValue,
    serialize: JSON.stringify,
    deserialize: (val) => {
      try {
        return val ? (JSON.parse(val) as T) : defaultValue;
      } catch {
        return defaultValue;
      }
    },
  });
}
