import type { NextConfig } from "next";

// Pastas de public/ cujos arquivos mantêm o mesmo nome por muito tempo. Não usamos
// `immutable`/1 ano porque alguns arquivos (fotos do hero, avatar) já foram
// trocados mantendo o nome — 1 dia + stale-while-revalidate acelera as
// visitas recorrentes sem prender uma imagem antiga no navegador.
const PUBLIC_ASSET_CACHE_CONTROL =
  "public, max-age=86400, stale-while-revalidate=604800";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // Covers the R2 Public Development URL (pub-<hash>.r2.dev). If a
        // custom domain is connected to the bucket later, add its hostname
        // here too — remotePatterns can't be derived from R2_PUBLIC_URL at
        // build time.
        hostname: "*.r2.dev",
      },
    ],
  },
  experimental: {
    serverActions: {
      // Default is 1MB; uploadCoverImage (src/lib/blog/actions.ts) allows
      // up to 8MB, so the framework guard needs matching headroom or real
      // cover photos never reach that check.
      bodySizeLimit: "10mb",
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      // Painel administrativo: nunca deve ser exibido dentro de um iframe.
      {
        source: "/admin/:path*",
        headers: [{ key: "X-Frame-Options", value: "DENY" }],
      },
      ...["assets", "brand", "loading"].map((dir) => ({
        source: `/${dir}/:path*`,
        headers: [{ key: "Cache-Control", value: PUBLIC_ASSET_CACHE_CONTROL }],
      })),
    ];
  },
  async rewrites() {
    return [
      // app/sitemap.ts reserves the literal /sitemap.xml path for its own
      // generateSitemaps-based metadata route (which actually serves
      // /sitemap/[id].xml), so the hand-rolled sitemap index lives at
      // /sitemap-index.xml and is rewritten to the public /sitemap.xml URL.
      {
        source: "/sitemap.xml",
        destination: "/sitemap-index.xml",
      },
    ];
  },
};

export default nextConfig;
