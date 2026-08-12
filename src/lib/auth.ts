import { randomBytes, scryptSync, timingSafeEqual, createHmac } from "crypto";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/lib/sessionCookie";

export { SESSION_COOKIE_NAME };
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000;
export const SESSION_MAX_AGE_SECONDS = SESSION_DURATION_MS / 1000;

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not set");
  return secret;
}

// Generates the value for ADMIN_PASSWORD_HASH — run once locally, paste the
// output into the Vercel env var, never store the plain password anywhere.
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, hash] = storedHash.split(":");
  if (!salt || !hash) return false;
  const derived = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  if (derived.length !== expected.length) return false;
  return timingSafeEqual(derived, expected);
}

export function verifyCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  if (!adminEmail || !adminPasswordHash) return false;
  if (email.trim().toLowerCase() !== adminEmail.trim().toLowerCase()) return false;
  return verifyPassword(password, adminPasswordHash);
}

function sign(payload: string): string {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("hex");
}

export function createSessionToken(): string {
  const payload = String(Date.now() + SESSION_DURATION_MS);
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expectedBuf = Buffer.from(sign(payload), "hex");
  const signatureBuf = Buffer.from(signature, "hex");
  if (signatureBuf.length !== expectedBuf.length) return false;
  if (!timingSafeEqual(signatureBuf, expectedBuf)) return false;

  const expiresAt = Number(payload);
  return Number.isFinite(expiresAt) && Date.now() <= expiresAt;
}

// Read-only session check for Server Components (admin layout/pages).
export async function getSession(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE_NAME)?.value);
}

// Defense in depth: every write Server Action re-verifies the session
// independently of the proxy gate, since Server Actions are their own
// POST endpoints and don't automatically inherit proxy checks.
export async function requireSession(): Promise<void> {
  const authenticated = await getSession();
  if (!authenticated) {
    throw new Error("Não autorizado.");
  }
}
