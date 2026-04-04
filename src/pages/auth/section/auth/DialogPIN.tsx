import * as React from "react";
import { cn } from "@/_helper/twMerge";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import PinInput from "@/components/ui/input/pin";
import { usePinDialogController } from "../../hooks/auth/usePinDialogForm";
import { useTranslation } from "react-i18next";

type LoginPinDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (pin: string) => Promise<void> | void;
  errorText?: string | null;
  loading?: boolean;
  imageSrc?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
};

export default function LoginPinDialog({
  open,
  onOpenChange,
  onSubmit,
  errorText,
  loading = false,
  imageSrc,
  title,
  subtitle,
}: LoginPinDialogProps) {
  const {
    pin,
    pinRef,
    effectiveError,
    handleChange,
    handleComplete,
    submit,
    headerTitle,
    headerSubtitle,
    max,
  } = usePinDialogController({
    open,
    onOpenChange,
    onSubmit,
    externalError: errorText ?? null,
    loading,
    titleNode: title,
    subtitleNode: subtitle,
    max: 6,
  });

  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay />
      <DialogContent>
        <div className="flex flex-col items-center">
          {imageSrc && (
            <img
              src={imageSrc}
              alt="PIN Illustration"
              className="w-[120px] sm:w-[142px] my-3 sm:my-4"
              loading="lazy"
            />
          )}

          <h1 className="font-poppins font-semibold bg-gradient-to-b from-[#3AC4A0] to-[#177C62] bg-clip-text text-transparent text-xl sm:text-2xl text-center mt-1">
            {headerTitle}
          </h1>
          <p className="font-poppins text-neutral-medium font-normal text-sm sm:text-md text-center mt-2">
            {headerSubtitle}
          </p>

          <div className="mt-6 w-full">
            <PinInput
              ref={pinRef}
              value={pin}
              onChange={handleChange}
              onComplete={handleComplete}
              mask
              autoFocus
              helperText={!effectiveError ? " " : undefined}
              error={effectiveError ?? false}
              ariaLabel="Enter 6-digit PIN"
              className="w-full"
              data-testid="login-pin-input"
              length={max}
            />
          </div>
          <p className="text-gray-400 my-2">{t("authRegisterAccount.page6.text5")}</p>

          <button
            type="button"
            onClick={submit}
            disabled={pin.length !== max || loading}
            className={cn(
              "flex justify-center items-center capitalize font-semibold font-poppins text-sm sm:text-sm leading-[14px] text-white w-full sm:w-[400px]",
              "border-2 hover:border-[#70FFA0] border-[#5EFF95] mt-4",
              "bg-gradient-to-r from-[#3AC4A0] to-[#177C62] transition duration-200 hover:opacity-90 rounded-xl",
              "min-h-[44px]",
              loading && "opacity-70 cursor-wait",
              !(pin.length === max) && !loading && "opacity-60 cursor-not-allowed"
            )}
          >
            {loading ? "Processing..." : "Next"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
