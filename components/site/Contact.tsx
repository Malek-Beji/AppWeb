"use client";

import { useRef, useState } from "react";
import { submitContactMessage } from "@/lib/actions/contact";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const formData = new FormData(e.currentTarget);
    try {
      const result = await submitContactMessage(formData);
      if (result.ok) {
        setStatus("success");
        formRef.current?.reset();
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3500);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3500);
    }
  }

  const buttonStyle: React.CSSProperties =
    status === "success"
      ? { background: "#27c93f", borderColor: "#27c93f" }
      : status === "error"
      ? { background: "#ff5f56", borderColor: "#ff5f56", color: "#fff" }
      : {};

  const buttonLabel =
    status === "sending"
      ? "Envoi en cours..."
      : status === "success"
      ? "✓ Message envoyé avec succès"
      : status === "error"
      ? "✕ Erreur — veuillez réessayer"
      : "Envoyer le message →";

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="reveal">
            <div className="contact-info-head">
              <span className="s-label">Contact</span>
              <h2 className="s-title">
                Discutons de votre <em>projet</em>
              </h2>
              <p>
                Décrivez-nous votre besoin et nous vous répondons sous 24h
                avec une proposition adaptée et personnalisée.
              </p>
            </div>
            <div className="c-detail">
              <span className="c-ico">📧</span>
              <div className="c-txt">
                <strong>Email</strong>
                <span>contact@appwebplus.tn</span>
              </div>
            </div>
            <div className="c-detail">
              <span className="c-ico">📞</span>
              <div className="c-txt">
                <strong>Téléphone</strong>
                <span>+216 25 789 309</span>
              </div>
            </div>
            <div className="c-detail">
              <span className="c-ico">📍</span>
              <div className="c-txt">
                <strong>Localisation</strong>
                <span>Tunis, Tunisie</span>
              </div>
            </div>
          </div>

          <div className="reveal">
            <form
              className="contact-form-wrap"
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
              />
              <div className="form-grid-2">
                <div className="f-group">
                  <label>Prénom</label>
                  <input type="text" name="prenom" placeholder="Votre prénom" required />
                </div>
                <div className="f-group">
                  <label>Nom</label>
                  <input type="text" name="nom" placeholder="Votre nom" required />
                </div>
              </div>
              <div className="f-group">
                <label>Email</label>
                <input type="email" name="email" placeholder="votre@email.com" required />
              </div>
              <div className="f-group">
                <label>Téléphone</label>
                <input type="tel" name="phone" placeholder="+216 XX XXX XXX" />
              </div>
              <div className="f-group">
                <label>Message</label>
                <textarea
                  name="message"
                  placeholder="Décrivez votre projet en quelques lignes..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn-submit"
                disabled={status === "sending"}
                style={buttonStyle}
              >
                {buttonLabel}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
