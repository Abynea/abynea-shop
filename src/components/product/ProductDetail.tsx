"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, Heart, Minus, Package, Plus, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import type { Product } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";
import { StarRating } from "@/components/ui/StarRating";
import { Accordion } from "./Accordion";
import { ProductGallery } from "./ProductGallery";
import { getVariantPrice, getVariantStock, useCart } from "@/store/cart";

export function ProductDetail({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem);

  const colorVariants = useMemo(() => product.variants.filter((v) => v.type === "color"), [product]);
  const modelVariants = useMemo(() => product.variants.filter((v) => v.type === "model"), [product]);

  const [color, setColor] = useState<string | undefined>(
    colorVariants.find((v) => v.stock > 0)?.label ?? colorVariants[0]?.label
  );
  const [model, setModel] = useState<string | undefined>(
    modelVariants.find((v) => v.stock > 0)?.label ?? modelVariants[0]?.label
  );
  const [qty, setQty] = useState(1);
  const [wish, setWish] = useState(false);
  const [added, setAdded] = useState(false);

  const price = getVariantPrice(product, color, model);
  const stock = getVariantStock(product, color, model);
  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round((1 - product.price / product.compareAtPrice) * 100)
      : 0;

  function handleAdd() {
    addItem(product, { color, model, quantity: qty });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="container-x py-6 md:py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-ink-faint">
        <Link href="/" className="hover:text-ink">
          Accueil
        </Link>
        <span>/</span>
        <Link href={`/boutique?categorie=${product.category}`} className="hover:text-ink">
          {product.categoryLabel}
        </Link>
        <span>/</span>
        <span className="truncate text-ink-muted">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        <ProductGallery images={product.images} name={product.name} badge={product.badge} />

        {/* Info */}
        <div className="lg:py-2">
          <p className="text-[11px] uppercase tracking-widest2 text-ink-faint">{product.categoryLabel}</p>
          <h1 className="mt-2 font-serif text-3xl leading-tight text-ink sm:text-4xl">{product.name}</h1>

          <div className="mt-3 flex items-center gap-3">
            <StarRating rating={product.rating} reviews={product.reviews} />
            <span className="text-xs text-ink-faint">·</span>
            <span className="text-xs text-ink-muted">{product.reviews} avis vérifiés</span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-serif text-3xl text-ink">{formatPrice(price)}</span>
            {product.compareAtPrice && (
              <>
                <span className="text-base text-ink-faint line-through">{formatPrice(product.compareAtPrice)}</span>
                <span className="rounded-full bg-gold-soft px-2.5 py-1 text-[11px] font-semibold text-gold-dark">
                  -{discount}%
                </span>
              </>
            )}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-ink-muted">{product.shortDescription}</p>

          {/* Color selector */}
          {colorVariants.length > 0 && (
            <div className="mt-7">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="label mb-0">Couleur</span>
                <span className="text-xs font-medium text-ink">{color}</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {colorVariants.map((v) => {
                  const disabled = v.stock === 0;
                  const selected = color === v.label;
                  return (
                    <button
                      key={v.id}
                      disabled={disabled}
                      onClick={() => {
                        setColor(v.label);
                        setQty(1);
                      }}
                      aria-label={`Couleur ${v.label}`}
                      title={disabled ? `${v.label} — épuisé` : v.label}
                      className={cn(
                        "relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition",
                        selected ? "border-ink" : "border-line hover:border-ink/40",
                        disabled && "cursor-not-allowed opacity-40"
                      )}
                    >
                      <span
                        className="h-6 w-6 rounded-full border border-black/10"
                        style={{ backgroundColor: v.color?.hex }}
                      />
                      {selected && (
                        <Check size={12} className="absolute -right-0.5 -top-0.5 rounded-full bg-ink p-0.5 text-white" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Model selector */}
          {modelVariants.length > 0 && (
            <div className="mt-7">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="label mb-0">Modèle d'iPhone</span>
                <span className="text-xs font-medium text-ink">{model}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {modelVariants.map((v) => {
                  const disabled = v.stock === 0;
                  const selected = model === v.label;
                  return (
                    <button
                      key={v.id}
                      disabled={disabled}
                      onClick={() => {
                        setModel(v.label);
                        setQty(1);
                      }}
                      className={cn(
                        "relative rounded-lg border px-3 py-2.5 text-xs font-medium transition",
                        selected
                          ? "border-ink bg-ink text-white"
                          : "border-line text-ink-soft hover:border-ink/40",
                        disabled && "cursor-not-allowed text-ink-faint line-through opacity-60 hover:border-line"
                      )}
                    >
                      {v.label}
                      {v.priceDelta ? <span className="ml-1 opacity-70">+{formatPrice(v.priceDelta)}</span> : null}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Stock */}
          <div className="mt-6">
            {stock === 0 ? (
              <p className="text-sm font-medium text-red-500">Rupture de stock — réapprovisionnement en cours</p>
            ) : stock <= 5 ? (
              <p className="flex items-center gap-2 text-sm font-medium text-gold-dark">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
                </span>
                Plus que {stock} en stock ! Commandez vite.
              </p>
            ) : (
              <p className="flex items-center gap-2 text-sm font-medium text-emerald-600">
                <Check size={15} /> En stock — expédié sous 24/48h
              </p>
            )}
          </div>

          {/* Quantity + Add */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center justify-between rounded-lg border border-line sm:w-36">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
                aria-label="Diminuer"
                className="px-4 py-3 text-ink-muted transition hover:text-ink disabled:opacity-30"
              >
                <Minus size={16} />
              </button>
              <span className="text-sm font-medium">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(stock, q + 1))}
                disabled={qty >= stock}
                aria-label="Augmenter"
                className="px-4 py-3 text-ink-muted transition hover:text-ink disabled:opacity-30"
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              onClick={handleAdd}
              disabled={stock === 0}
              className={cn("flex-1", added ? "btn-gold" : "btn-dark")}
            >
              {added ? (
                <>
                  <Check size={17} /> Ajouté au panier
                </>
              ) : stock === 0 ? (
                "Indisponible"
              ) : (
                `Ajouter au panier · ${formatPrice(price * qty)}`
              )}
            </button>

            <button
              onClick={() => setWish((w) => !w)}
              aria-label="Ajouter aux favoris"
              className={cn(
                "flex items-center justify-center rounded-lg border px-4 py-3 transition",
                wish ? "border-gold bg-gold-soft text-gold-dark" : "border-line text-ink-muted hover:border-ink/40"
              )}
            >
              <Heart size={18} className={cn(wish && "fill-gold text-gold")} />
            </button>
          </div>

          {/* Micro reassurance */}
          <div className="mt-6 grid grid-cols-2 gap-3 rounded-xl bg-sand/70 p-4 text-xs text-ink-soft">
            <span className="flex items-center gap-2">
              <Truck size={15} className="text-gold-dark" /> Livraison offerte dès 35 €
            </span>
            <span className="flex items-center gap-2">
              <RotateCcw size={15} className="text-gold-dark" /> Retours 14 jours
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-gold-dark" /> Paiement sécurisé
            </span>
            <span className="flex items-center gap-2">
              <Package size={15} className="text-gold-dark" /> Expédition 24/48h
            </span>
          </div>

          {/* Accordions */}
          <div className="mt-8">
            <Accordion
              items={[
                { title: "Description & Matériaux", content: `${product.description}\n\n${product.materials}` },
                { title: "Conseils d'entretien", content: product.care },
                {
                  title: "Livraison & Retours",
                  content:
                    "Expédition sous 24/48h depuis la France. Livraison offerte dès 35 € d'achat. Vous disposez de 14 jours après réception pour nous retourner votre article et obtenir un remboursement intégral.",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
