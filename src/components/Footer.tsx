import Image from "next/image";
import { Headset } from "lucide-react";

const SERVICE_LINKS = [
  "Portaria e Acesso",
  "Limpeza Profissional",
  "Facilities Management",
  "Zeladoria e Manutenção",
];

const INSTITUTIONAL_LINKS = [
  "Sobre a PS Proteção",
  "Trabalhe Conosco",
  "Cidades Atendidas",
  "LGPD & Privacidade",
];

export default function Footer() {
  return (
    <footer className="bg-navy w-full pt-20 md:pt-[var(--spacing-section)] pb-8 border-t border-white/5 relative overflow-hidden mt-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 px-6 md:px-[var(--spacing-grid-margin)] max-w-[var(--container-max)] mx-auto relative z-10">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <Image
              src="/brand/logo-ps-protecao.png"
              alt="PS Proteção"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <span className="font-heading text-xl font-bold text-white tracking-tight">
              PS PROTEÇÃO
            </span>
          </div>
          <p className="text-white/60 leading-relaxed mb-8">
            Líder em soluções de terceirização de alta performance. Inteligência operacional e
            segurança para o seu patrimônio.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-yellow hover:text-navy text-white transition-all border border-white/10"
            >
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-yellow hover:text-navy text-white transition-all border border-white/10"
            >
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-heading text-lg text-white mb-6">Serviços</h4>
          <ul className="space-y-4">
            {SERVICE_LINKS.map((link) => (
              <li key={link}>
                <a href="#servicos" className="text-white/60 hover:text-yellow transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-lg text-white mb-6">Institucional</h4>
          <ul className="space-y-4">
            {INSTITUTIONAL_LINKS.map((link) => (
              <li key={link}>
                <a href="#" className="text-white/60 hover:text-yellow transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-lg text-white mb-6">Atendimento</h4>
          <div className="space-y-6">
            <p className="text-white/60 leading-relaxed">
              Matriz: São Paulo, SP
              <br />
              Avenida Paulista, 1000 - Bela Vista
            </p>
            <a
              href="tel:0800000000"
              className="flex items-center gap-3 text-white font-bold text-xl hover:text-yellow transition-colors group"
            >
              <Headset className="text-yellow group-hover:scale-110 transition-transform" size={26} />
              0800 000 000
            </a>
          </div>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-white/5 px-6 md:px-[var(--spacing-grid-margin)] max-w-[var(--container-max)] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <p className="text-white/40 font-mono text-[11px] tracking-widest uppercase">
          © {new Date().getFullYear()} PS PROTEÇÃO. Todos os direitos reservados.
        </p>
        <div className="flex gap-8">
          <a href="#" className="text-white/40 font-mono text-[11px] tracking-widest uppercase hover:text-white transition-colors">
            Termos de Uso
          </a>
          <a href="#" className="text-white/40 font-mono text-[11px] tracking-widest uppercase hover:text-white transition-colors">
            Compliance
          </a>
        </div>
      </div>
    </footer>
  );
}
