export type FaqEntry = {
  id: string;
  question: string;
  keywords: string[];
  answer: string;
};

export const FAQ: FaqEntry[] = [
  {
    id: "services",
    question: "Quels services proposez-vous ?",
    keywords: [
      "service",
      "services",
      "que faites-vous",
      "que proposez-vous",
      "offre",
      "prestations",
      "site web",
      "site internet",
      "e-commerce",
      "ecommerce",
      "boutique en ligne",
      "application mobile",
      "app mobile",
    ],
    answer:
      "Nous proposons 4 types de services : création de sites web (vitrine, e-commerce, sur mesure), applications mobiles (iOS & Android), design & intégration pixel-perfect, et solutions sur mesure (APIs, outils métiers). Voir la section « Services » du site pour le détail.",
  },
  {
    id: "portfolio",
    question: "Pouvez-vous me montrer vos réalisations ?",
    keywords: [
      "portfolio",
      "projet",
      "projets",
      "realisation",
      "realisations",
      "exemple",
      "reference",
      "references",
    ],
    answer:
      "Bien sûr ! Nous avons livré plus de 100 projets, dont 7 mis en avant dans notre portfolio (e-commerce, immobilier, santé, formation...). Rendez-vous dans la section « Portfolio » du site pour les découvrir en détail.",
  },
  {
    id: "processus",
    question: "Comment se déroule un projet ?",
    keywords: [
      "processus",
      "etapes",
      "deroulement",
      "se deroule",
      "comment ca marche",
      "methode",
      "delai",
      "delais",
    ],
    answer:
      "Notre processus se déroule en 5 étapes : découverte & brief, design & prototype sur Figma, développement, tests & mise en ligne, puis suivi & maintenance. Nous tenons des délais clairs définis dès le départ.",
  },
  {
    id: "tarifs",
    question: "Quels sont vos tarifs ?",
    keywords: [
      "tarif",
      "tarifs",
      "prix",
      "cout",
      "coute",
      "combien",
      "budget",
      "devis",
    ],
    answer:
      "Chaque projet étant sur mesure, nous établissons un devis personnalisé selon vos besoins. Contactez-nous via le formulaire ou par téléphone pour recevoir une estimation gratuite sous 24h.",
  },
  {
    id: "contact",
    question: "Comment vous contacter ?",
    keywords: [
      "contact",
      "contacter",
      "telephone",
      "email",
      "mail",
      "adresse",
      "joindre",
      "appeler",
    ],
    answer:
      "Vous pouvez nous écrire à contact@appwebplus.tn, nous appeler au +216 25 789 309, ou remplir le formulaire de contact plus bas sur cette page. Nous sommes basés à Tunis, Tunisie.",
  },
  {
    id: "demarrer",
    question: "Comment démarrer un projet avec vous ?",
    keywords: [
      "demarrer",
      "commencer",
      "lancer",
      "debuter",
      "nouveau projet",
    ],
    answer:
      "Il vous suffit de remplir le formulaire de contact avec quelques lignes sur votre besoin — nous revenons vers vous sous 24h avec une proposition adaptée.",
  },
];

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function matchFaq(input: string): FaqEntry | null {
  const norm = normalize(input);
  let best: FaqEntry | null = null;
  let bestScore = 0;
  for (const entry of FAQ) {
    for (const kw of entry.keywords) {
      const nkw = normalize(kw);
      if (norm.includes(nkw) && nkw.length > bestScore) {
        bestScore = nkw.length;
        best = entry;
      }
    }
  }
  return best;
}

export const WELCOME_MESSAGE =
  "Bonjour ! Je suis l'assistant AppWeb Plus 👋 Comment puis-je vous aider aujourd'hui ?";

export const FALLBACK_ANSWER =
  "Je n'ai pas bien compris votre question. Choisissez une suggestion ci-dessous, ou contactez-nous directement à contact@appwebplus.tn / +216 25 789 309.";
