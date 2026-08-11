import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidPath } from "@/lib/validPaths";

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
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (MALICIOUS_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return goneResponse();
  }

  if (!isValidPath(pathname)) {
    return new NextResponse("Not Found", { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.).*)",
  ],
};
