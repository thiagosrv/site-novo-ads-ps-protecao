import { neon } from "@neondatabase/serverless";

// Neon's HTTP driver, not the `postgres` package's raw TCP connection: the
// Cloudflare Workers runtime can't reliably hold a direct TCP socket open to
// Neon (`postgres` consistently hit `write CONNECT_TIMEOUT` there, both in
// local `wrangler dev` and on the deployed Worker) — HTTP over fetch is the
// transport Neon documents for edge runtimes like Workers.
//
// Created lazily (on first query) rather than at module load: routes like
// sitemap.ts prerender at build time, where DATABASE_URL isn't set (it's
// only a runtime secret), and `neon()` throws synchronously if called
// without one — which would otherwise fail module evaluation itself, before
// any caller gets a chance to catch it.
let client: ReturnType<typeof neon<false, true>> | null = null;

// Thin adapter matching the `{ rows, rowCount }` shape the call sites were
// already written against (originally @vercel/postgres's `sql` tag), so
// queries.ts/actions.ts needed no changes beyond this file.
export async function sql<T extends object = Record<string, unknown>>(
  strings: TemplateStringsArray,
  ...values: unknown[]
): Promise<{ rows: T[]; rowCount: number }> {
  client ??= neon(process.env.DATABASE_URL!, { fullResults: true });
  const result = await client(strings, ...(values as never[]));
  return { rows: result.rows as T[], rowCount: result.rowCount ?? result.rows.length };
}
