import * as React from "react";
import {
  Textarea as MantineTextarea,
  type TextareaProps as MantineTextareaProps,
  rem,
} from "@mantine/core";
import type { FieldError } from "react-hook-form";

export type TextareaProps = Omit<MantineTextareaProps, "error"> & {
  error?: FieldError | string;
  containerClassName?: string;
  labelClassName?: string;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { error, containerClassName, labelClassName, label, required, ...props },
  ref
) {
  const errorMsg = typeof error === "string" ? error : (error as FieldError | undefined)?.message;

  return (
    <MantineTextarea
      ref={ref}
      label={label}
      required={required}
      error={errorMsg}
      withAsterisk={required}
      styles={{
        root: { width: "100%" },
        label: { fontWeight: 500, fontSize: rem(13), marginBottom: rem(4) },
        error: { marginTop: rem(4) },
      }}
      classNames={{ root: containerClassName, label: labelClassName }}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
export default Textarea;
