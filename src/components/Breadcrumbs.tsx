import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SITE_URL } from "@/lib/seo";

export type BreadcrumbItem = { label: string; href?: string };

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };
}

export default function Breadcrumbs({
  items,
  dark = false,
}: {
  items: BreadcrumbItem[];
  dark?: boolean;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-1.5 text-xs font-mono tracking-wide"
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-1.5">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className={
                  dark
                    ? "text-white/60 hover:text-white transition-colors"
                    : "text-graphite/60 hover:text-navy transition-colors"
                }
              >
                {item.label}
              </Link>
            ) : (
              <span className={dark ? "text-white/90" : "text-navy"}>{item.label}</span>
            )}
            {!isLast && (
              <ChevronRight size={12} className={dark ? "text-white/30" : "text-graphite/30"} />
            )}
          </span>
        );
      })}
    </nav>
  );
}
