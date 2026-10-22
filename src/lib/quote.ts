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
  cnpj?: string;
  razaoSocial?: string;
};

// Mensagem pré-formatada do WhatsApp: *negrito* e quebras de linha são a sintaxe do próprio app.
// Só entram os dados que o cliente informou (a razão social vem da consulta do CNPJ e pode faltar).
export function buildQuoteMessage(data: QuoteFormData, protocol?: string | null): string {
  const linhas = [
    "*Olá, equipe PS Proteção!* 👋",
    "",
    "Preenchi o formulário no site e gostaria de receber uma cotação.",
    "",
    `*Nome:* ${data.name.trim()}`,
  ];
  if (data.razaoSocial?.trim()) linhas.push(`*Razão social:* ${data.razaoSocial.trim()}`);
  if (data.cnpj?.trim()) linhas.push(`*CNPJ:* ${data.cnpj.trim()}`);
  linhas.push(`*Cidade:* ${data.city.trim()}`, `*Serviço:* ${serviceLabelFor(data.service)}`);
  // O protocolo liga a conversa do WhatsApp ao lead que já está no CRM.
  if (protocol) linhas.push(`*Protocolo:* ${protocol}`);
  linhas.push("", "Aguardo o retorno. Obrigado(a)!");
  return linhas.join("\n");
}

// A página de obrigado escolhe a foto e o texto pelo serviço pedido.
export type ThankYouKind = "portaria" | "limpeza" | "geral";

export function thankYouKindFor(service?: string | null): ThankYouKind {
  if (service === "portaria") return "portaria";
  if (service === "limpeza") return "limpeza";
  return "geral";
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
  service?: string;
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
