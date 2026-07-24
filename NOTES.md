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

Home (`src/app/page.tsx`) compõe: `Header` → `Hero` → `StatsBar` → `Differentiators` → `Services` → `TechSolutions` → `ContactSection` → `Footer` (todos em `src/components/`).

- Hero usa foto real (`public/brand/guarda-fachada.png`) e logo oficial (`public/brand/logo-ps-protecao.png`).
- Services ainda usa os `.webp` placeholders reaproveitados do `site-ps-novo` (ver seção "Assets reaproveitados" acima) — substituir quando houver fotos definitivas para esses cards.
- `IntelligenceHub` (seção de blog/artigos) foi removida a pedido do usuário — sem substituto por enquanto.
- `TechSolutions` (`src/components/TechSolutions.tsx`) substitui o `IntelligenceHub`: seção "Tecnologias Aplicadas a Serviços" portada do `site-ps-novo` (lista `.tech-solutions` do `index.html`), com abas clicáveis (client component, `useState`) trocando texto + imagem entre os 5 itens (App de Controle de Acesso, Supervisão de Bancada, Relatório de Supervisão Mensal, Implantação com POPs e SLAs, Dispositivo "Sempre Alerta"). Usa as imagens já copiadas em `public/assets/` (`app-controle-de-acesso.webp`, `supervisao-bancada.webp`, `relatorio.webp`, `pop-sla.webp`, `sempre-alerta.webp`).
- Nav do `Header` atualizado: item "Blog" (`#blog`) trocado por "Tecnologia" (`#solucoes-adaptadas`), apontando para a nova seção.
- `lucide-react` (v1.26.0) não exporta ícones de marca (`Linkedin`/`Instagram`) — usar SVG inline nesses casos (ver `Footer.tsx`).

## Próximo passo

- Verificação visual (screenshot) pendente — ambiente de browser não conseguiu compor o frame; conteúdo/estrutura já validados via texto e rede (todos os assets carregando 200 OK).
- Alinhar com o usuário: form de contato ainda não tem backend, seção de depoimentos (presente no concorrente, ausente no mockup Sentinel Elite) e páginas adicionais (Serviços, Sobre, Blog, Contato).
