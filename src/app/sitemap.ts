import type { MetadataRoute } from "next";
import { CITIES } from "@/lib/cities";
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

const HQ_CITY_SLUG = "americana";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "monthly" as const },
    { path: "/servicos", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/sobre", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/sobre/recrutamento-e-triagem", priority: 0.5, changeFrequency: "monthly" as const },
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

  const cityRoutes = CITIES.map((city) => ({
    url: `${SITE_URL}/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: city.slug === HQ_CITY_SLUG ? 0.9 : 0.7,
  }));

  const hubRoutes = CITIES.map((city) => ({
    url: `${SITE_URL}/${buildHubSlug(city)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const comboRoutes = CITIES.flatMap((city) =>
    SERVICES.map((service) => ({
      url: `${SITE_URL}/${buildComboSlug(service, city)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }))
  );

  const segmentRoutes = CITIES.flatMap((city) =>
    SEGMENTS.flatMap((segment) =>
      segment.relevantCategories.map((category) => ({
        url: `${SITE_URL}/${buildSegmentComboSlug(category, segment, city)}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.5,
      }))
    )
  );

  const categoryFlatRoutes = CITIES.flatMap((city) =>
    CATEGORY_ORDER.flatMap((category) => [
      {
        url: `${SITE_URL}/${buildCategoryFlatSlugA(category, city)}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.5,
      },
      {
        url: `${SITE_URL}/${buildCategoryFlatSlugB(category, city)}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.5,
      },
    ])
  );

  const categoryNestedRoutes = CITIES.flatMap((city) =>
    CATEGORY_ORDER.map((category) => ({
      url: `${SITE_URL}${buildCategoryNestedPath(category, city)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }))
  );

  const segmentNestedRoutes = CITIES.flatMap((city) =>
    SEGMENTS.flatMap((segment) =>
      segment.relevantCategories.map((category) => ({
        url: `${SITE_URL}${buildSegmentNestedPath(category, segment, city)}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.5,
      }))
    )
  );

  const serviceNestedRoutes = CITIES.flatMap((city) =>
    SERVICES.map((service) => ({
      url: `${SITE_URL}${buildServiceNestedPath(service, city)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }))
  );

  return [
    ...staticRoutes,
    ...cityRoutes,
    ...hubRoutes,
    ...comboRoutes,
    ...segmentRoutes,
    ...categoryFlatRoutes,
    ...categoryNestedRoutes,
    ...segmentNestedRoutes,
    ...serviceNestedRoutes,
  ];
}
