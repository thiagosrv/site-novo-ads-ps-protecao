import Image from "next/image";
import Link from "next/link";

// Topo da apresentação: só a marca. Sem menu nem botões — a página é uma
// leitura contínua, sem saídas que disputem a atenção.
export default function LpHeader() {
  return (
    <header className="bg-white border-b border-navy/10">
      <div className="flex items-center justify-between px-6 md:px-[var(--spacing-grid-margin)] py-4 max-w-[var(--container-max)] mx-auto">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brand/logo-ps-protecao.png"
            alt="PS Proteção"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="font-heading text-lg md:text-xl font-bold text-navy tracking-tight">
            PS PROTEÇÃO
          </span>
        </Link>
        <span className="hidden sm:block font-mono text-[11px] tracking-widest uppercase text-graphite/60">
          Apresentação institucional
        </span>
      </div>
    </header>
  );
}
