"use client";

import { useState } from "react";
import { FAQ, FALLBACK_ANSWER, WELCOME_MESSAGE, matchFaq } from "@/lib/chatbot-faq";

type Message = { from: "bot" | "user"; text: string };

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");

  function ask(question: string) {
    if (!question.trim()) return;
    const entry = matchFaq(question);
    setMessages((prev) => [
      ...prev,
      { from: "user", text: question },
      { from: "bot", text: entry ? entry.answer : FALLBACK_ANSWER },
    ]);
    setInput("");
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
          </div>

          <div className="chatbot-suggestions">
            {FAQ.map((f) => (
              <button
                key={f.id}
                className="chatbot-suggestion"
                type="button"
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
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" aria-label="Envoyer">
              →
            </button>
          </form>
        </div>
      )}
    </>
  );
}
