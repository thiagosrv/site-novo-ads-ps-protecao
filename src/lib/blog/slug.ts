// Pure, I/O-free — safe to import from client components (e.g. PostEditor's
// live slug preview) as well as Server Actions. DB-backed uniqueness lives
// in actions.ts instead, since that requires @vercel/postgres (server-only).

const DIACRITICS_REGEX = new RegExp("[̀-ͯ]", "g");

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(DIACRITICS_REGEX, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
