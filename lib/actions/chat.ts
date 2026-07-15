"use server";

const SYSTEM_PROMPT = `Tu es l'assistant virtuel du site AppWeb Plus, une agence digitale tunisienne basée à Tunis.

Informations sur l'entreprise (utilise uniquement ces faits, n'invente rien d'autre — pas de prix précis, pas de délais chiffrés que tu n'as pas ici) :
- Services : création de sites web (vitrine, e-commerce, sur mesure), applications mobiles (iOS & Android natives ou cross-platform), design & intégration pixel-perfect (Figma/Adobe XD), solutions sur mesure (APIs REST, outils métiers, développement Symfony/PHP).
- Plus de 100 projets livrés, 6+ ans d'expérience, 50+ clients satisfaits, support client 24/7.
- Processus en 5 étapes : découverte & brief, design & prototype (Figma), développement, tests & mise en ligne, suivi & maintenance.
- Portfolio : 7 projets phares (e-commerce, immobilier, santé, formation...) consultables sur la page /portfolio du site.
- Contact : email contact@appwebplus.tn, téléphone +216 25 789 309, basés à Tunis, Tunisie. Formulaire de contact sur /contact.
- Tarifs : pas de grille tarifaire publique — chaque projet est un devis personnalisé établi après le formulaire de contact, réponse sous 24h.

Consignes :
- Réponds toujours en français, de façon concise (2 à 4 phrases), chaleureuse et professionnelle.
- Si la question sort du cadre d'AppWeb Plus (rien à voir avec l'agence, ses services, son portfolio ou du support technique généraliste hors sujet), dis poliment que tu es là pour aider sur les services d'AppWeb Plus et invite à contacter l'équipe pour le reste.
- Ne donne jamais de prix ou délai chiffré précis que tu n'as pas dans ce contexte — oriente toujours vers un devis personnalisé via le formulaire de contact.
- N'invente pas de fonctionnalités, technologies ou informations sur l'entreprise qui ne sont pas listées ci-dessus.`;

export type ChatMessage = { role: "user" | "assistant"; content: string };

export type ChatResult = { ok: true; reply: string } | { ok: false; error: string };

const MAX_MESSAGE_LENGTH = 600;
const MAX_HISTORY = 8;

export async function askAssistant(history: ChatMessage[]): Promise<ChatResult> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "not_configured" };
  }

  const trimmedHistory = history
    .slice(-MAX_HISTORY)
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, MAX_MESSAGE_LENGTH),
    }));

  if (trimmedHistory.length === 0) {
    return { ok: false, error: "empty" };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.SITE_URL || "http://localhost:3000",
        "X-Title": "AppWeb Plus",
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || "openrouter/free",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...trimmedHistory],
        max_tokens: 300,
        temperature: 0.5,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      return { ok: false, error: `http_${response.status}` };
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return { ok: false, error: "empty_reply" };
    }

    return { ok: true, reply };
  } catch {
    return { ok: false, error: "network" };
  } finally {
    clearTimeout(timeout);
  }
}
