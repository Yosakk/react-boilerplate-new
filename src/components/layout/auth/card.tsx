import { Outlet } from "react-router-dom";
import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  fullscreen?: boolean;
  containerClassName?: string;
  cardClassName?: string;
};

export default function AuthCard({
  children,
  fullscreen = false,
  containerClassName = "",
  cardClassName = "",
}: Props) {
  const Card = (
    <div
      className={
        "relative rounded-[30px] p-[2px] bg-gradient-to-r " +
        "from-seeds-bubble-bg via-seeds-bubble-chat to-seeds-purple-soft " +
        "shadow-[0_8px_30px_rgba(0,0,0,0.06)] " +
        containerClassName
      }
    >
      <div
        className={
          "rounded-[28px] bg-white/95 p-3 md:p-8 w-full" + cardClassName
        }
      >
        {children ?? <Outlet />}
      </div>
    </div>
  );

  if (fullscreen) {
    return (
      <main className="min-h-screen grid place-items-center bg-seeds-neutral-100 p-4">
        {Card}
      </main>
    );
  }
  return Card;
}
