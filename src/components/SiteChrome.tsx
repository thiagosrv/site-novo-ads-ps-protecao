"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import CookieConsent from "@/components/CookieConsent";
import QuoteModalProvider from "@/components/QuoteModalProvider";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";

// /admin is the CMS shell — it renders its own minimal chrome (see
// src/app/admin/(protected)/layout.tsx) and must not inherit the public
// site's Header/Footer/WhatsApp CTA/cookie banner.
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
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
