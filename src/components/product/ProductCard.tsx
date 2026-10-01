"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Check } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";
import { StarRating } from "@/components/ui/StarRating";
import { useCart, getDefaultVariant } from "@/store/cart";

type Props = {
  product: Product;
  className?: string;
  priority?: boolean;
  index?: number;
};

export function ProductCard({ product, className, priority, index = 0 }: Props) {
  const addItem = useCart((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const hoverImage = product.images[1] ?? product.images[0];
  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round((1 - product.price / product.compareAtPrice) * 100)
      : 0;

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const variant = getDefaultVariant(product);
    addItem(product, {
      color: variant?.type === "color" ? variant.label : undefined,
      model: variant?.type === "model" ? variant.label : undefined,
      quantity: 1,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
      className={cn("group", className)}
    >
      <Link href={`/produit/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
          />
          <Image
            src={hoverImage}
            alt={`${product.name} — vue alternative`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
          />

          {product.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-ivory/95 px-3 py-1 text-[10px] font-medium uppercase tracking-widest2 text-ink shadow-sm backdrop-blur">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="absolute right-3 top-3 rounded-full bg-ink px-2.5 py-1 text-[10px] font-semibold text-white">
              -{discount}%
            </span>
          )}

          <button
            type="button"
            onClick={handleQuickAdd}
            aria-label={`Ajouter ${product.name} au panier`}
            className={cn(
              "absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-medium tracking-wide backdrop-blur transition-all duration-300 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100",
              added ? "bg-gold text-ink" : "bg-ink/90 text-white hover:bg-ink"
            )}
          >
            {added ? (
              <>
                <Check size={14} /> Ajouté
              </>
            ) : (
              <>
                <Plus size={14} /> Ajout rapide
              </>
            )}
          </button>
        </div>

        <div className="mt-3 space-y-1.5">
          <p className="text-[10px] uppercase tracking-widest2 text-ink-faint">{product.categoryLabel}</p>
          <h3 className="font-serif text-base leading-snug text-ink transition-colors group-hover:text-gold-dark">
            {product.name}
          </h3>
          <StarRating rating={product.rating} reviews={product.reviews} size={13} />
          <div className="flex items-baseline gap-2 pt-0.5">
            <span className="text-sm font-semibold text-ink">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-xs text-ink-faint line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
