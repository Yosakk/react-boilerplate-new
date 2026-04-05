import * as React from "react";
import {
  Textarea as MantineTextarea,
  type TextareaProps as MantineTextareaProps,
} from "@mantine/core";
import type { FieldError } from "react-hook-form";

export type TextareaProps = Omit<MantineTextareaProps, "error"> & {
  error?: FieldError | string;
  containerClassName?: string;
  labelClassName?: string;
};

/**
 * Textarea wrapper that integrates react-hook-form FieldError with Mantine.
 * Base styles (label weight, error margin, width) come from theme.
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { error, containerClassName, labelClassName, label, required, ...props },
    ref
  ) {
    const errorMsg = typeof error === "string" ? error : error?.message;

    return (
      <MantineTextarea
        ref={ref}
        label={label}
        required={required}
        error={errorMsg}
        withAsterisk={required}
        classNames={{ root: containerClassName, label: labelClassName }}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
export default Textarea;
