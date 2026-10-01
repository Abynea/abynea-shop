"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Home, Package, Search, Truck, User } from "lucide-react";
import { estimatedDelivery } from "@/lib/utils";

export function AccountClient() {
  const [order, setOrder] = useState("");
  const [tracking, setTracking] = useState<string | null>(null);

  function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    if (order.trim().length < 4) return;
    setTracking(order.trim().toUpperCase());
  }

  const steps = [
    { icon: CheckCircle2, label: "Commande confirmée", active: true, text: "Traitée" },
    { icon: Package, label: "En préparation", active: true, text: "Sous 24/48h" },
    { icon: Truck, label: "En transit", active: true, text: estimatedDelivery(1, 2) },
    { icon: Home, label: "Livraison", active: false, text: estimatedDelivery(3, 5) },
  ];

  return (
    <div className="container-x max-w-3xl py-12 md:py-16">
      <p className="eyebrow">Mon compte</p>
      <h1 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">Suivre ma commande</h1>
      <p className="mt-4 text-sm text-ink-muted">
        Saisissez votre numéro de commande (reçu par email) pour consulter l'état de votre colis.
      </p>

      <form onSubmit={handleTrack} className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" size={17} />
          <input
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            placeholder="Ex : ABY-DEMO001"
            className="input pl-11"
            aria-label="Numéro de commande"
          />
        </div>
        <button type="submit" className="btn-dark shrink-0">
          Suivre
        </button>
      </form>

      {tracking && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-surface mt-8 p-6"
        >
          <div className="flex items-center justify-between border-b border-line pb-4">
            <div>
              <p className="text-[11px] uppercase tracking-widest2 text-ink-faint">Commande</p>
              <p className="font-serif text-lg text-ink">{tracking}</p>
            </div>
            <span className="rounded-full bg-gold-soft px-3 py-1 text-xs font-medium text-gold-dark">
              En cours de livraison
            </span>
          </div>

          <ol className="relative mt-6 space-y-6 pl-8">
            <span className="absolute left-[11px] top-2 h-[calc(100%-16px)] w-px bg-line" aria-hidden />
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <li key={step.label} className="relative flex items-start gap-4">
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
                </li>
              );
            })}
          </ol>
        </motion.div>
      )}

      <div className="mt-10 card-surface p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sand text-ink-muted">
            <User size={20} />
          </span>
          <div>
            <p className="font-serif text-lg text-ink">Espace client</p>
            <p className="text-sm text-ink-muted">
              La création de compte arrive bientôt. En attendant, retrouvez toutes vos infos par email.
            </p>
          </div>
        </div>
        <Link href="/contact" className="btn-outline mt-5">
          Contacter le service client
        </Link>
      </div>
    </div>
  );
}
