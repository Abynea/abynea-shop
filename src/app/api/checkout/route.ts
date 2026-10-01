import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_METHODS } from "@/lib/constants";
import { generateOrderNumber, generateTrackingNumber } from "@/lib/utils";

export const runtime = "nodejs";

type IncomingItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  color?: string;
  model?: string;
};

type CheckoutBody = {
  items: IncomingItem[];
  shippingId: string;
  customer: {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    zip: string;
    city: string;
    country: string;
    phone?: string;
  };
  promo?: string | null;
};

const PROMO_CODES: Record<string, number> = { ABYNEA10: 0.1, WELCOME10: 0.1, TIKTOK15: 0.15 };

function computeTotals(items: IncomingItem[], shippingId: string, promo?: string | null) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = SHIPPING_METHODS.find((s) => s.id === shippingId) ?? SHIPPING_METHODS[0];
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : shipping.price;
  const rate = promo && PROMO_CODES[promo.toUpperCase()] ? PROMO_CODES[promo.toUpperCase()] : 0;
  const discount = Math.round(subtotal * rate * 100) / 100;
  const total = Math.max(0, Math.round((subtotal - discount + shippingCost) * 100) / 100);
  return { subtotal, discount, shippingCost, total, shippingName: shipping.name };
}

export async function POST(req: Request) {
  let body: CheckoutBody;
  try {
    body = (await req.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const { items, shippingId, customer, promo } = body;

  if (!items?.length) {
    return NextResponse.json({ error: "Votre panier est vide." }, { status: 400 });
  }
  if (!customer?.email || !customer?.firstName || !customer?.address || !customer?.zip || !customer?.city) {
    return NextResponse.json({ error: "Informations de livraison incomplètes." }, { status: 400 });
  }

  const totals = computeTotals(items, shippingId, promo);
  const orderNumber = generateOrderNumber();
  const trackingNumber = generateTrackingNumber();

  const stripe = getStripe();

  // Mode Stripe réel : crée une session de paiement hébergée
  if (stripe) {
    try {
      const origin = req.headers.get("origin") ?? new URL(req.url).origin;
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: customer.email,
        line_items: items.map((i) => ({
          quantity: i.quantity,
          price_data: {
            currency: "eur",
            unit_amount: Math.round(i.price * 100),
            product_data: {
              name: i.name,
              description: [i.color, i.model].filter(Boolean).join(" · ") || undefined,
            },
          },
        })),
        shipping_options: totals.shippingCost
          ? [
              {
                shipping_rate_data: {
                  type: "fixed_amount",
                  fixed_amount: { amount: Math.round(totals.shippingCost * 100), currency: "eur" },
                  display_name: totals.shippingName,
                },
              },
            ]
          : undefined,
        metadata: {
          orderNumber,
          trackingNumber,
          customerName: `${customer.firstName} ${customer.lastName}`,
        },
        success_url: `${origin}/confirmation?order=${orderNumber}&tracking=${trackingNumber}`,
        cancel_url: `${origin}/checkout?canceled=1`,
      });

      return NextResponse.json({ mode: "stripe", url: session.url, orderNumber, trackingNumber });
    } catch (err) {
      console.error("[checkout] Stripe error:", err);
      // On retombe sur le mode démo si Stripe échoue (ex: clé de test invalide)
    }
  }

  // Mode démo : paiement simulé, commande confirmée immédiatement
  return NextResponse.json({
    mode: "demo",
    orderNumber,
    trackingNumber,
    totals,
    message: "Paiement simulé (mode démonstration). Configurez STRIPE_SECRET_KEY pour activer le paiement réel.",
  });
}
