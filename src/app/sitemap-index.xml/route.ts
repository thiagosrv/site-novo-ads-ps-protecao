import { SITE_URL } from "@/lib/seo";
import { getSitemapShardCount } from "@/lib/sitemap-shards";

export const revalidate = 3600;

// Hand-rolled sitemap index: app/sitemap.ts uses generateSitemaps to shard
// city routes across /sitemap/[id].xml files (Google's 50,000 URL/file
// limit), and Next.js doesn't auto-generate an index for that convention.
//
// This can't live at app/sitemap.xml/route.ts: Next's metadata-route
// conflict check reserves the literal /sitemap.xml path for the special
// app/sitemap.ts file (via generateSitemaps) regardless of the fact that it
// actually serves /sitemap/[id].xml. So this route lives at a different
// path and next.config.ts rewrites the public /sitemap.xml URL to it —
// that's what robots.ts and Search Console should be pointed at.
export async function GET() {
  const shardCount = getSitemapShardCount();
  const lastmod = new Date().toISOString();

  const entries = Array.from(
    { length: shardCount },
    (_, id) =>
      `  <sitemap>\n    <loc>${SITE_URL}/sitemap/${id}.xml</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>`
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</sitemapindex>\n`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
