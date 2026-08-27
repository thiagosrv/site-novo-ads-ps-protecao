import { neon } from "@neondatabase/serverless";

// Neon's HTTP driver, not the `postgres` package's raw TCP connection: the
// Cloudflare Workers runtime can't reliably hold a direct TCP socket open to
// Neon (`postgres` consistently hit `write CONNECT_TIMEOUT` there, both in
// local `wrangler dev` and on the deployed Worker) — HTTP over fetch is the
// transport Neon documents for edge runtimes like Workers.
const client = neon(process.env.DATABASE_URL!, { fullResults: true });

// Thin adapter matching the `{ rows, rowCount }` shape the call sites were
// already written against (originally @vercel/postgres's `sql` tag), so
// queries.ts/actions.ts needed no changes beyond this file.
export async function sql<T extends object = Record<string, unknown>>(
  strings: TemplateStringsArray,
  ...values: unknown[]
): Promise<{ rows: T[]; rowCount: number }> {
  const result = await client(strings, ...(values as never[]));
  return { rows: result.rows as T[], rowCount: result.rowCount ?? result.rows.length };
}
