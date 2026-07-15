import type { Metadata } from "next";
import About from "@/components/site/About";
import WhyUs from "@/components/site/WhyUs";
import CtaBand from "@/components/site/CtaBand";

export const metadata: Metadata = {
  title: "À Propos — AppWeb Plus",
  description:
    "Plus de 6 ans d'expertise en développement web, e-commerce et intégration sur mesure. Découvrez AppWeb Plus, notre expertise et notre processus.",
};

export default function AproposPage() {
  return (
    <>
      <About />
      <WhyUs />
      <CtaBand />
    </>
  );
}
