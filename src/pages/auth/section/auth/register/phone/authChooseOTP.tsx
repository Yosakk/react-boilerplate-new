import * as React from "react";
import { Backward, Messenger, Whatsapp } from "@/assets/auth";
import { useTranslation } from "react-i18next";

type OTPMethod = "whatsapp" | "sms" | "";

export interface AuthChooseOTPProps {
  className?: string;
  method?: OTPMethod;
  setMethod?: React.Dispatch<React.SetStateAction<OTPMethod>>;
  phoneLabel?: string;
  onBack?: () => void;
  onContinue?: (method: Exclude<OTPMethod, "">) => void;
  disabled?: boolean;
  loading?: boolean;
}

const AuthChooseOTP: React.FC<AuthChooseOTPProps> = ({
  className,
  method,
  setMethod,
  phoneLabel,
  onBack,
  onContinue,
  disabled = false,
  loading = false,
}) => {
  const { t } = useTranslation();

  const [internalMethod, setInternalMethod] = React.useState<OTPMethod>("");
  const isControlled =
    typeof method !== "undefined" && typeof setMethod === "function";
  const selected = isControlled ? (method as OTPMethod) : internalMethod;

  const choose = (m: Exclude<OTPMethod, "">) => {
    if (disabled) return;
    if (isControlled) setMethod!(m);
    else setInternalMethod(m);
  };

  const handleContinue = () => {
    if (!selected || disabled) return;
    onContinue?.(selected as Exclude<OTPMethod, "">);
  };

  return (
    <div
      className={`${className ?? ""} flex flex-col items-center mt-8 mb-16 md:mb-0`}
    >
      <div className="w-full flex justify-start">
        <img
          src={Backward}
          alt="Backward"
          onClick={() => !disabled && onBack?.()}
        />
      </div>

      <div className="flex flex-col gap-2 justify-center items-center w-full md:w-[80%] mt-4 md:mt-0">
        <p className="font-poppins font-semibold bg-gradient-to-b text-center from-seeds-green-light to-seeds-green bg-clip-text text-transparent text-lg md:text-2xl mt-4">
          {t("authRegisterAccount.page3.text1")}
        </p>
        <p className="font-poppins text-neutral-medium font-medium text-sm md:text-[16px] text-center mt-2">
          {t("authRegisterAccount.page3.text2")}
        </p>

        <div className="flex flex-col gap-4 mt-6 w-full max-w-[520px]">
          <button
            type="button"
            disabled={disabled}
            onClick={() => choose("whatsapp")}
            className={`
              text-left p-[2px] rounded-lg
              ${selected === "whatsapp" ? "bg-gradient-to-b from-seeds-green-light to-seeds-green" : "bg-seeds-neutral-300 hover:bg-seeds-neutral-400 duration-300"}
            `}
          >
            <div className="flex justify-start items-center gap-4 bg-seeds-neutral-50 p-4 md:p-6 rounded-md">
              <div className="flex justify-center items-center w-[50px] h-auto">
                <img
                  src={Whatsapp}
                  alt="WhatsApp"
                  className="w-full h-auto shrink-0"
                />
              </div>
              <div className="flex flex-col justify-start items-start">
                <p className="font-poppins text-neutral-medium font-semibold text-sm md:text-md text-left">
                  {t("authRegisterAccount.page3.text4")}
                </p>
                <p className="font-poppins text-neutral-soft font-light text-sm text-left">
                  {t("authRegisterAccount.page3.text5")}{" "}
                  <span className="font-semibold text-neutral-medium">
                    {phoneLabel ?? "+62xxxxxxxxxx"}
                  </span>{" "}
                  {t("authRegisterAccount.page3.text7")}
                </p>
              </div>
            </div>
          </button>

          <button
            type="button"
            disabled={disabled}
            onClick={() => choose("sms")}
            className={`
              text-left p-[2px] rounded-lg
              ${selected === "sms" ? "bg-gradient-to-b from-seeds-green-light to-seeds-green" : "bg-seeds-neutral-300 hover:bg-seeds-neutral-400"}
            `}
          >
            <div className="flex justify-start items-center gap-4 bg-seeds-neutral-50 p-4 md:p-6 rounded-md">
              <div className="flex justify-center items-center w-[50px] h-auto">
                <img
                  src={Messenger}
                  alt="SMS"
                  className="w-full h-auto shrink-0"
                />
              </div>
              <div className="flex flex-col justify-start items-start">
                <p className="font-poppins text-neutral-medium font-semibold text-sm md:text-md text-left">
                  {t("authRegisterAccount.page3.text3")}
                </p>
                <p className="font-poppins text-neutral-soft font-light text-sm text-left">
                  {t("authRegisterAccount.page3.text5")}{" "}
                  <span className="font-semibold text-neutral-medium">
                    {phoneLabel ?? "+62xxxxxxxxxx"}
                  </span>{" "}
                  {t("authRegisterAccount.page3.text6")}
                </p>
              </div>
            </div>
          </button>
        </div>

        <div className="w-full md:w-[80%] max-w-[400px] p-[2px] rounded-xl bg-gradient-to-b from-seeds-glow to-seeds-glow-mid mt-8">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!selected || disabled || loading}
            className="font-poppins text-sm w-full bg-gradient-to-b from-seeds-green-light p-3 to-seeds-green text-white rounded-xl capitalize disabled:opacity-60"
          >
            {loading ? "Processing..." : t("authRegisterAccount.page3.text8")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthChooseOTP;
