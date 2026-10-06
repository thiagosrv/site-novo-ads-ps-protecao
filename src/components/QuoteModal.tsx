"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { X, Loader2, AlertCircle, Check } from "lucide-react";
import {
  SERVICE_OPTIONS,
  QUOTE_CITY_NAMES,
  buildQuoteMessage,
  saveQuotePayload,
  maskPhone,
  isValidPhone,
} from "@/lib/quote";
import { getStoredGclid } from "@/lib/gclid";
import { submitLead } from "@/lib/leads";
import { cleanCnpj, isValidCnpj, lookupCnpj, maskCnpj, type CnpjLookup } from "@/lib/cnpj";
import { CONSENT_TEXT, registerLeadInCrm } from "@/lib/crm";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

type FormState = {
  name: string;
  phone: string;
  city: string;
  service: string;
  cnpj: string;
  honeypot: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  phone: "",
  city: "",
  service: "",
  cnpj: "",
  honeypot: "",
};

type TouchedState = {
  name: boolean;
  phone: boolean;
  city: boolean;
  service: boolean;
  cnpj: boolean;
};

const EMPTY_TOUCHED: TouchedState = {
  name: false,
  phone: false,
  city: false,
  service: false,
  cnpj: false,
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
  if (form.city.trim().length < 2) errors.city = "Informe sua cidade.";
  if (!form.service) errors.service = "Selecione o serviço desejado.";
  // CNPJ obrigatório (barra currículos/contatos de pessoa física por este canal)
  // e precisa fechar nos dígitos verificadores.
  if (!form.cnpj.trim()) errors.cnpj = "Informe o CNPJ da empresa.";
  else if (!isValidCnpj(form.cnpj)) errors.cnpj = "CNPJ inválido. Confira os números.";
  return errors;
}

function normalizeForSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

function CityCombobox({
  value,
  onChange,
  onBlur,
  invalid,
}: {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  invalid: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const normalizedQuery = normalizeForSearch(value);
  const suggestions = (
    normalizedQuery
      ? QUOTE_CITY_NAMES.filter((name) => normalizeForSearch(name).includes(normalizedQuery))
      : QUOTE_CITY_NAMES
  ).slice(0, 8);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function selectCity(name: string) {
    onChange(name);
    setOpen(false);
    setActiveIndex(-1);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        e.preventDefault();
        selectCity(suggestions[activeIndex]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={wrapperRef} className="relative">
      <input
        id="quote-city"
        name="city"
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        aria-controls="quote-city-listbox"
        autoComplete="off"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
          setActiveIndex(-1);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          // Atraso para o clique na sugestão (onMouseDown) registrar antes do fechamento.
          setTimeout(() => setOpen(false), 120);
          onBlur();
        }}
        onKeyDown={handleKeyDown}
        aria-invalid={invalid}
        aria-describedby={invalid ? "quote-city-error" : undefined}
        className={`${inputClass} ${invalid ? inputErrorClass : ""}`}
        placeholder="Digite sua cidade"
      />
      {open && suggestions.length > 0 && (
        <ul
          id="quote-city-listbox"
          role="listbox"
          className="absolute z-10 mt-1 max-h-56 w-full overflow-y-auto rounded-xl border border-navy/10 bg-white shadow-lg"
        >
          {suggestions.map((name, index) => (
            <li
              key={name}
              role="option"
              aria-selected={index === activeIndex}
              onMouseDown={(e) => {
                e.preventDefault();
                selectCity(name);
              }}
              className={`px-4 py-2 text-sm cursor-pointer ${
                index === activeIndex ? "bg-yellow/20 text-navy" : "text-graphite hover:bg-navy/5"
              }`}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
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
  // Resultado da consulta amarrado ao CNPJ consultado: se o campo mudar, o
  // resultado antigo deixa de valer sem precisar de reset dentro de effect.
  const [cnpjLookup, setCnpjLookup] = useState<{ cnpj: string; result: CnpjLookup } | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isValidCnpj(form.cnpj)) return;
    const cnpj = cleanCnpj(form.cnpj);
    const controller = new AbortController();
    lookupCnpj(cnpj, controller.signal).then((result) => {
      if (!controller.signal.aborted) setCnpjLookup({ cnpj, result });
    });
    return () => controller.abort();
  }, [form.cnpj]);

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

  const cnpjValid = isValidCnpj(form.cnpj);
  const lookupDone =
    cnpjValid && cnpjLookup?.cnpj === cleanCnpj(form.cnpj) ? cnpjLookup.result : null;
  const lookupLoading = cnpjValid && !lookupDone;
  const showCnpjError = !!errors.cnpj && (touched.cnpj || cleanCnpj(form.cnpj).length === 14);

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

    setTouched({ name: true, phone: true, city: true, service: true, cnpj: true });
    const validationErrors = errorsFor(form);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);

    const gclid = getStoredGclid();

    const result = await submitLead({
      name: form.name.trim(),
      phone: form.phone.replace(/\D/g, ""),
      city: form.city.trim(),
      cityOther: "",
      service: form.service,
      gclid,
      origemPagina: pathname,
      honeypot: form.honeypot,
      cnpj: cleanCnpj(form.cnpj),
      razaoSocial: lookupDone?.status === "found" ? lookupDone.razaoSocial : undefined,
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

    // O lead já está salvo no banco do site; agora avisa o CRM (máx. 3 s, sem travar:
    // se falhar, o cliente segue para o WhatsApp sem protocolo).
    const protocol = await registerLeadInCrm({
      name: form.name.trim(),
      phone: form.phone.replace(/\D/g, ""),
      gclid,
      pagina: pathname,
      honeypot: form.honeypot,
    });

    saveQuotePayload({ message: buildQuoteMessage(form, protocol), name: form.name.trim() });

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
          Formulário de Contato
        </h2>
        <p className="text-graphite/60 text-sm mb-6">Retornamos em até 2h úteis. Sem compromisso.</p>

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
              <CityCombobox
                value={form.city}
                onChange={(city) => setForm((f) => ({ ...f, city }))}
                onBlur={() => handleBlur("city")}
                invalid={touched.city && !!errors.city}
              />
            </Field>

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

            <Field
              label="CNPJ da empresa"
              htmlFor="quote-cnpj"
              error={showCnpjError ? errors.cnpj : undefined}
            >
              <input
                id="quote-cnpj"
                name="cnpj"
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                maxLength={18}
                value={form.cnpj}
                onChange={(e) => setForm((f) => ({ ...f, cnpj: maskCnpj(e.target.value) }))}
                onBlur={() => handleBlur("cnpj")}
                aria-invalid={showCnpjError}
                aria-describedby={
                  showCnpjError ? "quote-cnpj-error" : cnpjValid ? "quote-cnpj-status" : undefined
                }
                className={`${inputClass} ${showCnpjError ? inputErrorClass : ""}`}
                placeholder="00.000.000/0000-00"
              />
              <div id="quote-cnpj-status" aria-live="polite" className="text-sm mt-1.5 empty:hidden">
                {lookupLoading && (
                  <p className="flex items-center gap-1.5 text-graphite/60">
                    <Loader2 size={14} className="animate-spin" />
                    Consultando CNPJ na Receita Federal...
                  </p>
                )}
                {lookupDone?.status === "found" && (
                  <>
                    <p className="flex items-start gap-1.5 text-emerald-700">
                      <Check size={16} className="shrink-0 mt-0.5" />
                      <span>{lookupDone.razaoSocial}</span>
                    </p>
                    {lookupDone.situacao && lookupDone.situacao.toUpperCase() !== "ATIVA" && (
                      <p className="text-amber-700 mt-0.5">
                        Situação cadastral: {lookupDone.situacao.toLowerCase()}. Confira se o CNPJ está correto.
                      </p>
                    )}
                  </>
                )}
                {lookupDone?.status === "not_found" && (
                  <p className="text-graphite/60">
                    Não encontramos esse CNPJ na base da Receita, mas você pode enviar normalmente.
                  </p>
                )}
              </div>
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
          <p className="text-graphite/50 text-xs text-center mt-3">{CONSENT_TEXT}</p>
        </form>
      </div>
    </div>
  );
}
