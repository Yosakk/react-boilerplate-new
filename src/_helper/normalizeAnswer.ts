type Span = { text: string; isBold?: boolean; newLine?: boolean };

export function NormalizeSpaces(spans: Span[]): Span[] {
  const PUNCT_RIGHT = /^[.,;:!?%)\]]/;
  const PUNCT_LEFT = /[([“]/;
  const out: Span[] = [];

  for (const raw of spans) {
    const currText = (raw.text ?? "").trim();
    if (!currText && !raw.newLine) continue;

    const prev = out[out.length - 1];
    const needSpace =
      prev &&
      !prev.newLine &&
      !PUNCT_LEFT.test((prev.text ?? "").slice(-1)) &&
      !PUNCT_RIGHT.test(currText) &&
      !(prev.text ?? "").endsWith(" ");

    if (needSpace) out.push({ text: " " });
    out.push({ ...raw, text: currText });
  }

  return out;
}
