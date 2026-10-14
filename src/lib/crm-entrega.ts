// Entrega do lead do formulário ao CRM comercial da PS, feita pelo servidor do site.
//
// Por que no servidor: a chamada feita pelo navegador falhava em silêncio (o visitante
// segue para o WhatsApp de qualquer jeito) e o lead se perdia sem ninguém saber. Aqui o
// lead é gravado primeiro no banco do site e a entrega ao CRM deixa rastro na própria
// linha (`crm_status`, `crm_tentativas`, `crm_erro`...), então nada some sem aparecer.
//
// Idempotência: o `envio_id` enviado ao CRM é o id da linha em `leads`. Reenviar o mesmo
// lead não duplica o card (o CRM ignora um envio_id que já está no histórico do card).
//
// As colunas `crm_*` vêm de src/lib/db/schema.sql. Enquanto o `alter table` não foi
// aplicado no Neon, a entrega funciona igual, só não deixa rastro (todo acesso às colunas
// novas é tolerante a "coluna inexistente").

import { sql } from "@/lib/db";
import { CONSENT_TEXT } from "@/lib/crm";
import { serviceLabelFor } from "@/lib/quote";

const CRM_LEADS_URL =
  process.env.CRM_LEADS_URL ??
  process.env.NEXT_PUBLIC_CRM_LEADS_URL ??
  "https://crm-thiago-steel.vercel.app/api/leads/site";

/** Tempo máximo de uma chamada ao CRM enquanto o visitante espera. */
export const TIMEOUT_PRIMEIRA_TENTATIVA_MS = 4000;
const TIMEOUT_REENVIO_MS = 8000;

/** Esperas (ms) entre as tentativas feitas logo depois da resposta ao visitante. */
export const ESPERAS_EM_SEGUNDO_PLANO_MS = [3000, 10000];

/** Teto de tentativas por lead (somando as de segundo plano, do cron e as oportunistas). */
const MAX_TENTATIVAS = 30;
const JANELA_REENVIO = "14 days";
const INTERVALO_MINIMO_ENTRE_TENTATIVAS = "2 minutes";

export type LeadParaCrm = {
  /** Id da linha em `leads`; vira o `envio_id` do CRM. */
  envioId: string;
  nome: string;
  telefone: string;
  empresa: string | null;
  cnpj: string | null;
  cidade: string;
  servico: string;
  gclid: string | null;
  paginaOrigem: string | null;
  referrer: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  /** IP do visitante, para o limite por IP do CRM contar o visitante e não o servidor. */
  ipVisitante: string | null;
};

export type ResultadoEnvio =
  | { ok: true; protocolo: string | null }
  /** `definitivo`: o CRM recusou os dados; repetir não adianta. */
  | { ok: false; definitivo: boolean; motivo: string };

export type StatusEntrega = "pendente" | "enviado" | "erro" | "rejeitado";

function textoOuNulo(valor: string | null | undefined, limite: number): string | undefined {
  const limpo = valor?.trim().slice(0, limite);
  return limpo ? limpo : undefined;
}

/** Uma chamada ao CRM. Nunca lança: qualquer falha vira `{ ok: false }`. */
export async function enviarAoCrm(
  lead: LeadParaCrm,
  timeoutMs: number = TIMEOUT_PRIMEIRA_TENTATIVA_MS,
): Promise<ResultadoEnvio> {
  const cabecalhos: Record<string, string> = { "Content-Type": "application/json" };
  const token = process.env.LEADS_SITE_TOKEN?.trim();
  if (token) cabecalhos.Authorization = `Bearer ${token}`;
  if (lead.ipVisitante) cabecalhos["X-Visitor-IP"] = lead.ipVisitante.slice(0, 64);

  const controle = new AbortController();
  const relogio = setTimeout(() => controle.abort(), timeoutMs);
  try {
    const resposta = await fetch(CRM_LEADS_URL, {
      method: "POST",
      headers: cabecalhos,
      body: JSON.stringify({
        nome: lead.nome,
        telefone: lead.telefone,
        empresa: textoOuNulo(lead.empresa, 160),
        cnpj: lead.cnpj ?? undefined,
        cidade: textoOuNulo(lead.cidade, 120),
        servico: textoOuNulo(lead.servico, 60),
        servico_rotulo: textoOuNulo(serviceLabelFor(lead.servico), 120),
        envio_id: lead.envioId,
        consentimento_texto: CONSENT_TEXT,
        gclid: textoOuNulo(lead.gclid, 500),
        utm_source: textoOuNulo(lead.utmSource, 200),
        utm_medium: textoOuNulo(lead.utmMedium, 200),
        utm_campaign: textoOuNulo(lead.utmCampaign, 200),
        pagina_origem: textoOuNulo(lead.paginaOrigem, 500),
        referrer: textoOuNulo(lead.referrer, 500),
        website: "",
      }),
      signal: controle.signal,
      cache: "no-store",
    });

    const corpo = (await resposta.json().catch(() => null)) as
      | { ok?: boolean; protocolo?: string | null; erro?: string }
      | null;

    if (resposta.ok && corpo?.ok) {
      return { ok: true, protocolo: corpo.protocolo ? String(corpo.protocolo) : null };
    }

    const motivo = corpo?.erro ?? `http_${resposta.status}`;
    // Só dado inválido é definitivo. 401/403 (token, captcha), 429 e 5xx são problema de
    // configuração ou de momento: o lead fica na fila e é reenviado depois.
    const definitivo = [400, 413, 415, 422].includes(resposta.status);
    return { ok: false, definitivo, motivo };
  } catch (erro) {
    const abortou = erro instanceof Error && erro.name === "AbortError";
    return { ok: false, definitivo: false, motivo: abortou ? "timeout" : "rede" };
  } finally {
    clearTimeout(relogio);
  }
}

function colunaAusente(erro: unknown): boolean {
  return (erro as { code?: string }).code === "42703";
}

/** Marca o início de uma tentativa, para outro processo não reenviar o mesmo lead ao mesmo tempo. */
export async function iniciarTentativa(id: string): Promise<void> {
  try {
    await sql`update leads set crm_ultima_tentativa = now() where id = ${id}`;
  } catch (erro) {
    if (!colunaAusente(erro)) console.error("[crm-entrega] não marcou a tentativa", erro);
  }
}

/**
 * Grava o resultado da tentativa na linha do lead. `esgotado`: não há mais tentativas
 * imediatas; uma falha deixa o lead em `erro` (a fila do cron continua tentando).
 */
export async function registrarResultado(
  id: string,
  resultado: ResultadoEnvio,
  esgotado: boolean,
): Promise<StatusEntrega> {
  const status: StatusEntrega = resultado.ok
    ? "enviado"
    : resultado.definitivo
      ? "rejeitado"
      : esgotado
        ? "erro"
        : "pendente";
  const protocolo = resultado.ok ? resultado.protocolo : null;
  const erro = resultado.ok ? null : resultado.motivo;
  try {
    await sql`
      update leads
      set crm_status = ${status},
          crm_tentativas = crm_tentativas + 1,
          crm_ultima_tentativa = now(),
          crm_enviado_em = case when ${status}::text = 'enviado' then now() else crm_enviado_em end,
          crm_protocolo = coalesce(${protocolo}, crm_protocolo),
          crm_erro = ${erro}
      where id = ${id}
    `;
  } catch (e) {
    if (!colunaAusente(e)) console.error("[crm-entrega] não registrou o resultado", e);
  }
  return status;
}

function esperar(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Tentativas depois que o visitante já recebeu a resposta (roda dentro de `after()`).
 * Se o processo for encerrado antes do fim, o lead continua `pendente` e o reenvio
 * (cron ou oportunista) assume.
 */
export async function tentarEmSegundoPlano(lead: LeadParaCrm): Promise<void> {
  for (let i = 0; i < ESPERAS_EM_SEGUNDO_PLANO_MS.length; i++) {
    await esperar(ESPERAS_EM_SEGUNDO_PLANO_MS[i]);
    await iniciarTentativa(lead.envioId);
    const resultado = await enviarAoCrm(lead, TIMEOUT_REENVIO_MS);
    const ultima = i === ESPERAS_EM_SEGUNDO_PLANO_MS.length - 1;
    const status = await registrarResultado(lead.envioId, resultado, ultima);
    if (status === "enviado" || status === "rejeitado") return;
  }
  console.error("[crm-entrega] lead ainda não entregue ao CRM após as tentativas imediatas", lead.envioId);
}

type LinhaPendente = {
  id: string;
  name: string;
  phone: string;
  city: string;
  city_other: string | null;
  service: string;
  gclid: string | null;
  origem_pagina: string | null;
  cnpj: string | null;
  razao_social: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer: string | null;
};

export type ResumoReenvio = {
  encontrados: number;
  enviados: number;
  rejeitados: number;
  falhas: number;
  /** `true` quando o `alter table` das colunas `crm_*` ainda não foi aplicado no banco. */
  esquemaAusente?: boolean;
};

/** Reenvia os leads que ainda não chegaram ao CRM (cron diário e, de carona, novos envios). */
export async function reenviarPendentes(limite: number): Promise<ResumoReenvio> {
  const resumo: ResumoReenvio = { encontrados: 0, enviados: 0, rejeitados: 0, falhas: 0 };

  let linhas: LinhaPendente[];
  try {
    const consulta = await sql<LinhaPendente>`
      select id, name, phone, city, city_other, service, gclid, origem_pagina, cnpj,
             razao_social, utm_source, utm_medium, utm_campaign, referrer
      from leads
      where crm_status in ('pendente', 'erro')
        and crm_tentativas < ${MAX_TENTATIVAS}
        and created_at > now() - ${JANELA_REENVIO}::interval
        and created_at < now() - ${INTERVALO_MINIMO_ENTRE_TENTATIVAS}::interval
        and (crm_ultima_tentativa is null
             or crm_ultima_tentativa < now() - ${INTERVALO_MINIMO_ENTRE_TENTATIVAS}::interval)
      order by created_at
      limit ${limite}
    `;
    linhas = consulta.rows;
  } catch (erro) {
    if (colunaAusente(erro)) return { ...resumo, esquemaAusente: true };
    throw erro;
  }

  resumo.encontrados = linhas.length;
  for (const linha of linhas) {
    await iniciarTentativa(linha.id);
    const resultado = await enviarAoCrm(
      {
        envioId: linha.id,
        nome: linha.name,
        telefone: linha.phone,
        empresa: linha.razao_social,
        cnpj: linha.cnpj,
        cidade: linha.city_other?.trim() || linha.city,
        servico: linha.service,
        gclid: linha.gclid,
        paginaOrigem: linha.origem_pagina,
        referrer: linha.referrer,
        utmSource: linha.utm_source,
        utmMedium: linha.utm_medium,
        utmCampaign: linha.utm_campaign,
        ipVisitante: null,
      },
      TIMEOUT_REENVIO_MS,
    );
    const status = await registrarResultado(linha.id, resultado, true);
    if (status === "enviado") resumo.enviados++;
    else if (status === "rejeitado") resumo.rejeitados++;
    else resumo.falhas++;
  }
  return resumo;
}
