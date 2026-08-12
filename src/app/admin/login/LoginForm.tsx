"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/lib/blog/actions";

const inputClass =
  "w-full rounded-xl border border-navy/10 bg-surface px-4 py-2.5 text-graphite placeholder:text-graphite/40 focus:outline-none focus:ring-2 focus:ring-yellow/50 transition-shadow";

const initialState: LoginState = { error: null };

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-4">
      <label className="block">
        <span className="mb-1.5 block text-xs font-mono uppercase tracking-wide text-graphite/60">
          E-mail
        </span>
        <input
          name="email"
          type="email"
          required
          autoComplete="username"
          className={inputClass}
          placeholder="voce@psprotecao.com.br"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-xs font-mono uppercase tracking-wide text-graphite/60">
          Senha
        </span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={inputClass}
          placeholder="••••••••"
        />
      </label>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="press-scale-only mt-2 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-yellow to-yellow-dark px-6 py-3 font-heading text-sm font-semibold text-navy shadow-sm transition-opacity disabled:opacity-60"
      >
        {pending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
