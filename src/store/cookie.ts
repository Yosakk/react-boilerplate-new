import type Cookies from "cookies-js";

type CookieSetOptions = Parameters<typeof Cookies.set>[2];

type CookieStorageOptions = {
  keyPrefix?: string;
  indexKey?: string;
  expiration?: Record<string, Date | number | null> & {
    default?: Date | number | null;
  };
  setCookieOptions?: CookieSetOptions;
};

export default class CookieStorage {
  private cookies: typeof Cookies;
  private keyPrefix: string;
  private indexKey: string;
  private expiration: Required<CookieStorageOptions>["expiration"];
  private setCookieOptions?: CookieSetOptions;

  constructor(cookies: typeof Cookies, options: CookieStorageOptions = {}) {
    this.cookies = cookies;
    this.keyPrefix = options.keyPrefix ?? "";
    this.indexKey = options.indexKey ?? "reduxPersistIndex";
    this.expiration = options.expiration ?? {};
    if (typeof this.expiration.default === "undefined") {
      this.expiration.default = null;
    }
    this.setCookieOptions = options.setCookieOptions;
  }

  async getItem(key: string): Promise<string | null> {
    const item = this.cookies.get(this.keyPrefix + key) ?? null;
    return item;
  }

  async setItem(key: string, value: string): Promise<void> {
    const options: CookieSetOptions = { ...(this.setCookieOptions ?? {}) };

    let expires = this.expiration.default ?? null;
    if (Object.prototype.hasOwnProperty.call(this.expiration, key)) {
      expires = this.expiration[key] as Date | number | null;
    }
    if (expires) options.expires = expires;

    this.cookies.set(this.keyPrefix + key, value, options);

    const indexOptions: CookieSetOptions = { ...(this.setCookieOptions ?? {}) };
    if (this.expiration.default) indexOptions.expires = this.expiration.default;

    const allKeys = await this.getAllKeys();
    if (!allKeys.includes(key)) {
      allKeys.push(key);
      this.cookies.set(this.indexKey, JSON.stringify(allKeys), indexOptions);
    }
  }

  async removeItem(key: string): Promise<void> {
    this.cookies.expire(this.keyPrefix + key);

    const allKeys = await this.getAllKeys();
    const next = allKeys.filter((k) => k !== key);
    this.cookies.set(
      this.indexKey,
      JSON.stringify(next),
      this.setCookieOptions
    );
  }

  async getAllKeys(): Promise<string[]> {
    const cookie = this.cookies.get(this.indexKey);
    if (!cookie) return [];
    try {
      const parsed = JSON.parse(cookie);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
}
