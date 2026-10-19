import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function LpFooter() {
  return (
    <footer className="bg-navy-deep text-white/70">
      <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] py-10 md:py-12 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        <div className="flex items-center gap-3 shrink-0">
          <Image
            src="/brand/logo-ps-protecao.png"
            alt="PS Proteção"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <div>
            <p className="font-heading text-lg font-bold text-white tracking-tight">PS PROTEÇÃO</p>
            <p className="font-mono text-[11px] tracking-widest uppercase text-white/50">
              CNPJ 47.425.584/0001-00
            </p>
          </div>
        </div>

        <ul className="space-y-3 text-sm leading-relaxed">
          <li className="flex items-start gap-3">
            <MapPin size={16} className="text-yellow shrink-0 mt-1" aria-hidden="true" />
            <span>
              Rua São Gabriel, 1623 — Vila Belvedere
              <br />
              Americana · SP
            </span>
          </li>
          <li className="flex items-center gap-3">
            <Phone size={16} className="text-yellow shrink-0" aria-hidden="true" />
            <a href="tel:+551934787799" className="hover:text-yellow transition-colors">
              (19) 3478-7799
            </a>
          </li>
          <li className="flex items-center gap-3">
            <Mail size={16} className="text-yellow shrink-0" aria-hidden="true" />
            <a href="mailto:comercial@psprotecao.com.br" className="hover:text-yellow transition-colors">
              comercial@psprotecao.com.br
            </a>
          </li>
        </ul>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[11px] tracking-widest uppercase text-white/50">
            © {new Date().getFullYear()} PS Proteção. Todos os direitos reservados.
          </p>
          <Link
            href="/privacidade"
            className="font-mono text-[11px] tracking-widest uppercase text-white/50 hover:text-yellow transition-colors"
          >
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
