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
