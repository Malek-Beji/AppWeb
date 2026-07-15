import type { Metadata } from "next";
import Contact from "@/components/site/Contact";

export const metadata: Metadata = {
  title: "Contact — AppWeb Plus",
  description:
    "Décrivez-nous votre besoin et recevez une proposition personnalisée sous 24h. Email, téléphone et formulaire de contact AppWeb Plus.",
};

export default function ContactPage() {
  return <Contact />;
}
