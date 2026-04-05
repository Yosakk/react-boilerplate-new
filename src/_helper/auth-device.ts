import DeviceDetector from "device-detector-js";

export function getDeviceMeta() {
  if (typeof navigator === "undefined") {
    return { os_name: "Unknown", platform: "desktop_web" };
  }
  const dd = new DeviceDetector();
  const parsed = dd.parse(navigator.userAgent);

  const os_name = parsed.os?.name ?? "Unknown";
  const type = parsed.device?.type ?? "desktop";
  const platform = `${type}_web`;

  return { os_name, platform };
}

export function getOrCreateVisitorId(domain?: string): string {
  const m =
    typeof document !== "undefined"
      ? document.cookie.match(/(?:^|; )visitor_id=([^;]*)/)
      : null;
  if (m?.[1]) return decodeURIComponent(m[1]);

  const id = (
    crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2, 10)
  ).toUpperCase();
  if (typeof document !== "undefined") {
    const expires = new Date(Date.now() + 365 * 864e5).toUTCString();
    document.cookie = `visitor_id=${encodeURIComponent(id)}; Path=/; Expires=${expires}${domain ? `; Domain=${domain}` : ""}; SameSite=Lax`;
  }
  return id;
}
