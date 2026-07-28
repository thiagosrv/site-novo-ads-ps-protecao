import type { MetadataRoute } from "next";
import { CITIES } from "@/lib/cities";
import { SITE_URL } from "@/lib/seo";

const HQ_CITY_SLUG = "americana";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "monthly" as const },
    { path: "/servicos", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/sobre", priority: 0.6, changeFrequency: "monthly" as const },
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

  const cityRoutes = CITIES.map((city) => ({
    url: `${SITE_URL}/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: city.slug === HQ_CITY_SLUG ? 0.9 : 0.7,
  }));

  return [...staticRoutes, ...cityRoutes];
}
