import { MessageCircle } from "lucide-react";
import WhatsAppCta from "./WhatsAppCta";

export type AnchorLink = { href: `#${string}`; label: string };

/**
 * Barra de navegação por âncoras das páginas de serviço (landing pages de Ads).
 * Cada âncora aponta para uma seção com `id` na própria página, o que também
 * serve de URL final para sitelinks e grupos de anúncios (message match).
 * Fica colada sob o header; no mobile rola na horizontal.
 */
export default function LpAnchorNav({
  links,
  ctaLabel = "Pedir proposta",
}: {
  links: AnchorLink[];
  ctaLabel?: string;
}) {
  return (
    <nav
      aria-label="Navegação da página"
      className="sticky top-[56px] md:top-[73px] z-40 bg-white/95 backdrop-blur-md border-b border-navy/10"
    >
      <div className="max-w-[var(--container-max)] mx-auto px-4 md:px-[var(--spacing-grid-margin)] flex items-center gap-3">
        <ul className="flex flex-1 items-center gap-1 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {links.map((link) => (
            <li key={link.href} className="shrink-0">
              <a
                href={link.href}
                className="press-feedback inline-flex items-center rounded-full px-3.5 py-2 font-heading text-[13px] md:text-sm font-semibold text-navy/80 transition-colors hover:bg-navy/5 hover:text-navy"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <WhatsAppCta
          label={
            <>
              <MessageCircle size={15} />
              {ctaLabel}
            </>
          }
          iconSize={15}
          className="shrink-0 px-4 py-2 text-[13px] md:text-sm"
        />
      </div>
    </nav>
  );
}
