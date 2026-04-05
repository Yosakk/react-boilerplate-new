import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input/input";
import { cn } from "@/_helper/twMerge";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  loading?: boolean;
  defaultRefCode?: string;
  onSkip: () => void;
  onContinue: (refCode: string) => void;
  mascotSrc?: string;
  className?: string;
};

export default function ReferralDialog({
  open,
  onOpenChange,
  loading = false,
  defaultRefCode = "",
  onSkip,
  onContinue,
  mascotSrc,
  className,
}: Props) {
  const { t } = useTranslation();
  const [refCode, setRefCode] = useState(defaultRefCode);

  useEffect(() => {
    if (open) setRefCode(defaultRefCode);
  }, [open, defaultRefCode]);

  const handleEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !loading) onContinue(refCode.trim());
    },
    [loading, onContinue, refCode]
  );

  const submit = () => onContinue(refCode.trim());

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "sm:max-w-[520px] p-0 overflow-hidden rounded-2xl border-0 shadow-2xl",
          className
        )}
      >
        <div className="relative bg-white">
          <div className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_bottom,black,transparent_92%)]">
            <div className="h-[160px] w-full bg-[radial-gradient(var(--seeds-green-surface-alt)_1.5px,transparent_1.5px)] [background-size:20px_20px]" />
          </div>

          <div className="relative flex items-start gap-3 p-6 pt-8">
            {mascotSrc ? (
              <img
                src={mascotSrc}
                alt="Mascot"
                className="h-20 w-auto shrink-0"
              />
            ) : null}

            <div className="flex-1 text-center sm:text-left">
              <DialogTitle asChild>
                <h2 className="font-poppins text-2xl font-semibold text-emerald-700">
                  {t("authRegisterAccount.page9.text1")}
                </h2>
              </DialogTitle>
              <DialogDescription asChild>
                <p className="text-sm text-emerald-900/70 mt-1">
                  {t("authRegisterAccount.page9.text2")}
                </p>
              </DialogDescription>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          <Input
            name="refCode"
            placeholder={t("authRegisterAccount.page9.text3")}
            value={refCode}
            onChange={(e) => setRefCode(e.target.value)}
            onKeyDown={handleEnter}
            autoFocus
            className="h-12 rounded-xl border-2 focus-visible:ring-0 focus-visible:border-emerald-500"
          />

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={onSkip}
              disabled={loading}
              className="font-medium text-emerald-600 hover:text-emerald-700 disabled:opacity-50"
            >
              {t("authRegisterAccount.page9.text4")}
            </button>

            <button
              type="button"
              onClick={submit}
              disabled={loading}
              className={cn(
                "inline-flex items-center justify-center rounded-xl px-6 h-11 text-white font-semibold",
                "bg-gradient-to-b from-seeds-green-light to-seeds-green",
                "disabled:opacity-60"
              )}
            >
              {t("authRegisterAccount.page9.text5")}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
