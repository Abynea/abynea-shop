import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Heart, Leaf, Sparkles, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Notre Histoire",
  description:
    "ABYNÉA, la marque française d'accessoires et bijoux en acier inoxydable waterproof, née sur les réseaux sociaux.",
};

const VALUES = [
  {
    icon: Sparkles,
    title: "Qualité accessible",
    text: "Des matériaux nobles — acier inoxydable 316L, plaqué or 18 carats — à des prix pensés pour être portés au quotidien.",
  },
  {
    icon: Heart,
    title: "Design pensé pour durer",
    text: "Chaque pièce est imaginée pour traverser les saisons, loin des tendances éphémères.",
  },
  {
    icon: Leaf,
    title: "Emballage responsable",
    text: "Pochettes réutilisables, cartons recyclés et expéditions groupées pour réduire notre empreinte.",
  },
  {
    icon: Users,
    title: "Une communauté",
    text: "Plus de 12 000 clientes nous font confiance. Vos retours façonnent chaque nouvelle collection.",
  },
];

export default function NotreHistoirePage() {
  return (
    <div className="pb-16">
      <section className="container-x pt-12 text-center md:pt-16">
        <p className="eyebrow">Notre Histoire</p>
        <h1 className="mx-auto mt-3 max-w-2xl font-serif text-3xl text-ink text-balance sm:text-5xl">
          Des accessoires pensés pour sublimer le quotidien
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ink-muted">
          ABYNÉA est née d'une envie simple : créer des pièces élégantes, durables et accessibles, que l'on porte
          sans y penser — à la plage, au bureau, en soirée. Le chic sans compromis.
        </p>
      </section>

      <section className="container-x mt-12">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80"
              alt="Univers ABYNÉA"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80"
              alt="Bijoux ABYNÉA portés"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container-x mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map((v) => {
          const Icon = v.icon;
          return (
            <div key={v.title} className="card-surface p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-soft text-gold-dark">
                <Icon size={20} strokeWidth={1.6} />
              </span>
              <h2 className="mt-4 font-serif text-lg text-ink">{v.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{v.text}</p>
            </div>
          );
        })}
      </section>

      <section className="container-x mt-16 text-center">
        <h2 className="font-serif text-2xl text-ink sm:text-3xl">Prête à adopter l'essentiel ?</h2>
        <Link href="/boutique" className="btn-gold mt-6">
          Découvrir la collection
        </Link>
      </section>
    </div>
  );
}
