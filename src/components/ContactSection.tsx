import { ArrowRight, Mail, Phone } from "lucide-react";
import Reveal from "./Reveal";

export default function ContactSection() {
  return (
    <section
      id="contato"
      className="py-20 md:py-[var(--spacing-section)] px-6 md:px-[var(--spacing-grid-margin)] max-w-[var(--container-max)] mx-auto"
    >
      <Reveal>
        <div className="bg-white/60 rounded-[2.5rem] md:rounded-[3rem] relative overflow-hidden border border-navy/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-navy/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start relative z-10 p-8 md:p-16">
            <div className="md:col-span-5 pt-0 md:pt-8">
              <h2 className="font-heading text-3xl md:text-[40px] text-navy mb-6 leading-tight">
                Pronto para elevar o padrão da sua operação?
              </h2>
              <p className="text-lg text-graphite/70 mb-12">
                Nossos especialistas estão prontos para realizar um diagnóstico operacional
                gratuito da sua estrutura atual.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border border-navy/5 shrink-0">
                    <Phone className="text-navy" size={20} />
                  </div>
                  <div>
                    <div className="font-mono text-xs tracking-widest text-graphite/60 uppercase mb-1">
                      Telefone Direto
                    </div>
                    <div className="font-heading text-lg text-navy">+55 (11) 4000-0000</div>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border border-navy/5 shrink-0">
                    <Mail className="text-navy" size={20} />
                  </div>
                  <div>
                    <div className="font-mono text-xs tracking-widest text-graphite/60 uppercase mb-1">
                      E-mail Corporativo
                    </div>
                    <div className="font-heading text-lg text-navy">comercial@psprotecao.com.br</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-7 bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-xl border border-navy/10">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field label="Nome Completo" placeholder="Como devemos chamá-lo?" />
                  <Field label="Empresa" placeholder="Nome da organização" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field label="Cargo" placeholder="Ex: Diretor, Gerente de Facilities" />
                  <Field label="E-mail Corporativo" placeholder="nome@suaempresa.com.br" type="email" />
                </div>
                <div>
                  <label className="block text-[11px] tracking-widest font-mono text-graphite/60 uppercase mb-2">
                    Serviço de Interesse
                  </label>
                  <select className="w-full bg-surface border border-navy/20 rounded-2xl focus:border-navy focus:ring-1 focus:ring-navy transition-all p-4 text-graphite/80">
                    <option>Selecione uma opção</option>
                    <option>Portaria e Controle de Acesso</option>
                    <option>Limpeza Profissional</option>
                    <option>Recepção e Atendimento</option>
                    <option>Facilities Completo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] tracking-widest font-mono text-graphite/60 uppercase mb-2">
                    Detalhes da Necessidade
                  </label>
                  <textarea
                    className="w-full bg-surface border border-navy/20 rounded-2xl focus:border-navy focus:ring-1 focus:ring-navy transition-all p-4 h-32 resize-none"
                    placeholder="Conte-nos um pouco sobre o cenário atual da sua operação..."
                  />
                </div>
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    className="mt-1 rounded text-navy focus:ring-navy border-navy/30 w-4 h-4 cursor-pointer"
                  />
                  <p className="text-[13px] text-graphite/60 leading-tight">
                    Concordo em fornecer meus dados conforme a{" "}
                    <a href="#" className="underline font-medium hover:text-navy transition-colors">
                      Política de Privacidade
                    </a>{" "}
                    para contato comercial.
                  </p>
                </div>
                <button
                  type="submit"
                  className="w-full bg-yellow text-navy font-heading text-lg font-bold py-5 rounded-2xl hover:bg-yellow-dark transition-colors shadow-lg mt-4 flex justify-center items-center gap-2"
                >
                  Solicitar Diagnóstico <ArrowRight size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] tracking-widest font-mono text-graphite/60 uppercase mb-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-surface border border-navy/20 rounded-2xl focus:border-navy focus:ring-1 focus:ring-navy transition-all p-4"
      />
    </div>
  );
}
