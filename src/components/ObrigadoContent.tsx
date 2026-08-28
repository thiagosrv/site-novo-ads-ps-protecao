"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MessageCircle, X } from "lucide-react";
import { buildWhatsAppUrl, readAndClearQuotePayload, QUOTE_WHATSAPP_NUMBER } from "@/lib/quote";
import { getStoredGclid } from "@/lib/gclid";

const REDIRECT_DELAY_MS = 4000;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export default function ObrigadoContent() {
  const pathname = usePathname();
  const [name, setName] = useState("");
  const [waUrl, setWaUrl] = useState(() => buildWhatsAppUrl());
  const [secondsLeft, setSecondsLeft] = useState(Math.ceil(REDIRECT_DELAY_MS / 1000));
  const [autoRedirectCancelled, setAutoRedirectCancelled] = useState(false);
  const redirectedRef = useRef(false);
  const waUrlRef = useRef(waUrl);
  waUrlRef.current = waUrl;

  useEffect(() => {
    const payload = readAndClearQuotePayload();
    const url = buildWhatsAppUrl(payload?.message);
    // Payload only exists in sessionStorage, only knowable client-side after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWaUrl(url);
    if (payload?.name) setName(payload.name);

    // Evento legado, já configurado como trigger de conversão no GTM — mantido
    // para não quebrar o rastreamento existente no Google Ads.
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "conversion_whatsapp",
      value: 1.0,
      currency: "BRL",
      gclid: getStoredGclid() ?? undefined,
    });
  }, []);

  useEffect(() => {
    if (autoRedirectCancelled) return;

    function redirect() {
      if (redirectedRef.current) return;
      redirectedRef.current = true;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "clique_whatsapp",
        numero: QUOTE_WHATSAPP_NUMBER,
        origem_pagina: pathname,
      });
      window.location.href = waUrlRef.current;
    }

    const redirectTimer = setTimeout(redirect, REDIRECT_DELAY_MS);
    return () => clearTimeout(redirectTimer);
  }, [autoRedirectCancelled, pathname]);

  useEffect(() => {
    if (autoRedirectCancelled) return;
    const tick = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(tick);
  }, [autoRedirectCancelled]);

  function handleManualRedirect() {
    if (redirectedRef.current) return;
    redirectedRef.current = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "clique_whatsapp",
      numero: QUOTE_WHATSAPP_NUMBER,
      origem_pagina: pathname,
    });
    window.location.href = waUrl;
  }

  function handleCancelRedirect() {
    setAutoRedirectCancelled(true);
  }

  return (
    <section className="min-h-[calc(100vh-1px)] bg-navy flex items-center py-16 md:py-20">
      <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="relative order-2 md:order-1 aspect-[4/5] max-h-[480px] rounded-[2rem] overflow-hidden bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <Image
            src="/loading/loading3.webp"
            alt="Profissional de segurança da PS Proteção treinado e capacitado"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="order-1 md:order-2 text-center md:text-left">
          <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-yellow mb-6">
            <span className="w-8 h-px bg-yellow" />
            Solicitação recebida
          </span>
          <h1 className="font-heading text-3xl md:text-[44px] text-white leading-tight mb-4">
            {name ? `Recebemos sua solicitação, ${name}!` : "Recebemos sua solicitação!"}
          </h1>
          <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
            Nossa equipe entra em contato em até 24h úteis. Se preferir, fale agora mesmo com a
            gente pelo WhatsApp.
          </p>

          {!autoRedirectCancelled && (
            <div className="w-full max-w-md mx-auto md:mx-0 mb-8">
              <div className="flex items-center justify-between gap-3 mb-2">
                <p className="text-white/50 text-sm">
                  Abrindo o WhatsApp em {secondsLeft}s...
                </p>
                <button
                  type="button"
                  onClick={handleCancelRedirect}
                  className="inline-flex items-center gap-1 text-white/50 hover:text-white/80 text-sm underline underline-offset-2 transition-colors shrink-0"
                >
                  <X size={14} />
                  Cancelar
                </button>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow to-yellow-dark transition-[width] duration-1000 ease-linear"
                  style={{
                    width: `${Math.max(
                      0,
                      100 - (secondsLeft / Math.ceil(REDIRECT_DELAY_MS / 1000)) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleManualRedirect}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-yellow to-yellow-dark text-navy font-heading font-semibold px-7 py-3.5 hover:opacity-90 transition-opacity"
          >
            <MessageCircle size={18} />
            Falar agora no WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}
