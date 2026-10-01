import { Suspense } from "react";
import type { Metadata } from "next";
import { ConfirmationClient } from "@/components/cart/ConfirmationClient";

export const metadata: Metadata = {
  title: "Commande confirmée",
  robots: { index: false, follow: false },
};

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="container-x py-24 text-center text-ink-muted">Chargement…</div>}>
      <ConfirmationClient />
    </Suspense>
  );
}
