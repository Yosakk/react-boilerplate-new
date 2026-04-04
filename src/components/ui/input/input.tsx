import * as React from "react";
import {
  TextInput as MantineTextInput,
  type TextInputProps as MantineTextInputProps,
  rem,
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
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { error, containerClassName, labelClassName, label, required, style, ...props },
  ref
) {
  const errorMsg = typeof error === "string" ? error : (error as FieldError | undefined)?.message;

  return (
    <MantineTextInput
      ref={ref}
      label={label}
      required={required}
      error={errorMsg}
      withAsterisk={required}
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
      style={style}
      {...props}
    />
  );
});

export { Input };
