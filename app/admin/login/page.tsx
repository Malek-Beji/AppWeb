"use client";

import { useActionState } from "react";
import { login } from "@/lib/actions/auth";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, {});

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-4 relative overflow-hidden font-sans">
      <div
        className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full opacity-[0.08] blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-accent), transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full opacity-[0.06] blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-accent-dim), transparent 70%)" }}
      />

      <form
        action={formAction}
        className="w-full max-w-sm bg-ink-soft border border-white/10 rounded-lg p-10 relative shadow-2xl"
      >
        <div className="mb-9">
          <h1 className="font-serif text-3xl text-white tracking-tight">
            AppWeb<span className="text-accent italic">+</span>
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35 mt-2">
            Administration
          </p>
        </div>

        <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          autoFocus
          className="w-full mb-5 px-4 py-3 rounded bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-accent focus:bg-accent/5 transition-colors"
          placeholder="admin@appwebplus.tn"
        />

        <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">
          Mot de passe
        </label>
        <input
          type="password"
          name="password"
          required
          className="w-full mb-7 px-4 py-3 rounded bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-accent focus:bg-accent/5 transition-colors"
          placeholder="••••••••"
        />

        {state?.error && (
          <p className="text-sm text-red-400 mb-5 -mt-2">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full py-3 rounded bg-accent text-ink font-semibold text-sm uppercase tracking-wide hover:bg-transparent hover:text-accent border border-accent transition-colors disabled:opacity-60 disabled:pointer-events-none"
        >
          {pending ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
