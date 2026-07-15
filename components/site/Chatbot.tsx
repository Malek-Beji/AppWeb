"use client";

import { useState } from "react";
import { FAQ, FALLBACK_ANSWER, WELCOME_MESSAGE, matchFaq } from "@/lib/chatbot-faq";
import { askAssistant, type ChatMessage } from "@/lib/actions/chat";

type Message = { from: "bot" | "user"; text: string };

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    setInput("");
    const nextMessages: Message[] = [...messages, { from: "user", text: trimmed }];
    setMessages(nextMessages);

    const entry = matchFaq(trimmed);
    if (entry) {
      setMessages((prev) => [...prev, { from: "bot", text: entry.answer }]);
      return;
    }

    setLoading(true);
    const history: ChatMessage[] = nextMessages.map((m) => ({
      role: m.from === "user" ? "user" : "assistant",
      content: m.text,
    }));
    const result = await askAssistant(history);
    setLoading(false);

    setMessages((prev) => [
      ...prev,
      { from: "bot", text: result.ok ? result.reply : FALLBACK_ANSWER },
    ]);
  }

  return (
    <>
      <button
        className="chatbot-toggle"
        aria-label={open ? "Fermer l'assistant" : "Ouvrir l'assistant"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "×" : "💬"}
      </button>

      {open && (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <div>
              <strong>Assistant AppWeb+</strong>
              <br />
              <span>Réponse instantanée</span>
            </div>
            <button
              className="chatbot-close"
              aria-label="Fermer"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((m, i) => (
              <div className={`chat-msg ${m.from}`} key={i}>
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="chat-msg bot" aria-live="polite">
                …
              </div>
            )}
          </div>

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

          <form
            className="chatbot-form"
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
          >
            <input
              type="text"
              placeholder="Posez votre question..."
              value={input}
              maxLength={500}
              disabled={loading}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" aria-label="Envoyer" disabled={loading}>
              →
            </button>
          </form>
        </div>
      )}
    </>
  );
}
