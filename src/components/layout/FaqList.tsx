"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQ = [
  {
    q: "Les bijoux ABYNÉA sont-ils vraiment waterproof ?",
    a: "Oui. Tous nos bijoux sont fabriqués en acier inoxydable 316L, un matériau qui ne rouille pas et ne noircit pas au contact de l'eau. Vous pouvez les porter sous la douche, à la mer ou au sport sans crainte.",
  },
  {
    q: "Les bijoux conviennent-ils aux peaux sensibles ?",
    a: "Absolument. Nos pièces sont sans nickel ni plomb, hypoallergéniques et conçues pour ne pas irriter la peau, même portées en continu.",
  },
  {
    q: "Quels sont les délais de livraison ?",
    a: "Nous expédions sous 24/48h ouvrées. La livraison prend ensuite 2 à 3 jours en Colissimo, 3 à 5 jours en lettre suivie et 3 à 6 jours en point relais. La livraison est offerte dès 35 € d'achat.",
  },
  {
    q: "Comment choisir la taille de mon collier ou bracelet ?",
    a: "Nos colliers disposent d'une extension de 5 cm pour s'adapter à toutes les morphologies. Les joncs sont ajustables. En cas de doute, indiquez-nous votre tour de poignet ou de cou, nous vous conseillons avec plaisir.",
  },
  {
    q: "Puis-je échanger ma coque si je me trompe de modèle ?",
    a: "Oui, sous 14 jours après réception, si la coque n'a pas été utilisée. Contactez-nous à bonjour@abynea.fr pour organiser l'échange.",
  },
  {
    q: "Le paiement est-il sécurisé ?",
    a: "Toutes les transactions sont traitées par Stripe, leader mondial du paiement en ligne. Vos données bancaires sont chiffrées et ne transitent jamais par nos serveurs.",
  },
  {
    q: "Comment suivre ma commande ?",
    a: "Dès l'expédition, vous recevez un email contenant votre numéro de suivi. Vous pouvez également le retrouver depuis la page « Suivre ma commande » de votre compte.",
  },
];

export function FaqList() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {FAQ.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-serif text-[15px] text-ink sm:text-base">{item.q}</span>
              <ChevronDown
                size={18}
                className={cn("shrink-0 text-ink-muted transition-transform duration-300", isOpen && "rotate-180")}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="text-sm leading-relaxed text-ink-muted">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
