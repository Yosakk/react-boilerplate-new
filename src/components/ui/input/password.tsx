import * as React from "react";
import {
  PasswordInput as MantinePasswordInput,
  type PasswordInputProps as MantinePasswordInputProps,
} from "@mantine/core";
import type { FieldError } from "react-hook-form";

export type PasswordInputProps = Omit<MantinePasswordInputProps, "error"> & {
  error?: FieldError | string;
  containerClassName?: string;
  labelClassName?: string;
};

/**
 * PasswordInput wrapper that integrates react-hook-form FieldError with Mantine.
 * Toggle visibility is built-in via Mantine.
 * Base styles (label weight, error margin, width) come from theme.
 */
export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(function PasswordInput(
  { error, containerClassName, labelClassName, label, required, ...props },
  ref
) {
  const errorMsg = typeof error === "string" ? error : error?.message;

  return (
    <MantinePasswordInput
      ref={ref}
      label={label}
      required={required}
      error={errorMsg}
      withAsterisk={required}
      autoComplete="current-password"
      spellCheck={false}
      classNames={{ root: containerClassName, label: labelClassName }}
      {...props}
    />
  );
});
