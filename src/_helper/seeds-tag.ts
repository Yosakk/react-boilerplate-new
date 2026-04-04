export function SuggestSeedsTag(raw: string) {
  return (
    (raw || "")
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9_]+/g, "")
      .replace(/^_+|_+$/g, "")
      .slice(0, 15) || "user"
  );
}
