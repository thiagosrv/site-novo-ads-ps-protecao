import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import { getSession } from "@/lib/auth";
import { logoutAction } from "@/lib/blog/actions";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authenticated = await getSession();
  if (!authenticated) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-40 border-b border-navy/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/admin/posts" className="flex flex-col leading-tight">
            <span className="font-mono text-[11px] uppercase tracking-wide text-graphite/50">
              PS Proteção
            </span>
            <span className="font-heading text-base font-semibold text-navy">Painel do blog</span>
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="press-feedback inline-flex items-center gap-1.5 rounded-full border border-navy/10 px-4 py-2 text-sm font-medium text-graphite/70 hover:border-navy/20 hover:text-navy"
            >
              <LogOut size={16} />
              Sair
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
