"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Copy, Package, Truck, Home, MapPin } from "lucide-react";
import { useState } from "react";
import { formatPrice, estimatedDelivery } from "@/lib/utils";
import { getBestSellers } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export function ConfirmationClient() {
  const params = useSearchParams();
  const order = params.get("order") ?? "ABY-DEMO001";
  const tracking = params.get("tracking") ?? "LP000000000FR";
  const total = Number(params.get("total") ?? 0);
  const [copied, setCopied] = useState(false);

  const recommendations = getBestSellers(4);

  function copyTracking() {
    navigator.clipboard?.writeText(tracking);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  const steps = [
    { icon: CheckCircle2, label: "Commande confirmée", active: true, text: "Aujourd'hui" },
    { icon: Package, label: "En préparation", active: true, text: "Sous 24/48h" },
    { icon: Truck, label: "Expédiée", active: false, text: estimatedDelivery(2, 3) },
    { icon: Home, label: "Livrée", active: false, text: estimatedDelivery(3, 5) },
  ];

  return (
    <div className="container-x py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl text-center"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 14, stiffness: 220, delay: 0.15 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-soft"
        >
          <CheckCircle2 size={34} className="text-gold-dark" />
        </motion.span>

        <h1 className="mt-5 font-serif text-3xl text-ink sm:text-4xl">Merci pour votre commande !</h1>
        <p className="mt-3 text-sm text-ink-muted">
          Un email de confirmation vient de vous être envoyé. Votre colis est préparé avec soin depuis la France. 💛
        </p>
      </motion.div>

      {/* Order card */}
      <div className="mx-auto mt-10 max-w-2xl">
        <div className="card-surface overflow-hidden">
          <div className="grid gap-px bg-line sm:grid-cols-2">
            <div className="bg-ivory p-5">
              <p className="text-[11px] uppercase tracking-widest2 text-ink-faint">Numéro de commande</p>
              <p className="mt-1 font-serif text-lg text-ink">{order}</p>
            </div>
            <div className="bg-ivory p-5">
              <p className="text-[11px] uppercase tracking-widest2 text-ink-faint">Numéro de suivi</p>
              <button
                onClick={copyTracking}
                className="mt-1 flex items-center gap-2 font-serif text-lg text-ink transition hover:text-gold-dark"
              >
                {tracking}
                <Copy size={14} className={copied ? "text-emerald-600" : "text-ink-faint"} />
              </button>
              {copied && <span className="text-[11px] text-emerald-600">Copié !</span>}
            </div>
          </div>

          {total > 0 && (
            <div className="flex items-center justify-between border-t border-line bg-sand/50 px-5 py-4">
              <span className="text-sm text-ink-soft">Montant payé</span>
              <span className="font-semibold text-ink">{formatPrice(total)}</span>
            </div>
          )}
        </div>

        {/* Tracking timeline */}
        <div className="card-surface mt-6 p-6">
          <h2 className="mb-5 font-serif text-lg text-ink">Suivi de votre colis</h2>
          <ol className="relative space-y-6 pl-8">
            <span className="absolute left-[11px] top-2 h-[calc(100%-16px)] w-px bg-line" aria-hidden />
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.li
                  key={step.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="relative flex items-start gap-4"
                >
                  <span
                    className={`absolute -left-8 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                      step.active ? "border-gold bg-gold text-white" : "border-line bg-ivory text-ink-faint"
                    }`}
                  >
                    <Icon size={12} />
                  </span>
                  <div>
                    <p className={`text-sm font-medium ${step.active ? "text-ink" : "text-ink-muted"}`}>
                      {step.label}
                    </p>
                    <p className="text-xs text-ink-faint">{step.text}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>

          <div className="mt-6 flex items-center gap-2 rounded-lg bg-sand/60 px-4 py-3 text-xs text-ink-soft">
            <MapPin size={14} className="text-gold-dark" />
            Livraison estimée : <strong className="text-ink">{estimatedDelivery(3, 5)}</strong>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/boutique" className="btn-gold flex-1">
            Continuer mes achats
          </Link>
          <Link href="/compte" className="btn-outline flex-1">
            Suivre ma commande
          </Link>
        </div>
      </div>

      {/* Recommendations */}
      <section className="mt-16">
        <div className="mb-8 text-center">
          <p className="eyebrow">Pour compléter</p>
          <h2 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">Ces pièces pourraient vous plaire</h2>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 lg:grid-cols-4">
          {recommendations.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
