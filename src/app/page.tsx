import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Differentiators from "@/components/Differentiators";
import Services from "@/components/Services";
import TechSolutions from "@/components/TechSolutions";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <StatsBar />
        <Differentiators />
        <Services />
        <TechSolutions />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
