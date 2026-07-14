import { prisma } from "@/lib/prisma";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Ticker from "@/components/site/Ticker";
import Services from "@/components/site/Services";
import About from "@/components/site/About";
import Portfolio from "@/components/site/Portfolio";
import WhyUs from "@/components/site/WhyUs";
import CtaBand from "@/components/site/CtaBand";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import Chatbot from "@/components/site/Chatbot";
import RevealObserver from "@/components/site/RevealObserver";

export const dynamic = "force-dynamic";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "AppWeb Plus",
  description:
    "Agence digitale — création de sites web, e-commerce, applications mobiles, design & intégration sur mesure.",
  url: process.env.SITE_URL || "http://localhost:3000",
  telephone: "+21625789309",
  email: "contact@appwebplus.tn",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tunis",
    addressCountry: "TN",
  },
  areaServed: "TN",
  priceRange: "$$",
};

export default async function Home() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <Navbar />
      <Hero />
      <Ticker />
      <Services />
      <About />
      <Portfolio projects={projects} />
      <WhyUs />
      <CtaBand />
      <Contact />
      <Footer />
      <Chatbot />
      <RevealObserver />
    </>
  );
}
