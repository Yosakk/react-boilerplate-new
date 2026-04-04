import * as React from "react";
import {
  Checkbox as MantineCheckbox,
  type CheckboxProps as MantineCheckboxProps,
} from "@mantine/core";
import type { FieldError } from "react-hook-form";

export type CheckboxProps = Omit<MantineCheckboxProps, "error"> & {
  error?: FieldError | string;
};

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ error, ...props }, ref) {
    const errorMsg =
      typeof error === "string"
        ? error
        : (error as FieldError | undefined)?.message;

    return <MantineCheckbox ref={ref} error={errorMsg} {...props} />;
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
export default Checkbox;
