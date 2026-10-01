import type { Metadata } from "next";
import { InfoPage } from "@/components/layout/InfoPage";

export const metadata: Metadata = {
  title: "Politique de retour",
  description: "Comment retourner un article ABYNÉA et obtenir un remboursement.",
};

export default function PolitiqueRetourPage() {
  return (
    <InfoPage
      eyebrow="Informations"
      title="Politique de retour"
      intro="Votre satisfaction est notre priorité. Si un article ne vous convient pas, vous pouvez le retourner sous 14 jours."
      sections={[
        {
          heading: "Conditions d'éligibilité",
          body: [
            "L'article doit être non porté, non lavé et dans son état d'origine, avec son emballage et ses éventuels accessoires.",
            "Le retour doit être initié dans les 14 jours suivant la réception de votre commande.",
          ],
        },
        {
          heading: "Comment procéder",
          body: [
            "1. Écrivez-nous à bonjour@abynea.fr avec votre numéro de commande et le motif du retour.",
            "2. Nous vous transmettons les instructions et l'adresse de retour sous 24h.",
            "3. Renvoyez le colis avec un numéro de suivi et communiquez-nous ce numéro.",
          ],
        },
        {
          heading: "Remboursement",
          body: [
            "Dès réception et vérification de l'article, nous procédons au remboursement intégral sous 5 à 10 jours ouvrés sur votre moyen de paiement d'origine.",
          ],
        },
        {
          heading: "Article défectueux",
          body: [
            "Si vous recevez un article endommagé ou erroné, contactez-nous dans les 48h : nous prenons en charge les frais de retour et procédons à un échange ou un remboursement immédiat.",
          ],
        },
      ]}
    />
  );
}
