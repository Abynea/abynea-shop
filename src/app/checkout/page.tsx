import type { Metadata } from "next";
import { CheckoutClient } from "@/components/cart/CheckoutClient";

export const metadata: Metadata = {
  title: "Commande",
  description: "Finalisez votre commande ABYNÉA en toute sécurité.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
