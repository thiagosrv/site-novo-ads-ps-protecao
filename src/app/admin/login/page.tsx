import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function AdminLoginPage() {
  const authenticated = await getSession();
  if (authenticated) redirect("/admin/posts");

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-4">
      <div className="w-full max-w-sm rounded-[2rem] bg-white p-8 shadow-2xl">
        <p className="font-mono text-xs uppercase tracking-wide text-graphite/50">PS Proteção</p>
        <h1 className="mt-1 font-heading text-2xl text-navy">Painel do blog</h1>
        <p className="mt-1 text-sm text-graphite/60">Entre para gerenciar os posts.</p>
        <LoginForm />
      </div>
    </div>
  );
}
