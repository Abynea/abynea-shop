"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Instagram, Mail, Music2, Send } from "lucide-react";
import { SITE } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";

const FOOTER_LINKS = [
  {
    title: "Boutique",
    links: [
      { label: "Bijoux Inox", href: "/boutique?categorie=bijoux" },
      { label: "Coques Tech", href: "/boutique?categorie=coques" },
      { label: "Sacs & Accessoires", href: "/boutique?categorie=sacs" },
      { label: "Nouveautés", href: "/boutique?tri=nouveautes" },
    ],
  },
  {
    title: "Aide",
    links: [
      { label: "Livraison & Retours", href: "/livraison" },
      { label: "Suivre ma commande", href: "/compte" },
      { label: "Nous contacter", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Informations",
    links: [
      { label: "Notre Histoire", href: "/notre-histoire" },
      { label: "CGV", href: "/cgv" },
      { label: "Mentions Légales", href: "/mentions-legales" },
      { label: "Politique de retour", href: "/politique-retour" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setStatus("loading");
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      /* démo : on affiche le succès même en offline */
    }
    setStatus("done");
    setEmail("");
  }

  return (
    <footer className="mt-20 border-t border-line bg-ivory">
      {/* Newsletter */}
      <div className="container-x py-14">
        <div className="grid gap-8 rounded-2xl bg-sand px-6 py-10 md:grid-cols-2 md:items-center md:px-10">
          <div>
            <p className="eyebrow">Rejoignez le club ABYNÉA</p>
            <h3 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">-10% sur votre 1ère commande</h3>
            <p className="mt-2 max-w-md text-sm text-ink-muted">
              Inscrivez-vous à notre newsletter et recevez votre code de réduction, les nouveautés et les offres
              privées en avant-première.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="w-full">
            {status === "done" ? (
              <div className="flex items-center gap-3 rounded-xl border border-gold/40 bg-gold-soft px-5 py-4 text-sm text-ink">
                <Check className="text-gold-dark" size={18} />
                Merci ! Votre code <strong className="font-semibold">ABYNEA10</strong> est activé.
              </div>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" size={17} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="input pl-11"
                    aria-label="Adresse email"
                  />
                </div>
                <button type="submit" disabled={status === "loading"} className="btn-dark shrink-0">
                  {status === "loading" ? "…" : "Je m'inscris"}
                  <Send size={15} />
                </button>
              </div>
            )}
            <p className="mt-2 text-[11px] text-ink-faint">
              En vous inscrivant, vous acceptez notre politique de confidentialité. Désinscription en 1 clic.
            </p>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="container-x grid gap-10 border-t border-line py-12 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link href="/" aria-label="ABYNÉA — Accueil">
            <Logo className="h-7 text-ink" />
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
            {SITE.description}
          </p>
          <div className="mt-5 flex items-center gap-3">
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

        {FOOTER_LINKS.map((group) => (
          <div key={group.title}>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest2 text-ink">{group.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-ink-muted transition-colors hover:text-gold-dark">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-ink-faint">
            © {new Date().getFullYear()} ABYNÉA. Tous droits réservés. Fait avec ♥ à Paris.
          </p>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest2 text-ink-faint">
            <span className="rounded border border-line px-2 py-1">Visa</span>
            <span className="rounded border border-line px-2 py-1">Mastercard</span>
            <span className="rounded border border-line px-2 py-1">Apple Pay</span>
            <span className="rounded border border-line px-2 py-1">Stripe</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
