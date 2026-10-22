"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MessageCircle, X } from "lucide-react";
import {
  buildWhatsAppUrl,
  readAndClearQuotePayload,
  thankYouKindFor,
  QUOTE_WHATSAPP_NUMBER,
  type ThankYouKind,
} from "@/lib/quote";
import { getStoredGclid } from "@/lib/gclid";

const REDIRECT_DELAY_MS = 5000;
const MESSAGE_DELAY_MS = 900;

// Foto e texto mudam conforme o serviço pedido: portaria, limpeza ou os demais (geral).
const THANK_YOU: Record<ThankYouKind, { image: string; alt: string; text: string }> = {
  portaria: {
    image: "/assets/pagina-obrigado-porteiro.webp",
    alt: "Profissional de portaria da PS Proteção uniformizado, com tablet e rádio, no posto de controle de acesso",
    text: "Nossa equipe já está analisando o seu pedido de portaria e controle de acesso. A proposta é montada sob medida para a sua operação e segue pelo WhatsApp.",
  },
  limpeza: {
    image: "/assets/pagina-obrigado-limpeza.webp",
    alt: "Profissional de limpeza da PS Proteção uniformizada, com avental, luvas e óculos de proteção",
    text: "Nossa equipe já está analisando o seu pedido de limpeza e conservação. A proposta é montada sob medida para o seu ambiente e segue pelo WhatsApp.",
  },
  geral: {
    image: "/assets/pagina-obrigado-geral.webp",
    alt: "Profissional da PS Proteção cumprimenta um cliente na entrada de uma empresa",
    text: "Nossa equipe já está analisando o seu pedido. A proposta é montada sob medida para a sua empresa e segue pelo WhatsApp.",
  },
};

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export default function ObrigadoContent() {
  const pathname = usePathname();
  const [name, setName] = useState("");
  // Só se sabe o serviço depois da montagem (vem do sessionStorage); até lá a moldura da foto
  // fica reservada, sem imagem, para o layout não pular nem aparecer a foto errada.
  const [kind, setKind] = useState<ThankYouKind | null>(null);
  const [waUrl, setWaUrl] = useState(() => buildWhatsAppUrl());
  const [secondsLeft, setSecondsLeft] = useState(Math.ceil(REDIRECT_DELAY_MS / 1000));
  const [autoRedirectCancelled, setAutoRedirectCancelled] = useState(false);
  const [barFilling, setBarFilling] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);
  const [messageIn, setMessageIn] = useState(false);
  const redirectedRef = useRef(false);
  const waUrlRef = useRef(waUrl);

  // O ref só é lido pelo timer do redirect (5s), então basta atualizá-lo
  // depois do commit — não durante o render.
  useEffect(() => {
    waUrlRef.current = waUrl;
  }, [waUrl]);

  useEffect(() => {
    const payload = readAndClearQuotePayload();
    // Payload only exists in sessionStorage, only knowable client-side after mount.
    // A leitura apaga o payload: se o efeito rodar de novo (StrictMode em dev), a segunda leitura
    // vem vazia e não pode sobrescrever o que a primeira já aplicou.
    if (payload) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWaUrl(buildWhatsAppUrl(payload.message));
      if (payload.name) setName(payload.name);
    }
    setKind((atual) => atual ?? thankYouKindFor(payload?.service));

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

  // A barra só começa a encher depois da hidratação, no mesmo instante dos timers.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBarFilling(true);
  }, []);

  // "Álvaro" manda uma mensagem logo depois que o card abre, com o som de notificação.
  useEffect(() => {
    const audio = new Audio("/assets/notificacao.mp3");
    audio.preload = "auto";
    const timer = setTimeout(() => {
      setMessageIn(true);
      // O navegador pode bloquear o som sem interação prévia; a mensagem aparece mesmo assim.
      audio.play().catch(() => {});
    }, MESSAGE_DELAY_MS);
    return () => {
      clearTimeout(timer);
      audio.pause();
    };
  }, []);

  // Quem troca de aba ou fecha por reflexo vê o aviso também no título da aba.
  useEffect(() => {
    if (autoRedirectCancelled) {
      document.title = "Solicitação recebida | PS Proteção";
      return;
    }
    document.title = `Abrindo o WhatsApp em ${secondsLeft}s… | PS Proteção`;
  }, [secondsLeft, autoRedirectCancelled]);

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
        <div className="relative order-2 md:order-1 mx-auto w-full max-w-[320px] md:max-w-[380px] aspect-[2/3] rounded-[2rem] overflow-hidden bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          {kind && (
            <Image
              key={kind}
              src={THANK_YOU[kind].image}
              alt={THANK_YOU[kind].alt}
              fill
              priority
              sizes="(min-width: 768px) 380px, 320px"
              className="message-in object-cover"
            />
          )}
        </div>

        <div className="order-1 md:order-2 text-center md:text-left">
          <span className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-yellow mb-6">
            <span className="w-8 h-px bg-yellow" />
            Solicitação recebida
          </span>
          <h1 className="font-heading text-3xl md:text-[44px] text-white leading-tight mb-4">
            {name ? `Recebemos o seu contato, ${name.split(" ")[0]}!` : "Recebemos o seu contato!"}
          </h1>
          <p className="text-white/80 text-lg leading-relaxed mb-3 max-w-md mx-auto md:mx-0">
            {THANK_YOU[kind ?? "geral"].text}
          </p>
          <p className="text-white/60 text-base leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
            Falta só um passo: abrir a conversa. Os seus dados já vão preenchidos na mensagem,
            é só tocar em enviar.
          </p>

          {!autoRedirectCancelled && (
            <div
              role="status"
              aria-live="polite"
              className="relative w-full max-w-md mx-auto md:mx-0 mb-6 overflow-hidden rounded-2xl border border-white/20 bg-[#EFE7DD] p-4 md:p-5 text-left shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
              style={{
                backgroundImage: "url('/assets/whatsapp-doodle.webp')",
                backgroundSize: "320px auto",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="relative shrink-0">
                  <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-[#128C7E] font-heading text-xl font-semibold text-white ring-2 ring-white">
                    {avatarFailed ? (
                      "Á"
                    ) : (
                      <Image
                        src="/assets/alvaro.webp"
                        alt="Álvaro, atendimento comercial da PS Proteção"
                        width={56}
                        height={56}
                        className="h-full w-full object-cover"
                        onError={() => setAvatarFailed(true)}
                      />
                    )}
                  </span>
                  <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-[#25D366]">
                    <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping motion-reduce:animate-none" />
                  </span>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-heading text-lg font-semibold leading-tight text-[#111B21]">
                    Álvaro
                  </p>
                  <p className="text-sm font-semibold text-[#128C7E]">online agora</p>
                </div>
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_12px_rgba(18,140,126,0.45)]"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.9 0-2.64-1.03-5.13-2.9-7C17.08 3.03 14.58 2 12.04 2Zm5.8 14.14c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.13.11-1.83-.12-.42-.14-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.83 2 .9 2.15.07.14.11.31.02.5-.09.19-.14.3-.27.46-.14.16-.29.36-.41.48-.14.14-.28.29-.12.57.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.19-.28.37-.23.62-.14.25.09 1.58.75 1.85.88.27.14.45.2.52.32.07.11.07.65-.17 1.33Z" />
                  </svg>
                </span>
              </div>

              <div className="relative mb-4 max-w-[92%] rounded-xl rounded-tl-none bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.18)]">
                <p className="text-[15px] leading-snug text-[#111B21]">
                  <strong>Álvaro está online agora.</strong> Estamos te redirecionando agora mesmo.{" "}
                  Por favor, aguarde.
                </p>
                <p className="mt-1 text-right text-[11px] text-[#667781]">
                  Abrindo em{" "}
                  <span className="font-semibold tabular-nums text-[#128C7E]">{secondsLeft}s</span>
                </p>
              </div>

              {/* Reserva o espaço desde o início para a barra não pular quando a mensagem chega. */}
              <div className="mb-4 h-[38px]" aria-live="polite">
                {messageIn && (
                  <div className="message-in inline-block rounded-xl rounded-tl-none bg-white px-4 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.18)]">
                    <p className="text-[15px] leading-snug text-[#111B21]">
                      Estou online!
                      <span className="ml-3 align-bottom text-[11px] text-[#667781]">agora</span>
                    </p>
                  </div>
                )}
              </div>

              <div
                className="h-3.5 rounded-full bg-[#111B21]/15 p-[3px]"
                role="progressbar"
                aria-label="Redirecionando para o WhatsApp"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(
                  100 - (secondsLeft / Math.ceil(REDIRECT_DELAY_MS / 1000)) * 100
                )}
              >
                <div
                  className={`h-full rounded-full bg-gradient-to-r from-[#128C7E] via-[#25D366] to-[#7CF5A6] ${
                    barFilling ? "redirect-bar-fill" : "w-0"
                  }`}
                  style={{ animationDuration: `${REDIRECT_DELAY_MS}ms` }}
                />
              </div>

              <button
                type="button"
                onClick={handleCancelRedirect}
                className="mt-3 inline-flex items-center gap-1 text-sm text-[#111B21]/70 underline underline-offset-2 transition-colors hover:text-[#111B21]"
              >
                <X size={14} />
                Não abrir automaticamente
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={handleManualRedirect}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-yellow to-yellow-dark text-navy font-heading font-semibold px-7 py-3.5 hover:opacity-90 transition-opacity"
          >
            <MessageCircle size={18} />
            Abrir o WhatsApp agora
          </button>
        </div>
      </div>
    </section>
  );
}
