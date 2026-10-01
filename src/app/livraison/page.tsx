import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/layout/InfoPage";

export const metadata: Metadata = {
  title: "Livraison & Retours",
  description: "Délais, transporteurs, frais de port et politique de retour ABYNÉA.",
};

export default function LivraisonPage() {
  return (
    <InfoPage
      eyebrow="Aide"
      title="Livraison & Retours"
      intro="Nous expédions toutes les commandes depuis la France, sous 24/48h ouvrées. Livraison offerte dès 35 € d'achat."
      sections={[
        {
          heading: "Délais d'expédition",
          body: [
            "Votre commande est préparée et expédiée sous 24/48h ouvrées après validation du paiement. Vous recevez un email avec votre numéro de suivi dès la prise en charge par le transporteur.",
          ],
        },
        {
          heading: "Modes et frais de livraison",
          body: [
            "Lettre suivie (La Poste) : 3,90 € — livraison en 3 à 5 jours ouvrés en boîte aux lettres.",
            "Colissimo Domicile (La Poste) : 5,90 € — livraison en 2 à 3 jours ouvrés, remise en main propre.",
            "Point Relais (Mondial Relay) : 3,50 € — livraison en 3 à 6 jours ouvrés en point relais.",
            "La livraison est offerte dès 35 € d'achat, quel que soit le mode choisi.",
          ],
        },
        {
          heading: "Retours sous 14 jours",
          body: [
            "Vous disposez de 14 jours à compter de la réception pour nous retourner un article et demander un remboursement intégral, sans avoir à vous justifier.",
            "Les articles doivent être retournés non portés, dans leur emballage d'origine. Les frais de retour sont à votre charge, sauf en cas d'erreur de notre part.",
            "Le remboursement est effectué sous 5 à 10 jours ouvrés après réception du retour, sur le moyen de paiement d'origine.",
          ],
        },
        {
          heading: "Une question sur votre commande ?",
          body: ["Contactez-nous à bonjour@abynea.fr en précisant votre numéro de commande, nous vous répondons sous 24h."],
        },
      ]}
    />
  );
}
