// Pure, I/O-free SEO analysis — a Rank Math-style content checklist. Runs on
// the client (recomputed on every relevant edit, for the live side panel)
// and on the server (to persist seo_score when a post is saved/published).
// No DOM dependency, so it behaves identically in both environments.

export type SeoCheckStatus = "pass" | "warning" | "fail";
export type SeoCheckCategory = "basic" | "additional" | "title" | "eeat";

export type SeoCheck = {
  id: string;
  status: SeoCheckStatus;
  message: string;
  category: SeoCheckCategory;
};

export type SeoAnalysisInput = {
  title: string;
  subtitle: string;
  slug: string;
  metaDescription: string;
  focusKeyword: string;
  bodyText: string;
  bodyHtml: string;
  coverImageAlt: string;
  siteHostname: string;
  authorName: string;
  authorBio: string;
  secondaryKeywords: string;
  videoEmbedUrl: string;
};

export type SeoAnalysisResult = {
  score: number;
  wordCount: number;
  checks: SeoCheck[];
};

const CHECK_WEIGHTS: Record<string, number> = {
  keywordInTitle: 10,
  keywordInMetaDescription: 8,
  keywordInSlug: 6,
  keywordInFirstParagraph: 6,
  keywordDensity: 10,
  contentLength: 12,
  keywordInSubtitle: 6,
  keywordInImageAlt: 4,
  titleLength: 8,
  metaDescriptionLength: 8,
  internalLinks: 6,
  externalLinks: 6,
  externalLinksRel: 4,
  readability: 6,
  authorName: 6,
  authorBio: 8,
  semanticDensity: 8,
  // multimediaRetention is intentionally absent — dwell-time multimedia is
  // optional per product decision, so it never affects the score (see the
  // totalWeight/earnedWeight fallback to 0 for unweighted check ids below).
};

const MIN_WORDS = 800;
const MAX_WORDS = 2400;

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(new RegExp("[̀-ͯ]", "g"), "")
    .toLowerCase();
}

function containsKeyword(haystack: string, keyword: string): boolean {
  if (!keyword.trim()) return false;
  return normalize(haystack).includes(normalize(keyword));
}

// Exported so the editor (client-side word count) and Server Actions
// (server-side persisted word_count/seo_score) derive plain text the same
// way analyzeSeo does internally — no DOM dependency, works in both places.
export function htmlToPlainText(html: string): string {
  return html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<\/(p|div|li|h[1-6]|blockquote)>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+/g, " ")
    .trim();
}

export function countWords(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.length;
}

function getFirstParagraph(bodyHtml: string): string {
  const match = /<p[^>]*>([\s\S]*?)<\/p>/i.exec(bodyHtml);
  return match ? htmlToPlainText(match[1]) : htmlToPlainText(bodyHtml).split("\n\n")[0] ?? "";
}

function getKeywordDensity(bodyText: string, keyword: string): number {
  if (!keyword.trim()) return 0;
  const words = countWords(bodyText);
  if (words === 0) return 0;
  const normalizedBody = normalize(bodyText);
  const normalizedKeyword = normalize(keyword).trim();
  const keywordWordCount = normalizedKeyword.split(/\s+/).filter(Boolean).length;
  const occurrences = normalizedBody.split(normalizedKeyword).length - 1;
  return ((occurrences * keywordWordCount) / words) * 100;
}

type LinkInfo = { href: string; rel: string };

function extractLinks(bodyHtml: string): LinkInfo[] {
  const links: LinkInfo[] = [];
  const anchorRegex = /<a\s+[^>]*href="([^"]*)"[^>]*>/gi;
  let match: RegExpExecArray | null;
  while ((match = anchorRegex.exec(bodyHtml)) !== null) {
    const relMatch = /rel="([^"]*)"/i.exec(match[0]);
    links.push({ href: match[1], rel: relMatch?.[1] ?? "" });
  }
  return links;
}

const ALLOWED_VIDEO_EMBED_HOSTS = [
  "www.youtube.com",
  "www.youtube-nocookie.com",
  "player.vimeo.com",
];

export function isSafeVideoEmbedUrl(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed) return false;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "https:" && ALLOWED_VIDEO_EMBED_HOSTS.includes(parsed.hostname);
  } catch {
    return false;
  }
}

function parseSecondaryKeywords(raw: string): string[] {
  return raw
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
}

function isInternalLink(href: string, siteHostname: string): boolean {
  if (href.startsWith("/") || href.startsWith("#")) return true;
  try {
    const url = new URL(href);
    return url.hostname === siteHostname;
  } catch {
    return false;
  }
}

function readabilityCheck(bodyHtml: string): SeoCheckStatus {
  const text = htmlToPlainText(bodyHtml);
  const sentences = text.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
  if (sentences.length === 0) return "fail";

  const avgSentenceLength =
    sentences.reduce((sum, s) => sum + countWords(s), 0) / sentences.length;

  const paragraphs = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const avgParagraphLength =
    paragraphs.length > 0
      ? paragraphs.reduce((sum, p) => sum + countWords(p), 0) / paragraphs.length
      : 0;

  if (avgSentenceLength <= 20 && avgParagraphLength <= 120) return "pass";
  if (avgSentenceLength <= 25 && avgParagraphLength <= 160) return "warning";
  return "fail";
}

function push(
  checks: SeoCheck[],
  id: string,
  status: SeoCheckStatus,
  message: string,
  category: SeoCheckCategory
) {
  checks.push({ id, status, message, category });
}

export function analyzeSeo(input: SeoAnalysisInput): SeoAnalysisResult {
  const checks: SeoCheck[] = [];
  const {
    title,
    subtitle,
    slug,
    metaDescription,
    focusKeyword,
    bodyText,
    bodyHtml,
    coverImageAlt,
    siteHostname,
    authorName,
    authorBio,
    secondaryKeywords,
    videoEmbedUrl,
  } = input;

  const wordCount = countWords(bodyText);
  const hasKeyword = focusKeyword.trim().length > 0;

  // Básico
  push(
    checks,
    "keywordInTitle",
    !hasKeyword ? "fail" : containsKeyword(title, focusKeyword) ? "pass" : "fail",
    "A palavra-chave foco deve aparecer no título.",
    "basic"
  );

  push(
    checks,
    "keywordInMetaDescription",
    !hasKeyword
      ? "fail"
      : containsKeyword(metaDescription, focusKeyword)
        ? "pass"
        : "fail",
    "A palavra-chave foco deve aparecer na meta descrição.",
    "basic"
  );

  push(
    checks,
    "keywordInSlug",
    !hasKeyword ? "fail" : containsKeyword(slug.replace(/-/g, " "), focusKeyword) ? "pass" : "fail",
    "A palavra-chave foco deve aparecer na URL (slug).",
    "basic"
  );

  const firstParagraph = getFirstParagraph(bodyHtml);
  push(
    checks,
    "keywordInFirstParagraph",
    !hasKeyword
      ? "fail"
      : containsKeyword(firstParagraph, focusKeyword)
        ? "pass"
        : "fail",
    "A palavra-chave foco deve aparecer no primeiro parágrafo.",
    "basic"
  );

  const density = getKeywordDensity(bodyText, focusKeyword);
  let densityStatus: SeoCheckStatus = "fail";
  if (hasKeyword) {
    if (density >= 0.8 && density <= 1.8) densityStatus = "pass";
    else if ((density > 0.3 && density < 0.8) || (density > 1.8 && density <= 3)) densityStatus = "warning";
    else densityStatus = "fail";
  }
  push(
    checks,
    "keywordDensity",
    densityStatus,
    `Densidade da palavra-chave: ${density.toFixed(2)}% (ideal entre 1% e 1.5%).`,
    "basic"
  );

  let contentLengthStatus: SeoCheckStatus;
  if (wordCount >= MIN_WORDS && wordCount <= MAX_WORDS) contentLengthStatus = "pass";
  else if (wordCount >= MIN_WORDS * 0.75 && wordCount <= MAX_WORDS * 1.15) contentLengthStatus = "warning";
  else contentLengthStatus = "fail";
  push(
    checks,
    "contentLength",
    contentLengthStatus,
    `O post tem ${wordCount} palavras (ideal entre ${MIN_WORDS} e ${MAX_WORDS}).`,
    "basic"
  );

  push(
    checks,
    "keywordInSubtitle",
    !hasKeyword ? "fail" : containsKeyword(subtitle, focusKeyword) ? "pass" : "fail",
    "A palavra-chave foco deve aparecer no subtítulo.",
    "basic"
  );

  push(
    checks,
    "keywordInImageAlt",
    !hasKeyword ? "fail" : containsKeyword(coverImageAlt, focusKeyword) ? "pass" : "fail",
    "A palavra-chave foco deve aparecer no texto alternativo da imagem de capa.",
    "basic"
  );

  // Título / descrição
  const titleLength = title.trim().length;
  let titleLengthStatus: SeoCheckStatus;
  if (titleLength >= 30 && titleLength <= 60) titleLengthStatus = "pass";
  else if (titleLength > 0 && titleLength < 70) titleLengthStatus = "warning";
  else titleLengthStatus = "fail";
  push(
    checks,
    "titleLength",
    titleLengthStatus,
    `O título tem ${titleLength} caracteres (ideal entre 30 e 60).`,
    "title"
  );

  const metaLength = metaDescription.trim().length;
  let metaLengthStatus: SeoCheckStatus;
  if (metaLength >= 120 && metaLength <= 160) metaLengthStatus = "pass";
  else if (metaLength > 0 && metaLength < 180) metaLengthStatus = "warning";
  else metaLengthStatus = "fail";
  push(
    checks,
    "metaDescriptionLength",
    metaLengthStatus,
    `A meta descrição tem ${metaLength} caracteres (ideal entre 120 e 160).`,
    "title"
  );

  // Adicional
  const links = extractLinks(bodyHtml);
  const internalLinks = links.filter((l) => isInternalLink(l.href, siteHostname));
  const externalLinks = links.filter((l) => !isInternalLink(l.href, siteHostname));

  push(
    checks,
    "internalLinks",
    internalLinks.length >= 1 ? "pass" : "warning",
    `${internalLinks.length} link(s) interno(s) encontrado(s) (pelo menos 1 recomendado).`,
    "additional"
  );

  push(
    checks,
    "externalLinks",
    externalLinks.length >= 1 ? "pass" : "warning",
    `${externalLinks.length} link(s) externo(s) encontrado(s) (pelo menos 1 recomendado).`,
    "additional"
  );

  const externalLinksWithSafeRel = externalLinks.filter((l) =>
    l.rel.includes("noopener")
  );
  push(
    checks,
    "externalLinksRel",
    externalLinks.length === 0 || externalLinksWithSafeRel.length === externalLinks.length
      ? "pass"
      : "warning",
    "Links externos recebem rel=\"noopener noreferrer\" automaticamente.",
    "additional"
  );

  push(
    checks,
    "readability",
    readabilityCheck(bodyHtml),
    "Legibilidade (aproximação por tamanho médio de frase/parágrafo, não uma fórmula científica).",
    "additional"
  );

  // Densidade semântica (LSI)
  const secondaryKeywordList = parseSecondaryKeywords(secondaryKeywords);
  if (secondaryKeywordList.length === 0) {
    push(
      checks,
      "semanticDensity",
      "warning",
      "Nenhuma palavra-chave secundária (LSI) informada — termos relacionados ajudam o Google a entender o contexto do conteúdo.",
      "additional"
    );
  } else {
    const matched = secondaryKeywordList.filter((kw) => containsKeyword(bodyText, kw));
    const ratio = matched.length / secondaryKeywordList.length;
    let semanticStatus: SeoCheckStatus;
    if (ratio >= 0.5) semanticStatus = "pass";
    else if (ratio > 0) semanticStatus = "warning";
    else semanticStatus = "fail";
    push(
      checks,
      "semanticDensity",
      semanticStatus,
      `${matched.length} de ${secondaryKeywordList.length} palavra(s)-chave secundária(s) (LSI) encontrada(s) no conteúdo.`,
      "additional"
    );
  }

  // E-E-A-T — assinatura de autoridade
  push(
    checks,
    "authorName",
    authorName.trim() ? "pass" : "fail",
    "O post deve ter um autor identificado (nome).",
    "eeat"
  );

  const bioLength = authorBio.trim().length;
  let authorBioStatus: SeoCheckStatus;
  if (bioLength >= 40) authorBioStatus = "pass";
  else if (bioLength > 0) authorBioStatus = "warning";
  else authorBioStatus = "fail";
  push(
    checks,
    "authorBio",
    authorBioStatus,
    "A assinatura do autor deve incluir credenciais/experiência (E-E-A-T) — mínimo recomendado de 40 caracteres.",
    "eeat"
  );

  // Multimídia de retenção (dwell time) — não obrigatório, não afeta a nota.
  push(
    checks,
    "multimediaRetention",
    isSafeVideoEmbedUrl(videoEmbedUrl) ? "pass" : "warning",
    "Vídeo/multimídia incorporado (não obrigatório) — ajuda a aumentar o tempo de permanência (dwell time) na página.",
    "additional"
  );

  const totalWeight = Object.values(CHECK_WEIGHTS).reduce((sum, w) => sum + w, 0);
  const earnedWeight = checks.reduce((sum, check) => {
    const weight = CHECK_WEIGHTS[check.id] ?? 0;
    if (check.status === "pass") return sum + weight;
    if (check.status === "warning") return sum + weight / 2;
    return sum;
  }, 0);

  const score = Math.round((earnedWeight / totalWeight) * 100);

  return { score, wordCount, checks };
}
