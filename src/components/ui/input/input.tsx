import * as React from "react";
import {
  TextInput as MantineTextInput,
  type TextInputProps as MantineTextInputProps,
} from "@mantine/core";
import type { FieldError } from "react-hook-form";

export type InputProps = Omit<MantineTextInputProps, "error"> & {
  error?: FieldError | string;
  containerClassName?: string;
  labelClassName?: string;
};

/**
 * TextInput wrapper that integrates react-hook-form FieldError with Mantine.
 * Accepts either a raw string or a FieldError object for `error`.
 * Base styles (label weight, error margin, width) come from theme.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { error, containerClassName, labelClassName, label, required, ...props },
  ref
) {
  const errorMsg = typeof error === "string" ? error : error?.message;

  return (
    <MantineTextInput
      ref={ref}
      label={label}
      required={required}
      error={errorMsg}
      withAsterisk={required}
      classNames={{ root: containerClassName, label: labelClassName }}
      {...props}
    />
  );
});

export { Input };
