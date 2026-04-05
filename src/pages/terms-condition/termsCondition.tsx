import AccordionComponent, {
  type AccordionItemData,
} from "@/components/ui/accordion/accordion-components";
import useWindowInnerWidth from "@/hooks/useWindowInnerWidth";
import React from "react";
import { useTranslation } from "react-i18next";

const TermsCondition: React.FC = () => {
  const width = useWindowInnerWidth();
  const { t } = useTranslation();

  const renderParagraphs = (key: string) => (
    <div className="flex flex-col self-stretch text-sm font-poppins leading-6 text-[#262626]">
      {t(key)
        .split("\n")
        .map((paragraph: string, idx: number) => (
          <p key={idx} className="mb-3">
            {paragraph}
          </p>
        ))}
    </div>
  );

  const items: AccordionItemData[] = [
    {
      value: "tnc-1",
      trigger: t("termAndCondition.tnc.title.1"),
      content: renderParagraphs("termAndCondition.tnc.desc.1"),
    },
    {
      value: "tnc-2",
      trigger: t("termAndCondition.tnc.title.2"),
      content: renderParagraphs("termAndCondition.tnc.desc.2"),
    },
    {
      value: "tnc-3",
      trigger: t("termAndCondition.tnc.title.3"),
      content: renderParagraphs("termAndCondition.tnc.desc.3"),
    },
    {
      value: "tnc-4",
      trigger: t("termAndCondition.tnc.title.4"),
      content: renderParagraphs("termAndCondition.tnc.desc.4"),
    },
    {
      value: "tnc-5",
      trigger: t("termAndCondition.tnc.title.5"),
      content: (
        <div className="flex flex-col self-stretch text-sm font-poppins leading-6 text-[#262626]">
          {t("termAndCondition.tnc.desc.5")
            .split("\n")
            .map((p: string, i: number) => (
              <p key={`d5-${i}`} className="mb-3">
                {p}
              </p>
            ))}
          <ul className="list-disc pl-5 ml-1 mb-3">
            {Object.values(
              t("termAndCondition.tnc.list.5", {
                returnObjects: true,
              }) as Record<string, string>
            ).map((item, i) => (
              <li key={`l5-${i}`} className="mb-1">
                {item}
              </li>
            ))}
          </ul>
          {t("termAndCondition.tnc.desc.6")
            .split("\n")
            .map((p: string, i: number) => (
              <p key={`d6-${i}`} className="mb-3">
                {p}
              </p>
            ))}
        </div>
      ),
    },
    {
      value: "tnc-6",
      trigger: t("termAndCondition.tnc.title.6"),
      content: renderParagraphs("termAndCondition.tnc.desc.7"),
    },
    {
      value: "tnc-7",
      trigger: t("termAndCondition.tnc.title.7"),
      content: renderParagraphs("termAndCondition.tnc.desc.8"),
    },
    {
      value: "tnc-8",
      trigger: t("termAndCondition.tnc.title.8"),
      content: renderParagraphs("termAndCondition.tnc.desc.9"),
    },
    {
      value: "tnc-9",
      trigger: t("termAndCondition.tnc.title.9"),
      content: renderParagraphs("termAndCondition.tnc.desc.10"),
    },
    {
      value: "tnc-10",
      trigger: t("termAndCondition.tnc.title.10"),
      content: renderParagraphs("termAndCondition.tnc.desc.11"),
    },
    {
      value: "tnc-11",
      trigger: t("termAndCondition.tnc.title.11"),
      content: renderParagraphs("termAndCondition.tnc.desc.12"),
    },
    {
      value: "tnc-12",
      trigger: t("termAndCondition.tnc.title.12"),
      content: renderParagraphs("termAndCondition.tnc.desc.13"),
    },
    {
      value: "tnc-13",
      trigger: t("termAndCondition.tnc.title.13"),
      content: renderParagraphs("termAndCondition.tnc.desc.14"),
    },
    {
      value: "tnc-14",
      trigger: t("termAndCondition.tnc.title.14"),
      content: renderParagraphs("termAndCondition.tnc.desc.15"),
    },
  ];

  return (
    <div
      className={`z-3 lg:px-[10px] min-h-[calc(100vh-100px)] overflow-y-auto p-4 relative justify-center text-justify bg-opacity-100 border-white py-4 border-4 ${
        width !== undefined && width < 600
          ? "w-full overflow-x-auto"
          : width !== undefined && width < 500
            ? "w-[99%] overflow-x-visible"
            : width !== undefined && width < 400
              ? "w-[99%] overflow-x-visible"
              : width !== undefined && width > 600
                ? "w-full overflow-x-visible"
                : ""
      } h-auto`}
    >
      <div className="w-full bg-white rounded-2xl flex flex-col justify-center items-center">
        <div className="font-poppins font-18 leading-7 font-bold text-neutral-500 flex flex-col items-center">
          {t("termAndCondition.title")}
        </div>
      </div>
      <br />

      <div>
        <p
          className={`mb-5 font-semibold font-poppins font-14 font-600 leading-5 ${
            width !== undefined && width < 600 ? "h-[20px]" : ""
          } bg-white`}
        >
          {t("termAndCondition.lastupdate")}{" "}
          <span className="text-purple-600">
            {t("termAndCondition.updatedate")}
          </span>
        </p>
        {t("termAndCondition.announcement")}
        <br />

        <AccordionComponent
          items={items}
          type="single"
          collapsible
          defaultValue="tnc-1"
          className="mt-4"
          borderColor="border-neutral-200"
        />
      </div>
    </div>
  );
};

export default TermsCondition;
