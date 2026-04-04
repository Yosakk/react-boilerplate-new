import * as React from "react";
import {
  Select as MantineSelect,
  type SelectProps as MantineSelectProps,
  rem,
} from "@mantine/core";
import type { FieldError } from "react-hook-form";

export type SelectProps = Omit<MantineSelectProps, "error"> & {
  error?: FieldError | string;
};

/**
 * Select built on Mantine with react-hook-form FieldError support.
 */
const Select = React.forwardRef<HTMLInputElement, SelectProps>(
  function Select({ error, label, required, ...props }, ref) {
    const errorMsg =
      typeof error === "string"
        ? error
        : (error as FieldError | undefined)?.message;

    return (
      <MantineSelect
        ref={ref}
        label={label}
        required={required}
        error={errorMsg}
        withAsterisk={required}
        styles={{
          label: { fontWeight: 500, fontSize: rem(13), marginBottom: rem(4) },
          error: { marginTop: rem(4) },
        }}
        {...props}
      />
    );
  }
);

Select.displayName = "Select";

export { Select };
