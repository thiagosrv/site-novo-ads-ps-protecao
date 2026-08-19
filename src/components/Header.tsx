"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import WhatsAppCta from "./WhatsAppCta";

const NAV_LINKS = [
  { label: "Início", href: "/" },
  {
    label: "Sobre Nós",
    href: "/sobre",
    children: [
      { label: "Quem Somos", href: "/sobre" },
      { label: "Recrutamento e Triagem", href: "/sobre/recrutamento-e-triagem" },
      { label: "Segurança do Trabalho", href: "/sobre/seguranca-do-trabalho" },
    ],
  },
  {
    label: "Serviços",
    href: "/servicos",
    children: [
      { label: "Todos os Serviços", href: "/servicos" },
      { label: "Padrão Operacional e Supervisão", href: "/servicos/padrao-operacional-e-supervisao" },
    ],
  },
  { label: "Dúvidas", href: "/duvidas" },
  { label: "Tecnologia", href: "/tecnologia" },
  {
    label: "Contato",
    href: "/contato",
    children: [
      { label: "Fale Conosco", href: "/contato" },
      { label: "Canal de Ética", href: "/canal-de-etica" },
    ],
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 bg-white backdrop-blur-lg border-b transition-all duration-300 ${
        scrolled ? "shadow-sm border-navy/10" : "border-transparent"
      }`}
    >
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
            const isActive =
              pathname === link.href ||
              (link.children?.some((child) => pathname === child.href) ?? false);

            if (link.children) {
              return (
                <div key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className={
                      "inline-flex items-center gap-1 font-mono text-xs font-medium tracking-wide " +
                      (isActive
                        ? "text-yellow-dark border-b-2 border-yellow pb-1"
                        : "text-graphite/80 hover:text-navy transition-colors")
                    }
                  >
                    {link.label}
                    <ChevronDown size={12} className="transition-transform group-hover:rotate-180" />
                  </Link>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-150 z-50">
                    <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-navy/10 py-2 min-w-[220px]">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={
                            "block px-5 py-2.5 font-mono text-xs tracking-wide whitespace-nowrap transition-colors " +
                            (pathname === child.href
                              ? "text-yellow-dark bg-yellow/5"
                              : "text-graphite/70 hover:text-navy hover:bg-navy/5")
                          }
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive
                    ? "text-yellow-dark border-b-2 border-yellow pb-1 font-mono text-xs font-medium tracking-wide"
                    : "text-graphite/80 hover:text-navy transition-colors font-mono text-xs font-medium tracking-wide"
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
            className="press-feedback md:hidden text-navy shrink-0"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <div
        className={`mobile-menu-panel md:hidden grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="bg-surface border-t border-navy/10 px-6 py-6 flex flex-col items-center gap-5 text-center">
            {NAV_LINKS.map((link) => {
              if (link.children) {
                return (
                  <div key={link.href} className="flex flex-col items-center gap-3 w-full">
                    <button
                      type="button"
                      onClick={() => setMobileSubOpen((v) => !v)}
                      className="press-feedback inline-flex items-center gap-1.5 text-graphite font-mono text-sm tracking-wide"
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${mobileSubOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      className={`mobile-menu-panel grid transition-all duration-300 ease-out w-full ${
                        mobileSubOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="flex flex-col items-center gap-3">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => {
                                setOpen(false);
                                setMobileSubOpen(false);
                              }}
                              className="text-graphite/70 font-mono text-xs tracking-wide"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-graphite font-mono text-sm tracking-wide"
                >
                  {link.label}
                </Link>
              );
            })}
            <WhatsAppCta
              href="https://wa.me/5519982892037"
              label="Solicitar proposta"
              onClick={() => setOpen(false)}
              className="px-6 py-3 text-sm"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
