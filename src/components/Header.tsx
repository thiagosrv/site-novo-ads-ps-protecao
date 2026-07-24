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
      <nav className="flex justify-between items-center px-6 md:px-8 py-4 max-w-[var(--container-max)] mx-auto">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brand/logo-ps-protecao.png"
            alt="PS Proteção"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="font-heading text-xl font-bold text-navy tracking-tight">
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

        <WhatsAppCta
          href="https://wa.me/5519982892037"
          label="Solicitar proposta"
          className="hidden md:inline-flex px-5 py-2.5 text-[13px] hover:-translate-y-0.5"
        />

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="md:hidden text-navy"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-surface border-t border-navy/10 px-6 py-6 flex flex-col gap-5">
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
