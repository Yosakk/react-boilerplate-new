import React, { forwardRef, useEffect, useMemo, useRef } from "react";

type Props = {
  value: string;
  onChange: (val: string) => void;
  length?: number;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  boxClassName?: string;
  ariaLabel?: string;
};

const InputOTP = forwardRef<HTMLInputElement, Props>(function InputOTP(
  {
    value,
    onChange,
    length = 4,
    disabled = false,
    autoFocus = true,
    className = "",
    boxClassName = "",
    ariaLabel,
  },
  ref
) {
  const MAX = Math.max(1, length);
  const hiddenRef = useRef<HTMLInputElement>(null);

  React.useImperativeHandle(ref, () => hiddenRef.current as HTMLInputElement);

  useEffect(() => {
    if (!autoFocus || disabled) return;
    requestAnimationFrame(() => hiddenRef.current?.focus());
  }, [autoFocus, disabled]);

  const digits = useMemo(() => (value ?? "").slice(0, MAX), [value, MAX]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, "").slice(0, MAX);
    onChange(onlyDigits);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Backspace" ||
      e.key === "Delete" ||
      e.key === "Tab" ||
      e.key === "Enter" ||
      e.key.startsWith("Arrow")
    ) return;

    if (!e.ctrlKey && !e.metaKey && !e.altKey && e.key.length === 1 && !/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const txt = e.clipboardData.getData("text") ?? "";
    const only = txt.replace(/\D/g, "").slice(0, MAX);
    if (!only) return;
    e.preventDefault();
    onChange(only);
  };

  const focusHidden = () => hiddenRef.current?.focus();

  return (
    <div className={className} onClick={focusHidden} role="group" aria-live="polite">
      <input
        ref={hiddenRef}
        aria-label={ariaLabel ?? `Enter ${MAX}-digit code`}
        type="tel"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="one-time-code"
        value={digits}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        className="absolute opacity-0 pointer-events-none"
        tabIndex={-1}
        disabled={disabled}
      />

      <div className="flex items-center justify-center gap-4 select-none">
        {Array.from({ length: MAX }).map((_, i) => {
          const char = digits[i] ?? "";
          const filled = i < digits.length;
          return (
            <div
              key={i}
              className={[
                "h-14 w-14 rounded-xl border transition-all duration-200 shadow-sm",
                filled ? "border-[#3AC4A0]/60 bg-[#E8F7F2] text-neutral-900"
                       : "border-neutral-300 bg-neutral-100 text-neutral-400",
                "flex items-center justify-center text-xl font-semibold tracking-widest",
                boxClassName,
              ].join(" ")}
            >
              {char}
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default InputOTP;
