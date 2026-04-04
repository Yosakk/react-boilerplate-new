import type { FieldError } from "react-hook-form";
import { Text, rem } from "@mantine/core";

export interface ValidationErrorProps {
  error?: FieldError | { message?: string };
  id?: string;
}

const ValidationError = ({ error, id }: ValidationErrorProps) => {
  if (!error?.message) return null;
  return (
    <Text
      id={id}
      component="p"
      role="alert"
      aria-live="polite"
      size="xs"
      c="red.6"
      mt={rem(4)}
      style={{ lineHeight: 1.4 }}
    >
      {error.message}
    </Text>
  );
};

export default ValidationError;
