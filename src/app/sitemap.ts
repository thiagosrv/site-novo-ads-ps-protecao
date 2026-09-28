import type { MetadataRoute } from "next";
import { CITIES, type City } from "@/lib/cities";
import { SERVICES } from "@/lib/services";
import { SEGMENTS } from "@/lib/segments";
import {
  buildComboSlug,
  buildHubSlug,
  buildSegmentComboSlug,
  buildCategoryFlatSlugA,
  buildCategoryFlatSlugB,
  buildCategoryNestedPath,
  buildSegmentNestedPath,
  buildServiceNestedPath,
  CATEGORY_ORDER,
} from "@/lib/programmatic";
import { SITE_URL } from "@/lib/seo";
import { listPublishedPosts } from "@/lib/blog/queries";
import { CITIES_PER_SITEMAP_SHARD, getSitemapShardCount } from "@/lib/sitemap-shards";

const HQ_CITY_SLUG = "americana";

export const revalidate = 3600;

// Total URL count (~86k across 304 cities) exceeds the 50,000 URL/sitemap-file
// protocol limit, so this route is sharded by city via generateSitemaps.
// Shards are served at /sitemap/[id].xml; the index at /sitemap.xml
// (src/app/sitemap.xml/route.ts) lists all of them for search engines.
export async function generateSitemaps() {
  return Array.from({ length: getSitemapShardCount() }, (_, id) => ({ id }));
}

function buildCityRoutes(city: City): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/${city.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: city.slug === HQ_CITY_SLUG ? 0.9 : 0.7,
    },
    {
      url: `${SITE_URL}/${buildHubSlug(city)}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  for (const service of SERVICES) {
    routes.push(
      {
        url: `${SITE_URL}/${buildComboSlug(service, city)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      },
      {
        url: `${SITE_URL}${buildServiceNestedPath(service, city)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      }
    );
  }

  for (const segment of SEGMENTS) {
    for (const category of segment.relevantCategories) {
      routes.push(
        {
          url: `${SITE_URL}/${buildSegmentComboSlug(category, segment, city)}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.5,
        },
        {
          url: `${SITE_URL}${buildSegmentNestedPath(category, segment, city)}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.5,
        }
      );
    }
  }

  for (const category of CATEGORY_ORDER) {
    routes.push(
      {
        url: `${SITE_URL}/${buildCategoryFlatSlugA(category, city)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      },
      {
        url: `${SITE_URL}/${buildCategoryFlatSlugB(category, city)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      },
      {
        url: `${SITE_URL}${buildCategoryNestedPath(category, city)}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      }
    );
  }

  return routes;
}

export default async function sitemap({
  id,
}: {
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const shardId = Number(await id);
  const shardCities = CITIES.slice(
    shardId * CITIES_PER_SITEMAP_SHARD,
    (shardId + 1) * CITIES_PER_SITEMAP_SHARD
  );
  const cityRoutes = shardCities.flatMap(buildCityRoutes);

  // Static routes and blog posts only need to appear once, so they're
  // attached to the first shard rather than repeated across every shard.
  if (shardId !== 0) {
    return cityRoutes;
  }

  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "monthly" as const },
    { path: "/servicos", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/sobre", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/sobre/recrutamento-e-triagem", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/sobre/seguranca-do-trabalho", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/servicos/padrao-operacional-e-supervisao", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/servicos/portaria", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/servicos/limpeza", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/tecnologia", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/duvidas", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/contato", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/privacidade", priority: 0.3, changeFrequency: "yearly" as const },
  ].map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Falls back to no post routes instead of failing the whole sitemap (and,
  // since this route prerenders at build time, the whole build) if the DB
  // isn't reachable yet — e.g. DATABASE_URL not set in the build environment.
  // Real post URLs reappear once revalidate (1h) or a publish/edit/delete
  // triggers a fresh render with DB access.
  const posts = await listPublishedPosts().catch((error) => {
    console.error("sitemap: failed to load published posts", error);
    return [];
  });
  const postRoutes = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes, ...cityRoutes];
}
