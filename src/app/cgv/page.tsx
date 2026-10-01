import type { Metadata } from "next";
import { InfoPage } from "@/components/layout/InfoPage";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente",
  description: "Conditions générales de vente ABYNÉA.",
};

export default function CGVPage() {
  return (
    <InfoPage
      eyebrow="Informations légales"
      title="Conditions Générales de Vente"
      intro="Les présentes conditions régissent les ventes réalisées sur le site ABYNÉA."
      sections={[
        {
          heading: "1. Objet",
          body: [
            "Les présentes Conditions Générales de Vente (CGV) définissent les droits et obligations des parties dans le cadre de la vente en ligne de produits proposés par ABYNÉA.",
          ],
        },
        {
          heading: "2. Prix",
          body: [
            "Les prix sont indiqués en euros, toutes taxes comprises (TTC), hors frais de livraison. ABYNÉA se réserve le droit de modifier ses prix à tout moment, les produits étant facturés sur la base des tarifs en vigueur au moment de la validation de la commande.",
          ],
        },
        {
          heading: "3. Commande",
          body: [
            "La validation de la commande vaut acceptation des présentes CGV. Un email de confirmation récapitulant la commande est adressé au client.",
          ],
        },
        {
          heading: "4. Paiement",
          body: [
            "Le paiement s'effectue en ligne par carte bancaire via la solution sécurisée Stripe. Les données bancaires ne sont jamais stockées sur nos serveurs.",
          ],
        },
        {
          heading: "5. Droit de rétractation",
          body: [
            "Conformément à la réglementation, le client dispose d'un délai de 14 jours à compter de la réception pour exercer son droit de rétractation, sans justification.",
          ],
        },
        {
          heading: "6. Litiges",
          body: [
            "En cas de litige, une solution amiable sera recherchée en priorité. À défaut, les tribunaux français seront seuls compétents.",
          ],
        },
      ]}
    />
  );
}
