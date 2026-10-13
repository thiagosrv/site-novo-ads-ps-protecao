// Best-effort brute-force throttle for the admin login. State lives in the
// memory of the serverless instance, so it is not shared across instances or
// cold starts: it slows down a script hammering one warm instance, not a
// distributed attack. The scrypt cost per attempt and the strong password
// hash are the real defense; this just caps cheap, repeated guessing and
// avoids burning CPU on scrypt for requests that are already blocked.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES_PER_IP = 5;
// Ceiling across all IPs, so rotating addresses doesn't bypass the per-IP cap.
// Deliberately higher: a single shared counter can also lock out the real
// admin, and the window clears on its own.
const MAX_FAILURES_GLOBAL = 40;
const MAX_TRACKED_KEYS = 1000;

const failuresByKey = new Map<string, number[]>();

function recentFailures(key: string, now: number): number[] {
  const fresh = (failuresByKey.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (fresh.length === 0) failuresByKey.delete(key);
  else failuresByKey.set(key, fresh);
  return fresh;
}

function pruneIfLarge(now: number) {
  if (failuresByKey.size <= MAX_TRACKED_KEYS) return;
  for (const key of failuresByKey.keys()) recentFailures(key, now);
}

export function clientIpFromHeaders(headers: Headers): string {
  // Vercel sets x-forwarded-for with the real client address first.
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip") || "unknown";
}

export function isLoginBlocked(ip: string, now = Date.now()): boolean {
  return (
    recentFailures(`ip:${ip}`, now).length >= MAX_FAILURES_PER_IP ||
    recentFailures("global", now).length >= MAX_FAILURES_GLOBAL
  );
}

export function recordLoginFailure(ip: string, now = Date.now()): void {
  pruneIfLarge(now);
  for (const key of [`ip:${ip}`, "global"]) {
    failuresByKey.set(key, [...recentFailures(key, now), now]);
  }
}

export function clearLoginFailures(ip: string): void {
  failuresByKey.delete(`ip:${ip}`);
}
