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
import OurPresence from "@/components/OurPresence";
import CoverageArea from "@/components/CoverageArea";

export const metadata: Metadata = {
  title: "PS Proteção | Terceirização de Portaria, Limpeza e Facilities em Americana e Região",
  description:
    "Terceirização de portaria e limpeza para empresas, condomínios e indústrias, com supervisão ativa, processos padronizados e gestão operacional.",
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
      <TechSolutions scrollTransition />
      <HomeFaq />
      <ContactSection />
      <OurPresence />
      <CoverageArea />
    </>
  );
}
