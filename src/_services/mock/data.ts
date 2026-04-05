/**
 * Static mock data for all API endpoints.
 * Active when VITE_MOCK_API=true in .env
 *
 * To enable: add VITE_MOCK_API=true to .env.development
 * To disable: remove it or set to false
 */

import type { LoginResI } from "@/_interfaces/auth.interfaces";
import type { UserAuthenticatedResI } from "@/_interfaces/profile.interfaces";
import type {
  OnboardingResI,
  OnboardingAnswerResI,
} from "@/_interfaces/onboarding.interfaces";

// ── Auth ──────────────────────────────────────────
export const MOCK_LOGIN_RESPONSE: LoginResI = {
  access_token: "mock-access-token-xxx",
  refresh_token: "mock-refresh-token-xxx",
  expired_at: Date.now() + 86400000,
  need_reset_password: false,
  need_set_password: false,
  is_onboarding: false,
};

export const MOCK_VALIDATE_RESPONSE = {
  message: "valid",
};

export const MOCK_OTP_RESPONSE = {
  data: {
    message: "OTP sent",
    msisdn: "628123456789",
    session_id: "mock-session-id",
    try_count: 1,
    segment_count: 1,
  },
  verihubs_session_id: "mock-verihubs-session",
};

export const MOCK_VERIFY_OTP_RESPONSE = {
  message: "OTP verified",
};

// ── User ──────────────────────────────────────────
export const MOCK_USER_INFO: UserAuthenticatedResI = {
  id: "mock-user-001",
  phoneNumber: "628123456789",
  email: "user@seeds.finance",
  birthDate: "1995-06-15",
  name: "Seeds User",
  seedsTag: "seedsuser",
  refCode: "REF123",
  avatar: "",
  preferredLanguage: "en",
  preferredCurrency: "IDR",
  bio: "Mock user for development",
  pin: true,
  followers: 42,
  following: 18,
  posts: 7,
  region: "ID",
  verified: true,
  email_verification: true,
  badge: "gold",
  claims: {
    sub: "mock-user-001",
    phoneNumber: "628123456789",
    email: "user@seeds.finance",
    birthDate: "1995-06-15",
    name: "Seeds User",
    seedsTag: "seedsuser",
    refCode: "REF123",
    avatar: "",
    role: "user",
    language: "en",
    currency: "IDR",
    iss: "seeds",
    aud: ["seeds-app"],
    exp: Date.now() + 86400,
    nbf: Date.now(),
    iat: Date.now(),
  },
  refCodeUsage: 3,
  label: "active",
  currentExp: 1250,
  isPasswordExists: true,
  visitorId: "mock-visitor",
};

// ── Onboarding ────────────────────────────────────
export const MOCK_ONBOARDING_RESPONSE: OnboardingResI = {
  data: [
    {
      question_number: 1,
      question: "What is your investment goal?",
      options: [
        {
          header: "Grow Wealth",
          body: "Long-term growth",
          image: "",
        },
        {
          header: "Save for Future",
          body: "Future planning",
          image: "",
        },
        {
          header: "Learn Investing",
          body: "Education",
          image: "",
        },
      ],
    },
    {
      question_number: 2,
      question: "What best describes your risk tolerance?",
      options: [
        {
          header: "Conservative",
          body: "Low risk",
          image: "",
        },
        {
          header: "Moderate",
          body: "Balanced",
          image: "",
        },
        {
          header: "Aggressive",
          body: "High risk",
          image: "",
        },
      ],
    },
    {
      question_number: 3,
      question: "How long do you plan to invest?",
      options: [
        {
          header: "< 1 year",
          body: "Short-term",
          image: "",
        },
        {
          header: "1-3 years",
          body: "Medium-term",
          image: "",
        },
        {
          header: "> 3 years",
          body: "Long-term",
          image: "",
        },
      ],
    },
    {
      question_number: 4,
      question: "Which topics interest you? (Select multiple)",
      options: [
        {
          header: "Stocks",
          body: "Equities",
          image: "",
        },
        {
          header: "Crypto",
          body: "Digital assets",
          image: "",
        },
        {
          header: "Mutual Funds",
          body: "Diversified",
          image: "",
        },
        {
          header: "Bonds",
          body: "Fixed income",
          image: "",
        },
      ],
    },
    {
      question_number: 5,
      question: "How did you hear about Seeds? (Select multiple)",
      options: [
        {
          header: "Social Media",
          body: "",
          image: "",
        },
        {
          header: "Friends",
          body: "",
          image: "",
        },
        {
          header: "App Store",
          body: "",
          image: "",
        },
        {
          header: "News",
          body: "",
          image: "",
        },
      ],
    },
  ],
  metadata: {
    total: 5,
    current_page: 1,
    limit: 10,
    total_page: 1,
  },
};

export const MOCK_ONBOARDING_SUBMIT_RESPONSE: OnboardingAnswerResI = {
  id: "mock-submission-001",
  user_id: "mock-user-001",
  items: { question: "", answer: [] },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

// ── SSO ───────────────────────────────────────────
export const MOCK_GOOGLE_USER_INFO = {
  sub: "mock-google-sub",
  name: "Seeds User",
  given_name: "Seeds",
  family_name: "User",
  picture: "",
  email: "user@gmail.com",
  email_verified: true,
  locale: "en",
};
