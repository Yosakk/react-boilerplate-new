import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type OnboardingState = {
  submissionId: string | null;
};

const initialState: OnboardingState = {
  submissionId: null,
};

const onboarding = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setOnboardingSubmissionId(state, action: PayloadAction<string | null>) {
      state.submissionId = action.payload;
    },
    resetOnboarding(state) {
      state.submissionId = null;
    },
  },
});

export const { setOnboardingSubmissionId, resetOnboarding } = onboarding.actions;
export default onboarding.reducer;
