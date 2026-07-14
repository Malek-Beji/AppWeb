# AppWeb Plus

Site vitrine + tableau de bord d'administration pour AppWeb Plus, développé avec Next.js (App Router), Prisma/PostgreSQL (Supabase) et un chatbot FAQ.

## Fonctionnalités

- **Site public** : hero, services, à propos, portfolio (piloté par base de données, avec pages projet dédiées `/portfolio/[slug]` pour le SEO), processus, contact, chatbot d'assistance.
- **Dashboard admin** (`/admin`) : gestion du portfolio (créer/éditer/supprimer/réordonner, marquer en vedette, upload d'image), inbox des messages de contact.
- **Auth** : compte admin unique protégé par mot de passe (session cookie signée), avec verrouillage automatique après 5 tentatives échouées (15 min).
- **SEO** : métadonnées Open Graph/Twitter, image OG générée dynamiquement, données structurées JSON-LD, `robots.txt` + `sitemap.xml` (incluant les pages projet).
- **Anti-spam** : champ honeypot invisible sur le formulaire de contact.

## Stack

Next.js 16 (App Router) · TypeScript · Prisma 7 · PostgreSQL (Supabase) · Supabase Storage · Tailwind CSS (dashboard) · bcryptjs + jose (auth) · Vitest (tests).

## Setup

### 1. Dépendances

```bash
npm install
```

### 2. Base de données Supabase

1. Créer un projet sur [supabase.com](https://supabase.com).
2. Dans **Project Settings > Database**, copier la connection string du **session pooler** (host `*.pooler.supabase.com`, **port 5432**, pas 6543) et la mettre dans `.env` sous `DATABASE_URL`.
3. Dans **Project Settings > API**, copier l'URL du projet et la `service_role` key dans `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY`.
4. Dans **Storage**, créer un bucket **public** nommé `portfolio-images` (utilisé pour l'upload d'images de projets depuis le dashboard). Si vous ne créez pas ce bucket, vous pouvez toujours coller une URL d'image directement dans le formulaire projet.

Copier `.env.example` vers `.env` et remplir toutes les valeurs (`DATABASE_URL`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `SESSION_SECRET`, `SITE_URL`).

### 3. Migration + seed

```bash
npx prisma migrate dev --name init
npm run seed
```

Cela crée les tables et insère les 7 projets du portfolio ainsi que le compte admin défini par `ADMIN_EMAIL` / `ADMIN_PASSWORD`. Relancer `npm run seed` à tout moment est sans danger (upsert) — utile pour synchroniser le mot de passe admin si vous changez `ADMIN_PASSWORD` dans `.env`.

> ⚠️ `prisma migrate dev` a besoin de créer une base "shadow" temporaire : utilisez le **session pooler** (port 5432), pas le **transaction pooler** (port 6543 / pgbouncer) qui ne le supporte pas. Les nouveaux projets Supabase n'exposent plus de host direct `db.<ref>.supabase.co` en IPv4, donc le session pooler est l'option qui fonctionne dans les deux cas. Si ça bloque malgré tout, `npx prisma db push` applique le schéma sans passer par une shadow database (à réserver au développement, pas au suivi de migrations en production).

**Développer sans compte Supabase** : `npx prisma dev` lance une base PostgreSQL locale éphémère (aucune installation requise) et affiche une `DATABASE_URL` à coller dans `.env` — pratique pour tester le projet avant de créer un vrai projet Supabase. Utilisez alors `npx prisma db push` plutôt que `migrate dev` (cette base locale ne supporte pas la création de shadow database).

### 4. Lancer le site

```bash
npm run dev
```

- Site public : http://localhost:3000
- Dashboard admin : http://localhost:3000/admin/login (avec `ADMIN_EMAIL` / `ADMIN_PASSWORD`)

### 5. Tests

```bash
npm test
```

Tests unitaires (Vitest) pour la logique pure : validation de projet (slug, URL, image), correspondance du chatbot FAQ.

## Notes

- Les images du portfolio migrées depuis l'ancien site statique vivent dans `public/portfolio/`.
- Le formulaire de contact enregistre les messages en base (consultables dans `/admin/messages`) — il ne dépend plus d'EmailJS.
- Le chatbot répond à partir d'un jeu de questions/réponses statique (`lib/chatbot-faq.ts`), sans appel à un service externe.
- Les pages sous `/admin/(dashboard)` sont forcées en rendu dynamique (`export const dynamic = "force-dynamic"`) pour toujours refléter les données à jour et revalider l'authentification à chaque requête — ne pas retirer cet export.
- `index.html` (l'ancien site statique) est conservé à la racine à titre de référence ; il n'est pas servi par Next.js.
