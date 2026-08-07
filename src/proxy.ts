import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidPath } from "@/lib/validPaths";

// Rejects any request path that isn't one of the site's real ~22k routes
// before it reaches page rendering — keeps bot/spam traffic (e.g. leftover
// negative-SEO requests for gambling slugs like /betfair, /bet) from costing
// a function invocation or ISR read.
export function proxy(request: NextRequest) {
  if (!isValidPath(request.nextUrl.pathname)) {
    return new NextResponse("Not Found", { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.).*)",
  ],
};
