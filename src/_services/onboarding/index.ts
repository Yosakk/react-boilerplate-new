import type {
  OnboardingAnswerReqI,
  OnboardingAnswerResI,
  OnboardingReqI,
  OnboardingResI,
} from "@/_interfaces/onboarding.interfaces";
import { Api } from "../api";
import { setOnboardingSubmissionId } from "@/store/onboarding";

const prefix = "/onboard/v1";

export const onboardingApi = Api.injectEndpoints({
  endpoints: (build) => ({
    onboarding: build.query<OnboardingResI, OnboardingReqI>({
      query: (params) => ({ url: `${prefix}/question`, method: "GET", params }),
    }),
    submitOnboarding: build.mutation<
      OnboardingAnswerResI,
      OnboardingAnswerReqI
    >({
      query: (body) => ({ url: `${prefix}/submit`, method: "POST", body }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.id) dispatch(setOnboardingSubmissionId(data.id));
        } catch {
          return;
        }
      },
    }),
  }),
});
export const {
  useOnboardingQuery,
  useSubmitOnboardingMutation,
  useLazyOnboardingQuery,
} = onboardingApi;
