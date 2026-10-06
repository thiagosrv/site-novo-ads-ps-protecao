// Utilitários de CNPJ. Funções puras (sem I/O) para servir tanto o formulário
// no navegador quanto a validação no servidor.
//
// A partir de julho/2026 a Receita Federal emite CNPJs alfanuméricos (as 12
// primeiras posições aceitam A-Z e 0-9; os 2 dígitos verificadores continuam
// numéricos). O cálculo do DV é o mesmo do CNPJ numérico, usando
// (código ASCII do caractere - 48) como valor — por isso tudo aqui aceita ambos.

const WEIGHTS_DV1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
const WEIGHTS_DV2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

// Mantém só 0-9/A-Z (maiúsculo), no máximo 14 posições.
export function cleanCnpj(value: string): string {
  return value
    .toUpperCase()
    .replace(/[^0-9A-Z]/g, "")
    .slice(0, 14);
}

// Máscara progressiva XX.XXX.XXX/XXXX-DD.
export function maskCnpj(value: string): string {
  const c = cleanCnpj(value);
  const len = c.length;
  if (len <= 2) return c;
  if (len <= 5) return `${c.slice(0, 2)}.${c.slice(2)}`;
  if (len <= 8) return `${c.slice(0, 2)}.${c.slice(2, 5)}.${c.slice(5)}`;
  if (len <= 12) return `${c.slice(0, 2)}.${c.slice(2, 5)}.${c.slice(5, 8)}/${c.slice(8)}`;
  return `${c.slice(0, 2)}.${c.slice(2, 5)}.${c.slice(5, 8)}/${c.slice(8, 12)}-${c.slice(12)}`;
}

function checkDigit(chars: string, weights: number[]): number {
  let sum = 0;
  for (let i = 0; i < weights.length; i++) {
    sum += (chars.charCodeAt(i) - 48) * weights[i];
  }
  const rest = sum % 11;
  return rest < 2 ? 0 : 11 - rest;
}

export function isValidCnpj(value: string): boolean {
  const c = cleanCnpj(value);
  if (c.length !== 14) return false;
  // Os 2 últimos caracteres (DV) são sempre numéricos.
  if (!/^[0-9A-Z]{12}[0-9]{2}$/.test(c)) return false;
  // Sequências repetidas (00000000000000, 11111111111111…) passam no cálculo, mas não existem.
  if (/^(.)\1{13}$/.test(c)) return false;
  const dv1 = checkDigit(c, WEIGHTS_DV1);
  const dv2 = checkDigit(c.slice(0, 12) + dv1, WEIGHTS_DV2);
  return c[12] === String(dv1) && c[13] === String(dv2);
}

export type CnpjLookup =
  | { status: "found"; razaoSocial: string; situacao: string }
  | { status: "not_found" }
  | { status: "error" };

const LOOKUP_TIMEOUT_MS = 6000;

// Consulta pública e gratuita (dados da Receita Federal) via BrasilAPI. É um
// "extra": qualquer falha/demora devolve `error` e NUNCA deve bloquear o envio.
export async function lookupCnpj(value: string, signal?: AbortSignal): Promise<CnpjLookup> {
  const cnpj = cleanCnpj(value);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), LOOKUP_TIMEOUT_MS);
  const onAbort = () => controller.abort();
  signal?.addEventListener("abort", onAbort);
  try {
    const res = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`, {
      signal: controller.signal,
    });
    // 400/404 = a base não conhece esse CNPJ (typo com DV válido, empresa muito
    // nova ou CNPJ alfanumérico que a API ainda não indexa).
    if (res.status === 404 || res.status === 400) return { status: "not_found" };
    if (!res.ok) return { status: "error" };
    const data = (await res.json()) as {
      razao_social?: string;
      descricao_situacao_cadastral?: string;
    };
    if (!data.razao_social) return { status: "not_found" };
    return {
      status: "found",
      razaoSocial: data.razao_social,
      situacao: data.descricao_situacao_cadastral ?? "",
    };
  } catch {
    return { status: "error" };
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", onAbort);
  }
}
