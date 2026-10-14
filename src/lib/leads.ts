"use server";

import { after } from "next/server";
import { headers } from "next/headers";
import { sql } from "@/lib/db";
import { cleanCnpj, isValidCnpj } from "@/lib/cnpj";
import {
  enviarAoCrm,
  registrarResultado,
  reenviarPendentes,
  tentarEmSegundoPlano,
  type LeadParaCrm,
} from "@/lib/crm-entrega";

export type SubmitLeadInput = {
  name: string;
  phone: string;
  city: string;
  cityOther: string;
  service: string;
  gclid: string | null;
  origemPagina: string;
  honeypot: string;
  cnpj?: string;
  razaoSocial?: string;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  referrer?: string | null;
};

// `protocolo` é o número que liga a conversa do WhatsApp ao card do CRM. Vem nulo quando
// o CRM não respondeu a tempo: o lead está salvo e será reenviado, e o visitante segue para
// o WhatsApp do mesmo jeito.
export type SubmitLeadResult = { ok: true; protocolo: string | null } | { ok: false; error: string };

function limpar(valor: string | null | undefined, limite: number): string | null {
  const texto = valor?.trim().slice(0, limite);
  return texto ? texto : null;
}

export async function submitLead(input: SubmitLeadInput): Promise<SubmitLeadResult> {
  // Honeypot preenchido = bot. Responde sucesso para não denunciar a
  // detecção, mas descarta silenciosamente sem gravar nada.
  if (input.honeypot.trim().length > 0) {
    return { ok: true, protocolo: null };
  }

  const name = input.name.trim();
  const phone = input.phone.replace(/\D/g, "");
  const city = input.city.trim();
  const cityOther = input.cityOther.trim();
  const service = input.service.trim();

  if (name.length < 2 || phone.length < 10 || !city || !service) {
    return { ok: false, error: "Preencha todos os campos obrigatórios corretamente." };
  }

  // CNPJ obrigatório e com dígitos verificadores válidos (o cliente também
  // valida, aqui é a checagem que não dá para burlar).
  const cnpj = cleanCnpj(input.cnpj ?? "");
  if (!isValidCnpj(cnpj)) {
    return { ok: false, error: "Informe um CNPJ válido para solicitar a cotação." };
  }
  // Razão social vem da consulta no navegador: só informativa, limitada em tamanho.
  const razaoSocial = (input.razaoSocial ?? "").trim().slice(0, 200);

  const gclid = limpar(input.gclid, 500);
  const origemPagina = limpar(input.origemPagina, 500);
  const utmSource = limpar(input.utmSource, 200);
  const utmMedium = limpar(input.utmMedium, 200);
  const utmCampaign = limpar(input.utmCampaign, 200);
  const referrer = limpar(input.referrer, 500);

  // O id do lead é gerado aqui (e não pelo banco) para o envio ao CRM poder seguir mesmo
  // que o banco do site esteja fora do ar.
  const id = crypto.randomUUID();
  let gravado = false;
  try {
    await gravarLead({
      id,
      name,
      phone,
      city,
      cityOther,
      service,
      gclid,
      origemPagina,
      cnpj,
      razaoSocial,
      utmSource,
      utmMedium,
      utmCampaign,
      referrer,
    });
    gravado = true;
  } catch (err) {
    console.error("submitLead: falha ao gravar no banco do site", err);
  }

  const cabecalhos = await headers();
  const ipVisitante =
    cabecalhos.get("x-forwarded-for")?.split(",")[0]?.trim() || cabecalhos.get("x-real-ip") || null;

  const lead: LeadParaCrm = {
    envioId: id,
    nome: name,
    telefone: phone,
    empresa: razaoSocial || null,
    cnpj: cnpj || null,
    cidade: cityOther || city,
    servico: service,
    gclid,
    paginaOrigem: origemPagina,
    referrer,
    utmSource,
    utmMedium,
    utmCampaign,
    ipVisitante,
  };

  const resultado = await enviarAoCrm(lead);

  if (gravado) {
    const status = await registrarResultado(id, resultado, false);
    if (status === "pendente") {
      // Não chegou ao CRM agora: o visitante segue sem esperar e as novas tentativas
      // rodam depois da resposta. O que sobrar vai para a fila do cron.
      after(async () => {
        await tentarEmSegundoPlano(lead);
      });
    }
  } else if (!resultado.ok) {
    // Nem o banco do site nem o CRM aceitaram: nada foi guardado, o visitante precisa tentar de novo.
    return { ok: false, error: "Não foi possível enviar sua solicitação. Tente novamente." };
  }

  // Um lead novo é também a chance de esvaziar a fila de quem ficou para trás (o cron roda
  // uma vez por dia). Roda depois da resposta e nunca interfere no envio.
  after(async () => {
    try {
      await reenviarPendentes(5);
    } catch (err) {
      console.error("submitLead: reenvio oportunista falhou", err);
    }
  });

  return { ok: true, protocolo: resultado.ok ? resultado.protocolo : null };
}

type LeadGravado = {
  id: string;
  name: string;
  phone: string;
  city: string;
  cityOther: string;
  service: string;
  gclid: string | null;
  origemPagina: string | null;
  cnpj: string;
  razaoSocial: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  referrer: string | null;
};

async function gravarLead(l: LeadGravado): Promise<void> {
  // 42703 = coluna inexistente: o banco ainda não recebeu o `alter table` de schema.sql.
  // Nunca perder o lead por isso: cai para o conjunto de colunas que o banco já tem.
  const colunaAusente = (err: unknown) => (err as { code?: string }).code === "42703";

  try {
    await sql`
      insert into leads (id, name, phone, city, city_other, service, gclid, origem_pagina, cnpj, razao_social, utm_source, utm_medium, utm_campaign, referrer)
      values (${l.id}, ${l.name}, ${l.phone}, ${l.city}, ${l.cityOther || null}, ${l.service}, ${l.gclid}, ${l.origemPagina}, ${l.cnpj || null}, ${l.razaoSocial || null}, ${l.utmSource}, ${l.utmMedium}, ${l.utmCampaign}, ${l.referrer})
    `;
    return;
  } catch (err) {
    if (!colunaAusente(err)) throw err;
    console.error("submitLead: colunas de rastreio/entrega ausentes; aplique src/lib/db/schema.sql", err);
  }

  try {
    await sql`
      insert into leads (id, name, phone, city, city_other, service, gclid, origem_pagina, cnpj, razao_social)
      values (${l.id}, ${l.name}, ${l.phone}, ${l.city}, ${l.cityOther || null}, ${l.service}, ${l.gclid}, ${l.origemPagina}, ${l.cnpj || null}, ${l.razaoSocial || null})
    `;
    return;
  } catch (err) {
    if (!colunaAusente(err)) throw err;
    console.error("submitLead: colunas cnpj/razao_social ausentes; aplique src/lib/db/schema.sql", err);
  }

  await sql`
    insert into leads (id, name, phone, city, city_other, service, gclid, origem_pagina)
    values (${l.id}, ${l.name}, ${l.phone}, ${l.city}, ${l.cityOther || null}, ${l.service}, ${l.gclid}, ${l.origemPagina})
  `;
}
