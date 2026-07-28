import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Política de Privacidade e Cookies | PS Proteção",
  description:
    "Saiba como a PS Proteção coleta, utiliza e protege seus dados pessoais, e como utilizamos cookies neste site, em conformidade com a LGPD.",
  alternates: {
    canonical: "/privacidade",
  },
};

const SECTIONS = [
  {
    title: "1. Quem somos",
    body: (
      <>
        Esta Política de Privacidade e Cookies se aplica ao site institucional da{" "}
        <strong className="text-navy">PS Proteção</strong> (CNPJ 47.425.584/0001-00), com sede na
        Rua São Gabriel, 1623 — Vila Belvedere, Americana/SP, doravante &ldquo;PS Proteção&rdquo;,
        &ldquo;nós&rdquo; ou &ldquo;controlador&rdquo;. Este documento explica quais dados
        coletamos, como os utilizamos e quais cookies operam neste site, em conformidade com a Lei
        Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).
      </>
    ),
  },
  {
    title: "2. Quais dados coletamos",
    body: (
      <>
        Coletamos apenas os dados que você nos fornece diretamente ao interagir com o site, como
        nome, telefone, e-mail e mensagem, ao preencher formulários de contato ou solicitar um
        diagnóstico operacional. Também coletamos dados de navegação de forma automatizada
        (endereço IP, tipo de dispositivo, páginas visitadas) por meio de cookies, conforme
        detalhado na seção 4.
      </>
    ),
  },
  {
    title: "3. Como utilizamos seus dados",
    body: (
      <>
        Utilizamos os dados coletados para: (i) responder às suas solicitações de contato e
        propostas comerciais; (ii) entender como o site é utilizado, para corrigir problemas e
        melhorar a experiência de navegação; e (iii) cumprir obrigações legais ou regulatórias
        aplicáveis. Não vendemos seus dados pessoais a terceiros.
      </>
    ),
  },
  {
    title: "4. Cookies utilizados neste site",
    body: (
      <>
        <p className="mb-4">Classificamos os cookies utilizados neste site em duas categorias:</p>
        <ul className="space-y-3 list-disc pl-5 marker:text-yellow-dark">
          <li>
            <strong className="text-navy">Cookies necessários:</strong> essenciais para o
            funcionamento do site, como o registro da sua preferência de consentimento de cookies.
            Não podem ser desativados, pois o site não funciona corretamente sem eles.
          </li>
          <li>
            <strong className="text-navy">Cookies analíticos:</strong> nos ajudam a entender, de
            forma agregada e anônima sempre que possível, como os visitantes utilizam o site
            (páginas mais acessadas, tempo de permanência, origem do tráfego). Esses cookies só são
            ativados mediante o seu consentimento explícito no banner de cookies.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "5. Compartilhamento de dados",
    body: (
      <>
        Podemos compartilhar dados com prestadores de serviço que nos auxiliam na operação do site
        (por exemplo, hospedagem e ferramentas de análise de tráfego), sempre sob obrigação
        contratual de confidencialidade e apenas na medida necessária para a prestação desses
        serviços. Podemos ainda divulgar dados quando exigido por lei ou ordem judicial.
      </>
    ),
  },
  {
    title: "6. Seus direitos como titular de dados",
    body: (
      <>
        <p className="mb-4">Nos termos da LGPD, você tem direito a:</p>
        <ul className="space-y-2 list-disc pl-5 marker:text-yellow-dark">
          <li>Confirmar a existência de tratamento dos seus dados;</li>
          <li>Acessar, corrigir ou atualizar seus dados;</li>
          <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários;</li>
          <li>Solicitar a portabilidade dos seus dados;</li>
          <li>Revogar o consentimento e solicitar a exclusão dos dados tratados com base nele;</li>
          <li>Obter informações sobre com quem compartilhamos seus dados.</li>
        </ul>
      </>
    ),
  },
  {
    title: "7. Como exercer seus direitos",
    body: (
      <>
        Para exercer qualquer um dos direitos acima, revogar seu consentimento de cookies ou tirar
        dúvidas sobre este documento, entre em contato pelo e-mail{" "}
        <a href="mailto:adm@psprotecao.com.br" className="text-navy underline hover:text-yellow-dark transition-colors">
          adm@psprotecao.com.br
        </a>{" "}
        ou pelo telefone (19) 3478-7799. Você pode revogar sua decisão sobre cookies analíticos a
        qualquer momento apagando os dados de navegação deste site nas configurações do seu
        navegador.
      </>
    ),
  },
  {
    title: "8. Alterações desta política",
    body: (
      <>
        Esta política pode ser atualizada periodicamente para refletir mudanças em nossas práticas
        ou na legislação aplicável. A data da última atualização é indicada abaixo. Recomendamos a
        revisão periódica deste documento.
      </>
    ),
  },
];

export default function PrivacidadePage() {
  return (
    <>
      <PageHero
        tag="Transparência e conformidade"
        title="Política de Privacidade e Cookies"
        description="Como coletamos, usamos e protegemos seus dados neste site, em conformidade com a LGPD."
      />

      <section className="py-16 md:py-[var(--spacing-section)] px-6 md:px-[var(--spacing-grid-margin)]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-graphite/50 mb-12">
              Última atualização: julho de 2026
            </p>
          </Reveal>

          <div className="space-y-12">
            {SECTIONS.map((section) => (
              <Reveal key={section.title}>
                <div>
                  <h2 className="font-heading text-xl md:text-2xl font-bold text-navy mb-4">
                    {section.title}
                  </h2>
                  <div className="text-graphite/70 leading-relaxed">{section.body}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
