export type ConsentStatus = "accepted" | "rejected";

const STORAGE_KEY = "ps-cookie-consent";
const CONSENT_VERSION = "1";
export const CONSENT_CHANGE_EVENT = "ps-cookie-consent-change";

export function getStoredConsent(): ConsentStatus | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { status: ConsentStatus; version: string };
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed.status;
  } catch {
    return null;
  }
}

export function storeConsent(status: ConsentStatus) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ status, version: CONSENT_VERSION, timestamp: Date.now() })
  );
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: status }));
}
