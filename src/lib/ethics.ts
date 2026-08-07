export const ETHICS_WHATSAPP_NUMBER = "5519978211077";

export const ETHICS_REPORT_TYPES = [
  "Assédio moral",
  "Assédio sexual",
  "Discriminação",
  "Corrupção ou suborno",
  "Conflito de interesses",
  "Fraude financeira",
  "Descumprimento de normas de segurança",
  "Furto ou desvio de patrimônio",
  "Outro",
];

export type EthicsReportData = {
  reportType: string;
  description: string;
  name: string;
  email: string;
};

export function buildEthicsMessage(data: EthicsReportData): string {
  return (
    "🔒 CANAL DE ÉTICA — Novo Relato\n\n" +
    `Tipo de relato: ${data.reportType}\n\n` +
    `Descrição:\n${data.description}\n\n` +
    `Nome: ${data.name.trim() || "Não informado (anônimo)"}\n` +
    `E-mail para retorno: ${data.email.trim() || "Não informado"}`
  );
}

export function buildEthicsWhatsAppUrl(data: EthicsReportData): string {
  const message = buildEthicsMessage(data);
  return `https://wa.me/${ETHICS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
