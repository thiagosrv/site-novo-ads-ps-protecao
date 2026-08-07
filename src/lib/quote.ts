export const QUOTE_WHATSAPP_NUMBER = "5519982892037";

export const QUOTE_SERVICE_CATEGORIES = [
  { category: "portaria-controle-acesso", label: "Portaria e Controle de Acesso" },
  { category: "auxiliar-limpeza", label: "Auxiliar de Limpeza" },
  { category: "recepcionista", label: "Recepcionista" },
  { category: "auxiliar-administrativo", label: "Auxiliar Administrativo" },
  { category: "auxiliar-contabil", label: "Auxiliar Contábil" },
  { category: "zeladoria", label: "Zeladoria" },
];

export type QuoteFormData = {
  name: string;
  email: string;
  phone: string;
  cnpj: string;
  city: string;
};

export function buildQuoteMessage(data: QuoteFormData, serviceLabel: string): string {
  return `Olá, me chamo ${data.name} e preciso de uma cotação de ${serviceLabel} em ${data.city} - Meu CNPJ é ${data.cnpj}. Obrigado(a)!`;
}

export function buildWhatsAppUrl(message?: string): string {
  return message
    ? `https://wa.me/${QUOTE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${QUOTE_WHATSAPP_NUMBER}`;
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
