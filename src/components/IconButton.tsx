import * as React from "react";
import { cn } from "@/_helper/twMerge";

type IconButtonProps = {
  label: React.ReactNode;
  onClick?: () => void | Promise<void>;
  variant?: "outline" | "filled";
  size?: "sm" | "md";
  rounded?: "lg" | "full";
  widthClassName?: string;
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

export default function IconButton({
  label,
  onClick,
  variant = "outline",
  size = "md",
  rounded = "lg",
  widthClassName,
  icon,
  className,
  disabled,
}: IconButtonProps) {
  const shape = rounded === "full" ? "rounded-full" : "rounded-lg";

  const sizing = size === "sm" ? "py-2 md:py-2" : "py-2.5 md:py-3";
  const width = widthClassName ?? "w-full md:w-auto";

  const variantCls =
    variant === "filled"
      ? "bg-[#EFEFEF] hover:bg-[#c9c9c9] border-[#FFFFFFC2]"
      : "bg-transparent border-gray-300 hover:border-gray-700";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={typeof label === "string" ? label : "Continue with Google"}
      className={cn(
        "flex justify-center items-center gap-2 px-4 border-2 transition-colors duration-200 select-none cursor-pointer",
        "text-sm md:text-md font-poppins font-medium text-center",
        "min-h-[44px] md:min-h-0",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3AC4A0] focus-visible:ring-offset-2",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        shape,
        sizing,
        width,
        variantCls,
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="truncate">{label}</span>
    </button>
  );
}
