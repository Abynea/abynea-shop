"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-sand">
      <div className="container-x">
        <div className="grid items-center gap-8 py-12 md:grid-cols-2 md:gap-10 md:py-20 lg:py-24">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
            className="order-2 md:order-1"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-ivory/70 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-widest2 text-gold-dark">
              <Sparkles size={13} /> Nouvelle collection 2025
            </span>

            <h1 className="mt-5 font-serif text-[2.6rem] leading-[1.05] text-ink text-balance sm:text-5xl lg:text-6xl">
              Sublimez votre quotidien
            </h1>

            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-muted">
              Bijoux en acier inoxydable waterproof, coques MagSafe chics et petite maroquinerie.
              Des pièces intemporelles, pensées pour être portées partout, tout le temps.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/boutique" className="btn-gold group">
                Découvrir la collection
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/boutique?categorie=coques" className="btn-outline">
                Coques Tech
              </Link>
            </div>

            <div className="mt-9 flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  {["i.pravatar.cc/80?img=5", "i.pravatar.cc/80?img=32", "i.pravatar.cc/80?img=45", "i.pravatar.cc/80?img=12"].map(
                    (src, i) => (
                      <span
                        key={i}
                        className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-sand bg-ivory"
                      >
                        <Image src={`https://${src}`} alt="" fill sizes="32px" className="object-cover" />
                      </span>
                    )
                  )}
                </div>
                <div className="text-xs leading-tight text-ink-soft">
                  <p className="font-semibold text-ink">+12 000 clientes</p>
                  <p className="text-ink-faint">nous font confiance</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1], delay: 0.1 }}
            className="order-1 md:order-2"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-card sm:aspect-[5/6]">
              <Image
                src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1200&q=80"
                alt="Bijoux dorés ABYNÉA en acier inoxydable"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl bg-ivory/90 px-4 py-3 backdrop-blur">
                <div>
                  <p className="text-[10px] uppercase tracking-widest2 text-ink-faint">Best-seller</p>
                  <p className="font-serif text-sm text-ink">Créoles Dorées « Nova »</p>
                </div>
                <span className="font-semibold text-ink">24,90 €</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
