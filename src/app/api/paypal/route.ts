import { NextResponse } from "next/server";
import { computeTotals, type PaymentCustomer, type PaymentLine } from "@/lib/payments";
import { generateOrderNumber, generateTrackingNumber } from "@/lib/utils";

export const runtime = "nodejs";

const PAYPAL_API =
  process.env.PAYPAL_ENV === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

type PayPalBody = {
  action: "create" | "capture";
  items?: PaymentLine[];
  shippingId?: string;
  customer?: PaymentCustomer;
  promo?: string | null;
  orderId?: string;
};

async function getAccessToken(): Promise<string | null> {
  const id = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  if (!id || !secret) return null;

  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { access_token?: string };
  return data.access_token ?? null;
}

export async function POST(req: Request) {
  let body: PayPalBody;
  try {
    body = (await req.json()) as PayPalBody;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const token = await getAccessToken();
  if (!token) {
    return NextResponse.json(
      {
        mode: "demo",
        message:
          "PayPal non configuré (NEXT_PUBLIC_PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET manquants).",
      },
      { status: 200 }
    );
  }

  if (body.action === "capture") {
    if (!body.orderId) {
      return NextResponse.json({ error: "orderId manquant." }, { status: 400 });
    }
    const res = await fetch(`${PAYPAL_API}/v2/checkout/orders/${body.orderId}/capture`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: "Capture PayPal échouée.", details: data }, { status: 502 });
    }
    return NextResponse.json({
      mode: "paypal",
      status: data.status,
      orderId: data.id,
      orderNumber: generateOrderNumber(),
      trackingNumber: generateTrackingNumber(),
    });
  }

  // action === "create"
  const { items, shippingId = "", customer, promo } = body;
  if (!items?.length || !customer) {
    return NextResponse.json({ error: "Panier ou client manquant." }, { status: 400 });
  }

  const totals = computeTotals(items, shippingId, promo);
  const orderNumber = generateOrderNumber();

  const res = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: orderNumber,
          description: "Commande ABYNÉA",
          amount: {
            currency_code: "EUR",
            value: totals.total.toFixed(2),
            breakdown: {
              item_total: { currency_code: "EUR", value: totals.subtotal.toFixed(2) },
              shipping: { currency_code: "EUR", value: totals.shippingCost.toFixed(2) },
              discount: { currency_code: "EUR", value: totals.discount.toFixed(2) },
            },
          },
          items: items.map((i) => ({
            name: i.name.slice(0, 127),
            quantity: String(i.quantity),
            unit_amount: { currency_code: "EUR", value: i.price.toFixed(2) },
            category: "PHYSICAL_GOODS",
          })),
        },
      ],
      payer: {
        email_address: customer.email,
        name: { given_name: customer.firstName, surname: customer.lastName },
      },
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json({ error: "Création de commande PayPal échouée.", details: data }, { status: 502 });
  }
  return NextResponse.json({ mode: "paypal", orderId: data.id, orderNumber });
}
