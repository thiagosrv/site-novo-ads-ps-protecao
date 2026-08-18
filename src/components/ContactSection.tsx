"use client";

import { Mail, Phone, Siren, Users, Building2, Briefcase } from "lucide-react";
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
      className="relative py-20 md:py-[var(--spacing-section)] px-6 md:px-[var(--spacing-grid-margin)] max-w-[var(--container-max)] mx-auto"
    >
      <div
        className="absolute inset-0 overflow-hidden rounded-[2.5rem] md:rounded-[3rem] pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-navy/[0.04] via-transparent to-yellow/[0.06]" />
        <div
          className="absolute inset-0 texture-dots-navy opacity-70"
          style={{ maskImage: "radial-gradient(ellipse 65% 55% at 50% 40%, black 0%, transparent 75%)" }}
        />
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-tech-blue/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-yellow/15 rounded-full blur-3xl" />
      </div>

      <Reveal>
        <div className="relative gradient-border rounded-[2.5rem] md:rounded-[3rem] p-[1.5px] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.2)]">
        <div className="bg-white rounded-[calc(2.5rem-1.5px)] md:rounded-[calc(3rem-1.5px)]">

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start p-8 md:p-16">
            <div className="md:col-span-5 pt-0 md:pt-8 text-center md:text-left">
              <h2 className="font-heading text-3xl md:text-[48px] text-navy mb-6 leading-tight">
                Pronto para elevar o padrão da sua operação?
              </h2>
              <p className="text-lg text-graphite/70 mb-8">
                Nossos especialistas estão prontos para realizar um diagnóstico operacional
                gratuito da sua estrutura atual.
              </p>

              <WhatsAppCta
                label="Solicitar orçamento pelo WhatsApp"
                className="w-full md:w-auto px-8 py-4 mb-10"
              />

              <div className="space-y-6 text-left">
                {CHANNELS.map((channel) => (
                  <div key={channel.label} className="flex items-start gap-5 justify-center md:justify-start">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border border-navy/5 shrink-0">
                      <channel.icon className="text-navy" size={20} />
                    </div>
                    <div>
                      <div className="font-mono text-xs tracking-widest text-graphite/60 uppercase mb-1">
                        {channel.label}
                      </div>
                      {channel.whatsapp ? (
                        <a
                          href={`https://wa.me/${channel.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleWhatsAppClick(channel.whatsapp as string)}
                          className="font-heading text-lg text-navy leading-snug hover:text-[#25D366] transition-colors inline-block"
                        >
                          {channel.phone}
                        </a>
                      ) : (
                        <a
                          href={`tel:+55${channel.phone.replace(/\D/g, "")}`}
                          className="font-heading text-lg text-navy leading-snug hover:text-navy-deep transition-colors inline-block"
                        >
                          {channel.phone}
                        </a>
                      )}
                      <div className="flex items-center gap-1.5 text-graphite/70 text-sm mt-0.5">
                        <Mail size={14} />
                        <a
                          href={`mailto:${channel.email}`}
                          className="hover:text-navy transition-colors"
                        >
                          {channel.email}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-7 rounded-[2rem] md:rounded-[2.5rem] shadow-xl border border-navy/10 overflow-hidden h-[420px] md:h-full min-h-[420px]">
              <iframe
                title="Localização PS Proteção no Google Maps"
                src="https://www.google.com/maps?q=-22.7301816,-47.30249&z=16&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
        </div>
      </Reveal>
    </section>
  );
}
