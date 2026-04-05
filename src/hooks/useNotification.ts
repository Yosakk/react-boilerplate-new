import { notifications } from "@mantine/notifications";
import { useCallback } from "react";

type NotifyOptions = {
  title?: string;
  message: string;
  autoClose?: number;
};

/**
 * Convenience hook for showing Mantine notifications.
 * Replaces react-toastify calls throughout the app.
 *
 * @example
 * const notify = useNotification();
 * notify.success({ message: "Saved!" });
 * notify.error({ title: "Error", message: "Something went wrong" });
 */
export function useNotification() {
  const success = useCallback(
    ({ title = "Success", message, autoClose = 4000 }: NotifyOptions) => {
      notifications.show({
        title,
        message,
        color: "green",
        autoClose,
      });
    },
    []
  );

  const error = useCallback(
    ({ title = "Error", message, autoClose = 5000 }: NotifyOptions) => {
      notifications.show({
        title,
        message,
        color: "red",
        autoClose,
      });
    },
    []
  );

  const info = useCallback(
    ({ title = "Info", message, autoClose = 4000 }: NotifyOptions) => {
      notifications.show({
        title,
        message,
        color: "blue",
        autoClose,
      });
    },
    []
  );

  const warning = useCallback(
    ({ title = "Warning", message, autoClose = 4000 }: NotifyOptions) => {
      notifications.show({
        title,
        message,
        color: "yellow",
        autoClose,
      });
    },
    []
  );

  return { success, error, info, warning };
}
