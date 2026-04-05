import { useState } from "react";
import TypingBubble from "../../onboarding/typingBubble";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input/input";
import { Backward, SeedyBirthdate } from "@/assets/auth";
import { Polygon, SeedyChat } from "@/assets/onboarding";

type Props = {
  onSubmit: (age: number) => void;
  loading?: boolean;
  onBack?: () => void;
  onSkip?: () => void;
};

export default function AuthAgeStep({
  onSubmit,
  loading = false,
  onBack,
  onSkip,
}: Props) {
  const { t } = useTranslation();
  const [age, setAge] = useState<string>("");

  const numericAge = Number(age);
  const hasValue = age !== "";
  const isMinimumAge =
    hasValue && Number.isFinite(numericAge) && numericAge < 12;
  const isValid = hasValue && Number.isFinite(numericAge) && numericAge >= 12;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/[^\d]/g, "").slice(0, 3);
    setAge(v);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isValid && !loading) {
      onSubmit(numericAge);
    }
  };

  const handleNext = () => {
    if (isValid && !loading) {
      onSubmit(numericAge);
    }
  };

  return (
    <div className="flex flex-col items-center mt-8 mb-16">
      <div className="w-full flex justify-start">
        <img
          src={Backward}
          alt="Backward"
          className="cursor-pointer hover:scale-110 duration-200"
          onClick={onBack}
        />
      </div>

      <div className="flex flex-col gap-2 justify-center items-center w-full md:w-[80%] mt-4 md:mt-0">
        <div className="w-full md:w-[60%] flex justify-center items-center bg-[#7EFFA8] relative rounded-2xl p-2 gap-2 mb-12">
          <img
            src={SeedyChat}
            alt="SeedyChat"
            className="w-[40px] h-auto shrink-0"
          />
          <div className="w-full flex flex-col justify-start items-start">
            <TypingBubble
              message={[{ text: `${t("authRegisterAccount.page7.text1")}` }]}
            />
            <img
              src={Polygon}
              alt="Polygon"
              className="w-[20px] h-auto fade-in-onboard  rotate-[35deg] absolute bottom-[-14px] left-[10px]"
            />
          </div>
        </div>

        <div>
          <img
            src={SeedyBirthdate}
            alt="SeedyBirthDate"
            className="w-[200px] h-auto shrink-0"
          />
        </div>

        <div className="w-full md:w-[80%] flex flex-col gap-2 justify-center items-center mt-8">
          <div className="w-full">
            <Input
              name="age"
              type="number"
              label={`${t("authRegisterAccount.page7.text2")}`}
              placeholder={`${t("authRegisterAccount.page7.text3")}`}
              required={false}
              value={age}
              onChange={handleChange}
              onKeyDown={handleEnter}
              className="rounded-md"
            />
            {isMinimumAge ? (
              <p className="font-poppins font-normal italic text-sm text-[#DD2525] self-start">
                {t("authRegisterAccount.page7.text5")}
              </p>
            ) : (
              <p className="font-poppins font-normal italic text-sm text-[#2B4CCD] self-start">
                {t("authRegisterAccount.page7.text4")}
              </p>
            )}
          </div>
        </div>

        <div className="w-full md:w-[80%] max-w-[400px] p-[2px] rounded-xl bg-gradient-to-b from-[#5EFF95] to-[#70FFA0] mt-8">
          <button
            type="button"
            onClick={handleNext}
            disabled={!isValid || loading}
            className="font-poppins text-sm w-full bg-gradient-to-b from-[#3AC4A0] to-[#177C62] text-white rounded-xl capitalize disabled:opacity-50 p-3 cursor-pointer transition-colors duration-200 hover:from-[#2ea884] hover:to-[#0f5b47]"
          >
            {loading
              ? (t("common.loading") ?? "Processing...")
              : t("authRegisterAccount.page7.text6")}
          </button>
        </div>

        <div className="w-full md:w-[80%] max-w-[400px] p-[2px] rounded-xl bg-gradient-to-b from-[#3AC4A0] to-[#177C62] mt-2">
          <button
            type="button"
            onClick={onSkip}
            className="w-full bg-white text-[#177C62] font-poppins text-sm rounded-xl capitalize p-2 cursor-pointer transition-colors duration-200"
          >
            {t("authRegisterAccount.page7.text7")}
          </button>
        </div>
      </div>
    </div>
  );
}
