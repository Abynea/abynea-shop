"use client";

import { useState } from "react";
import {
  Elements,
  ExpressCheckoutElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import type { StripeExpressCheckoutElementConfirmEvent } from "@stripe/stripe-js";
import { Lock } from "lucide-react";
import { getStripePromise } from "@/lib/stripe-client";
import { formatPrice } from "@/lib/utils";

const APPEARANCE = {
  theme: "stripe" as const,
  variables: {
    colorPrimary: "#111111",
    colorBackground: "#FFFFFF",
    colorText: "#111111",
    colorTextSecondary: "#6B6B6B",
    colorDanger: "#dc2626",
    fontFamily: "Inter, system-ui, sans-serif",
    borderRadius: "0.5rem",
  },
};

type Props = {
  clientSecret: string;
  orderNumber: string;
  trackingNumber: string;
  total: number;
  onSuccess: () => void;
};

/** Formulaire Stripe : Apple Pay / Google Pay (express) + carte bancaire. */
export function StripePaymentSection({ clientSecret, orderNumber, trackingNumber, total, onSuccess }: Props) {
  const stripePromise = getStripePromise();
  if (!stripePromise) return null;

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: APPEARANCE,
        loader: "auto",
      }}
    >
      <StripeInner
        orderNumber={orderNumber}
        trackingNumber={trackingNumber}
        total={total}
        onSuccess={onSuccess}
      />
    </Elements>
  );
}

function StripeInner({
  orderNumber,
  trackingNumber,
  total,
  onSuccess,
}: Omit<Props, "clientSecret">) {
  const stripe = useStripe();
  const elements = useElements();
  const [expressAvailable, setExpressAvailable] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  function returnUrl() {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const params = new URLSearchParams({
      order: orderNumber,
      tracking: trackingNumber,
      total: String(total),
    });
    return `${origin}/confirmation?${params.toString()}`;
  }

  async function handleExpressConfirm(event: StripeExpressCheckoutElementConfirmEvent) {
    if (!stripe || !elements) return;
    setError("");
    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: returnUrl() },
      redirect: "if_required",
    });

    if (confirmError) {
      setError(confirmError.message ?? "Le paiement a échoué.");
      event.paymentFailed({ reason: "fail" });
      return;
    }
    if (paymentIntent?.status === "succeeded") {
      onSuccess();
    }
  }

  async function handleCardSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);
    setError("");

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: returnUrl() },
      redirect: "if_required",
    });

    if (confirmError) {
      setError(confirmError.message ?? "Le paiement a échoué.");
      setProcessing(false);
      return;
    }
    if (paymentIntent?.status === "succeeded") {
      onSuccess();
    } else {
      setProcessing(false);
    }
  }

  return (
    <div className="space-y-5">
      {/* Apple Pay / Google Pay / Link — masqué automatiquement si indisponible */}
      <div className={expressAvailable ? "block" : "hidden"}>
        <ExpressCheckoutElement
          onConfirm={handleExpressConfirm}
          onReady={({ availablePaymentMethods }) => setExpressAvailable(Boolean(availablePaymentMethods))}
          options={{ buttonType: { applePay: "buy", googlePay: "buy" } }}
        />
        <div className="my-4 flex items-center gap-3 text-[11px] uppercase tracking-widest2 text-ink-faint">
          <span className="h-px flex-1 bg-line" />
          ou payer par carte
          <span className="h-px flex-1 bg-line" />
        </div>
      </div>

      <form onSubmit={handleCardSubmit} className="space-y-4">
        <PaymentElement options={{ layout: "tabs" }} />
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>}
        <button type="submit" disabled={!stripe || processing} className="btn-dark w-full">
          {processing ? (
            "Traitement en cours…"
          ) : (
            <>
              <Lock size={15} /> Payer {formatPrice(total)}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
