# Notas de planejamento — Site institucional PS Proteção

## Referência de mercado: protecaoeseguranca.com.br

**Estrutura de página (ordem sugerida de seções):**
1. Header fixo — logo, menu (Home, Serviços, Sobre, Blog, Contato), CTAs "Trabalhe Conosco" / "Orçamento"
2. Hero — tagline institucional de autoridade ("Há X anos protegendo seu patrimônio...")
3. Estatísticas em cards (colaboradores, clientes, anos de mercado, % de supervisão)
4. Missão, Visão e Valores (3 colunas)
5. Grid de serviços (Portaria, Limpeza, Zeladoria, Administrativo, Recepção, Contábil)
6. Depoimentos de clientes (foto + cargo)
7. Metodologia de implantação (etapas visuais)
8. Tecnologia/diferenciais operacionais (app próprio, supervisão, relatórios, POPs, "Sempre Alerta")
9. Garantias/diferenciais (cobertura de faltas, supervisão periódica, suporte contínuo)
10. FAQ
11. Abrangência (municípios atendidos, em tags)
12. CTA final
13. Footer institucional (links, redes sociais, endereço, canal de ética)

**Tom de voz:** profissional, direto, orientado a resultado. Termos-chave: "supervisão", "continuidade operacional", "excelência", "compromisso".

**CTAs recorrentes:** "Solicitar Orçamento", "Fale Conosco", "Falar pelo WhatsApp", "Solicitar Proposta Personalizada".

**Segmentos atendidos (referência):** Empresas/Indústrias, Logística, Educação, Comércio, Construção, Saúde.

## Assets reaproveitados

Copiados de `Testeapp/site-ps-novo` para `public/assets/` (versões `.webp` otimizadas + vídeos de hero):
- Serviços: `administrativo`, `contabil`, `limpeza`, `porteiro`, `recepcao`, `zelador`
- Depoimentos: `ana`, `carlos`, `roberto`, `thiago`
- Institucional: `fachada`, `historia`, `logo-servicos`, `psprotecao`, `blog`
- Implantação: `implantacao1` a `implantacao5`
- Tecnologia/diferenciais: `app-controle-de-acesso`, `pop-sla`, `relatorio`, `sempre-alerta`, `supervisao-bancada`
- Hero: `hero`, `hero-bg.mp4/webm`, `hero-bg-mobile.mp4/webm`, `hero-bg-poster(.mobile).webp`

Estas são placeholders — serão substituídas/reorganizadas quando os PNGs/MDs de design definitivos chegarem.

## Design system definitivo: "Sentinel Elite" (implementado)

Superseded o rascunho de paleta neobrutalism acima. O design definitivo veio de
`Downloads/stitch_plataforma_ps_prote_o_premium/sentinel_elite/DESIGN.md` +
`ps_prote_o_home_page_ultra_premium_gemini_pro/code.html` (mockup estrutural) +
fotos/logo reais (`background_right1.png`, `logo_servicos.png`).

**Estética:** "Editorial Corporate" + "Swiss Grid" — grid técnico, tipografia forte, cards com bastante respiro.

**Paleta:**
- Navy `#000F6A` / Deep Navy `#071338`
- Institutional Yellow `#FCBF07`
- Tech Blue `#4193FF`
- Off-white (surface) `#F5F7FB`
- Graphite (texto) `#151A25`

**Tipografia:** Sora (headings), Inter (corpo), IBM Plex Mono (labels/dados técnicos) — via `next/font/google`.

**Espaçamento:** container 1280px, margens 80px desktop, gutters 24px, padding de seção 120px. Raio 8px (pequeno) a 16–24px (cards).

Implementado como tokens Tailwind v4 (`@theme` em `src/app/globals.css`) — sem `tailwind.config.js`, tudo via custom properties (`bg-navy`, `text-yellow`, `font-heading`, etc.).

## Estrutura implementada (Next.js, App Router)

Home (`src/app/page.tsx`) compõe: `Header` → `Hero` → `StatsBar` → `Differentiators` → `Services` → `Testimonials` → `Implementation` → `TechSolutions` → `ContactSection` → `Footer` (todos em `src/components/`).

- Hero usa foto real (`public/brand/guarda-fachada.png`) e logo oficial (`public/brand/logo-ps-protecao.png`). Layout de coluna única (`max-w-2xl`), sem painel lateral — um "Status Operacional" com simulação ao vivo chegou a ser prototipado e foi removido a pedido do usuário; não reintroduzir sem alinhar antes.
- Services ainda usa os `.webp` placeholders reaproveitados do `site-ps-novo` (ver seção "Assets reaproveitados" acima) — substituir quando houver fotos definitivas para esses cards.
- `IntelligenceHub` (seção de blog/artigos) foi removida a pedido do usuário — sem substituto por enquanto.
- `Testimonials` (`src/components/Testimonials.tsx`): seção "O que dizem sobre nós?" portada do `site-ps-novo` (`#depoimentos`) — 3 cards (Carlos Silva, Ana Paula Rodrigues destacada, Roberto Mendes) + CTA para avaliações no Google. Usa `public/assets/{carlos,ana,roberto}.webp`.
- `Implementation` (`src/components/Implementation.tsx`): seção "Como estruturamos cada operação?" portada do `site-ps-novo` (`#implantacao`) — imagem de capa + timeline vertical de 4 etapas (Diagnóstico, Dimensionamento/Implantação, Supervisão/Auditoria, Relatórios) + CTA WhatsApp "Solicitar Proposta Personalizada". Usa `public/assets/implantacao1.webp` a `implantacao5.webp`. Fundo `bg-navy`, mesma paleta escura do `TechSolutions`.
- `TechSolutions` (`src/components/TechSolutions.tsx`): seção "Tecnologias Aplicadas a Serviços" portada do `site-ps-novo` (lista `.tech-solutions` do `index.html`), com abas clicáveis (client component, `useState`) trocando texto + imagem entre os 5 itens (App de Controle de Acesso, Supervisão de Bancada, Relatório de Supervisão Mensal, Implantação com POPs e SLAs, Dispositivo "Sempre Alerta"). Usa as imagens já copiadas em `public/assets/` (`app-controle-de-acesso.webp`, `supervisao-bancada.webp`, `relatorio.webp`, `pop-sla.webp`, `sempre-alerta.webp`). Tema escuro por padrão, com efeito GSAP `ScrollTrigger` scrub (`start: "top 75%", end: "top 25%"`) que anima cores dark→light conforme o scroll (bidirecional).
- Nav do `Header` atualizado: item "Blog" (`#blog`) trocado por "Tecnologia" (`#solucoes-adaptadas`), apontando para a seção `TechSolutions`.
- `lucide-react` (v1.26.0) não exporta ícones de marca (`Linkedin`/`Instagram`) — usar SVG inline nesses casos (ver `Footer.tsx`).
- GSAP (`gsap` + `gsap/ScrollTrigger`) instalado. Usado em: `StatCounter.tsx` (contador crescente ao entrar na viewport, usado no `StatsBar`) e `TechSolutions.tsx` (scroll-scrub dark→light, ver acima). Padrão: `gsap.context()` + `ctx.revert()` no cleanup do `useEffect`/`useLayoutEffect`.
- `WhatsAppCta.tsx`: botão CTA reutilizável (Header desktop/mobile, Hero, Implementation) — gradiente amarelo por padrão, no hover vira verde WhatsApp (`#25D366`→`#1fae59`) com crossfade puro CSS (`group`/`group-hover`, dois `<span>` empilhados) trocando o texto para "Estamos Online" + ícone `MessageCircle`. Não usar essa treatment em botões de submit de formulário (ex.: `ContactSection`) — texto ficaria semanticamente errado.

## Próximo passo

- Alinhar com o usuário: form de contato ainda não tem backend, e páginas adicionais (Serviços, Sobre, Blog, Contato).
