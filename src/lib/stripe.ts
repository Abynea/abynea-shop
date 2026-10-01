import Stripe from "stripe";

/**
 * Retourne une instance Stripe si une clé secrète valide est configurée.
 * En l'absence de clé (mode démo), renvoie null afin de basculer sur un
 * paiement simulé — l'application reste 100% fonctionnelle hors ligne.
 */
let cached: Stripe | null | undefined;

export function getStripe(): Stripe | null {
  if (cached !== undefined) return cached;

  const key = process.env.STRIPE_SECRET_KEY;
  const looksValid = !!key && /^sk_(test|live)_/.test(key);

  cached = looksValid ? new Stripe(key as string, { apiVersion: "2025-02-24.acacia" }) : null;
  return cached;
}

export function isStripeConfigured() {
  return getStripe() !== null;
}
