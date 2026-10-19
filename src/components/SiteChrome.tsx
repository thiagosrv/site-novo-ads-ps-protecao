"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import CookieConsent from "@/components/CookieConsent";
import QuoteModalProvider from "@/components/QuoteModalProvider";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import LpHeader from "@/components/lp/LpHeader";
import LpFooter from "@/components/lp/LpFooter";

// /admin is the CMS shell — it renders its own minimal chrome (see
// src/app/admin/(protected)/layout.tsx) and must not inherit the public
// site's Header/Footer/WhatsApp CTA/cookie banner.
//
// /lp-psprotecao is the presentation page linked from the welcome e-mail: it
// gets a lean frame (logo-only top, minimal footer, no menu, no floating
// WhatsApp, no structured data — the page is noindex) so nothing pulls the
// reader away from the presentation. Cookie consent stays.
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isLandingPresentation = pathname === "/lp-psprotecao";

  if (isAdmin) {
    return <>{children}</>;
  }

  if (isLandingPresentation) {
    return (
      <>
        <LpHeader />
        <main className="flex-1">{children}</main>
        <LpFooter />
        <CookieConsent />
      </>
    );
  }

  return (
    <QuoteModalProvider>
      <LocalBusinessSchema />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloatingButton />
      <CookieConsent />
    </QuoteModalProvider>
  );
}
