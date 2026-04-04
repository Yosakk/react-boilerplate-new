import * as React from "react";
import {
  PasswordInput as MantinePasswordInput,
  type PasswordInputProps as MantinePasswordInputProps,
  rem,
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
 */
export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    { error, containerClassName, labelClassName, label, required, ...props },
    ref
  ) {
    const errorMsg = typeof error === "string" ? error : (error as FieldError | undefined)?.message;

    return (
      <MantinePasswordInput
        ref={ref}
        label={label}
        required={required}
        error={errorMsg}
        withAsterisk={required}
        autoComplete="current-password"
        spellCheck={false}
        styles={{
          root: { width: "100%" },
          label: {
            fontWeight: 500,
            fontSize: rem(13),
            marginBottom: rem(4),
          },
          error: { marginTop: rem(4) },
          wrapper: { width: "100%" },
        }}
        classNames={{
          root: containerClassName,
          label: labelClassName,
        }}
        {...props}
      />
    );
  }
);
