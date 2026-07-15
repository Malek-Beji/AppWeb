import type { Metadata } from "next";
import Services from "@/components/site/Services";
import CtaBand from "@/components/site/CtaBand";

export const metadata: Metadata = {
  title: "Services — AppWeb Plus",
  description:
    "Création de sites web, applications mobiles, design & intégration, solutions sur mesure. Découvrez nos services digitaux.",
};

export default function ServicesPage() {
  return (
    <>
      <Services />
      <CtaBand />
    </>
  );
}
