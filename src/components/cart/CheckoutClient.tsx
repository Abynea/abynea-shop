"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Check, CreditCard, Lock, Tag, Truck } from "lucide-react";
import { useCart } from "@/store/cart";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_METHODS } from "@/lib/constants";
import { cn, formatPrice } from "@/lib/utils";

type FormState = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  zip: "",
  city: "",
  country: "France",
  phone: "",
};

export function CheckoutClient() {
  const router = useRouter();
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const discount = useCart((s) => s.discount());
  const promo = useCart((s) => s.promo);
  const applyPromo = useCart((s) => s.applyPromo);
  const removePromo = useCart((s) => s.removePromo);
  const clear = useCart((s) => s.clear);

  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [shippingId, setShippingId] = useState<string>(SHIPPING_METHODS[1].id);
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const shippingMethod = SHIPPING_METHODS.find((s) => s.id === shippingId) ?? SHIPPING_METHODS[0];
  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = freeShipping ? 0 : shippingMethod.price;
  const total = Math.max(0, subtotal - discount + shippingCost);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const canSubmit = useMemo(() => items.length > 0, [items.length]);

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) next.email = "Adresse email invalide.";
    if (form.firstName.trim().length < 2) next.firstName = "Prénom requis.";
    if (form.lastName.trim().length < 2) next.lastName = "Nom requis.";
    if (form.address.trim().length < 5) next.address = "Adresse complète requise.";
    if (!/^\d{5}$/.test(form.zip.trim())) next.zip = "Code postal à 5 chiffres.";
    if (form.city.trim().length < 2) next.city = "Ville requise.";
    if (form.phone && !/^[+0-9 ().-]{8,}$/.test(form.phone)) next.phone = "Numéro invalide.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handlePromo() {
    setPromoError("");
    if (!promoInput.trim()) return;
    const ok = applyPromo(promoInput);
    if (ok) {
      setPromoInput("");
    } else {
      setPromoError("Code promo invalide. Essayez ABYNEA10.");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    if (!validate()) {
      document.getElementById("checkout-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            color: i.color,
            model: i.model,
          })),
          shippingId,
          customer: form,
          promo,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error ?? "Une erreur est survenue.");
        setSubmitting(false);
        return;
      }

      // Mode Stripe réel : redirection vers la page de paiement hébergée
      if (data.mode === "stripe" && data.url) {
        clear();
        window.location.href = data.url;
        return;
      }

      // Mode démo : redirection vers la confirmation
      clear();
      const params = new URLSearchParams({
        order: data.orderNumber,
        tracking: data.trackingNumber,
        total: String(total),
      });
      router.push(`/confirmation?${params.toString()}`);
    } catch {
      setServerError("Impossible de contacter le serveur. Réessayez.");
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="container-x flex flex-col items-center justify-center py-24 text-center">
        <h1 className="font-serif text-2xl text-ink">Votre panier est vide</h1>
        <p className="mt-2 text-sm text-ink-muted">Ajoutez des articles avant de passer commande.</p>
        <Link href="/boutique" className="btn-dark mt-6">
          Découvrir la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="container-x py-8 md:py-12">
      <Link
        href="/boutique"
        className="mb-6 inline-flex items-center gap-2 text-sm text-ink-muted transition hover:text-ink"
      >
        <ArrowLeft size={15} /> Continuer mes achats
      </Link>

      <div className="mb-8">
        <p className="eyebrow">Commande sécurisée</p>
        <h1 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">Finaliser ma commande</h1>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-14">
        {/* Form */}
        <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
          {!freeShipping && (
            <div className="flex items-center gap-2 rounded-xl bg-gold-soft px-4 py-3 text-sm text-ink">
              <Truck size={16} className="text-gold-dark" />
              Plus que <strong>{formatPrice(remaining)}</strong> pour bénéficier de la livraison offerte !
            </div>
          )}

          {/* Contact */}
          <section>
            <h2 className="mb-4 font-serif text-xl text-ink">1. Vos coordonnées</h2>
            <div className="space-y-4">
              <Field label="Adresse email" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="votre@email.com"
                  className={cn("input", errors.email && "border-red-400 focus:border-red-400 focus:ring-red-200")}
                  autoComplete="email"
                />
              </Field>
              <Field label="Téléphone (optionnel)" error={errors.phone}>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="06 12 34 56 78"
                  className={cn("input", errors.phone && "border-red-400 focus:border-red-400 focus:ring-red-200")}
                  autoComplete="tel"
                />
              </Field>
            </div>
          </section>

          {/* Shipping address */}
          <section>
            <h2 className="mb-4 font-serif text-xl text-ink">2. Adresse de livraison</h2>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Prénom" error={errors.firstName}>
                  <input
                    value={form.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    placeholder="Camille"
                    className={cn("input", errors.firstName && "border-red-400 focus:border-red-400 focus:ring-red-200")}
                    autoComplete="given-name"
                  />
                </Field>
                <Field label="Nom" error={errors.lastName}>
                  <input
                    value={form.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    placeholder="Durand"
                    className={cn("input", errors.lastName && "border-red-400 focus:border-red-400 focus:ring-red-200")}
                    autoComplete="family-name"
                  />
                </Field>
              </div>
              <Field label="Adresse" error={errors.address}>
                <input
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  placeholder="12 rue de la Paix"
                  className={cn("input", errors.address && "border-red-400 focus:border-red-400 focus:ring-red-200")}
                  autoComplete="street-address"
                />
              </Field>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Code postal" error={errors.zip}>
                  <input
                    value={form.zip}
                    onChange={(e) => update("zip", e.target.value.replace(/\D/g, "").slice(0, 5))}
                    placeholder="75002"
                    inputMode="numeric"
                    className={cn("input", errors.zip && "border-red-400 focus:border-red-400 focus:ring-red-200")}
                    autoComplete="postal-code"
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Ville" error={errors.city}>
                    <input
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      placeholder="Paris"
                      className={cn("input", errors.city && "border-red-400 focus:border-red-400 focus:ring-red-200")}
                      autoComplete="address-level2"
                    />
                  </Field>
                </div>
              </div>
              <Field label="Pays">
                <select
                  value={form.country}
                  onChange={(e) => update("country", e.target.value)}
                  className="input"
                  autoComplete="country-name"
                >
                  {["France", "Belgique", "Suisse", "Luxembourg"].map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </section>

          {/* Shipping method */}
          <section>
            <h2 className="mb-4 font-serif text-xl text-ink">3. Mode de livraison</h2>
            <div className="space-y-2.5">
              {SHIPPING_METHODS.map((m) => {
                const selected = shippingId === m.id;
                const cost = freeShipping ? 0 : m.price;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setShippingId(m.id)}
                    className={cn(
                      "flex w-full items-center justify-between gap-4 rounded-xl border p-4 text-left transition",
                      selected ? "border-ink bg-sand/60" : "border-line hover:border-ink/30"
                    )}
                  >
                    <span className="flex items-start gap-3">
                      <span
                        className={cn(
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition",
                          selected ? "border-ink bg-ink" : "border-line"
                        )}
                      >
                        {selected && <Check size={12} className="text-white" />}
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-ink">
                          {m.name} <span className="font-normal text-ink-faint">· {m.carrier}</span>
                        </span>
                        <span className="mt-0.5 block text-xs text-ink-muted">
                          {m.eta} — {m.description}
                        </span>
                      </span>
                    </span>
                    <span className={cn("shrink-0 text-sm font-semibold", cost === 0 && "text-gold-dark")}>
                      {cost === 0 ? "Offerte" : formatPrice(cost)}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Payment */}
          <section>
            <h2 className="mb-4 font-serif text-xl text-ink">4. Paiement</h2>
            <div className="rounded-xl border border-line bg-sand/40 p-5">
              <div className="flex items-center gap-3 text-sm text-ink-soft">
                <CreditCard size={18} className="text-gold-dark" />
                <span>
                  Paiement par carte bancaire, Apple Pay et Google Pay via <strong className="text-ink">Stripe</strong>.
                </span>
              </div>
              <p className="mt-3 flex items-center gap-2 text-xs text-ink-muted">
                <Lock size={13} className="text-emerald-600" />
                Connexion chiffrée (SSL). Vos données bancaires ne sont jamais stockées sur nos serveurs.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-widest2 text-ink-faint">
                <span className="rounded border border-line bg-ivory px-2 py-1">Visa</span>
                <span className="rounded border border-line bg-ivory px-2 py-1">Mastercard</span>
                <span className="rounded border border-line bg-ivory px-2 py-1">Apple Pay</span>
                <span className="rounded border border-line bg-ivory px-2 py-1">Amex</span>
              </div>
              <p className="mt-4 rounded-lg bg-ivory px-3 py-2 text-[11px] text-ink-faint">
                💡 Mode test : utilisez la carte <strong className="text-ink">4242 4242 4242 4242</strong>, date
                future, CVC quelconque.
              </p>
            </div>
          </section>

          {serverError && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{serverError}</p>
          )}

          <button type="submit" disabled={!canSubmit || submitting} className="btn-dark w-full lg:hidden">
            {submitting ? "Traitement…" : `Payer ${formatPrice(total)}`}
          </button>
        </form>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="card-surface p-5">
            <h2 className="mb-4 font-serif text-lg text-ink">Récapitulatif</h2>

            <ul className="max-h-[320px] space-y-3 overflow-y-auto pr-1">
              {items.map((item) => (
                <li key={item.key} className="flex gap-3">
                  <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-sand">
                    <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-white">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-serif text-sm text-ink">{item.name}</p>
                    {(item.color || item.model) && (
                      <p className="text-[11px] text-ink-faint">
                        {[item.color, item.model].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </div>
                  <span className="shrink-0 text-sm font-medium text-ink">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            {/* Promo */}
            <div className="mt-5 border-t border-line pt-4">
              {promo ? (
                <div className="flex items-center justify-between rounded-lg bg-gold-soft px-3 py-2.5 text-sm">
                  <span className="flex items-center gap-2 text-ink">
                    <Tag size={14} className="text-gold-dark" /> Code {promo} appliqué
                  </span>
                  <button onClick={removePromo} className="text-xs text-ink-muted underline hover:text-ink">
                    Retirer
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Code promo"
                    className="input py-2.5 text-sm"
                    aria-label="Code promo"
                  />
                  <button type="button" onClick={handlePromo} className="btn-outline shrink-0 px-4 py-2.5">
                    Appliquer
                  </button>
                </div>
              )}
              {promoError && <p className="mt-2 text-xs text-red-500">{promoError}</p>}
            </div>

            {/* Totals */}
            <div className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
              <div className="flex justify-between text-ink-soft">
                <span>Sous-total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-gold-dark">
                  <span>Remise</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-ink-soft">
                <span>Livraison ({shippingMethod.name})</span>
                <span className={cn(freeShipping && "font-medium text-gold-dark")}>
                  {freeShipping ? "Offerte" : formatPrice(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between border-t border-line pt-3 text-base font-semibold text-ink">
                <span>Total TTC</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              form="checkout-form"
              disabled={!canSubmit || submitting}
              className="btn-dark mt-5 hidden w-full lg:flex"
            >
              {submitting ? (
                "Traitement en cours…"
              ) : (
                <>
                  <Lock size={15} /> Payer {formatPrice(total)}
                </>
              )}
            </motion.button>

            <p className="mt-3 text-center text-[11px] text-ink-faint">
              🔒 Paiement 100% sécurisé · Retours sous 14 jours
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  );
}
