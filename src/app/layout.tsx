import type { Metadata } from "next";
import { Sora, Inter, IBM_Plex_Mono } from "next/font/google";
import SiteChrome from "@/components/SiteChrome";
import GoogleTagManager, { GTM_ID } from "@/components/GoogleTagManager";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GclidCapture from "@/components/GclidCapture";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "PS Proteção | Terceirização de Alta Performance em Portaria e Facilities",
  description:
    "Terceirização com controle, supervisão e padrão operacional. Portaria, limpeza, zeladoria, recepção e facilities com supervisão ativa 24h e tecnologia embarcada.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${sora.variable} ${inter.variable} ${ibmPlexMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-surface text-graphite font-body">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <GoogleTagManager />
        <GoogleAnalytics />
        <GclidCapture />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
