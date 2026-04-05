import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { notifications } from "@mantine/notifications";

interface ErrorData {
  message?: string;
  errors?: Record<string, string[]>;
  code?: string | number;
}

/**
 * Centralized API error handler.
 * Extracts the most meaningful message from RTK Query / Axios errors
 * and shows a Mantine notification.
 */
export const errorHandler = (error: unknown): void => {
  if (process.env.NODE_ENV !== "production") {
    console.error("[errorHandler]", error);
  }

  let message = "Something went wrong. Please try again.";
  let title = "Error";

  if (error && typeof error === "object") {
    const err = error as FetchBaseQueryError & {
      data?: ErrorData;
      status?: number | string;
    };
    const data = err.data as ErrorData | undefined;

    // HTTP 401 → session expired
    if (err.status === 401) {
      title = "Session Expired";
      message = "Please log in again.";
    } else if (err.status === 403) {
      title = "Forbidden";
      message = "You don't have permission to perform this action.";
    } else if (err.status === 404) {
      title = "Not Found";
      message = data?.message ?? "The requested resource was not found.";
    } else if (err.status === 422 || err.status === 400) {
      title = "Validation Error";
      // Flatten field-level errors if present
      if (data?.errors) {
        const msgs = Object.values(data.errors).flat();
        message = msgs[0] ?? data.message ?? message;
      } else {
        message = data?.message ?? message;
      }
    } else if (data?.message) {
      message = data.message;
    } else if (err.status === "FETCH_ERROR") {
      title = "Network Error";
      message = "Cannot connect to the server. Check your internet connection.";
    } else if (err.status === "PARSING_ERROR") {
      title = "Response Error";
      message = "Received an unexpected response from the server.";
    }
  }

  notifications.show({
    title,
    message,
    color: "red",
    autoClose: 5000,
  });
};
