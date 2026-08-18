"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { X, Loader2, AlertCircle } from "lucide-react";
import {
  SERVICE_OPTIONS,
  QUOTE_CITY_OPTIONS,
  QUOTE_OTHER_CITY_VALUE,
  buildQuoteMessage,
  saveQuotePayload,
  maskPhone,
  isValidPhone,
} from "@/lib/quote";
import { getStoredGclid } from "@/lib/gclid";
import { submitLead } from "@/lib/leads";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

type FormState = {
  name: string;
  phone: string;
  city: string;
  cityOther: string;
  service: string;
  honeypot: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  phone: "",
  city: "",
  cityOther: "",
  service: "",
  honeypot: "",
};

type TouchedState = {
  name: boolean;
  phone: boolean;
  city: boolean;
  cityOther: boolean;
  service: boolean;
};

const EMPTY_TOUCHED: TouchedState = {
  name: false,
  phone: false,
  city: false,
  cityOther: false,
  service: false,
};

// Escondido de forma visual (não display:none) para que o honeypot continue
// "preenchível" por bots simples que ignoram display:none, mas invisível e
// inalcançável por teclado para pessoas reais.
const honeypotWrapperStyle: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
};

const inputClass =
  "w-full min-h-11 rounded-xl border border-navy/10 bg-surface px-4 py-2.5 text-base text-graphite placeholder:text-graphite/40 focus:outline-none focus:ring-2 focus:ring-yellow/50 transition-shadow";
const inputErrorClass = "border-red-400 focus:ring-red-300";

function errorsFor(form: FormState): Partial<Record<keyof TouchedState, string>> {
  const errors: Partial<Record<keyof TouchedState, string>> = {};
  if (form.name.trim().length < 2) errors.name = "Informe seu nome completo.";
  if (!isValidPhone(form.phone)) errors.phone = "Informe um WhatsApp válido com DDD.";
  if (!form.city) errors.city = "Selecione sua cidade.";
  if (form.city === QUOTE_OTHER_CITY_VALUE && form.cityOther.trim().length < 2) {
    errors.cityOther = "Informe o nome da sua cidade.";
  }
  if (!form.service) errors.service = "Selecione o serviço desejado.";
  return errors;
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-xs font-mono tracking-wide text-graphite/60 uppercase mb-1.5"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="text-sm text-red-600 mt-1.5">
          {error}
        </p>
      )}
    </div>
  );
}

export default function QuoteModal({
  isOpen,
  onClose,
  prefillCity,
}: {
  isOpen: boolean;
  onClose: () => void;
  prefillCity: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [touched, setTouched] = useState<TouchedState>(EMPTY_TOUCHED);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    // Reset gate is the isOpen transition itself, only knowable after render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTouched(EMPTY_TOUCHED);
    setSubmitError(null);
    setForm({ ...EMPTY_FORM, city: prefillCity });
  }, [isOpen, prefillCity]);

  useEffect(() => {
    if (isOpen) {
      // Keep-mounted-during-exit: mounting is a side effect of the isOpen
      // transition, not derivable at render time.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true);
      const raf = requestAnimationFrame(() => setOpen(true));
      return () => cancelAnimationFrame(raf);
    }
    setOpen(false);
    const timeout = setTimeout(() => setMounted(false), 250);
    return () => clearTimeout(timeout);
  }, [isOpen]);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mounted]);

  useEffect(() => {
    if (!open) return;
    const timeout = setTimeout(() => nameInputRef.current?.focus(), 50);
    return () => clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && !submitting) onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, submitting]);

  if (!mounted) return null;

  const errors = errorsFor(form);

  function handleBlur(field: keyof TouchedState) {
    setTouched((t) => ({ ...t, [field]: true }));
  }

  function handleTabTrap(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "Tab") return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusables = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function handleBackdropClick() {
    if (submitting) return;
    onClose();
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (submitting) return;

    setTouched({ name: true, phone: true, city: true, cityOther: true, service: true });
    const validationErrors = errorsFor(form);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);

    const gclid = getStoredGclid();

    const result = await submitLead({
      name: form.name.trim(),
      phone: form.phone.replace(/\D/g, ""),
      city: form.city,
      cityOther: form.cityOther.trim(),
      service: form.service,
      gclid,
      origemPagina: pathname,
      honeypot: form.honeypot,
    });

    if (!result.ok) {
      setSubmitting(false);
      setSubmitError(result.error);
      return;
    }

    // Push síncrono, sempre antes da navegação — GTM já está configurado
    // para escutar `lead_formulario` e disparar a conversão do Google Ads.
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "lead_formulario",
      servico: form.service,
      cidade: form.city,
      origem_pagina: pathname,
      gclid: gclid || null,
    });

    saveQuotePayload({ message: buildQuoteMessage(form), name: form.name.trim() });

    // Dá tempo do GTM processar o evento antes da navegação SPA destruir a página.
    await new Promise((resolve) => setTimeout(resolve, 300));

    setSubmitting(false);
    onClose();
    router.push("/obrigado");
  }

  return (
    <div
      className={`modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm ${open ? "is-open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      onClick={handleBackdropClick}
      onKeyDown={handleTabTrap}
    >
      <div
        ref={panelRef}
        className={`modal-panel relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto ${open ? "is-open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Fechar"
          onClick={onClose}
          disabled={submitting}
          className="press-feedback absolute top-5 right-5 text-graphite/50 hover:text-navy disabled:opacity-40"
        >
          <X size={22} />
        </button>

        <h2 id="quote-modal-title" className="font-heading text-2xl text-navy mb-1">
          Solicitar cotação
        </h2>
        <p className="text-graphite/60 text-sm mb-6">Retornamos em até 24h úteis. Sem compromisso.</p>

        {submitError && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 mb-5 text-sm text-red-700"
          >
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <div>
              <p>{submitError}</p>
              <button
                type="button"
                onClick={handleSubmit}
                className="underline underline-offset-2 font-semibold mt-1"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            <Field label="Nome" htmlFor="quote-name" error={touched.name ? errors.name : undefined}>
              <input
                ref={nameInputRef}
                id="quote-name"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                onBlur={() => handleBlur("name")}
                aria-invalid={touched.name && !!errors.name}
                aria-describedby={touched.name && errors.name ? "quote-name-error" : undefined}
                className={`${inputClass} ${touched.name && errors.name ? inputErrorClass : ""}`}
                placeholder="Seu nome completo"
              />
            </Field>

            <Field label="WhatsApp" htmlFor="quote-phone" error={touched.phone ? errors.phone : undefined}>
              <input
                id="quote-phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: maskPhone(e.target.value) }))}
                onBlur={() => handleBlur("phone")}
                aria-invalid={touched.phone && !!errors.phone}
                aria-describedby={touched.phone && errors.phone ? "quote-phone-error" : undefined}
                className={`${inputClass} ${touched.phone && errors.phone ? inputErrorClass : ""}`}
                placeholder="(00) 00000-0000"
              />
            </Field>

            <Field label="Cidade" htmlFor="quote-city" error={touched.city ? errors.city : undefined}>
              <select
                id="quote-city"
                name="city"
                value={form.city}
                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                onBlur={() => handleBlur("city")}
                aria-invalid={touched.city && !!errors.city}
                aria-describedby={touched.city && errors.city ? "quote-city-error" : undefined}
                className={`${inputClass} ${touched.city && errors.city ? inputErrorClass : ""}`}
              >
                <option value="" disabled>
                  Selecione sua cidade
                </option>
                {QUOTE_CITY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>

            {form.city === QUOTE_OTHER_CITY_VALUE && (
              <Field
                label="Qual cidade?"
                htmlFor="quote-city-other"
                error={touched.cityOther ? errors.cityOther : undefined}
              >
                <input
                  id="quote-city-other"
                  name="cityOther"
                  value={form.cityOther}
                  onChange={(e) => setForm((f) => ({ ...f, cityOther: e.target.value }))}
                  onBlur={() => handleBlur("cityOther")}
                  aria-invalid={touched.cityOther && !!errors.cityOther}
                  aria-describedby={
                    touched.cityOther && errors.cityOther ? "quote-city-other-error" : undefined
                  }
                  className={`${inputClass} ${touched.cityOther && errors.cityOther ? inputErrorClass : ""}`}
                  placeholder="Nome da sua cidade"
                />
              </Field>
            )}

            <Field label="Serviço" htmlFor="quote-service" error={touched.service ? errors.service : undefined}>
              <select
                id="quote-service"
                name="service"
                value={form.service}
                onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
                onBlur={() => handleBlur("service")}
                aria-invalid={touched.service && !!errors.service}
                aria-describedby={touched.service && errors.service ? "quote-service-error" : undefined}
                className={`${inputClass} ${touched.service && errors.service ? inputErrorClass : ""}`}
              >
                <option value="" disabled>
                  Selecione o serviço
                </option>
                {SERVICE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div aria-hidden="true" style={honeypotWrapperStyle}>
            <label htmlFor="quote-website">Não preencha este campo</label>
            <input
              id="quote-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.honeypot}
              onChange={(e) => setForm((f) => ({ ...f, honeypot: e.target.value }))}
            />
          </div>
          <input type="hidden" name="gclid" value={getStoredGclid() ?? ""} readOnly />

          <button
            type="submit"
            disabled={submitting}
            className="press-feedback mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-yellow to-yellow-dark text-navy font-heading font-semibold px-7 py-3.5 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed min-h-11"
          >
            {submitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Enviando...
              </>
            ) : (
              "Solicitar cotação"
            )}
          </button>
          <p className="text-graphite/50 text-xs text-center mt-3">
            Seus dados são usados apenas para este contato.
          </p>
        </form>
      </div>
    </div>
  );
}
