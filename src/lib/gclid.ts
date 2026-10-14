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

// Origem da visita: UTMs do anúncio e o site de onde a pessoa veio. O formulário abre
// várias páginas depois da chegada, então `document.referrer` na hora do envio seria só a
// página anterior do próprio site. Guardamos no cookie o que valia na chegada.
const ATTR_COOKIE = "_ps_attr";
const ATTR_MAX_AGE_DAYS = 30;
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
};

export function getStoredAttribution(): Attribution {
  if (typeof document === "undefined") return {};
  try {
    const match = document.cookie.match(new RegExp(`(?:^|; )${ATTR_COOKIE}=([^;]*)`));
    if (!match) return {};
    const parsed: unknown = JSON.parse(decodeURIComponent(match[1]));
    if (typeof parsed !== "object" || parsed === null) return {};
    const result: Attribution = {};
    for (const key of [...UTM_KEYS, "referrer"] as const) {
      const value = (parsed as Record<string, unknown>)[key];
      if (typeof value === "string" && value) result[key] = value;
    }
    return result;
  } catch {
    return {};
  }
}

export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const next: Attribution = { ...getStoredAttribution() };
    let changed = false;

    // Link com UTM = campanha nova: substitui as três de uma vez (não mistura campanhas).
    if (UTM_KEYS.some((key) => params.get(key))) {
      for (const key of UTM_KEYS) {
        const value = params.get(key)?.trim().slice(0, 200);
        if (value) next[key] = value;
        else delete next[key];
      }
      changed = true;
    }

    // Referenciador externo da primeira página da visita; não sobrescreve um já guardado.
    if (!next.referrer && document.referrer) {
      try {
        if (new URL(document.referrer).host !== window.location.host) {
          next.referrer = document.referrer.slice(0, 500);
          changed = true;
        }
      } catch {
        // referrer malformado: ignora
      }
    }

    if (!changed) return;
    const maxAge = ATTR_MAX_AGE_DAYS * 24 * 60 * 60;
    document.cookie = `${ATTR_COOKIE}=${encodeURIComponent(JSON.stringify(next))}; path=/; max-age=${maxAge}; SameSite=Lax`;
  } catch {
    // cookies indisponíveis: o lead segue sem a origem detalhada
  }
}
