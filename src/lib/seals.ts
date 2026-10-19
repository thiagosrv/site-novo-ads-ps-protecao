// Selos exibidos no rodapé do site e na LP. Todos exportados em 384x384 (fundo
// transparente, sem halo), ou seja, nitidez de sobra para exibição pequena (48px).
export type Seal = { src: string; alt: string; href?: string };

export const SEALS: readonly Seal[] = [
  {
    src: "/assets/selos/ciesp.webp",
    alt: "Selo Parceiro CIESP 2026",
    href: "https://regional.ciesp.com.br/americana/",
  },
  {
    src: "/assets/selos/cipa.webp",
    alt: "Selo CIPA Segurança",
    href: "https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/NR05atualizada2023.pdf",
  },
  { src: "/assets/selos/lgpd.webp", alt: "Selo LGPD — proteção de dados pessoais" },
  { src: "/assets/selos/clt.webp", alt: "Selo institucional de conformidade CLT" },
  { src: "/assets/selos/supervisao-24h.webp", alt: "Selo de supervisão 24 horas" },
  { src: "/assets/selos/triagem-3-etapas.webp", alt: "Selo de triagem em 3 etapas" },
  { src: "/assets/selos/processos-padronizados.webp", alt: "Selo de processos padronizados" },
  { src: "/assets/selos/limpeza-profissional.webp", alt: "Selo institucional de limpeza profissional" },
];
