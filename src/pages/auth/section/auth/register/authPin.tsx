import { SeedyPin } from "@/assets/auth";
import type { PinInputRef } from "@/components/ui/input/pin";
import PinInput from "@/components/ui/input/pin";
import { useCreateSeedsPin } from "@/pages/auth/hooks/auth/useCreatePinSeedsForm";
import { useTranslation } from "react-i18next";

type Props = {
  withConfirm?: boolean;
  onSubmit?: (pin: string) => void;
  loading?: boolean;
  disabled?: boolean;
};

export default function CreateSeedsPinSection({
  withConfirm = false,
  onSubmit,
  loading = false,
  disabled = false,
}: Props) {
  const {
    step,
    pin,
    confirmPin,
    error,
    canContinue,
    currentTitle,
    currentSubtitle,
    ctaLabel,
    pinRef,
    handleSubmit,
    goEdit,
    onChangePin,
    onChangeConfirm,
    max,
  } = useCreateSeedsPin({ withConfirm, onSubmit, loading, disabled, max: 6 });
  const { t } = useTranslation();

  return (
    <section className="w-full flex items-center justify-center py-10">
      <form onSubmit={handleSubmit} className="w-full max-w-md text-center px-6 sm:px-8" noValidate>
        <img
          src={SeedyPin}
          alt="Seeds pin mascot"
          className="mx-auto h-28 w-28 object-contain mb-4"
          loading="lazy"
        />

        <h1 className="font-poppins font-semibold text-2xl md:text-3xl bg-gradient-to-b from-[#3AC4A0] to-[#177C62] bg-clip-text text-transparent">
          {currentTitle}
        </h1>
        <p className="mt-2 text-neutral-500">{currentSubtitle}</p>

        <div className="mt-8" onClick={() => pinRef.current?.focus()}>
          {step === "create" ? (
            <PinInput
              ref={pinRef as React.RefObject<PinInputRef>}
              value={pin}
              onChange={onChangePin}
              helperText={!error ? " " : undefined}
              error={error ?? false}
              length={max}
              mask
              ariaLabel="Enter 6-digit PIN"
            />
          ) : (
            <PinInput
              ref={pinRef as React.RefObject<PinInputRef>}
              value={confirmPin}
              onChange={onChangeConfirm}
              helperText={!error ? " " : undefined}
              error={error ?? false}
              length={max}
              mask
              ariaLabel="Confirm 6-digit PIN"
            />
          )}
        </div>
        <p className="text-gray-400 my-2">{t("authRegisterAccount.page6.text5")}</p>

        {withConfirm && step === "confirm" && (
          <button
            type="button"
            onClick={goEdit}
            className="mt-3 text-sm font-medium underline text-neutral-500 hover:text-neutral-700 cursor-pointer"
          >
            {t("authRegisterAccount.page6.text8")}
          </button>
        )}

        <div className="mt-6">
          <button
            type="submit"
            disabled={!canContinue}
            className={[
              "w-full py-3 rounded-2xl font-medium cursor-pointer",
              "bg-gradient-to-b from-[#3AC4A0] to-[#177C62] text-white",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "shadow-[0_6px_18px_rgba(23,124,98,0.25)]",
              "transition-colors duration-200 hover:from-[#2ea884] hover:to-[#0f5b47]",
            ].join(" ")}
          >
            {loading ? "Processing..." : ctaLabel}
          </button>
        </div>
      </form>
    </section>
  );
}
