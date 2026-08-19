"use client";

import { Phone, Siren, Users, Building2, Briefcase } from "lucide-react";
import { usePathname } from "next/navigation";
import Reveal from "./Reveal";
import WhatsAppCta from "./WhatsAppCta";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

const CHANNELS = [
  {
    label: "Telefone Fixo",
    phone: "(19) 3478-7799",
    email: "adm@psprotecao.com.br",
    whatsapp: null,
    icon: Phone,
  },
  {
    label: "Telefone Emergencial",
    phone: "(19) 99781-8615",
    email: "operacional@psprotecao.com.br",
    whatsapp: "5519997818615",
    icon: Siren,
  },
  {
    label: "RH e Ouvidoria",
    phone: "(19) 97821-1077",
    email: "rh@psprotecao.com.br",
    whatsapp: "5519978211077",
    icon: Users,
  },
  {
    label: "Compras e Empresas",
    phone: "(19) 97821-0246",
    email: "empresas@psprotecao.com.br",
    whatsapp: "5519978210246",
    icon: Building2,
  },
  {
    label: "Comercial",
    phone: "(19) 98289-2037",
    email: "comercial@psprotecao.com.br",
    whatsapp: "5519982892037",
    icon: Briefcase,
  },
];

const EMERGENCY_LABEL = "Telefone Emergencial";

export default function ContactSection() {
  const pathname = usePathname();

  function handleWhatsAppClick(numero: string) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "clique_whatsapp",
      numero,
      origem_pagina: pathname,
    });
  }

  return (
    <section
      id="contato"
      className="relative py-20 md:py-[var(--spacing-section)] overflow-hidden bg-gradient-to-b from-navy to-navy-deep"
    >
      <div
        className="absolute inset-0 texture-grid opacity-60 pointer-events-none"
        style={{ maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 75%)" }}
        aria-hidden="true"
      />

      <div className="relative max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
        <Reveal>
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="font-heading text-3xl md:text-[48px] text-white mb-6 leading-tight">
              Pronto para elevar o padrão da sua operação?
            </h2>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              Nossos especialistas estão prontos para realizar um diagnóstico operacional
              gratuito da sua estrutura atual.
            </p>
            <WhatsAppCta label="Solicitar orçamento pelo WhatsApp" className="px-8 py-4" />
          </div>
        </Reveal>

        <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-6 items-stretch">
          {CHANNELS.map((channel) => {
            const isEmergency = channel.label === EMERGENCY_LABEL;
            return (
              <div key={channel.label} className="gradient-border-yellow rounded-2xl p-px h-full">
                <div className="bg-white rounded-[calc(1rem-1px)] h-full p-6 flex flex-col">
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center mb-5 shrink-0 ${
                      isEmergency ? "bg-red-500/10" : "bg-yellow/10"
                    }`}
                  >
                    <channel.icon className={isEmergency ? "text-red-600" : "text-yellow-dark"} size={18} />
                  </div>
                  <div className="font-mono text-xs tracking-widest text-graphite/60 uppercase mb-2">
                    {channel.label}
                  </div>
                  {channel.whatsapp ? (
                    <a
                      href={`https://wa.me/${channel.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleWhatsAppClick(channel.whatsapp as string)}
                      className="font-heading text-[17px] font-bold text-navy leading-snug whitespace-nowrap hover:text-[#25D366] transition-colors inline-block"
                    >
                      {channel.phone}
                    </a>
                  ) : (
                    <a
                      href={`tel:+55${channel.phone.replace(/\D/g, "")}`}
                      className="font-heading text-[17px] font-bold text-navy leading-snug whitespace-nowrap hover:text-navy-deep transition-colors inline-block"
                    >
                      {channel.phone}
                    </a>
                  )}
                  <div className="flex flex-col items-center text-center gap-1 mt-auto pt-4">
                    <span className="font-mono text-xs tracking-widest uppercase text-graphite/40">
                      Email
                    </span>
                    <a
                      href={`mailto:${channel.email}`}
                      className="text-graphite/70 text-sm hover:text-navy transition-colors break-all"
                    >
                      {channel.email}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>

        <Reveal delayMs={120}>
          <div className="relative gradient-border rounded-[2rem] md:rounded-[2.5rem] p-[1.5px]">
            <div className="rounded-[calc(2rem-1.5px)] md:rounded-[calc(2.5rem-1.5px)] overflow-hidden h-[360px] md:h-[420px]">
              <iframe
                title="Localização PS Proteção no Google Maps"
                src="https://www.google.com/maps?q=-22.7301816,-47.30249&z=16&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
