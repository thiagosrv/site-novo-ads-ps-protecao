const GCLID_COOKIE = "_ps_gclid";
const GCLID_MAX_AGE_DAYS = 90;

export function captureGclid() {
  if (typeof window === "undefined") return;
  const gclid = new URLSearchParams(window.location.search).get("gclid");
  if (!gclid) return;
  const maxAge = GCLID_MAX_AGE_DAYS * 24 * 60 * 60;
  document.cookie = `${GCLID_COOKIE}=${encodeURIComponent(gclid)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function getStoredGclid(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${GCLID_COOKIE}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}
