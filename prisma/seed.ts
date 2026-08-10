import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { projects } from "../lib/projects";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });


async function main() {
  // Le contenu vient de lib/projects.ts, qui alimente aussi le site public :
  // une seule liste à tenir à jour. L'upsert porte sur le slug, jamais sur l'id,
  // pour ne pas réécrire la clé primaire des lignes déjà en base.
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
