import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidPath } from "@/lib/validPaths";
import { SESSION_COOKIE_NAME } from "@/lib/sessionCookie";

// Path prefixes indexed by search engines during a past domain compromise
// (gambling/casino spam pages that never legitimately existed on this site).
// Matched by prefix, not by an exhaustive URL list, so new junk under the
// same prefixes is covered automatically. Add new prefixes here if more
// leftover spam patterns surface.
const MALICIOUS_PATH_PREFIXES = ["/www-betpawa/", "/bet-31/"];

// 410 tells crawlers the removal is intentional and permanent, which
// de-indexes faster than a generic 404. Cached at the edge so repeat
// crawler hits to the same dead URL don't cost a function invocation.
function goneResponse() {
  return new NextResponse("Gone", {
    status: 410,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable",
    },
  });
}

// Rejects any request path that isn't one of the site's real ~22k routes
// before it reaches page rendering — keeps bot/spam traffic (e.g. leftover
// negative-SEO requests for gambling slugs like /betfair, /bet) from costing
// a function invocation or ISR read.
//
// Named middleware.ts (not proxy.ts) and kept on Edge runtime because the
// Cloudflare Workers adapter (OpenNext) doesn't yet support Next 16's
// Node-runtime proxy convention — see
// https://github.com/opennextjs/opennextjs-cloudflare/issues/962.
// Because of that, this only checks whether the session cookie is present
// (no HMAC verification here, which needs Node's `crypto` module). Full
// cryptographic verification of the cookie still happens server-side in
// getSession()/requireSession() (src/lib/auth.ts) on every admin page load
// and every write Server Action — this was already a second, independent
// check ("defense in depth") before this change, so an invalid or expired
// cookie is still rejected, just one layer later than before.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (MALICIOUS_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return goneResponse();
  }

  if (!isValidPath(pathname)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.).*)",
  ],
};
