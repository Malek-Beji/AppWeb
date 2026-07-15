import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Chatbot from "@/components/site/Chatbot";
import RevealObserver from "@/components/site/RevealObserver";

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

export default function SiteLayout({ children }: { children: React.ReactNode }) {
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
      {children}
      <Footer />
      <Chatbot />
      <RevealObserver />
    </>
  );
}
