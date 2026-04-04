export interface OnboardingResI {
  data: OnboardingI[]
  metadata: MetadataI
}

export interface OnboardingI {
  question_number: number
  question: string
  options: OptionI[]
}

export interface OptionI {
  header: string
  body: string
  image: string
}

export interface MetadataI {
  total: number
  current_page: number
  limit: number
  total_page: number
}

export interface OnboardingReqI {
  page: number;
  limit: number;
  language: string;
}

export interface AnswerOption {
  header: string;
  body?: string;
  image?: string;
};

export interface OnboardingAnswerReqI {
  id: string
  data: OnboardingAnswerI[]
}

export interface OnboardingAnswerI {
  question: string
  answer: AnswerI[]
}

export interface AnswerI {
  header: string
  body: string
  image: string
}

export interface OnboardingAnswerResI {
  id: string
  user_id: string
  items: ItemsI
  created_at: string
  updated_at: string
}

export interface ItemsI {
  question: string
  answer: AnswerI[]
}
