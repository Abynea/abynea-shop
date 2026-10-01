"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Banknote, Check, CreditCard, Lock, ShieldCheck, Tag, Truck, Wallet } from "lucide-react";
import { useCart } from "@/store/cart";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_METHODS } from "@/lib/constants";
import { cn, formatPrice } from "@/lib/utils";
import { isStripeClientConfigured } from "@/lib/stripe-client";
import { StripePaymentSection } from "@/components/checkout/StripePaymentSection";
import { PayPalPaymentSection } from "@/components/checkout/PayPalPaymentSection";

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
type Method = "card" | "paypal";

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

const DEMO_DELAY = 1400;

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
  const [method, setMethod] = useState<Method>("card");
  const [intent, setIntent] = useState<{ clientSecret: string; orderNumber: string; trackingNumber: string } | null>(null);
  const [loadingIntent, setLoadingIntent] = useState(false);
  const [demoProcessing, setDemoProcessing] = useState(false);
  const [serverError, setServerError] = useState("");
  const [gatewayError, setGatewayError] = useState("");

  const paypalConfigured = Boolean(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID);
  const stripeConfigured = isStripeClientConfigured;

  const shippingMethod = SHIPPING_METHODS.find((s) => s.id === shippingId) ?? SHIPPING_METHODS[0];
  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = freeShipping ? 0 : shippingMethod.price;
  const total = Math.max(0, Math.round((subtotal - discount + shippingCost) * 100) / 100);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const canSubmit = useMemo(() => items.length > 0, [items.length]);
  const demoMode = !stripeConfigured && !paypalConfigured;

  /** Lignes transmises aux passerelles. */
  const paymentLines = useMemo(
    () =>
      items.map((i) => ({
        productId: i.productId,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        color: i.color,
        model: i.model,
      })),
    [items]
  );

  // Toute modification du panier ou de la livraison invalide l'intention en cours.
  useEffect(() => {
    setIntent(null);
  }, [items, shippingId, promo]);

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

  function scrollToForm() {
    document.getElementById("checkout-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handlePromo() {
    setPromoError("");
    if (!promoInput.trim()) return;
    if (applyPromo(promoInput)) setPromoInput("");
    else setPromoError("Code promo invalide. Essayez ABYNEA10.");
  }

  function goToConfirmation(order: string, tracking: string) {
    clear();
    const params = new URLSearchParams({ order, tracking, total: String(total) });
    router.push(`/confirmation?${params.toString()}`);
  }

  /** Mode démo : simule une autorisation de paiement puis confirme la commande. */
  async function simulateDemoPayment() {
    setDemoProcessing(true);
    setGatewayError("");
    await new Promise((r) => setTimeout(r, DEMO_DELAY));
    const order = `ABY-${Math.random().toString(36).slice(2, 11).toUpperCase()}`;
    const tracking = `LP${Math.floor(100000000 + Math.random() * 899999999)}FR`;
    setDemoProcessing(false);
    goToConfirmation(order, tracking);
  }

  /** Carte / Apple Pay / Google Pay : prépare le PaymentIntent Stripe. */
  async function handlePrepareCard() {
    setGatewayError("");
    if (!validate()) {
      scrollToForm();
      return;
    }
    setLoadingIntent(true);
    try {
      const res = await fetch("/api/payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: paymentLines, shippingId, customer: form, promo }),
      });
      const data = await res.json();

      if (data.mode === "demo") {
        // Serveur sans clé Stripe : on retombe sur le paiement simulé.
        await simulateDemoPayment();
        return;
      }
      if (!res.ok || !data.clientSecret) {
        setGatewayError(data.error ?? "Impossible d'initialiser le paiement.");
        return;
      }
      setIntent({ clientSecret: data.clientSecret, orderNumber: data.orderNumber, trackingNumber: data.trackingNumber });
    } catch {
      // Hébergement statique (GitHub Pages) : aucun serveur d'API → mode démo.
      await simulateDemoPayment();
    } finally {
      setLoadingIntent(false);
    }
  }

  /** PayPal : nécessite l'empreinte client (client ID) et l'API serveur. */
  async function handlePreparePaypal() {
    setGatewayError("");
    if (!validate()) {
      scrollToForm();
      return;
    }
    if (paypalConfigured) {
      setIntent(null); // les boutons PayPal gèrent l'appel serveur eux-mêmes
    } else {
      await simulateDemoPayment();
    }
  }

  function selectMethod(next: Method) {
    setMethod(next);
    setGatewayError("");
    setIntent(null);
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

  const contactReady = Object.keys(errors).length === 0;

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

      {demoMode && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-gold/30 bg-gold-soft px-4 py-3 text-sm text-ink">
          <ShieldCheck size={18} className="mt-0.5 shrink-0 text-gold-dark" />
          <p>
            <strong>Mode démonstration actif.</strong> Aucune clé de paiement n'est configurée : le paiement est simulé
            pour tester le parcours de bout en bout. Renseignez <code className="text-xs">STRIPE_SECRET_KEY</code>,{" "}
            <code className="text-xs">NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> et{" "}
            <code className="text-xs">NEXT_PUBLIC_PAYPAL_CLIENT_ID</code> pour activer les paiements réels.
          </p>
        </div>
      )}

      <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-14">
        {/* Form */}
        <form id="checkout-form" onSubmit={(e) => e.preventDefault()} className="space-y-8">
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
              <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
                <Field label="Code postal" error={errors.zip}>
                  <input
                    value={form.zip}
                    onChange={(e) => update("zip", e.target.value)}
                    placeholder="75002"
                    inputMode="numeric"
                    className={cn("input", errors.zip && "border-red-400 focus:border-red-400 focus:ring-red-200")}
                    autoComplete="postal-code"
                  />
                </Field>
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
              <Field label="Pays">
                <select
                  value={form.country}
                  onChange={(e) => update("country", e.target.value)}
                  className="input"
                  autoComplete="country-name"
                >
                  <option>France</option>
                  <option>Belgique</option>
                  <option>Suisse</option>
                  <option>Luxembourg</option>
                </select>
              </Field>
            </div>
          </section>

          {/* Shipping method */}
          <section>
            <h2 className="mb-4 font-serif text-xl text-ink">3. Mode de livraison</h2>
            <div className="space-y-3">
              {SHIPPING_METHODS.map((m) => {
                const selected = m.id === shippingId;
                const cost = freeShipping ? 0 : m.price;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setShippingId(m.id)}
                    className={cn(
                      "flex w-full items-center justify-between gap-4 rounded-xl border px-4 py-3.5 text-left transition",
                      selected ? "border-ink bg-sand/50" : "border-line hover:border-ink/40"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition",
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

            {/* Sélecteur de moyen de paiement */}
            <div className="grid gap-3 sm:grid-cols-2">
              <PaymentMethodOption
                active={method === "card"}
                onClick={() => selectMethod("card")}
                icon={<CreditCard size={18} />}
                title="Carte bancaire"
                subtitle="Visa, Mastercard, Apple Pay, Google Pay"
                badge={stripeConfigured ? "Stripe" : "Démo"}
              />
              <PaymentMethodOption
                active={method === "paypal"}
                onClick={() => selectMethod("paypal")}
                icon={<Wallet size={18} />}
                title="PayPal"
                subtitle="Paiement express en 2 clics"
                badge={paypalConfigured ? "PayPal" : "Démo"}
              />
            </div>

            <div className="mt-5 rounded-xl border border-line bg-sand/40 p-5">
              {method === "card" ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-widest2 text-ink-faint">
                    <span className="rounded border border-line bg-ivory px-2 py-1">Visa</span>
                    <span className="rounded border border-line bg-ivory px-2 py-1">Mastercard</span>
                    <span className="rounded border border-line bg-ivory px-2 py-1">Apple Pay</span>
                    <span className="rounded border border-line bg-ivory px-2 py-1">Google Pay</span>
                  </div>

                  {intent ? (
                    <StripePaymentSection
                      clientSecret={intent.clientSecret}
                      orderNumber={intent.orderNumber}
                      trackingNumber={intent.trackingNumber}
                      total={total}
                      onSuccess={() => goToConfirmation(intent.orderNumber, intent.trackingNumber)}
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={handlePrepareCard}
                      disabled={!canSubmit || loadingIntent || demoProcessing}
                      className="btn-dark w-full"
                    >
                      {loadingIntent || demoProcessing ? (
                        "Traitement en cours…"
                      ) : (
                        <>
                          <Lock size={15} /> Payer {formatPrice(total)}
                        </>
                      )}
                    </button>
                  )}

                  <p className="flex items-center gap-2 text-xs text-ink-muted">
                    <Lock size={13} className="text-emerald-600" />
                    Connexion chiffrée (SSL). Vos données bancaires ne sont jamais stockées sur nos serveurs.
                  </p>
                  <p className="rounded-lg bg-ivory px-3 py-2 text-[11px] text-ink-faint">
                    💡 Mode test Stripe : carte <strong className="text-ink">4242 4242 4242 4242</strong>, date future,
                    CVC quelconque.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-ink-soft">
                    Vous serez redirigé vers PayPal pour finaliser votre paiement en toute sécurité.
                  </p>
                  {intent === null && !paypalConfigured ? (
                    <button
                      type="button"
                      onClick={handlePreparePaypal}
                      disabled={!canSubmit || demoProcessing}
                      className="btn-dark w-full"
                    >
                      {demoProcessing ? (
                        "Traitement en cours…"
                      ) : (
                        <>
                          <Banknote size={15} /> Payer avec PayPal · {formatPrice(total)}
                        </>
                      )}
                    </button>
                  ) : (
                    <PayPalPaymentSection
                      items={paymentLines}
                      shippingId={shippingId}
                      customer={form}
                      promo={promo}
                      onSuccess={(order, tracking) => goToConfirmation(order, tracking)}
                    />
                  )}
                  <p className="flex items-center gap-2 text-xs text-ink-muted">
                    <ShieldCheck size={13} className="text-emerald-600" />
                    Protection des acheteurs PayPal incluse.
                  </p>
                </div>
              )}

              {gatewayError && (
                <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{gatewayError}</p>
              )}
              {!contactReady && (
                <p className="mt-3 text-[11px] text-ink-faint">
                  Complétez vos coordonnées et votre adresse pour activer le paiement.
                </p>
              )}
            </div>
          </section>

          {serverError && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{serverError}</p>}
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

            <p className="mt-5 flex items-center justify-center gap-2 text-center text-[11px] text-ink-faint">
              <Lock size={12} /> Paiement 100% sécurisé · Retours sous 14 jours
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function PaymentMethodOption({
  active,
  onClick,
  icon,
  title,
  subtitle,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  badge: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex items-start gap-3 rounded-xl border px-4 py-3.5 text-left transition",
        active ? "border-ink bg-sand/50 shadow-sm" : "border-line hover:border-ink/40"
      )}
    >
      <span className={cn("mt-0.5 shrink-0", active ? "text-ink" : "text-ink-muted")}>{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="text-sm font-medium text-ink">{title}</span>
          <span className="rounded border border-line bg-ivory px-1.5 py-0.5 text-[9px] uppercase tracking-widest2 text-ink-faint">
            {badge}
          </span>
        </span>
        <span className="mt-0.5 block text-xs text-ink-muted">{subtitle}</span>
      </span>
      <span
        className={cn(
          "mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition",
          active ? "border-ink bg-ink" : "border-line"
        )}
      >
        {active && <Check size={12} className="text-white" />}
      </span>
    </button>
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
