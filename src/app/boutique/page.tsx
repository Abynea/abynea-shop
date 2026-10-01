import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopClient } from "@/components/product/ShopClient";

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "Découvrez tous les bijoux en acier inoxydable waterproof, coques MagSafe et accessoires ABYNÉA. Filtrez par catégorie, couleur, prix et modèle d'iPhone.",
};

function ShopSkeleton() {
  return (
    <div className="container-x py-12">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[4/5] rounded-2xl bg-sand" />
            <div className="mt-3 h-3 w-2/3 rounded bg-sand" />
            <div className="mt-2 h-3 w-1/3 rounded bg-sand" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BoutiquePage() {
  return (
    <Suspense fallback={<ShopSkeleton />}>
      <ShopClient />
    </Suspense>
  );
}
