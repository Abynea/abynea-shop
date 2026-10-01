import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/layout/FaqList";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Réponses aux questions fréquentes sur les bijoux waterproof, coques MagSafe, livraison et paiement ABYNÉA.",
};

export default function FaqPage() {
  return (
    <div className="container-x max-w-3xl py-12 md:py-16">
      <p className="eyebrow">Aide</p>
      <h1 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">Questions fréquentes</h1>
      <p className="mt-4 text-sm text-ink-muted">
        Tout ce qu'il faut savoir sur nos bijoux, nos coques, la livraison et le paiement.
      </p>

      <div className="mt-10">
        <FaqList />
      </div>

      <div className="mt-12 rounded-2xl bg-sand p-6 text-center">
        <p className="font-serif text-lg text-ink">Vous ne trouvez pas votre réponse ?</p>
        <p className="mt-1 text-sm text-ink-muted">Notre service client vous répond sous 24h ouvrées.</p>
        <Link href="/contact" className="btn-dark mt-4">
          Nous contacter
        </Link>
      </div>
    </div>
  );
}
