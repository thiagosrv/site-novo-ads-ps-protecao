import { CITIES } from "@/lib/cities";

export const QUOTE_WHATSAPP_NUMBER = "5519982892037";

// Valores usados tanto na option do <select> quanto no evento `lead_formulario`
// do dataLayer (campo `servico`), então mudar o `value` aqui também muda o
// que chega no GTM.
export const SERVICE_OPTIONS = [
  { value: "portaria", label: "Portaria e Controle de Acesso" },
  { value: "limpeza", label: "Limpeza e Conservação" },
  { value: "facilities", label: "Portaria + Limpeza" },
  { value: "recepcao", label: "Recepcionista" },
  { value: "administrativo", label: "Auxiliar Administrativo" },
  { value: "outros", label: "Outro" },
] as const;

export type ServiceValue = (typeof SERVICE_OPTIONS)[number]["value"];

export function serviceLabelFor(value: string): string {
  return SERVICE_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

// Nomes de todas as cidades atendidas (mesma lista usada nas páginas
// programáticas por cidade), ordenados para o autopreenchimento do campo
// "Cidade" — digitável em vez de uma lista fixa curta, para não travar
// orçamentos de cidades fora do pequeno recorte anterior.
export const QUOTE_CITY_NAMES = [...CITIES].map((city) => city.name).sort((a, b) => a.localeCompare(b, "pt-BR"));

export type QuoteFormData = {
  name: string;
  phone: string;
  city: string;
  service: string;
};

export function buildQuoteMessage(data: QuoteFormData): string {
  return `Olá, me chamo ${data.name} e preciso de uma cotação de ${serviceLabelFor(
    data.service
  )} em ${data.city.trim()}. Obrigado(a)!`;
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
