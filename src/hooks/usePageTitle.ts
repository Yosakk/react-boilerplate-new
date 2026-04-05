import { useEffect } from "react";

const APP_NAME = "Seeds";

/**
 * Sets document.title on mount and restores on unmount.
 *
 * @example
 * usePageTitle("Dashboard");       // → "Dashboard | Seeds"
 * usePageTitle("Login", false);    // → "Login" (no suffix)
 */
export function usePageTitle(title: string, withAppName = true) {
  useEffect(() => {
    const prev = document.title;
    document.title = withAppName ? `${title} | ${APP_NAME}` : title;
    return () => {
      document.title = prev;
    };
  }, [title, withAppName]);
}
