"use server";

import { sql } from "@/lib/db";
import { cleanCnpj, isValidCnpj } from "@/lib/cnpj";

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
};

export type SubmitLeadResult = { ok: true } | { ok: false; error: string };

export async function submitLead(input: SubmitLeadInput): Promise<SubmitLeadResult> {
  // Honeypot preenchido = bot. Responde sucesso para não denunciar a
  // detecção, mas descarta silenciosamente sem gravar nada.
  if (input.honeypot.trim().length > 0) {
    return { ok: true };
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

  try {
    try {
      await sql`
        insert into leads (name, phone, city, city_other, service, gclid, origem_pagina, cnpj, razao_social)
        values (${name}, ${phone}, ${city}, ${cityOther || null}, ${service}, ${input.gclid || null}, ${input.origemPagina}, ${cnpj || null}, ${razaoSocial || null})
      `;
    } catch (err) {
      // 42703 = coluna inexistente: o banco ainda não recebeu o `alter table`
      // de schema.sql. Nunca perder o lead por isso — grava sem o CNPJ.
      if ((err as { code?: string }).code !== "42703") throw err;
      console.error("submitLead: colunas cnpj/razao_social ausentes; aplique src/lib/db/schema.sql", err);
      await sql`
        insert into leads (name, phone, city, city_other, service, gclid, origem_pagina)
        values (${name}, ${phone}, ${city}, ${cityOther || null}, ${service}, ${input.gclid || null}, ${input.origemPagina})
      `;
    }
    return { ok: true };
  } catch (err) {
    console.error("submitLead failed", err);
    return { ok: false, error: "Não foi possível enviar sua solicitação. Tente novamente." };
  }
}
