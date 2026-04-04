export interface LoginReqI {
  phone_number: string;
  email: string;
  password: string;
  pin: string;
  oauth_provider: string;
  oauth_identifier: string;
  os_name: string;
  platform: string;
  visitor_id: string;
  onboarding_id: string;
}

export interface LoginResI {
  access_token: string;
  refresh_token: string;
  expired_at: number;
  need_reset_password: boolean;
  need_set_password: boolean;
  is_onboarding: boolean;
}

export interface NewUserReqI {
  phoneNumber: string;
  email: string;
  name: string;
  seedsTag: string;
  age: number;
  avatar: string;
  refCode: string;
  password: string;
  provider: ProviderI;
  pin: string;
  onboardId: string;
  birthDate?: string;
}

export interface ProviderI {
  provider: string;
  identifier: string;
}

export interface ValidateMessageResI {
  message: string;
}

export interface OTPReqI {
  phoneNumber: string;
  method: string;
}

export interface ResendOTPReqI {
  phoneNumber: string;
  method: string;
  pinId: string;
}

export interface ResendOTPResI {
  message: string;
  otp: string;
  msisdn: string;
  session_id: string;
  try_count: number;
  segment_count: number;
}

export interface OTPResI {
  data: OTPI;
  verihubs_session_id: string;
}

export interface OTPI {
  message: string;
  msisdn: string;
  session_id: string;
  try_count: number;
  segment_count: number;
}

export interface VerifyOTPReqI {
  msisdn: string;
  otp: string;
  pinId: string;
}

export interface VerifyOTPResI {
  message: string;
}
