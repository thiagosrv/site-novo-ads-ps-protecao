import type { Metadata } from "next";
import Script from "next/script";
import { Sora, Inter, IBM_Plex_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import LoadingScreen from "@/components/LoadingScreen";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import CookieConsent from "@/components/CookieConsent";
import QuoteModalProvider from "@/components/QuoteModalProvider";
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
        <QuoteModalProvider>
          <LoadingScreen />
          <LocalBusinessSchema />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFloatingButton />
          <CookieConsent />
        </QuoteModalProvider>
      </body>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-18320528244"
        strategy="beforeInteractive"
      />
      <Script id="google-tag-ads" strategy="beforeInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-18320528244');`}
      </Script>
    </html>
  );
}
