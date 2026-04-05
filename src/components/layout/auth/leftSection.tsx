import { type JSX } from "react";
import { LeftBanner, Ornament } from "@/assets/auth";
import { useTranslation } from "react-i18next";
import { cn } from "@/_helper/twMerge";

type Props = {
  className?: string;
};

export default function AuthLeftSection({ className }: Props): JSX.Element {
  const { t } = useTranslation();

  return (
    <section
      className={cn(
        "relative hidden md:grid place-items-center bg-gradient-to-b from-[#3AC4A0] to-[#177C62]",
        className
      )}
    >
      <img
        src={Ornament}
        alt=""
        aria-hidden="true"
        className="absolute top-0 right-0 max-w-full h-auto pointer-events-none select-none"
      />
      <div className="w-full px-[15%] z-10">
        <img
          src={LeftBanner}
          alt="Left banner"
          className="w-[300px] md:w-[375px] h-auto mb-16"
        />
        <h1 className="font-semibold font-poppins text-white text-2xl xl:text-4xl leading-tight">
          {t("onboarding.leftBanner.text1")}
        </h1>
        <p className="font-poppins text-white text-lg xl:text-xl mt-2">
          {t("onboarding.leftBanner.text2")}
        </p>
      </div>
    </section>
  );
}
