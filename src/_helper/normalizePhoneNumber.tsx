import type { Country } from "@/components/ui/input/phoneNumber";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export function NormalizeLocalPart(
  raw: string,
  countryCode: string,
  dial: string
) {
  const input = String(raw || "");
  const asIntl = input.trim();
  if (/^\+|\b00|\b011/.test(asIntl)) {
    const p = parsePhoneNumberFromString(asIntl);
    if (p?.nationalNumber) return p.nationalNumber;
  }
  const p2 = parsePhoneNumberFromString(input, countryCode as any);
  if (p2?.nationalNumber) return p2.nationalNumber;
  let digits = input.replace(/\D/g, "");
  const dialDigits = dial.replace(/\D/g, "");
  if (digits.startsWith(dialDigits)) digits = digits.slice(dialDigits.length);
  if (dial !== "+1" && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
}

export const NormalizePhoneForRequired = (raw: unknown, country?: string) => {
  const s = String(raw ?? "").trim();
  const digits = s.replace(/\D/g, "");
  if (!digits) return "";

  const iso = (country || "ID").toUpperCase();
  try {
    const parsed = s.startsWith("+")
      ? parsePhoneNumberFromString(s)
      : parsePhoneNumberFromString(digits, iso as any);
    if (!parsed || !parsed.isPossible()) return "";
    return s;
  } catch {
    return "";
  }
};

export function FormatNationalForDisplay(number: string, country: Country) {
  if (country.dial === "+1") {
    const cleaned = number.replace(/\D/g, "");
    const m = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (m) return `(${m[1]}) ${m[2]}-${m[3]}`;
  }
  return number;
}
