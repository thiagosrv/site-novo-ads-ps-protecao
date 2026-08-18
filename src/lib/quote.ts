import { PRIORITY_CITIES } from "@/lib/cities";

export const QUOTE_WHATSAPP_NUMBER = "5519982892037";

// Valores usados tanto na option do <select> quanto no evento `lead_formulario`
// do dataLayer (campo `servico`), então mudar o `value` aqui também muda o
// que chega no GTM.
export const SERVICE_OPTIONS = [
  { value: "portaria", label: "Portaria" },
  { value: "limpeza", label: "Limpeza" },
  { value: "facilities", label: "Ambos (Portaria + Limpeza)" },
  { value: "outros", label: "Outro" },
] as const;

export type ServiceValue = (typeof SERVICE_OPTIONS)[number]["value"];

export function serviceLabelFor(value: string): string {
  return SERVICE_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

export const QUOTE_OTHER_CITY_VALUE = "outra";

// Slugs das cidades no <select>, reaproveitando a mesma lista curada de
// PRIORITY_CITIES usada em outras partes do site — o valor enviado ao
// dataLayer (`cidade`) é sempre um slug estável.
export const QUOTE_CITY_OPTIONS = [
  ...PRIORITY_CITIES.map((city) => ({ value: city.slug, label: city.name })),
  { value: QUOTE_OTHER_CITY_VALUE, label: "Outra cidade" },
];

export function cityLabelFor(slug: string): string {
  return QUOTE_CITY_OPTIONS.find((option) => option.value === slug)?.label ?? slug;
}

export type QuoteFormData = {
  name: string;
  phone: string;
  city: string;
  cityOther: string;
  service: string;
};

export function buildQuoteMessage(data: QuoteFormData): string {
  const cityName =
    data.city === QUOTE_OTHER_CITY_VALUE ? data.cityOther.trim() : cityLabelFor(data.city);
  return `Olá, me chamo ${data.name} e preciso de uma cotação de ${serviceLabelFor(
    data.service
  )} em ${cityName}. Obrigado(a)!`;
}

export function buildWhatsAppUrl(message?: string): string {
  return message
    ? `https://wa.me/${QUOTE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${QUOTE_WHATSAPP_NUMBER}`;
}

// Máscara progressiva (00) 00000-0000 — campo é sempre WhatsApp/celular
// (11 dígitos: DDD + 9 + 8 dígitos).
export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  const len = digits.length;
  if (len === 0) return "";
  if (len <= 2) return `(${digits}`;
  if (len <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function isValidPhone(value: string): boolean {
  return value.replace(/\D/g, "").length === 11;
}

const STORAGE_KEY = "ps-quote-payload";

export type QuotePayload = {
  message: string;
  name: string;
};

export function saveQuotePayload(payload: QuotePayload) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // sessionStorage unavailable (private mode, etc.) — /obrigado falls back to a generic message
  }
}

export function readAndClearQuotePayload(): QuotePayload | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    sessionStorage.removeItem(STORAGE_KEY);
    return JSON.parse(raw) as QuotePayload;
  } catch {
    return null;
  }
}
