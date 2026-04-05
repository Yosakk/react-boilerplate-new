import { flagUrl } from "@/_helper/isoFlagCode";
import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "id", short: "ID", label: "Bahasa", cc: "id" },
  { code: "en", short: "EN", label: "English", cc: "us" },
];

type Props = { className?: string };

export default function LanguageSwitcher({ className }: Props) {
  const { i18n } = useTranslation();
  const current = (i18n.resolvedLanguage || i18n.language || "en").split(
    "-"
  )[0];
  const activeIndex = Math.max(
    0,
    LANGS.findIndex((l) => l.code === current)
  );

  return (
    <div
      className={[
        "relative inline-flex items-center gap-1 rounded-full",
        "bg-seeds-purple p-1",
        "shadow-sm",
        className || "",
      ].join(" ")}
      role="radiogroup"
      aria-label="Language"
    >
      <div
        aria-hidden
        className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-white/25 transition-transform duration-200"
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      />

      {LANGS.map((l) => {
        const isActive = l.code === current;
        return (
          <button
            key={l.code}
            role="radio"
            aria-checked={isActive}
            onClick={() => i18n.changeLanguage(l.code)}
            className={[
              "relative z-10 px-3 py-1.5 rounded-full text-sm font-semibold cursor-pointer",
              "inline-flex items-center gap-2 transition-colors",
              isActive ? "text-white" : "text-white/80 hover:text-white",
            ].join(" ")}
          >
            <img
              {...flagUrl(l.cc, 24)}
              alt={`${l.label} flag`}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
              className="inline-block"
            />
            <span>{l.short}</span>
          </button>
        );
      })}
    </div>
  );
}
