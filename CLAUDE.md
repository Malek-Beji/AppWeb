# CLAUDE.md — AppWeb Plus

Notes de travail pour Claude Code. Le `README.md` couvre l'installation et la
configuration : **ne pas les répéter ici**. Ce fichier ne contient que ce qui ne se
devine pas en lisant le code, et ce qu'il ne faut pas casser.

---

## Ce qu'est ce dépôt

Le site de l'agence **AppWeb Plus** (Malek Beji, Ariana, Tunisie) : vitrine publique +
tableau de bord d'administration. C'est le site de l'agence elle-même, pas un projet
client — ce qui y figure est une vitrine commerciale et doit être exact.

Contact affiché sur le site : **53 695 990**, Rue Ibn Majed, Ariana.

## Langue

**Tout le contenu visible est en français.** Métadonnées, descriptions de projets,
libellés, messages d'erreur, textes du chatbot. Le code, les noms de variables et les
commentaires techniques restent en anglais quand le fichier alentour l'est déjà —
suivre le fichier, pas une règle globale.

Trois descriptions de projets étaient encore en anglais et ont été traduites : ne pas
réintroduire d'anglais dans le contenu.

---

## Architecture — l'essentiel

```
app/(site)/          site public : /, /services, /portfolio, /portfolio/[slug], /apropos, /contact
app/admin/           tableau de bord (single-page, onglets via ?tab=overview|projects|messages)
components/site/     composants du site public — CSS écrit à la main, pas Tailwind
components/admin/    tableau de bord — Tailwind
lib/actions/         Server Actions (auth, projects, messages, contact, chat)
lib/generated/prisma client Prisma généré (output custom, PAS @prisma/client)
```

**Deux systèmes de style cohabitent.** Le site public utilise du CSS à la main dans
`app/globals.css` ; le tableau de bord utilise Tailwind. Les jetons de marque sont
déclarés **deux fois** dans `globals.css` — une fois dans `@theme` pour Tailwind, une
fois dans `:root` pour le CSS manuel. **Toute modification de couleur doit être faite
aux deux endroits**, sinon le site et le dashboard divergent.

**Import Prisma** : `import { PrismaClient } from "@/lib/generated/prisma/client"` avec
l'adaptateur `PrismaPg`. Pas `@prisma/client`.

---

## Le contenu du portfolio vit en base, pas dans le code

`prisma/seed.ts` n'est que la source de référence. Les projets réels sont dans la table
`Project` sur **Supabase en production**. Conséquences :

- Modifier `seed.ts` ne change rien tant que `npm run seed` n'est pas exécuté.
- `npm run seed` écrit **sur la base de production**. C'est un upsert par `slug` : il
  ajoute et met à jour, il ne supprime jamais. Le dire avant de le lancer.
- Le tableau de bord permet aussi d'éditer les projets. Si quelqu'un a modifié un texte
  depuis l'admin, re-semer l'écrase. Vérifier avant.

Ordre voulu : les **applications métier sur mesure d'abord** (`featured: true`), les
sites vitrine ensuite. C'est ce qui distingue l'agence d'un intégrateur WordPress.

---

## La marque

Le logo est le **« plus modulaire »** : cinq blocs qui composent le « + » du nom, quatre
en or et celui du haut en crème, détaché.

- Composant : `components/site/Logo.tsx` (`Logo` = marque + nom, `LogoMark` = marque seule).
- Favicon : `app/icon.svg` (convention Next.js, pas besoin de balise `<link>`).
- Image de partage : `app/opengraph-image.tsx`.

**Règles** : ne jamais combler les intervalles entre les blocs (sans eux on lit une croix
pleine, donc « pharmacie »), garder le bloc du haut détaché et plus clair, ne pas
recolorer hors or / encre.

Jetons : encre `#08090d`, or `#c8a96e`, or sombre `#8b7348`, blanc cassé `#f5f3ef`,
crème `#ede9e2`. Polices : DM Serif Display (titres), DM Sans (texte), JetBrains Mono
(monospace).

Le pack logo complet (PNG, SVG, favicon `.ico`, couverture Facebook, règles d'usage) est
hors dépôt, dans `Bureau/cartello/logo-appwebplus-v2/`.

---

## Pièges déjà rencontrés

**`ImageResponse` (`next/og`) ne rasterise pas les `<svg>` imbriqués.** Dans
`opengraph-image.tsx`, la marque est redessinée en `<div>` positionnés. Ne pas
« simplifier » en réutilisant `<LogoMark />` : l'image sortirait vide.

**Collision de sélecteur sur le verrou de marque.** `.footer-brand-logo span` repeignait
en or et en italique *tous* les spans du logo, y compris le nom. La règle est maintenant
`.footer-brand-logo .brand-name .dot`. Attention aux sélecteurs d'élément nu dans
`globals.css` : le CSS du site public n'a pas de portée par composant.

**`npm run seed` ne réinitialise plus le mot de passe admin.** Avant, chaque mise à jour
du portfolio remettait le mot de passe à la valeur du `.env`. Pour resynchroniser
volontairement : `npm run seed -- --reset-admin-password`.

**`npx tsx` ne supporte pas le `await` de premier niveau** dans ce projet (sortie CJS).
Envelopper dans une `async function main()` pour tout script ponctuel.

**Le port 3000 est souvent pris** par un autre projet de la machine (les applications
cabinet dentaire / gériatrie). Next bascule tout seul sur 3001 — lire la ligne `Local:`
dans la sortie plutôt que supposer 3000.

**Supabase : utiliser le session pooler (port 5432)**, pas le transaction pooler (6543).
Détaillé dans le README.

---

## Vérifier son travail

```bash
npx tsc --noEmit    # rapide, sans base de données
npm run lint
npm test            # vitest
npm run dev         # lire le port réellement utilisé
```

`npm run build` a besoin d'un `DATABASE_URL` valide : les pages portfolio interrogent la
base au build. Pour une validation rapide hors ligne, `tsc --noEmit` suffit.

---

## À ne pas faire

- **Ne pas committer `.env`** — il est gitignoré et contient les clés Supabase,
  `SESSION_SECRET`, `OPENROUTER_API_KEY` et le mot de passe admin.
- **Ne pas écrire d'identifiants** dans un fichier suivi par git, un README ou un
  commentaire.
- **Ne pas committer ni pousser sans demande explicite.** La branche par défaut est
  `master` : créer une branche avant de committer.
- **Ne pas hotlinker d'images externes** dans les projets. Le projet `novaplex` pointe
  encore sur une image hébergée sur `novaplex.tn` : elle casse le jour où ce site change.
  À rapatrier dans `public/portfolio/` à l'occasion.

---

## Points en suspens (non techniques, mais réels)

- **`appwebplus.tn` n'existe pas** (NXDOMAIN vérifié). Le compte admin est pourtant
  `admin@appwebplus.tn`, et le site affiche `contact@appwebplus.tn` : cette adresse ne
  reçoit rien. À arbitrer avec Malek.
- **Deux numéros de téléphone circulent** : le site et les guides clients affichent
  53 695 990 ; certains supports marketing plus anciens portaient 25 789 309. Le bon
  numéro AppWeb Plus est **53 695 990**. (Develop Mark, l'autre marque, utilise
  26 540 366 — ne pas les mélanger.)
- **Les icônes sociales du pied de page** pointent toutes sur `href="#"`. Seul Facebook
  est connu : `facebook.com/appwebplus`.

---

## Contexte utile hors dépôt

Le dossier `Bureau/cartello/` (hors git) contient les livrables marketing produits pour
la marque : reels, packs logo, chartes. Utile pour connaître les couleurs, les
formulations et les références clients validées. `Bureau/cartello/MUSIQUE.md` recense
les vidéos.

Les deux applications médicales référencées au portfolio ont leur code dans
`Bureau/dentiste/cabinet-dentaire/` et sont déployées sur Vercel.
