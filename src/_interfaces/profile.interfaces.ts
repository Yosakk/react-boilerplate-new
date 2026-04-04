export interface UserAuthenticatedResI {
  id: string;
  phoneNumber: string;
  email: string;
  birthDate: string;
  name: string;
  seedsTag: string;
  refCode: string;
  avatar: string;
  preferredLanguage: string;
  preferredCurrency: string;
  bio: string;
  pin: boolean;
  followers: number;
  following: number;
  posts: number;
  region: string;
  verified: boolean;
  email_verification: boolean;
  badge: string;
  claims: ClaimsI;
  refCodeUsage: number;
  label: string;
  currentExp: number;
  isPasswordExists: boolean;
  visitorId: string;
}

export interface ClaimsI {
  sub: string;
  phoneNumber: string;
  email: string;
  birthDate: string;
  name: string;
  seedsTag: string;
  refCode: string;
  avatar: string;
  role: string;
  preferredLanguage: string;
  preferredCurrency: string;
  iss: string;
  aud: string[];
  exp: number;
  nbf: number;
  iat: number;
}
