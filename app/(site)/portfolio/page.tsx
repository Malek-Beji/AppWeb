import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Portfolio from "@/components/site/Portfolio";
import CtaBand from "@/components/site/CtaBand";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portfolio — AppWeb Plus",
  description:
    "Découvrez nos réalisations : e-commerce, immobilier, santé, formation. Des projets sur mesure livrés par AppWeb Plus.",
};

export default async function PortfolioPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <>
      <Portfolio projects={projects} />
      <CtaBand />
    </>
  );
}
