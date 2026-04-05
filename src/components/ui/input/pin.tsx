import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

export type PinInputRef = {
  focus: () => void;
  clear: () => void;
  getValue: () => string;
};

type Props = {
  value: string;
  onChange: (next: string) => void;
  onComplete?: (val: string) => void;

  length?: number;
  autoFocus?: boolean;
  disabled?: boolean;
  loading?: boolean;

  mask?: boolean | string;
  placeholderChar?: string;

  name?: string;
  ariaLabel?: string;

  error?: string | boolean;
  helperText?: string;

  className?: string;
  boxClassName?: string;
  "data-testid"?: string;
};

const PinInput = forwardRef<PinInputRef, Props>(function PinInput(
  {
    value,
    onChange,
    onComplete,
    length = 6,
    autoFocus = false,
    disabled = false,
    loading = false,
    mask = true,
    placeholderChar = "",
    name,
    ariaLabel = "Enter PIN code",
    error,
    helperText,
    className = "",
    boxClassName = "",
    "data-testid": testId,
  },
  ref
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const MAX = length;

  const focus = () => {
    if (disabled || loading) return;
    inputRef.current?.focus();
  };

  useImperativeHandle(ref, () => ({
    focus,
    clear: () => onChange(""),
    getValue: () => value,
  }));

  useEffect(() => {
    if (autoFocus) {
      requestAnimationFrame(() => focus());
    }
  }, [autoFocus]);

  const maskedChar = useMemo(() => {
    if (typeof mask === "string") return mask;
    if (mask === true) return "•";
    return null;
  }, [mask]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, "").slice(0, MAX);
    onChange(onlyDigits);
    if (onlyDigits.length === MAX) {
      onComplete?.(onlyDigits);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Backspace" ||
      e.key === "Delete" ||
      e.key === "Tab" ||
      e.key === "Enter" ||
      e.key.startsWith("Arrow")
    ) {
      return;
    }
    if (!/^\d$/.test(e.key) && e.key.length === 1) {
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const txt = e.clipboardData.getData("text") ?? "";
    const only = txt.replace(/\D/g, "").slice(0, MAX);
    if (!only) return;
    e.preventDefault();
    const next = only;
    onChange(next);
    if (next.length === MAX) onComplete?.(next);
  };

  const canInteract = !disabled && !loading;

  return (
    <div className={`w-full text-center ${className}`} data-testid={testId}>
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        pattern="\d*"
        autoComplete="one-time-code"
        enterKeyHint="done"
        name={name}
        aria-label={ariaLabel}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        className="absolute opacity-0 pointer-events-none"
        tabIndex={-1}
        disabled={!canInteract}
      />

      <div
        className="flex items-center justify-center gap-1 md:gap-4 select-none md:px-0"
        role="group"
        aria-live="polite"
        onClick={focus}
      >
        {Array.from({ length: MAX }).map((_, i) => {
          const filled = i < value.length;
          const char = value[i] ?? "";
          const show = filled ? (maskedChar ?? char) : placeholderChar;

          const base =
            "h-9 w-9 md:h-11 md:w-11 rounded-full border transition-all duration-200 shadow-sm flex items-center justify-center text-base";

          const color = error
            ? filled
              ? "border-red-400 bg-red-500 text-white"
              : "border-red-300 bg-red-50 text-red-600"
            : filled
              ? "border-seeds-green-light/60 bg-seeds-green-light text-white"
              : "border-neutral-300 bg-neutral-100 text-neutral-700";

          return (
            <div key={i} className={[base, color, boxClassName].join(" ")}>
              {show}
            </div>
          );
        })}
      </div>

      {error ? (
        <p
          className="mt-2 md:mt-3 text-xs md:text-sm text-red-500"
          role="alert"
        >
          {typeof error === "string" ? error : "Invalid PIN"}
        </p>
      ) : helperText ? (
        <p className="mt-2 md:mt-3 text-xs md:text-sm text-neutral-400">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

export default PinInput;
