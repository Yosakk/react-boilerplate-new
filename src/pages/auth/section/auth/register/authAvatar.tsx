import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import TypingBubble from "../../onboarding/typingBubble";
import {
  Backward,
  SeedyBirthdate,
  SeedyGreenAvatar,
  SeedyYellowAvatar,
} from "@/assets/auth";
import { Polygon, SeedyChat } from "@/assets/onboarding";

type AvatarItem = {
  id: string;
  img: string;
  cdnUrl: string;
  alt?: string;
};

type Props = {
  onBack?: () => void;
  onContinue?: (payload: { id: string; cdnUrl: string }) => void;
  defaultSelectedId?: string;
};

export default function AuthAvatar({
  onBack,
  onContinue,
  defaultSelectedId = "",
}: Props) {
  const { t } = useTranslation();

  const avatars = useMemo<AvatarItem[]>(
    () => [
      {
        id: "yellow",
        img: SeedyYellowAvatar,
        cdnUrl:
          "https://dev-assets.seeds.finance/storage/cloud/9754e50d-3900-48b6-8460-4c66700117cc.png",
        alt: "Seedy Yellow Avatar",
      },
      {
        id: "green",
        img: SeedyGreenAvatar,
        cdnUrl:
          "https://dev-assets.seeds.finance/storage/cloud/2ec7bd25-255c-4467-ab0b-0f729f0331d6.png",
        alt: "Seedy Green Avatar",
      },
    ],
    []
  );

  const [selectedId, setSelectedId] = useState<string>(defaultSelectedId);
  const selected = avatars.find((a) => a.id === selectedId);
  const canContinue = Boolean(selected);

  const handleCardClick = (id: string) => setSelectedId(id);
  const handleContinue = () => {
    if (selected && onContinue) {
      onContinue({ id: selected.id, cdnUrl: selected.cdnUrl });
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="w-full flex justify-start">
        <img
          src={Backward}
          alt="Backward"
          className="cursor-pointer hover:scale-110 duration-200"
          onClick={onBack}
        />
      </div>

      <div className="flex flex-col gap-2 justify-center items-center w-full md:w-[80%] mt-4">
        <div className="w-full md:w-[60%] flex justify-center items-center bg-[#7EFFA8] relative rounded-2xl p-2 gap-2 mb-12">
          <img
            src={SeedyChat}
            alt="SeedyChat"
            className="w-[40px] h-auto shrink-0"
          />
          <div className="w-full flex flex-col justify-start items-start">
            <div className="font-poppins text-neutral-medium font-medium text-sm md:text-md">
              <TypingBubble
                message={[{ text: t("authRegisterAccount.page8.text1") }]}
              />
            </div>
            <img
              src={Polygon}
              alt="Polygon"
              className="w-[20px] rotate-[35deg] h-auto fade-in-onboard absolute bottom-[-14px] left-[10px]"
            />
          </div>
        </div>

        <div>
          <img
            src={SeedyBirthdate}
            alt="Seedy Illustration"
            className="w-[200px] h-auto shrink-0"
          />
        </div>

        <div className="flex gap-4 justify-center items-center mt-4">
          {avatars.map((av) => {
            const active = selectedId === av.id;
            return (
              <button
                key={av.id}
                type="button"
                onClick={() => handleCardClick(av.id)}
                className={[
                  "group p-[3px] rounded-lg transition-all cursor-pointer",
                  active
                    ? "bg-gradient-to-b from-[#3AC4A0] to-[#177C62]"
                    : "bg-[#E7E7E7A6] hover:bg-gradient-to-b hover:from-[#3AC4A0] hover:to-[#177C62]",
                ].join(" ")}
                aria-pressed={active}
                aria-label={av.alt ?? av.id}
              >
                <div className="bg-[#F9F9F9] rounded-md px-6 py-4 flex justify-center items-center">
                  <img
                    src={av.img}
                    alt={av.alt ?? av.id}
                    className="w-auto h-[107px] shrink-0"
                  />
                </div>
              </button>
            );
          })}
        </div>

        <div className="w-full md:w-[80%] p-[2px] rounded-xl bg-gradient-to-b from-[#5EFF95] to-[#70FFA0] mt-8 mb-16">
          <button
            type="button"
            disabled={!canContinue}
            onClick={handleContinue}
            className="font-poppins text-sm w-full bg-gradient-to-b from-[#3AC4A0] to-[#177C62] text-white rounded-xl capitalize disabled:opacity-50 p-3 cursor-pointer transition-colors duration-200 hover:from-[#2ea884] hover:to-[#0f5b47]"
          >
            {t("authRegisterAccount.page8.text2")}
          </button>
        </div>
      </div>
    </div>
  );
}
