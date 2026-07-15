"use client";

import { useEffect, useRef, useState } from "react";
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
  const [started, setStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  async function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    setStarted(true);
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
            <div className="chatbot-header-avatar">A+</div>
            <div className="chatbot-header-text">
              <strong>Assistant AppWeb+</strong>
              <span className="status">En ligne</span>
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
              <div className={`chat-row ${m.from}`} key={i}>
                <div className="chat-avatar">{m.from === "bot" ? "A+" : "🙂"}</div>
                <div className="chat-msg">{m.text}</div>
              </div>
            ))}
            {loading && (
              <div className="chat-row bot" aria-live="polite" aria-label="L'assistant écrit">
                <div className="chat-avatar">A+</div>
                <div className="chat-msg chat-typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
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
              type="text"
              placeholder="Écrivez votre message..."
              value={input}
              maxLength={500}
              disabled={loading}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" aria-label="Envoyer" disabled={loading || !input.trim()}>
              →
            </button>
          </form>
        </div>
      )}
    </>
  );
}
