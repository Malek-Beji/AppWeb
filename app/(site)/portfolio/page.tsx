import type { Metadata } from "next";
import { portfolioProjects } from "@/lib/projects";
import Portfolio from "@/components/site/Portfolio";
import CtaBand from "@/components/site/CtaBand";

// Contenu statique (voir lib/projects.ts) : cette page se prérend au build,
// comme /services, et ne dépend d'aucune base de données à l'exécution.

export const metadata: Metadata = {
  title: "Portfolio — AppWeb Plus",
  description:
    "Découvrez nos réalisations : e-commerce, immobilier, santé, formation. Des projets sur mesure livrés par AppWeb Plus.",
};

export default function PortfolioPage() {
  return (
    <>
      <Portfolio projects={portfolioProjects} />
      <CtaBand />
    </>
  );
}
