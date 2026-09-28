import { CITIES } from "@/lib/cities";

// Each city contributes ~280 programmatic URLs (hub, service combos, segment
// combos, category variants). Google enforces a 50,000 URL/sitemap-file
// limit, so cities are sharded across multiple sitemap files, each staying
// well under that cap even as more cities or services are added.
export const CITIES_PER_SITEMAP_SHARD = 100;

export function getSitemapShardCount(): number {
  return Math.ceil(CITIES.length / CITIES_PER_SITEMAP_SHARD);
}
