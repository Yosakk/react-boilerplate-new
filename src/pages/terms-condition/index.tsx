import { Backward } from "@/assets/auth";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import PrivacyPolicy from "./privacyPolicy";
import TermsCondition from "./termsCondition";

export const tncPageRouteName = "/auth/terms-condition";

const LegalPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const returnTo = params.get("return") ? decodeURIComponent(params.get("return")!) : "/auth/login";
  const setForm = params.get("setForm") === "1";
  const [page, setPage] = useState<"tnc" | "policy">("tnc");

  const baseTab =
    "relative font-poppins text-md text-center w-fit py-2 px-4 cursor-pointer font-medium transition-colors";
  const activeTab = "text-seeds-button-green";
  const inactiveTab = "text-[#BDBDBD] hover:text-seeds-button-green";

  return (
    <div className={`flex flex-col items-center`}>
      <div className="w-full flex justify-start">
        <img
          src={Backward}
          alt="Backward"
          className="cursor-pointer hover:scale-110 duration-200"
          onClick={() => navigate(-1)}
        />
      </div>

      <div className="w-full flex justify-center mt-5">
        <div
          className="
            w-full max-w-4xl
            rounded-2xl
            bg-gradient-to-r from-[#3AC4A0] to-[#177C62]
            text-white
            px-6 md:px-10 py-6 md:py-8
            shadow-[0_10px_28px_rgba(23,124,98,0.22)]
            text-center
          "
        >
          <p className="font-poppins font-semibold text-xl md:text-2xl">
            {t("authRegisterAccount.page5.text1")}
          </p>

          <p className="font-poppins text-sm md:text-base mt-2 leading-relaxed opacity-95 max-w-2xl mx-auto">
            {t("authRegisterAccount.page5.text2")}
          </p>
        </div>
      </div>
      <div className="w-full mt-4 flex flex-col justify-center items-center">
        <div className="flex justify-center items-center gap-2">
          <button
            type="button"
            onClick={() => setPage("tnc")}
            className={`${baseTab} ${page === "tnc" ? activeTab : inactiveTab}`}
            aria-current={page === "tnc" ? "page" : undefined}
          >
            {t("authRegisterAccount.page5.text3")}
            <span
              className={`pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-[6px]
                  h-[2px] rounded-full bg-gradient-to-r from-[#5EFF95] via-[#3AC4A0] to-[#177C62]
                  transition-all duration-300 ease-out
                  ${page === "tnc" ? "w-10/12 opacity-100" : "w-0 opacity-0"}`}
            />
          </button>

          <button
            type="button"
            onClick={() => setPage("policy")}
            className={`${baseTab} ${page === "policy" ? activeTab : inactiveTab}`}
            aria-current={page === "policy" ? "page" : undefined}
          >
            {t("authRegisterAccount.page5.text4")}
            <span
              className={`pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-[6px]
                  h-[2px] rounded-full bg-gradient-to-r from-[#5EFF95] via-[#3AC4A0] to-[#177C62]
                  transition-all duration-300 ease-out
                  ${page === "policy" ? "w-10/12 opacity-100" : "w-0 opacity-0"}`}
            />
          </button>
        </div>

        <div className="w-full text-center mt-8">
          {page === "tnc" ? <TermsCondition /> : <PrivacyPolicy />}
        </div>

        <div className="w-full md:w-[50%] p-[2px] rounded-xl bg-gradient-to-b from-[#5EFF95] to-[#70FFA0] mt-8 mb-16 md:mb-8">
          <button
            onClick={() => {
              if (setForm) {
                sessionStorage.setItem("seeds.tnc.accepted", "1");
              }
              navigate(returnTo);
            }}
            className="flex items-center justify-center gap-2 font-poppins text-sm w-full bg-gradient-to-b from-[#3AC4A0] to-[#177C62] text-white rounded-xl capitalize py-3"
          >
            <div>{t("authRegisterAccount.page5.text5")}</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
