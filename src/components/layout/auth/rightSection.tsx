import { type JSX, type ReactNode } from "react";
import { LogoSeeds } from "@/assets";
import LanguageSwitcher from "@/components/ui/switcher";
import AuthCard from "@/components/layout/auth/card";
import { cn } from "@/_helper/twMerge";
import { Ornament } from "@/assets/auth";

type Props = {
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  showTopbar?: boolean;
};

export default function AuthRightSection({
  children,
  className,
  contentClassName,
  showTopbar = true,
}: Props): JSX.Element {
  return (
    <section
      className={cn(
        "flex items-start justify-center  overflow-y-auto",
        className
      )}
    >
      <img
        src={Ornament}
        alt=""
        aria-hidden="true"
        className="absolute top-0 right-0  w-[60%] h-auto pointer-events-none select-none block md:hidden"
      />

      <div className={cn("w-full max-w-3xl px-6 py-10 sm:px-10", contentClassName)}>
        {showTopbar && (
          <div className="flex items-center justify-between mb-5">
            <img src={LogoSeeds} alt="Seeds" className="h-8 w-auto drop-shadow-sm" />
            <LanguageSwitcher />
          </div>
        )}

        <AuthCard>{children}</AuthCard>
      </div>
    </section>
  );
}
