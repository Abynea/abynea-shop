"use client";

import { useState } from "react";
import { Check, Instagram, Mail, MapPin, Music2, Send } from "lucide-react";
import { SITE } from "@/lib/constants";

export function ContactClient() {
  const [form, setForm] = useState({ name: "", email: "", subject: "Question sur une commande", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email) || form.message.trim().length < 10) {
      setError("Merci de remplir tous les champs (message d'au moins 10 caractères).");
      return;
    }
    setSent(true);
  }

  return (
    <div className="container-x max-w-5xl py-12 md:py-16">
      <p className="eyebrow">Aide</p>
      <h1 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">Nous contacter</h1>
      <p className="mt-4 max-w-lg text-sm text-ink-muted">
        Une question sur un produit, une commande ou un retour ? Notre équipe vous répond sous 24h ouvrées.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          {sent ? (
            <div className="flex items-center gap-3 rounded-xl border border-gold/40 bg-gold-soft px-5 py-6 text-sm text-ink">
              <Check className="shrink-0 text-gold-dark" size={20} />
              Merci {form.name} ! Votre message a bien été envoyé. Nous vous répondons sous 24h ouvrées.
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="label">Nom</span>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="input"
                    placeholder="Camille Durand"
                  />
                </label>
                <label className="block">
                  <span className="label">Email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="input"
                    placeholder="votre@email.com"
                  />
                </label>
              </div>
              <label className="block">
                <span className="label">Sujet</span>
                <select
                  value={form.subject}
                  onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                  className="input"
                >
                  {[
                    "Question sur une commande",
                    "Question produit",
                    "Retour / échange",
                    "Partenariat & influence",
                    "Autre",
                  ].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="label">Message</span>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  rows={6}
                  className="input resize-none"
                  placeholder="Décrivez votre demande…"
                />
              </label>
              {error && <p className="text-xs text-red-500">{error}</p>}
              <button type="submit" className="btn-dark">
                Envoyer le message <Send size={15} />
              </button>
            </>
          )}
        </form>

        <aside className="space-y-4">
          <div className="card-surface p-5">
            <h2 className="font-serif text-lg text-ink">Coordonnées</h2>
            <ul className="mt-4 space-y-3 text-sm text-ink-muted">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-gold-dark" /> {SITE.email}
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-gold-dark" /> {SITE.address}
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-full border border-line p-2.5 text-ink-soft transition hover:border-gold hover:text-gold-dark"
              >
                <Instagram size={17} />
              </a>
              <a
                href={SITE.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="rounded-full border border-line p-2.5 text-ink-soft transition hover:border-gold hover:text-gold-dark"
              >
                <Music2 size={17} />
              </a>
            </div>
          </div>
          <div className="rounded-2xl bg-sand p-5 text-sm text-ink-muted">
            <p className="font-medium text-ink">Horaires du service client</p>
            <p className="mt-2">Lundi – Vendredi : 9h – 18h</p>
            <p>Samedi : 10h – 13h</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
