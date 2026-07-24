import Image from "next/image";
import {
  Target,
  Eye,
  Heart,
  Flag,
  TrendingUp,
  Settings2,
  BarChart2,
  User,
  MessageCircle,
  UserPlus,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import StatsRow from "@/components/StatsRow";
import FaqAccordion from "@/components/FaqAccordion";
import Reveal from "@/components/Reveal";

const MVV = [
  {
    icon: Target,
    title: "Missão",
    text: "Oferecer soluções completas em Facilities que permitam às empresas focar no seu negócio principal, com a tranquilidade de ter operações estruturadas, supervisionadas e entregues com excelência.",
    highlight: false,
  },
  {
    icon: Eye,
    title: "Visão",
    text: "Ser a parceira de Facilities mais confiável da Região Metropolitana de Campinas, referência em confiabilidade operacional, governança e comprometimento com os resultados dos nossos clientes.",
    highlight: true,
  },
  {
    icon: Heart,
    title: "Valores",
    text: "Trabalho sério, proximidade com o cliente, conformidade trabalhista, melhoria contínua e respeito às pessoas. Valores que guiam cada colaborador desde o primeiro posto.",
    highlight: false,
  },
];

const TIMELINE = [
  {
    icon: Flag,
    year: "1998 — Fundação",
    title: "A origem em Americana, SP",
    text: "Antônio Farias funda a PS Proteção com foco em portaria e controle de acesso. O princípio fundador: trabalho sério, proximidade real com o cliente e zero espaço para falhas.",
    current: false,
  },
  {
    icon: TrendingUp,
    year: "Anos 2000 — Expansão",
    title: "Crescimento para a Região Metropolitana",
    text: "Com a reputação consolidada em Americana, a empresa expande para Campinas e municípios da RMC. O portfólio cresce com limpeza, zeladoria e suporte administrativo.",
    current: false,
  },
  {
    icon: Settings2,
    year: "Anos 2010 — Estruturação",
    title: "Profissionalização dos processos",
    text: "Implementação dos POPs (Procedimentos Operacionais Padrão) em cada posto, estruturação da supervisão ativa e investimento contínuo em treinamento e capacitação.",
    current: false,
  },
  {
    icon: BarChart2,
    year: "Hoje — Gestão por dados",
    title: "Método e tecnologia a serviço da operação",
    text: "Sob a liderança de Adriana Farias, a empresa opera com SLAs, KPIs mensais e conformidade LGPD. +3.000 colaboradores, +1.000 clientes e +30 municípios atendidos.",
    current: true,
  },
];

const LEADERS = [
  {
    name: "Antônio Farias",
    role: "Fundador · 1998",
    bio: "Nordestino que escolheu São Paulo para transformar a própria trajetória. Em 1998 fundou a PS Proteção com um princípio claro: trabalho sério e zero espaço para falhas. Construiu as bases de uma empresa que hoje é referência regional em Facilities.",
  },
  {
    name: "Adriana Farias",
    role: "Diretora Executiva",
    bio: "Sob sua liderança, a PS Proteção evoluiu de uma operação familiar para uma gestão orientada por dados. Implementou POPs, SLAs e KPIs mensais em todos os postos, mantendo os valores que definem a empresa desde o primeiro dia.",
  },
];

const METHOD_CHIPS = [
  "POPs por posto",
  "KPIs mensais",
  "SLAs contratuais",
  "Supervisão ativa",
  "Conformidade LGPD",
  "Checklist por turno",
];

const FAQ_ITEMS = [
  {
    question: "Há quanto tempo a PS Proteção atua no mercado?",
    answer:
      "A PS Proteção atua há mais de 28 anos no setor de facilities. Fundada em 1998 em Americana, SP, a empresa se especializou em portaria, limpeza, zeladoria e serviços de apoio para empresas da Região Metropolitana de Campinas.",
  },
  {
    question: "Onde fica a sede da PS Proteção?",
    answer:
      "A sede da PS Proteção fica na Rua São Gabriel, 1623, Vila Belvedere, em Americana, SP. A partir dela, a empresa atende Americana, Campinas e mais de 30 municípios da Região Metropolitana de Campinas.",
  },
  {
    question: "Quantos colaboradores e clientes a PS Proteção possui?",
    answer:
      "A PS Proteção conta com mais de 3.000 colaboradores treinados e já atendeu mais de 1.000 clientes ao longo de seus 28 anos de atuação, com supervisão ativa em campo e relatórios periódicos.",
  },
  {
    question: "A PS Proteção é uma empresa regularizada?",
    answer:
      "Sim. A PS Proteção é uma empresa legalmente constituída, inscrita no CNPJ 47.425.584/0001-00, com sede física em Americana, SP, e atuação regularizada na prestação de serviços de facilities.",
  },
  {
    question: "Como a PS Proteção garante a qualidade dos serviços?",
    answer:
      "A qualidade é garantida por supervisão periódica em campo, Procedimento Operacional Padrão (POP) personalizado por posto, equipe de reserva para cobertura de faltas e relatórios regulares de ocorrências enviados ao cliente.",
  },
];

export default function SobrePage() {
  return (
    <>
      <PageHero
        tag="Nossa história"
        title="Quem Somos"
        description="28 anos construindo confiança um posto de cada vez — da fundação familiar ao método de gestão por dados."
      />
      <StatsRow />

      {/* História */}
      <section className="py-20 md:py-[var(--spacing-section)] bg-white">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-yellow" />
                <span className="font-mono text-navy text-sm tracking-widest uppercase">
                  Fundação · 1998
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-[44px] text-navy leading-tight">
                Uma história de <span className="text-yellow-dark">trabalho sério</span>
              </h2>
              <div className="text-graphite/70 leading-relaxed flex flex-col gap-4">
                <p>
                  A <strong className="text-navy">PS Proteção</strong> nasceu em 1998 de um
                  impulso simples e poderoso: <strong className="text-navy">trabalho sério</strong>,
                  proximidade real com o cliente e{" "}
                  <strong className="text-navy">zero espaço para falhas em portaria</strong>. Foi
                  assim que <strong className="text-navy">Antônio Farias</strong>, nordestino que
                  escolheu São Paulo para transformar a própria trajetória, plantou as bases do
                  que somos hoje: uma empresa familiar por essência e profissional por método,
                  especializada em terceirização de portaria e serviços de facilities na Região
                  Metropolitana de Campinas (RMC).
                </p>
                <p>
                  Ao longo de 28 anos, crescemos com um foco inegociável:{" "}
                  <strong className="text-navy">confiabilidade operacional</strong>. Isso
                  significa gente certa, no lugar certo, seguindo processo certo. Treinamos e
                  capacitamos mais de <strong className="text-navy">3.000 colaboradores</strong> e
                  já atendemos <strong className="text-navy">+1.000 clientes</strong>, mantendo
                  relações que atravessam 15 anos ou mais — porque parceria de longo prazo não se
                  promete, se sustenta no dia a dia.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-px bg-navy/10 rounded-2xl overflow-hidden mt-2">
                {[
                  { num: "28", label: "Anos de mercado" },
                  { num: "3k+", label: "Colaboradores" },
                  { num: "1k+", label: "Clientes atendidos" },
                ].map((s) => (
                  <div key={s.label} className="bg-white text-center py-6 px-3">
                    <div className="font-heading text-3xl text-navy">{s.num}</div>
                    <div className="font-mono text-[10px] text-graphite/60 tracking-widest uppercase mt-1">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delayMs={100}>
            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
              <Image
                src="/assets/historia.webp"
                alt="Sede PS Proteção — Rua São Gabriel, Americana SP"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-5 left-5 bg-yellow text-navy px-5 py-3 rounded-xl shadow-lg">
                <div className="font-heading font-bold text-base leading-none">Americana · SP</div>
                <div className="font-mono text-xs mt-1">1998</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gestão atual */}
      <section className="py-20 md:py-[var(--spacing-section)] bg-surface">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <Reveal className="md:order-2">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-yellow" />
                <span className="font-mono text-navy text-sm tracking-widest uppercase">
                  Gestão atual
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-[44px] text-navy leading-tight">
                Gestão por dados, <span className="text-yellow-dark">entrega com método</span>
              </h2>
              <div className="text-graphite/70 leading-relaxed flex flex-col gap-4">
                <p>
                  Hoje, sob a liderança de <strong className="text-navy">Adriana Farias</strong>,
                  preservamos os valores familiares que nos trouxeram até aqui e aceleramos a
                  gestão por dados.
                </p>
                <p>
                  Em cada posto, operamos com <strong className="text-navy">POPs</strong>{" "}
                  (Procedimentos Operacionais Padrão), <strong className="text-navy">SLAs</strong>{" "}
                  (Acordos de Nível de Serviço) e{" "}
                  <strong className="text-navy">KPIs mensais</strong> que garantem
                  rastreabilidade e melhoria contínua.
                </p>
                <p>
                  Nossa equipe trabalha sob supervisão ativa, com checklist e evidências por
                  turno, garantindo conformidade trabalhista, <strong className="text-navy">LGPD</strong>{" "}
                  e melhoria contínua. Quando o cenário exige, flexibilizamos escala e cronograma,
                  sem perder governança e previsibilidade.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-1">
                {METHOD_CHIPS.map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-navy/5 border border-navy/10 rounded-full font-heading text-xs font-bold text-navy tracking-wide"
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <div className="bg-navy border-l-4 border-yellow rounded-2xl p-7 mt-2">
                <p className="text-white/90 font-heading font-semibold leading-relaxed">
                  PS Proteção é, no fundo, a soma de dois vetores: a história de quem acredita no
                  trabalho, e o método de quem mede o que entrega. É assim que transformamos
                  processo em confiança — um dia de cada vez, um posto de cada vez.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delayMs={100} className="md:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
              <Image
                src="/assets/psprotecao.webp"
                alt="Operação PS Proteção — gestão por dados"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-5 left-5 bg-yellow text-navy px-5 py-3 rounded-xl shadow-lg">
                <div className="font-heading font-bold text-base leading-none">Americana · SP</div>
                <div className="font-mono text-xs mt-1">2026</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Liderança */}
      <section className="py-20 md:py-[var(--spacing-section)] bg-white">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <Reveal>
            <div className="max-w-2xl mb-14 text-center mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="w-8 h-px bg-yellow" />
                <span className="font-mono text-navy text-sm tracking-widest uppercase">
                  Liderança
                </span>
                <span className="w-8 h-px bg-yellow" />
              </div>
              <h2 className="font-heading text-3xl md:text-[40px] text-navy leading-tight mb-4">
                As pessoas por trás da PS Proteção
              </h2>
              <p className="text-graphite/70 text-lg">
                Uma empresa familiar que combina a força da tradição com a precisão da gestão
                moderna.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {LEADERS.map((leader, i) => (
              <Reveal key={leader.name} delayMs={i * 100}>
                <div className="bg-surface rounded-3xl overflow-hidden">
                  <div className="h-60 bg-gradient-to-br from-navy-deep to-navy flex items-center justify-center">
                    <User className="text-white/20" size={64} />
                  </div>
                  <div className="p-8">
                    <h3 className="font-heading text-2xl text-navy">{leader.name}</h3>
                    <div className="font-mono text-xs uppercase tracking-widest text-yellow-dark font-bold mb-4 mt-1">
                      {leader.role}
                    </div>
                    <p className="text-graphite/70 text-[15px] leading-relaxed">{leader.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Missão Visão Valores */}
      <section className="py-20 md:py-[var(--spacing-section)] bg-navy">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <Reveal>
            <div className="max-w-2xl mb-14 text-center mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="w-8 h-px bg-yellow" />
                <span className="font-mono text-yellow text-sm tracking-widest uppercase">
                  Nossos princípios
                </span>
                <span className="w-8 h-px bg-yellow" />
              </div>
              <h2 className="font-heading text-3xl md:text-[40px] text-white leading-tight mb-4">
                Missão, Visão e Valores
              </h2>
              <p className="text-white/70 text-lg">
                Os pilares que guiam cada decisão e cada posto de serviço da PS Proteção.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MVV.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delayMs={i * 100}>
                  <div
                    className={`rounded-2xl p-9 h-full flex flex-col gap-4 border ${
                      item.highlight
                        ? "bg-yellow border-yellow"
                        : "bg-white/5 border-white/10"
                    }`}
                  >
                    <div
                      className={`w-[52px] h-[52px] rounded-xl flex items-center justify-center ${
                        item.highlight ? "bg-black/10" : "bg-yellow/15"
                      }`}
                    >
                      <Icon className={item.highlight ? "text-navy" : "text-yellow"} size={24} />
                    </div>
                    <h3
                      className={`font-heading text-lg font-bold ${
                        item.highlight ? "text-navy" : "text-white"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-[15px] leading-relaxed ${
                        item.highlight ? "text-navy/80" : "text-white/70"
                      }`}
                    >
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-[var(--spacing-section)] bg-surface">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <Reveal>
            <div className="max-w-2xl mb-14 text-center mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="w-8 h-px bg-yellow" />
                <span className="font-mono text-navy text-sm tracking-widest uppercase">
                  Nossa trajetória
                </span>
                <span className="w-8 h-px bg-yellow" />
              </div>
              <h2 className="font-heading text-3xl md:text-[40px] text-navy leading-tight mb-4">
                28 anos construídos posto a posto
              </h2>
              <p className="text-graphite/70 text-lg">
                De uma operação local em Americana a referência em Facilities na Região
                Metropolitana de Campinas.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TIMELINE.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.year} delayMs={Math.min(i, 3) * 80}>
                  <div
                    className={`bg-white rounded-2xl p-8 flex gap-5 border-l-4 shadow-sm ${
                      item.current ? "border-yellow" : "border-transparent"
                    }`}
                  >
                    <div
                      className={`w-[52px] h-[52px] rounded-xl flex items-center justify-center shrink-0 ${
                        item.current ? "bg-yellow" : "bg-navy"
                      }`}
                    >
                      <Icon className={item.current ? "text-navy" : "text-yellow"} size={22} />
                    </div>
                    <div>
                      <div
                        className={`font-heading text-xs font-bold uppercase tracking-widest mb-2 ${
                          item.current ? "text-yellow-dark" : "text-navy"
                        }`}
                      >
                        {item.year}
                      </div>
                      <h4 className="font-heading text-navy text-base mb-2">{item.title}</h4>
                      <p className="text-graphite/70 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-[var(--spacing-section)] bg-white">
        <div className="max-w-3xl mx-auto px-6 md:px-[var(--spacing-grid-margin)]">
          <Reveal>
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="w-8 h-px bg-yellow" />
                <span className="font-mono text-navy text-sm tracking-widest uppercase">
                  Dúvidas frequentes
                </span>
                <span className="w-8 h-px bg-yellow" />
              </div>
              <h2 className="font-heading text-3xl md:text-[40px] text-navy leading-tight">
                Perguntas frequentes sobre a PS Proteção
              </h2>
            </div>
          </Reveal>
          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-[var(--container-max)] mx-auto px-6 md:px-[var(--spacing-grid-margin)] relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
          <Reveal>
            <div>
              <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">
                Faça parte da nossa história
              </h2>
              <p className="text-white/70 text-lg max-w-xl">
                Entre em contato e descubra como a PS Proteção pode transformar a gestão de
                Facilities da sua empresa.
              </p>
            </div>
          </Reveal>
          <Reveal delayMs={100}>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a
                href="https://wa.me/5519982892037"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-yellow hover:bg-yellow-dark text-navy font-heading font-semibold px-7 py-3.5 transition-colors"
              >
                <MessageCircle size={18} />
                Falar pelo WhatsApp
              </a>
              <a
                href="https://protecaotalentos.online"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm px-7 py-3.5 font-heading font-semibold text-white hover:bg-white/15 transition-colors"
              >
                <UserPlus size={18} />
                Trabalhe Conosco
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
