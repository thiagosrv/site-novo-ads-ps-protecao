// Reenvio dos leads do formulário que não chegaram ao CRM (fila em `leads.crm_status`).
// Chamado pelo cron da Vercel (vercel.json). A Vercel manda `Authorization: Bearer
// <CRON_SECRET>` quando a variável CRON_SECRET existe no projeto; sem ela a rota recusa tudo.

import { timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { reenviarPendentes } from "@/lib/crm-entrega";

// Até 10 leads por rodada, cada um com no máximo ~8 s de espera pelo CRM.
export const maxDuration = 120;

function autorizado(request: NextRequest): boolean {
  const segredo = process.env.CRON_SECRET?.trim();
  if (!segredo) return false;
  const recebido = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim() ?? "";
  const a = Buffer.from(recebido);
  const b = Buffer.from(segredo);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function GET(request: NextRequest) {
  if (!autorizado(request)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  try {
    const resumo = await reenviarPendentes(10);
    if (resumo.falhas > 0 || resumo.esquemaAusente) {
      console.error("[cron/reenviar-leads]", resumo);
    }
    return NextResponse.json({ ok: true, ...resumo });
  } catch (erro) {
    console.error("[cron/reenviar-leads] falhou", erro);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
