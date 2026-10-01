import { FREE_SHIPPING_THRESHOLD, SHIPPING_METHODS } from "@/lib/constants";

/** Ligne d'article transmise aux passerelles de paiement. */
export type PaymentLine = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  color?: string;
  model?: string;
};

export type PaymentCustomer = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  zip: string;
  city: string;
  country: string;
  phone?: string;
};

export const PROMO_CODES: Record<string, number> = {
  ABYNEA10: 0.1,
  WELCOME10: 0.1,
  TIKTOK15: 0.15,
};

const round2 = (n: number) => Math.round(n * 100) / 100;

export type OrderTotals = {
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  shippingName: string;
};

/** Calcule les totaux d'une commande à partir des lignes du panier. */
export function computeTotals(
  items: PaymentLine[],
  shippingId: string,
  promo?: string | null
): OrderTotals {
  const subtotal = round2(items.reduce((sum, i) => sum + i.price * i.quantity, 0));
  const shipping = SHIPPING_METHODS.find((s) => s.id === shippingId) ?? SHIPPING_METHODS[0];
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : shipping.price;
  const rate = promo ? PROMO_CODES[promo.toUpperCase()] ?? 0 : 0;
  const discount = round2(subtotal * rate);
  const total = Math.max(0, round2(subtotal - discount + shippingCost));
  return { subtotal, discount, shippingCost, total, shippingName: shipping.name };
}

/**
 * Identifiant d'idempotence déterministe : deux tentatives de paiement pour
 * le même panier réutilisent le même PaymentIntent au lieu d'en créer un nouveau.
 */
export function cartFingerprint(items: PaymentLine[], shippingId: string, promo?: string | null) {
  const payload = items
    .map((i) => `${i.productId}:${i.price}:${i.quantity}:${i.color ?? ""}:${i.model ?? ""}`)
    .join("|");
  return `${payload}#${shippingId}#${promo ?? ""}`;
}
