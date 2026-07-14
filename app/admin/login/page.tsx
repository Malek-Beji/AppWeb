"use client";

import { useActionState } from "react";
import { login } from "@/lib/actions/auth";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, {});

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#08090d] px-4">
      <form
        action={formAction}
        className="w-full max-w-sm bg-[#1a1c24] border border-white/10 rounded-lg p-8"
      >
        <h1 className="text-2xl font-serif text-[#f5f3ef] mb-1">
          AppWeb<span className="text-[#c8a96e] italic">+</span>
        </h1>
        <p className="text-xs uppercase tracking-widest text-white/40 mb-8">
          Administration
        </p>

        <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          className="w-full mb-4 px-4 py-3 rounded bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#c8a96e]"
          placeholder="admin@appwebplus.tn"
        />

        <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
          Mot de passe
        </label>
        <input
          type="password"
          name="password"
          required
          className="w-full mb-6 px-4 py-3 rounded bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#c8a96e]"
          placeholder="••••••••"
        />

        {state?.error && (
          <p className="text-sm text-red-400 mb-4">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full py-3 rounded bg-[#c8a96e] text-[#08090d] font-semibold text-sm uppercase tracking-wide hover:bg-transparent hover:text-[#c8a96e] border border-[#c8a96e] transition-colors disabled:opacity-60"
        >
          {pending ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
