"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre Nós", href: "#diferenciais" },
  { label: "Serviços", href: "#servicos" },
  { label: "Dúvidas", href: "#duvidas" },
  { label: "Blog", href: "#blog" },
  { label: "Contato", href: "#contato" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-lg shadow-sm border-b border-navy/10">
      <nav className="flex justify-between items-center px-6 md:px-8 py-4 max-w-[var(--container-max)] mx-auto">
        <a href="#inicio" className="flex items-center gap-3">
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
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link, i) =>
            i === 0 ? (
              <a
                key={link.href}
                href={link.href}
                className="text-yellow-dark border-b-2 border-yellow pb-1 font-mono text-xs tracking-wide"
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-graphite/60 hover:text-navy transition-colors font-mono text-xs tracking-wide"
              >
                {link.label}
              </a>
            )
          )}
        </div>

        <a
          href="#contato"
          className="hidden md:inline-flex bg-yellow text-navy px-6 py-2.5 rounded-full font-heading text-sm font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          Solicitar proposta
        </a>

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
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-graphite font-mono text-sm tracking-wide"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setOpen(false)}
            className="bg-yellow text-navy px-6 py-3 rounded-full font-heading text-sm font-bold text-center"
          >
            Solicitar proposta
          </a>
        </div>
      )}
    </header>
  );
}
