"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import CookieConsent from "@/components/CookieConsent";
import QuoteModalProvider from "@/components/QuoteModalProvider";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";

// /admin is the CMS shell — it renders its own minimal chrome (see
// src/app/admin/layout.tsx) and must not inherit the public site's
// Header/Footer/WhatsApp CTA/cookie banner.
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <QuoteModalProvider>
      <LoadingScreen />
      <LocalBusinessSchema />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloatingButton />
      <CookieConsent />
    </QuoteModalProvider>
  );
}
