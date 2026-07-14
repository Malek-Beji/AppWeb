# AppWeb Plus

Site vitrine + tableau de bord d'administration pour AppWeb Plus, développé avec Next.js (App Router), Prisma/PostgreSQL (Supabase) et un chatbot FAQ.

## Fonctionnalités

- **Site public** : hero, services, à propos, portfolio (piloté par base de données), processus, contact, chatbot d'assistance.
- **Dashboard admin** (`/admin`) : gestion du portfolio (créer/éditer/supprimer/réordonner, upload d'image), inbox des messages de contact.
- **Auth** : compte admin unique protégé par mot de passe (session cookie signée).

## Stack

Next.js 16 (App Router) · TypeScript · Prisma 7 · PostgreSQL (Supabase) · Supabase Storage · Tailwind CSS (dashboard) · bcryptjs + jose (auth).

## Setup

### 1. Dépendances

```bash
npm install
```

### 2. Base de données Supabase

1. Créer un projet sur [supabase.com](https://supabase.com).
2. Dans **Project Settings > Database**, copier la connection string (URI) et la mettre dans `.env` sous `DATABASE_URL`.
3. Dans **Project Settings > API**, copier l'URL du projet et la `service_role` key dans `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY`.
4. Dans **Storage**, créer un bucket **public** nommé `portfolio-images` (utilisé pour l'upload d'images de projets depuis le dashboard). Si vous ne créez pas ce bucket, vous pouvez toujours coller une URL d'image directement dans le formulaire projet.

Copier `.env.example` vers `.env` et remplir toutes les valeurs (`DATABASE_URL`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `SESSION_SECRET`).

### 3. Migration + seed

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

Cela crée les tables et insère les 7 projets du portfolio ainsi que le compte admin défini par `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

> ⚠️ `prisma migrate dev` a besoin de créer une base "shadow" temporaire : utilisez la connection string **directe** de Supabase (port 5432), pas celle du pooler (port 6543 / pgbouncer), sinon la migration échoue. Si ça bloque malgré tout, `npx prisma db push` applique le schéma sans passer par une shadow database (à réserver au développement, pas au suivi de migrations en production).

**Développer sans compte Supabase** : `npx prisma dev` lance une base PostgreSQL locale éphémère (aucune installation requise) et affiche une `DATABASE_URL` à coller dans `.env` — pratique pour tester le projet avant de créer un vrai projet Supabase. Utilisez alors `npx prisma db push` plutôt que `migrate dev` (cette base locale ne supporte pas la création de shadow database).

### 4. Lancer le site

```bash
npm run dev
```

- Site public : http://localhost:3000
- Dashboard admin : http://localhost:3000/admin/login (avec `ADMIN_EMAIL` / `ADMIN_PASSWORD`)

## Notes

- Les images du portfolio migrées depuis l'ancien site statique vivent dans `public/portfolio/`.
- Le formulaire de contact enregistre les messages en base (consultables dans `/admin/messages`) — il ne dépend plus d'EmailJS.
- Le chatbot répond à partir d'un jeu de questions/réponses statique (`lib/chatbot-faq.ts`), sans appel à un service externe.
- `index.html` (l'ancien site statique) est conservé à la racine à titre de référence ; il n'est pas servi par Next.js.
