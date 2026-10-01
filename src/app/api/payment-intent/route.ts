import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { computeTotals, cartFingerprint, type PaymentCustomer, type PaymentLine } from "@/lib/payments";
import { generateOrderNumber, generateTrackingNumber } from "@/lib/utils";

export const runtime = "nodejs";

type IntentBody = {
  items: PaymentLine[];
  shippingId: string;
  customer: PaymentCustomer;
  promo?: string | null;
};

/**
 * Crée un PaymentIntent Stripe pour les Elements (carte + Apple/Google Pay).
 * L'empreinte du panier sert de clé d'idempotence : réessayer le paiement ne
 * crée pas de doublon. Sans clé secrète, répond `mode: "demo"`.
 */
export async function POST(req: Request) {
  let body: IntentBody;
  try {
    body = (await req.json()) as IntentBody;
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
  if (!stripe) {
    return NextResponse.json({ mode: "demo", orderNumber, trackingNumber, totals });
  }

  try {
    const intent = await stripe.paymentIntents.create(
      {
        amount: Math.round(totals.total * 100),
        currency: "eur",
        // Active cartes, Apple Pay, Google Pay et Link selon vos réglages Stripe.
        automatic_payment_methods: { enabled: true },
        receipt_email: customer.email,
        description: `Commande ABYNÉA ${orderNumber}`,
        metadata: {
          orderNumber,
          trackingNumber,
          customerName: `${customer.firstName} ${customer.lastName}`,
          shipping: totals.shippingName,
          promo: promo ?? "",
        },
      },
      { idempotencyKey: `abynea_${cartFingerprint(items, shippingId, promo)}`.slice(0, 250) }
    );

    return NextResponse.json({
      mode: "stripe",
      clientSecret: intent.client_secret,
      orderNumber,
      trackingNumber,
      totals,
    });
  } catch (err) {
    console.error("[payment-intent] Stripe error:", err);
    return NextResponse.json({ error: "Impossible d'initialiser le paiement." }, { status: 502 });
  }
}
