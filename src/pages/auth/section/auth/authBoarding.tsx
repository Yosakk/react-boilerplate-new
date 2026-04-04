import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const AuthBoarding: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <Link
        to="guest"
        className="block w-full rounded-full border-2 border-emerald-400/80 px-6 py-3 font-semibold text-emerald-600 text-center shadow-sm hover:bg-emerald-50 active:scale-[0.99] transition"
        aria-label={t("authPage.guest")}
      >
        {t("authPage.guest")}
      </Link>

      <p className="text-center text-sm text-zinc-500">
        {t("authPage.agreement")}{" "}
        <a href="#" className="font-medium text-emerald-600 hover:underline">
          {t("authPage.tnC")}
        </a>
      </p>

      <Link
        to="register"
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white shadow-md hover:bg-emerald-600 active:scale-[0.99] transition"
      >
        {t("authPage.register")}
      </Link>
    </div>
  );
};

export default AuthBoarding;
