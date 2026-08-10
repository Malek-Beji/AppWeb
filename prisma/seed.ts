import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Les applications développées sur mesure passent devant : ce sont elles qui
// distinguent l'agence d'un intégrateur WordPress. Les vitrines suivent.
const projects = [
  {
    slug: "cabinet-dentaire",
    title: "Cabinet Dentaire",
    category: "Application métier · Santé",
    image: "/portfolio/cabinet-dentaire.jpg",
    url: "https://cabinet-dentaire-kappa.vercel.app",
    description:
      "Application complète pour cabinet dentaire, développée sur mesure sans CMS : site vitrine modifiable, prise de rendez-vous en ligne sur les créneaux réellement libres, back-office (agenda, dossiers patients, odontogramme interactif, plans de traitement séance par séance, ordonnances, encaissements, statistiques) et espace patient sans mot de passe. Rappels automatiques par SMS et e-mail, accès individuels par rôle et journal des actions sensibles.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prise de rendez-vous", "Sur mesure"],
    order: 0,
    featured: true,
  },
  {
    slug: "cabinet-geriatrie",
    title: "Cabinet de médecine générale & gériatrie",
    category: "Application métier · Santé",
    image: "/portfolio/cabinet-geriatrie.jpg",
    url: "https://cabinet-geriatrie.vercel.app",
    description:
      "Même socle applicatif que le cabinet dentaire, avec la logique propre à la gériatrie : évaluation standardisée (ADL, IADL, GIR, MMSE, test de l'horloge, Mini-GDS, MNA, Timed Up and Go, Charlson) dont chaque score est interprété et comparé d'une visite à l'autre, alerte de polymédication, constantes lues selon les seuils du sujet âgé, et gestion des visites à domicile et en établissement.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Évaluation gériatrique", "Sur mesure"],
    order: 1,
    featured: true,
  },
  {
    slug: "capricieuse",
    title: "Capricieuse",
    category: "E-commerce · Mode",
    image: "/portfolio/capricieuse.jpg",
    url: "https://www.capricieuse.shop/",
    description:
      "Boutique en ligne de mode féminine développée sur mesure en PHP, sans CMS ni thème acheté : catalogue par catégories, recherche, panier, liste d'envies, compte client et suivi de commande. Le back-office couvre les produits et leurs images, les stocks, les commandes et expéditions, les codes promo, les zones et frais de livraison, les avis et les messages de contact.",
    tags: ["E-commerce", "PHP", "Sur mesure", "Back-office", "Gestion des stocks"],
    order: 2,
    featured: true,
  },
  {
    slug: "tileo",
    title: "TileO Dubai",
    category: "E-commerce · Revêtement",
    image: "/portfolio/tileo.PNG",
    url: "https://en.tileo.ae/",
    description:
      "Plateforme e-commerce de carrelage, dalles et sanitaires à Dubaï. Catalogue produit avec filtres avancés, consultation du catalogue en ligne, thème WordPress sur mesure et site multilingue.",
    tags: ["WordPress", "E-commerce", "Multilingue", "Thème sur mesure", "Catalogue"],
    order: 3,
  },
  {
    slug: "karmafitout",
    title: "Karma Fitout",
    category: "Vitrine · Aménagement",
    image: "/portfolio/karmafitout.PNG",
    url: "https://karmafitout.ae/",
    description:
      "Site d'une entreprise d'aménagement intérieur : présentation des prestations, galeries de réalisations par type de lieu et prise de rendez-vous. Thème WordPress sur mesure, entièrement responsive.",
    tags: ["WordPress", "Thème sur mesure", "Galerie de projets", "Prise de rendez-vous"],
    order: 4,
  },
  {
    slug: "besimmo",
    title: "Besimmo",
    category: "Immobilier · Annonces",
    image: "/portfolio/bessimo.PNG",
    url: "https://besimmo.be/",
    description:
      "Plateforme immobilière pour la Belgique et l'international : catalogue de biens, recherche multicritère, outils d'estimation, gestion des annonces depuis le back-office et site multilingue.",
    tags: ["Immobilier", "WordPress", "Recherche avancée", "Estimation", "Multilingue"],
    order: 5,
  },
  {
    slug: "servihealth",
    title: "ServiHealth",
    category: "Santé · Chirurgie esthétique",
    image: "/portfolio/servihealth.png",
    url: "https://servihealth.net/",
    description:
      "Site de chirurgie esthétique en Tunisie : présentation des interventions, demande de devis personnalisé, prise de contact par WhatsApp et référencement travaillé sur les requêtes de tourisme médical.",
    tags: ["Santé", "Référencement", "WordPress", "Demande de devis"],
    order: 6,
  },
  {
    slug: "tabibi",
    title: "Tabibi.tn",
    category: "Annuaire médical · Recherche",
    image: "/portfolio/tabibi.png",
    url: "https://tabibi.tn/",
    description:
      "Annuaire de santé tunisien : recherche d'un médecin, d'un dentiste, d'un laboratoire d'analyses ou d'une pharmacie par spécialité, ville et délégation, avec fiches praticiens et espace professionnel.",
    tags: ["Annuaire", "Recherche", "Santé", "Espace professionnel"],
    order: 7,
  },
  {
    slug: "novaplex",
    title: "Novaplex",
    category: "E-commerce · Impression",
    image: "https://novaplex.tn/wp-content/themes/novaplex/assets/inc/images/og-image.jpeg",
    url: "https://novaplex.tn/",
    description:
      "Boutique en ligne d'impression et de signalétique : cartes de visite, flyers, papier en-tête, plaques et produits personnalisés, avec catalogue et devis en ligne.",
    tags: ["E-commerce", "Impression", "Catalogue", "Devis en ligne"],
    order: 8,
  },
  {
    slug: "evocraft",
    title: "Evocraft Formation",
    category: "Formation · Langues",
    image: "/portfolio/evo-craft.png",
    url: "https://evocraft-formation.fr/",
    description:
      "Centre de formation en français et en anglais : présentation des parcours par niveau, calendrier des sessions, certifications et inscription en ligne.",
    tags: ["Formation", "Sessions", "Certifications", "Inscription en ligne"],
    order: 9,
  },
];

async function main() {
  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }
  console.log(`Seeded ${projects.length} projects.`);

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.warn(
      "ADMIN_EMAIL / ADMIN_PASSWORD not set in .env — skipping admin account creation."
    );
    return;
  }

  // Re-semer le contenu ne doit pas réécrire le mot de passe d'un compte existant :
  // sans ce garde-fou, chaque mise à jour du portfolio remettrait le mot de passe à
  // la valeur du .env, y compris s'il avait été changé depuis.
  // Pour resynchroniser volontairement : `npm run seed -- --reset-admin-password`.
  const resetAdmin = process.argv.includes("--reset-admin-password");
  const existing = await prisma.admin.findUnique({ where: { email: adminEmail } });

  if (existing && !resetAdmin) {
    console.log(
      `Admin account already exists for ${adminEmail} — password left untouched ` +
        `(use --reset-admin-password to resync it from .env).`
    );
    return;
  }

  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await prisma.admin.upsert({
    where: { email: adminEmail },
    update: { passwordHash, failedAttempts: 0, lockedUntil: null },
    create: { email: adminEmail, passwordHash },
  });
  console.log(
    existing
      ? `Admin password reset for ${adminEmail}.`
      : `Admin account created for ${adminEmail}.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
