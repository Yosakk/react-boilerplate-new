import { IS_MOCK } from "../mock/handler";
import { MOCK_GOOGLE_USER_INFO } from "../mock/data";

export type GoogleUserInfo = {
  sub: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  email?: string;
  email_verified?: boolean;
  locale?: string;
};

export async function fetchGoogleUserInfo(
  accessToken: string
): Promise<GoogleUserInfo | null> {
  if (!accessToken) return null;

  if (IS_MOCK) {
    return MOCK_GOOGLE_USER_INFO;
  }

  try {
    const resp = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!resp.ok) return null;
    return await resp.json();
  } catch {
    return null;
  }
}
