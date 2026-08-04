"use client";

import { useEffect, useRef, useState } from "react";
import { FAQ, FALLBACK_ANSWER, WELCOME_MESSAGE, matchFaq } from "@/lib/chatbot-faq";
import { askAssistant, type ChatMessage } from "@/lib/actions/chat";

type Message = { from: "bot" | "user"; text: string; at: Date };

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

const welcome = (): Message => ({ from: "bot", text: WELCOME_MESSAGE, at: new Date() });

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  // Lazy initialiser: the panel (and therefore this timestamp) is only ever
  // rendered after a user opens it, so the server/client Date difference
  // never reaches the hydrated HTML.
  const [messages, setMessages] = useState<Message[]>(() => [welcome()]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading, open]);

  function reset() {
    setMessages([welcome()]);
    setStarted(false);
    setInput("");
    inputRef.current?.focus();
  }

  async function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    setStarted(true);
    setInput("");
    const next: Message[] = [...messages, { from: "user", text: trimmed, at: new Date() }];
    setMessages(next);

    const entry = matchFaq(trimmed);
    if (entry) {
      setMessages((prev) => [...prev, { from: "bot", text: entry.answer, at: new Date() }]);
      return;
    }

    setLoading(true);
    const history: ChatMessage[] = next.map((m) => ({
      role: m.from === "user" ? "user" : "assistant",
      content: m.text,
    }));
    const result = await askAssistant(history);
    setLoading(false);

    setMessages((prev) => [
      ...prev,
      {
        from: "bot",
        text: result.ok ? result.reply : FALLBACK_ANSWER,
        at: new Date(),
      },
    ]);
  }

  return (
    <>
      <button
        className="chatbot-toggle"
        aria-label={open ? "Fermer l'assistant" : "Ouvrir l'assistant"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.5 9.5 0 0 1-3.3-.6L3 21l1.8-5a8.2 8.2 0 0 1-.8-3.5 8.4 8.4 0 0 1 8.5-8.4 8.4 8.4 0 0 1 8.5 8.4Z" />
          </svg>
        )}
      </button>

      {open && (
        <div className="chatbot-panel" role="dialog" aria-label="Assistant AppWeb Plus">
          <div className="chatbot-header">
            <div className="chatbot-header-avatar">A+</div>
            <div className="chatbot-header-text">
              <strong>Assistant AppWeb+</strong>
              <span className="status">En ligne</span>
            </div>
            <div className="chatbot-header-actions">
              {started && (
                <button
                  className="chatbot-icon-btn"
                  aria-label="Nouvelle conversation"
                  title="Nouvelle conversation"
                  onClick={reset}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8" />
                    <path d="M21 4v4h-4" />
                    <path d="M21 12a9 9 0 0 1-15.5 6.2L3 16" />
                    <path d="M3 20v-4h4" />
                  </svg>
                </button>
              )}
              <button
                className="chatbot-icon-btn"
                aria-label="Fermer"
                title="Fermer"
                onClick={() => setOpen(false)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((m, i) => (
              <div className={`chat-row ${m.from}`} key={i}>
                <div className="chat-avatar">{m.from === "bot" ? "A+" : "Moi"}</div>
                <div className="chat-bubble">
                  <div className="chat-msg">{m.text}</div>
                  <span className="chat-time">{formatTime(m.at)}</span>
                </div>
              </div>
            ))}
            {loading && (
              <div className="chat-row bot" aria-live="polite" aria-label="L'assistant rédige une réponse">
                <div className="chat-avatar">A+</div>
                <div className="chat-bubble">
                  <div className="chat-msg chat-typing">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {!started && (
            <>
              <p className="chatbot-suggestions-label">Questions fréquentes</p>
              <div className="chatbot-suggestions">
                {FAQ.map((f) => (
                  <button
                    key={f.id}
                    className="chatbot-suggestion"
                    type="button"
                    disabled={loading}
                    onClick={() => ask(f.question)}
                  >
                    {f.question}
                  </button>
                ))}
              </div>
            </>
          )}

          <form
            className="chatbot-form"
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
          >
            <input
              ref={inputRef}
              type="text"
              aria-label="Votre message"
              placeholder="Écrivez votre message..."
              value={input}
              maxLength={500}
              disabled={loading}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" aria-label="Envoyer" disabled={loading || !input.trim()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="m4 12 16-8-6 16-2.5-6.5L4 12Z" />
              </svg>
            </button>
          </form>

          <p className="chatbot-footnote">Assistant automatisé · Réponses à titre indicatif</p>
        </div>
      )}
    </>
  );
}
