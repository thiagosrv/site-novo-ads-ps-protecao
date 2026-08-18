"use server";

import { sql } from "@/lib/db";

export type SubmitLeadInput = {
  name: string;
  phone: string;
  city: string;
  cityOther: string;
  service: string;
  gclid: string | null;
  origemPagina: string;
  honeypot: string;
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

  try {
    await sql`
      insert into leads (name, phone, city, city_other, service, gclid, origem_pagina)
      values (${name}, ${phone}, ${city}, ${cityOther || null}, ${service}, ${input.gclid || null}, ${input.origemPagina})
    `;
    return { ok: true };
  } catch (err) {
    console.error("submitLead failed", err);
    return { ok: false, error: "Não foi possível enviar sua solicitação. Tente novamente." };
  }
}
