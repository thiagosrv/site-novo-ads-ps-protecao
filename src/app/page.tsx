import type { Metadata } from "next";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Differentiators from "@/components/Differentiators";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Implementation from "@/components/Implementation";
import TechSolutions from "@/components/TechSolutions";
import HomeFaq from "@/components/HomeFaq";
import ContactSection from "@/components/ContactSection";
import CoverageArea from "@/components/CoverageArea";

export const metadata: Metadata = {
  title: "PS Proteção | Terceirização de Portaria, Limpeza e Facilities em Americana e Região",
  description:
    "Terceirização com controle, supervisão e padrão operacional. Portaria, limpeza, zeladoria, recepção e facilities com supervisão ativa 24h e tecnologia embarcada, em Americana e em toda a Região Metropolitana de Campinas.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Differentiators />
      <Services />
      <Testimonials />
      <Implementation />
      <TechSolutions />
      <HomeFaq />
      <ContactSection />
      <CoverageArea />
    </>
  );
}
