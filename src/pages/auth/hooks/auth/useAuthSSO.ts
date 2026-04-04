import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useAppDispatch, useAppSelector } from "@/store";
import { saveTokenAuth } from "@/store/auth";
import { useLoginMutation } from "@/_services/auth";
import { errorHandler } from "@/_services/errorHandler";
import { getDeviceMeta } from "@/_helper/auth-device";
import type { LoginReqI } from "@/_interfaces/auth.interfaces";
import { fetchGoogleUserInfo, type GoogleUserInfo } from "@/_services/sso";
import { useState } from "react";

export function useGoogleSSO() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onboardingId = useAppSelector((s) => s.onboarding?.submissionId) || "";
  const [login, loginState] = useLoginMutation();

  const [googleProfile, setGoogleProfile] = useState<GoogleUserInfo | null>(
    null
  );

  const start = useGoogleLogin({
    scope: "openid email profile",
    onSuccess: async (tokenResponse) => {
      let userInfo: GoogleUserInfo | null = null;
      try {
        const accessToken = tokenResponse?.access_token ?? "";
        const { os_name, platform } = getDeviceMeta();

        userInfo = await fetchGoogleUserInfo(accessToken);
        setGoogleProfile(userInfo);

        const payload: LoginReqI = {
          phone_number: "",
          email: "",
          password: "",
          pin: "",
          oauth_provider: "google",
          oauth_identifier: accessToken,
          os_name,
          platform,
          visitor_id: "",
          onboarding_id: onboardingId,
        };

        const res = await login(payload).unwrap();
        dispatch(saveTokenAuth(res));
        navigate("/dashboard");
      } catch (err: any) {
        const message = err?.data?.message || "";
        if (message === "link-account/not-found") {
          if (!onboardingId) {
            navigate("/onboarding", {
              state: {
                returnTo: "/auth/signup/email",
                ssoIntent: {
                  provider: "google",
                  accessToken: tokenResponse?.access_token || "",
                  profile: userInfo,
                },
              },
            });
            return;
          }
          navigate("/auth/signup/email", {
            state: {
              returnTo: "/auth/signup/email",
              mode: "sso",
              provider: "google",
              accessToken: tokenResponse?.access_token || "",
              onboarding_id: onboardingId,
              profile: userInfo,
            },
          });
          return;
        }
        errorHandler(err);
      }
    },
    onError: errorHandler,
  });

  return {
    startGoogle: start,
    isLoading: loginState.isLoading,
    googleProfile,
  };
}
