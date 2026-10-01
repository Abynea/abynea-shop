"use client";

import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { AlertCircle } from "lucide-react";
import type { PaymentCustomer, PaymentLine } from "@/lib/payments";

type Props = {
  items: PaymentLine[];
  shippingId: string;
  customer: PaymentCustomer;
  promo: string | null;
  onSuccess: (orderNumber: string, trackingNumber: string) => void;
};

/** Boutons PayPal express : la commande est créée côté serveur puis capturée. */
export function PayPalPaymentSection({ items, shippingId, customer, promo, onSuccess }: Props) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  if (!clientId) return null;

  return (
    <PayPalScriptProvider
      options={{
        clientId,
        currency: "EUR",
        intent: "capture",
        components: "buttons",
      }}
    >
      <PayPalInner
        items={items}
        shippingId={shippingId}
        customer={customer}
        promo={promo}
        onSuccess={onSuccess}
      />
    </PayPalScriptProvider>
  );
}

function PayPalInner({ items, shippingId, customer, promo, onSuccess }: Props) {
  const [{ isPending, isRejected }] = usePayPalScriptReducer();

  async function createOrder() {
    const res = await fetch("/api/paypal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "create", items, shippingId, customer, promo }),
    });
    const data = await res.json();
    if (!res.ok || !data.orderId) {
      throw new Error(data.error ?? "PayPal indisponible.");
    }
    return data.orderId as string;
  }

  async function onApprove(data: { orderID: string }) {
    const res = await fetch("/api/paypal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "capture", orderId: data.orderID }),
    });
    const captured = await res.json();
    if (!res.ok) {
      throw new Error(captured.error ?? "Paiement PayPal non finalisé.");
    }
    onSuccess(captured.orderNumber, captured.trackingNumber);
  }

  if (isPending) {
    return (
      <div className="flex h-12 items-center justify-center rounded-lg border border-line bg-sand/40 text-xs text-ink-muted">
        Chargement de PayPal…
      </div>
    );
  }

  if (isRejected) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-xs text-red-600">
        <AlertCircle size={14} /> PayPal est momentanément indisponible. Choisissez le paiement par carte.
      </div>
    );
  }

  return (
    <PayPalButtons
      style={{ layout: "vertical", shape: "rect", color: "gold", label: "paypal", height: 44 }}
      createOrder={createOrder}
      onApprove={onApprove}
      onError={(err) => console.error("[paypal]", err)}
    />
  );
}
