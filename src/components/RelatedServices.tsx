import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

export type RelatedLink = { href: string; title: string; text: string };

/**
 * Bloco de linkagem interna: leva o visitante (e o rastreador) para os
 * serviços vizinhos e para as páginas de cidade/segmento relacionadas.
 */
export default function RelatedServices({
  label,
  title,
  links,
  id,
}: {
  label: string;
  title: string;
  links: RelatedLink[];
  id?: string;
}) {
  return (
    <section id={id} className="py-20 md:py-24 bg-white scroll-mt-32 md:scroll-mt-36">
      <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
        <Reveal>
          <div className="mb-10 max-w-2xl mx-auto text-center md:mx-0 md:text-left">
            <SectionLabel color="navy" align="center" className="md:justify-start">
              {label}
            </SectionLabel>
            <h2 className="font-heading text-3xl md:text-[42px] text-navy leading-tight">{title}</h2>
          </div>
        </Reveal>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {links.map((link, i) => (
            <li key={link.href}>
              <Reveal delayMs={i * 70} className="h-full">
                <Link
                  href={link.href}
                  className="group flex h-full flex-col gap-2 rounded-2xl border border-navy/10 bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-yellow hover:shadow-lg"
                >
                  <span className="flex items-center justify-between gap-3 font-heading text-lg font-semibold text-navy">
                    {link.title}
                    <ArrowRight
                      size={18}
                      className="shrink-0 text-yellow-dark transition-transform group-hover:translate-x-1"
                    />
                  </span>
                  <span className="text-sm leading-relaxed text-graphite/70">{link.text}</span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
