import { useCallback } from "react";
import type { UseFormReturn, Path, FieldValues } from "react-hook-form";

/**
 * Returns a stable helper to get per-field props for Mantine inputs
 * wired to a react-hook-form instance.
 *
 * @example
 * const { getFieldProps } = useFormField(methods);
 * <Input {...getFieldProps("email")} label="Email" />
 */
export function useFormField<T extends FieldValues>(methods: UseFormReturn<T>) {
  const {
    register,
    formState: { errors },
    watch,
  } = methods;

  const getFieldProps = useCallback(
    (name: Path<T>) => {
      const { ref, ...rest } = register(name);
      const error = errors[name] as { message?: string } | undefined;

      return {
        ...rest,
        ref,
        error: error?.message,
        value: watch(name) ?? "",
      };
    },
    [register, errors, watch]
  );

  const getError = useCallback(
    (name: Path<T>): string | undefined => {
      const error = errors[name] as { message?: string } | undefined;
      return error?.message;
    },
    [errors]
  );

  return { getFieldProps, getError };
}
