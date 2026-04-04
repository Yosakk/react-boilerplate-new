import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { AnswerOption } from "@/_interfaces/onboarding.interfaces";
import QuestionDoneView from "./questionDone";
import { useAppSelector, type RootState } from "@/store";

type Props = {
  onRestart: () => void;
  answers: Record<number, AnswerOption[]>;
};

type SSOIntent = {
  provider: "google";
  accessToken: string;
  profile?: { name?: string; email?: string; picture?: string };
};


export default function QuestionDoneContainer({ onRestart, answers }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { returnTo?: string; ssoIntent?: SSOIntent } };
  const submissionId = useAppSelector((s: RootState) => s.onboarding.submissionId);

  const answer1 = answers[1]?.[0]?.header ?? "";
  const answer2 = answers[2]?.[0]?.header ?? "";
  const answer3 = answers[3]?.[0]?.header ?? "";

  const answer4 = useMemo(() => {
    const list = (answers[4] ?? []).map((a) => a.header).filter(Boolean);
    if (list.length <= 1) return list[0] ?? "";
    if (list.length === 2) return `${list[0]} and ${list[1]}`;
    const last = list[list.length - 1];
    return `${list.slice(0, -1).join(", ")}, and ${last}`;
  }, [answers]);

  const message1 = useMemo(
    () => [
      { text: t("onboarding.questionDone.text1.part1") },
      { text: answer1, isBold: true },
      { text: t("onboarding.questionDone.text1.part2") },
      { text: answer2, isBold: true },
      { text: t("onboarding.questionDone.text1.part3") },
      { text: t("onboarding.questionDone.text1.part4") },
      { text: answer3, isBold: true },
      { text: t("onboarding.questionDone.text1.part5") },
      { text: answer4, isBold: true },
      { text: t("onboarding.questionDone.text1.part6") },
    ],
    [t, answer1, answer2, answer3, answer4]
  );

  const message2 = useMemo(
    () => [
      { text: t("onboarding.questionDone.text2") },
      { text: "", newLine: true },
      { text: t("onboarding.questionDone.text3") },
      { text: "", newLine: true },
      { text: t("onboarding.questionDone.text4"), isBold: true },
    ],
    [t]
  );

  const handlePrimary = () => {
    if (state?.ssoIntent) {
      const target = state.returnTo || "/auth/signup/email";
      navigate(target, {
        state: {
          mode: "sso",
          provider: state.ssoIntent.provider,
          accessToken: state.ssoIntent.accessToken,
          onboarding_id: submissionId || "",
          profile: state.ssoIntent.profile || null,
        },
      });
      return;
    }

    navigate("/auth");
  };

  return (
    <QuestionDoneView
      message1={message1}
      message2={message2}
      primaryLabel={t("onboarding.questionDone.text5")}
      secondaryLabel={t("onboarding.questionDone.text6")}
      onPrimary={handlePrimary}
      onSecondary={onRestart}
    />
  );
}
