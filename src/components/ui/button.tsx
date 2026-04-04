import * as React from "react";
import {
  Button as MantineButton,
  type ButtonProps as MantineButtonProps,
} from "@mantine/core";
import { cn } from "@/_helper/twMerge";

export type ButtonVariant =
  | "filled"
  | "outline"
  | "subtle"
  | "light"
  | "white"
  | "default"
  | "gradient"
  | "transparent";

export type ButtonProps = MantineButtonProps & {
  /** @deprecated use Mantine `variant` instead */
  asChild?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children?: React.ReactNode;
  form?: string;
};

/**
 * Button component built on Mantine.
 * Variants: filled | outline | subtle | light | white | default | gradient | transparent
 * Sizes: xs | sm | md | lg | xl
 * Radius is preset to "xl" via Mantine theme.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, children, variant = "filled", size = "sm", ...props },
    ref
  ) {
    return (
      <MantineButton
        ref={ref}
        variant={variant}
        size={size}
        className={cn(className)}
        {...props}
      >
        {children}
      </MantineButton>
    );
  }
);

Button.displayName = "Button";

export { Button };
