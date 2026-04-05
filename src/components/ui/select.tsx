import * as React from "react";
import {
  Select as MantineSelect,
  type SelectProps as MantineSelectProps,
} from "@mantine/core";
import type { FieldError } from "react-hook-form";

export type SelectProps = Omit<MantineSelectProps, "error"> & {
  error?: FieldError | string;
};

/**
 * Select built on Mantine with react-hook-form FieldError support.
 * Base styles (label weight, error margin) come from theme.
 */
const Select = React.forwardRef<HTMLInputElement, SelectProps>(function Select(
  { error, label, required, ...props },
  ref
) {
  const errorMsg = typeof error === "string" ? error : error?.message;

  return (
    <MantineSelect
      ref={ref}
      label={label}
      required={required}
      error={errorMsg}
      withAsterisk={required}
      {...props}
    />
  );
});

Select.displayName = "Select";

export { Select };
