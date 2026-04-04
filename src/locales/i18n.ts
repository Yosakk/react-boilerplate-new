import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "@/locales/en";
import id from "@/locales/id";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      id: { translation: id },
    },
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "cookie", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
