import { type ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
  lineClassName?: string;
  textClassName?: string;
  width?: string;
};

export default function Divider({
  children,
  className = "",
  lineClassName = "",
  textClassName = "",
  width,
}: Props) {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={`flex items-center gap-2 md:gap-3 ${className} ${width ?? "w-full"}`}
    >
      <div aria-hidden className={`h-px md:h-[1px] grow ${lineClassName}`} />
      <span
        className={`shrink-0 uppercase tracking-[0.08em] md:tracking-[0.1em] text-[10px] md:text-sm font-medium text-neutral-400 ${textClassName}`}
      >
        {children}
      </span>
      <div aria-hidden className={`h-px md:h-[1px] grow ${lineClassName}`} />
    </div>
  );
}
