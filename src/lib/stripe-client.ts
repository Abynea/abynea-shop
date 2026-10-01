import { loadStripe, type Stripe } from "@stripe/stripe-js";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

/**
 * Charge Stripe.js côté navigateur. Retourne `null` si aucune clé publique
 * n'est configurée : l'UI bascule alors sur le mode démonstration.
 */
let stripePromise: Promise<Stripe | null> | null = null;

export function getStripePromise(): Promise<Stripe | null> | null {
  if (!publishableKey) return null;
  if (!stripePromise) stripePromise = loadStripe(publishableKey);
  return stripePromise;
}

export const isStripeClientConfigured = Boolean(publishableKey);
