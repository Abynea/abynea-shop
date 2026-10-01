import type { Metadata } from "next";
import { ContactClient } from "@/components/layout/ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez l'équipe ABYNÉA pour toute question sur vos commandes, produits ou retours.",
};

export default function ContactPage() {
  return <ContactClient />;
}
