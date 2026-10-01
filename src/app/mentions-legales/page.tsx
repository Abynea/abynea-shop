import type { Metadata } from "next";
import { InfoPage } from "@/components/layout/InfoPage";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description: "Mentions légales du site ABYNÉA.",
};

export default function MentionsLegalesPage() {
  return (
    <InfoPage
      eyebrow="Informations légales"
      title="Mentions Légales"
      sections={[
        {
          heading: "Éditeur du site",
          body: [
            "ABYNÉA — SAS au capital de 10 000 €. Siège social : 12 rue de la Paix, 75002 Paris, France.",
            "RCS Paris — SIRET : 000 000 000 00000. TVA intracommunautaire : FR00000000000.",
            "Directeur de la publication : la direction d'ABYNÉA. Contact : bonjour@abynea.fr.",
          ],
        },
        {
          heading: "Hébergement",
          body: ["Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis."],
        },
        {
          heading: "Propriété intellectuelle",
          body: [
            "L'ensemble des éléments du site (textes, images, logos, marques) est protégé par le droit de la propriété intellectuelle et demeure la propriété exclusive d'ABYNÉA.",
            "Toute reproduction, même partielle, est interdite sans autorisation écrite préalable.",
          ],
        },
        {
          heading: "Données personnelles",
          body: [
            "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour l'exercer, écrivez-nous à bonjour@abynea.fr.",
            "Les données collectées lors de la commande sont utilisées uniquement pour le traitement de celle-ci et ne sont jamais revendues.",
          ],
        },
      ]}
    />
  );
}
