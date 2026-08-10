# AppWeb Plus

Site vitrine + tableau de bord d'administration pour AppWeb Plus, développé avec Next.js (App Router), Prisma/PostgreSQL (Supabase) et un chatbot assistant propulsé par un LLM gratuit (OpenRouter).

## Fonctionnalités

- **Site public multipage** : `/` (accueil), `/services`, `/portfolio` (piloté par base de données, avec pages projet dédiées `/portfolio/[slug]` pour le SEO), `/apropos` (expertise + processus), `/contact`, chatbot d'assistance sur toutes les pages.
- **Dashboard admin** (`/admin`) : single-page — un header en haut avec onglets (`?tab=overview|projects|messages`), changement de section sans rechargement complet de page, bascule clair/sombre persistante. Gestion du portfolio (créer/éditer/supprimer/réordonner, marquer en vedette, upload d'image), inbox des messages de contact.
- **Auth** : compte admin unique protégé par mot de passe (session cookie signée), avec verrouillage automatique après 5 tentatives échouées (15 min).
- **SEO** : métadonnées Open Graph/Twitter, image OG générée dynamiquement, données structurées JSON-LD, `robots.txt` + `sitemap.xml` (incluant les pages projet).
- **Anti-spam** : champ honeypot invisible sur le formulaire de contact.

## Stack

Next.js 16 (App Router) · TypeScript · Prisma 7 · PostgreSQL (Supabase) · Supabase Storage · Tailwind CSS (dashboard) · bcryptjs + jose (auth) · OpenRouter (chatbot LLM) · Vitest (tests).

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

Copier `.env.example` vers `.env` et remplir toutes les valeurs (`DATABASE_URL`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `SESSION_SECRET`, `SITE_URL`, `OPENROUTER_API_KEY`).

### 3. Migration + seed

```bash
npx prisma migrate dev --name init
npm run seed
```

Cela crée les tables et insère les 10 projets du portfolio ainsi que le compte admin défini par `ADMIN_EMAIL` / `ADMIN_PASSWORD`. Relancer `npm run seed` à tout moment est sans danger (upsert) : les projets sont resynchronisés, et **le mot de passe admin n'est pas touché** si le compte existe déjà.

Pour resynchroniser volontairement le mot de passe depuis `.env` (cela réinitialise aussi le compteur de tentatives et le verrouillage) :

```bash
npm run seed -- --reset-admin-password
```

> ⚠️ `prisma migrate dev` a besoin de créer une base "shadow" temporaire : utilisez le **session pooler** (port 5432), pas le **transaction pooler** (port 6543 / pgbouncer) qui ne le supporte pas. Les nouveaux projets Supabase n'exposent plus de host direct `db.<ref>.supabase.co` en IPv4, donc le session pooler est l'option qui fonctionne dans les deux cas. Si ça bloque malgré tout, `npx prisma db push` applique le schéma sans passer par une shadow database (à réserver au développement, pas au suivi de migrations en production).

**Développer sans compte Supabase** : `npx prisma dev` lance une base PostgreSQL locale éphémère (aucune installation requise) et affiche une `DATABASE_URL` à coller dans `.env` — pratique pour tester le projet avant de créer un vrai projet Supabase. Utilisez alors `npx prisma db push` plutôt que `migrate dev` (cette base locale ne supporte pas la création de shadow database).

### 4. Chatbot (OpenRouter)

1. Créer une clé sur [openrouter.ai/keys](https://openrouter.ai/keys) et la mettre dans `.env` sous `OPENROUTER_API_KEY`.
2. `OPENROUTER_MODEL` par défaut est `openrouter/free` — un routeur automatique qui bascule sur n'importe quel modèle gratuit disponible à l'instant (les modèles gratuits individuels comme `meta-llama/llama-3.3-70b-instruct:free` sont souvent rate-limités côté fournisseur ; `openrouter/free` est plus fiable). Voir la liste à jour sur [openrouter.ai/models](https://openrouter.ai/models?max_price=0).
3. Sans clé configurée, le chatbot fonctionne quand même : il répond avec les réponses statiques de `lib/chatbot-faq.ts` pour les questions reconnues, et affiche un message de repli poli pour le reste (aucune erreur, juste moins de couverture).

### 5. Lancer le site

```bash
npm run dev
```

- Site public : http://localhost:3000
- Dashboard admin : http://localhost:3000/admin/login (avec `ADMIN_EMAIL` / `ADMIN_PASSWORD`)

### 6. Tests

```bash
npm test
```

Tests unitaires (Vitest) pour la logique pure : validation de projet (slug, URL, image), correspondance du chatbot FAQ.

## Déploiement (Vercel)

Le client Prisma est généré dans `lib/generated/prisma`, qui est **gitignoré** : sans `prisma generate` avant `next build`, le déploiement échoue sur un import introuvable. C'est pourquoi le script `build` est `prisma generate && next build` (et `postinstall` le refait après un clone neuf). Ne pas le simplifier en `next build`.

Variables à déclarer dans **Project Settings > Environment Variables**, pour Production *et* Preview — ce sont les mêmes que le `.env` local, plus `SITE_URL` :

| Variable | Remarque |
|---|---|
| `DATABASE_URL` | session pooler Supabase, port 5432 |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | upload d'images depuis le dashboard |
| `SESSION_SECRET` | signature du cookie de session |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | compte admin |
| `OPENROUTER_API_KEY`, `OPENROUTER_MODEL` | chatbot (facultatif : repli FAQ sans clé) |
| `SITE_URL` | **l'URL publique complète**, sans barre finale |

`SITE_URL` n'a pas de valeur par défaut utilisable en ligne : le code retombe sur `http://localhost:3000`, et `sitemap.xml`, `robots.txt`, les URL canoniques et les images Open Graph pointeraient alors toutes vers localhost. C'est invisible à l'œil et fatal pour le référencement.

Les pages publiques sont en `force-dynamic` : ajouter ou modifier un projet (depuis le dashboard ou via `npm run seed`) apparaît en ligne immédiatement, sans redéploiement.

## Notes

- Les images du portfolio migrées depuis l'ancien site statique vivent dans `public/portfolio/`.
- Le formulaire de contact enregistre les messages en base (consultables dans `/admin?tab=messages`) — il ne dépend plus d'EmailJS.
- Le chatbot (`components/site/Chatbot.tsx`) essaie d'abord une correspondance locale instantanée (`lib/chatbot-faq.ts`, gratuit, sans réseau) ; si aucune ne correspond, il appelle un LLM via OpenRouter (`lib/actions/chat.ts`) avec un system prompt qui ancre les réponses dans les vrais services/tarifs/coordonnées de l'entreprise (pas de prix inventés, refus poli des questions hors sujet).
- Le dashboard admin est une seule route (`app/admin/(dashboard)/page.tsx`) qui lit `?tab=`/`?view=`/`?id=` dans l'URL pour afficher le bon panneau (`components/admin/panels/`) — pas de sous-routes séparées. Elle est forcée en rendu dynamique (`export const dynamic = "force-dynamic"`) pour toujours refléter les données à jour et revalider l'authentification à chaque requête — ne pas retirer cet export.
- Le dashboard admin supporte un thème clair/sombre (bouton dans le header) : `@custom-variant dark` dans `globals.css` fait dépendre les classes Tailwind `dark:` d'une classe `.dark` sur `<html>` (pas de la préférence système), posée avant hydratation par `components/admin/ThemeScript.tsx` (lit `localStorage["admin-theme"]`, défaut sombre) et basculée par `components/admin/ThemeToggle.tsx` (mutation directe du DOM, sans état React, pour éviter tout flash au premier rendu). La page de login reste volontairement toujours sombre (écran de marque, comme le site public) ; seul l'intérieur du dashboard s'adapte. Tout nouveau composant admin doit poser `dark:` à côté de chaque classe de couleur (`bg-white dark:bg-ink-soft`, `text-zinc-900 dark:text-white`, etc.) — voir `components/admin/panels/*` pour le patron à suivre.
- Le site public est à l'inverse un vrai site multipage sous le groupe de routes `app/(site)/` (le chrome partagé — nav, footer, chatbot, orbs — vit dans `app/(site)/layout.tsx`). Chaque section (Services, Portfolio, À Propos, Contact) a sa propre route au lieu d'être une ancre sur la page d'accueil.
- `globals.css` contient à la fois le CSS du site public (sélecteurs `#navbar`, `#site-footer`, classes `.proj-*`, etc.) et les tokens de marque exposés à Tailwind via `@theme` (utilisés par le dashboard admin). Ne jamais réintroduire de sélecteur d'élément brut non scopé (`nav {}`, `footer {}`...) dans la partie site public : ça fuiterait vers n'importe quelle balise du même nom utilisée dans l'admin.
- `index.html` (l'ancien site statique) est conservé à la racine à titre de référence ; il n'est pas servi par Next.js.
