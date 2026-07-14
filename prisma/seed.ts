import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const projects = [
  {
    slug: "tileo",
    title: "TileO Dubai",
    category: "WordPress · E-commerce",
    image: "/portfolio/tileo.PNG",
    url: "https://en.tileo.ae/",
    description:
      "Premium e-commerce platform for tiles, slabs, and sanitary ware in Dubai. Features multilingual support, advanced product catalog with filtering, custom WordPress theme, and integrated e-catalog browsing system.",
    tags: ["WordPress", "E-commerce", "Multilingual", "Custom Theme", "Product Catalog"],
    order: 0,
  },
  {
    slug: "karmafitout",
    title: "Karma Fitout",
    category: "WordPress · Fitout",
    image: "/portfolio/karmafitout.PNG",
    url: "https://karmafitout.ae/",
    description:
      "Professional fitout company website showcasing interior design services and completed projects. Built with custom WordPress theme, featuring project galleries, service showcases, and appointment booking system.",
    tags: ["WordPress", "Custom Theme", "Project Gallery", "Booking System", "Responsive"],
    order: 1,
  },
  {
    slug: "besimmo",
    title: "Besimmo Real Estate",
    category: "WordPress · Immobilier",
    image: "/portfolio/bessimo.PNG",
    url: "https://besimmo.be/",
    description:
      "Full-featured real estate platform for property listings in Belgium and international markets. Includes advanced search filters, property management system, estimation tools, and multilingual support.",
    tags: ["Real Estate", "WordPress", "Property Listings", "Search System", "Multilingual"],
    order: 2,
  },
  {
    slug: "servihealth",
    title: "ServiHealth",
    category: "Santé · Chirurgie esthétique",
    image: "/portfolio/servihealth.png",
    url: "https://servihealth.net/",
    description:
      "Chirurgie esthétique en Tunisie avec ServiHealth et Dr Djemal à la clinique Myron. Prise en charge complète pour des résultats exceptionnels.",
    tags: ["Healthcare", "SEO", "WordPress"],
    order: 3,
  },
  {
    slug: "tabibi",
    title: "Tabibi.tn",
    category: "Santé · Annuaire médical",
    image: "/portfolio/tabibi.png",
    url: "https://tabibi.tn/",
    description:
      "Trouvez rapidement un médecin, un dentiste, un laboratoire d'analyses ou la pharmacie la plus proche en Tunisie.",
    tags: ["Directory", "Search", "Healthcare"],
    order: 4,
  },
  {
    slug: "novaplex",
    title: "Novaplex",
    category: "E-commerce · Impression",
    image: "https://novaplex.tn/wp-content/themes/novaplex/assets/inc/images/og-image.jpeg",
    url: "https://novaplex.tn/",
    description:
      "Boutique en ligne dédiée à l'impression et la signalétique : cartes de visite, flyers, papier en-tête, plaques, et produits personnalisés.",
    tags: ["E-commerce", "Printing", "Catalog"],
    order: 5,
  },
  {
    slug: "evocraft",
    title: "Evocraft Formation",
    category: "Formation · Langues",
    image: "/portfolio/evo-craft.png",
    url: "https://evocraft-formation.fr/",
    description:
      "Centre de formation proposant des cours de français et d'anglais, adaptés à tous les niveaux, avec sessions et certifications.",
    tags: ["Training", "French", "English"],
    order: 6,
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

  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await prisma.admin.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: { email: adminEmail, passwordHash },
  });
  console.log(`Admin account ready for ${adminEmail}.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
