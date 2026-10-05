// Envio do lead para o CRM comercial da PS. Roda no navegador (o CRM só aceita
// chamadas das origens listadas em LEADS_SITE_ORIGENS) e NUNCA pode travar o
// contato do cliente: qualquer falha ou demora devolve `null` e o fluxo segue
// para o WhatsApp sem protocolo.

const CRM_LEADS_URL =
  process.env.NEXT_PUBLIC_CRM_LEADS_URL ?? "https://crm-thiago-steel.vercel.app/api/leads/site";

const CRM_TIMEOUT_MS = 3000;

// Texto LGPD mostrado no formulário. O CRM guarda exatamente esta frase como
// prova do consentimento, então o que aparece na tela e o que é enviado têm que
// ser a mesma constante.
export const CONSENT_TEXT =
  "Ao enviar, você autoriza a PS Proteção a usar seu nome e WhatsApp para retornar este contato e enviar o orçamento.";

export type CrmLeadInput = {
  name: string;
  phone: string;
  gclid: string | null;
  pagina: string;
  honeypot: string;
};

// Devolve o protocolo (ex.: "4821") ou null se o CRM não respondeu a tempo.
export async function registerLeadInCrm(input: CrmLeadInput): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CRM_TIMEOUT_MS);
  try {
    const res = await fetch(CRM_LEADS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: input.name,
        telefone: input.phone,
        consentimento_texto: CONSENT_TEXT,
        gclid: input.gclid ?? undefined,
        pagina_origem: input.pagina,
        referrer: document.referrer || undefined,
        website: input.honeypot,
      }),
      signal: controller.signal,
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { ok?: boolean; protocolo?: string | null };
    return data.ok && data.protocolo ? String(data.protocolo) : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
