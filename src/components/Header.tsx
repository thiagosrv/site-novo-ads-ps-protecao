"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import WhatsAppCta from "./WhatsAppCta";

const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Sobre Nós", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Dúvidas", href: "/duvidas" },
  { label: "Tecnologia", href: "/tecnologia" },
  { label: "Contato", href: "/contato" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-lg shadow-sm border-b border-navy/10">
      <nav className="flex justify-between items-center px-4 sm:px-6 md:px-8 py-3 md:py-4 max-w-[var(--container-max)] mx-auto gap-2">
        <Link href="/" className="flex items-center gap-2 md:gap-3 shrink-0 min-w-0">
          <Image
            src="/brand/logo-ps-protecao.png"
            alt="PS Proteção"
            width={40}
            height={40}
            className="h-8 w-8 md:h-10 md:w-10 object-contain shrink-0"
            priority
          />
          <span className="font-heading text-sm sm:text-base md:text-xl font-bold text-navy tracking-tight whitespace-nowrap">
            PS PROTEÇÃO
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive
                    ? "text-yellow-dark border-b-2 border-yellow pb-1 font-mono text-xs tracking-wide"
                    : "text-graphite/60 hover:text-navy transition-colors font-mono text-xs tracking-wide"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <WhatsAppCta
            href="https://wa.me/5519982892037"
            label="Solicitar proposta"
            className="inline-flex px-3 py-2 text-[10px] sm:text-[11px] md:px-5 md:py-2.5 md:text-[13px] hover:-translate-y-0.5 whitespace-nowrap"
          />

          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="md:hidden text-navy shrink-0"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden bg-surface border-t border-navy/10 px-6 py-6 flex flex-col items-center gap-5 text-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-graphite font-mono text-sm tracking-wide"
            >
              {link.label}
            </Link>
          ))}
          <WhatsAppCta
            href="https://wa.me/5519982892037"
            label="Solicitar proposta"
            onClick={() => setOpen(false)}
            className="px-6 py-3 text-sm"
          />
        </div>
      )}
    </header>
  );
}
