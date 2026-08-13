import postgres from "postgres";

// Neon (or any standard Postgres) via a plain connection string — kept
// outside Vercel's own Postgres/Blob products on purpose, so the DB layer
// doesn't depend on which host eventually serves the app.
const client = postgres(process.env.DATABASE_URL!, { ssl: "require" });

// Thin adapter matching the `{ rows, rowCount }` shape the call sites were
// already written against (originally @vercel/postgres's `sql` tag), so
// queries.ts/actions.ts needed no changes beyond this file.
export async function sql<T extends object = Record<string, unknown>>(
  strings: TemplateStringsArray,
  ...values: unknown[]
): Promise<{ rows: T[]; rowCount: number }> {
  const rows = await client<T[]>(strings, ...(values as never[]));
  return { rows, rowCount: rows.length };
}
