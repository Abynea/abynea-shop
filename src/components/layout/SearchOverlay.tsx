"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";

type Props = {
  open: boolean;
  onClose: () => void;
};

const SUGGESTIONS = ["Créoles dorées", "Coque MagSafe", "Sac banane", "Waterproof", "Cadeau"];

export function SearchOverlay({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 120);
      document.body.style.overflow = "hidden";
      return () => {
        window.clearTimeout(t);
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
      .slice(0, 6);
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex justify-center bg-ink/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="mt-0 h-fit w-full max-w-2xl bg-ivory p-5 shadow-card sm:mt-24 sm:rounded-2xl"
          >
            <div className="flex items-center gap-3 border-b border-line pb-3">
              <Search size={18} className="text-ink-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un bijou, une coque, un sac…"
                className="w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-faint"
              />
              <button onClick={onClose} aria-label="Fermer la recherche" className="text-ink-muted hover:text-ink">
                <X size={20} />
              </button>
            </div>

            {!query && (
              <div className="pt-4">
                <p className="mb-2 text-[11px] uppercase tracking-widest2 text-ink-faint">Recherches populaires</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setQuery(s)}
                      className="rounded-full border border-line px-3 py-1.5 text-xs text-ink-soft transition hover:border-gold hover:text-gold-dark"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {query && (
              <div className="max-h-[60vh] overflow-y-auto pt-3">
                {results.length === 0 ? (
                  <p className="py-8 text-center text-sm text-ink-muted">
                    Aucun résultat pour « {query} ». Essayez un autre mot-clé.
                  </p>
                ) : (
                  <ul className="space-y-1">
                    {results.map((p) => (
                      <li key={p.id}>
                        <Link
                          href={`/produit/${p.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-sand"
                        >
                          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-sand">
                            <Image src={p.images[0]} alt={p.name} fill sizes="56px" className="object-cover" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-serif text-sm text-ink">{p.name}</p>
                            <p className="text-[11px] uppercase tracking-widest2 text-ink-faint">{p.categoryLabel}</p>
                          </div>
                          <span className="text-sm font-semibold text-ink">{formatPrice(p.price)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
