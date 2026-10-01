"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import {
  products,
  getColorsByCategory,
  getAllModels,
  getPriceRange,
} from "@/data/products";
import { CATEGORY_LABELS } from "@/lib/constants";
import { cn, formatPrice } from "@/lib/utils";
import { ProductCard } from "@/components/product/ProductCard";

type SortKey = "featured" | "price-asc" | "price-desc" | "newest" | "rating";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Recommandés" },
  { value: "newest", label: "Nouveautés" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "rating", label: "Mieux notés" },
];

const CATEGORIES = ["bijoux", "coques", "sacs"] as const;
const PRICE = getPriceRange();

export function ShopClient() {
  const params = useSearchParams();

  const [category, setCategory] = useState<string>(params.get("categorie") ?? "");
  const [sort, setSort] = useState<SortKey>((params.get("tri") as SortKey) || "featured");
  const [maxPrice, setMaxPrice] = useState(PRICE.max);
  const [colors, setColors] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [mobileFilters, setMobileFilters] = useState(false);

  useEffect(() => {
    setCategory(params.get("categorie") ?? "");
    const tri = params.get("tri");
    if (tri) setSort(tri as SortKey);
  }, [params]);

  const availableColors = useMemo(() => getColorsByCategory(category || undefined), [category]);
  const availableModels = useMemo(() => getAllModels(), []);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (category && p.category !== category) return false;
      if (p.price > maxPrice) return false;
      if (colors.length && !p.colors?.some((c) => colors.includes(c.name))) return false;
      if (models.length && !p.models?.some((m) => models.includes(m))) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list = [...list].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        list = [...list].sort((a, b) => Number(!!b.isBestSeller) - Number(!!a.isBestSeller));
    }
    return list;
  }, [category, sort, maxPrice, colors, models]);

  const activeFilters =
    (category ? 1 : 0) + (colors.length ? 1 : 0) + (models.length ? 1 : 0) + (maxPrice < PRICE.max ? 1 : 0);

  function toggleColor(name: string) {
    setColors((prev) => (prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]));
  }
  function toggleModel(name: string) {
    setModels((prev) => (prev.includes(name) ? prev.filter((m) => m !== name) : [...prev, name]));
  }
  function resetAll() {
    setCategory("");
    setColors([]);
    setModels([]);
    setMaxPrice(PRICE.max);
    setSort("featured");
  }

  const FilterPanel = (
    <div className="space-y-7">
      <div>
        <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest2 text-ink">Catégorie</h3>
        <div className="space-y-1.5">
          <button
            onClick={() => setCategory("")}
            className={cn(
              "block w-full rounded-lg px-3 py-2 text-left text-sm transition",
              !category ? "bg-sand font-medium text-ink" : "text-ink-muted hover:bg-sand/60"
            )}
          >
            Toutes les catégories
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "block w-full rounded-lg px-3 py-2 text-left text-sm transition",
                category === c ? "bg-sand font-medium text-ink" : "text-ink-muted hover:bg-sand/60"
              )}
            >
              {CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest2 text-ink">Prix maximum</h3>
        <input
          type="range"
          min={PRICE.min}
          max={PRICE.max}
          step={1}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-gold"
          aria-label="Prix maximum"
        />
        <div className="mt-1.5 flex justify-between text-xs text-ink-muted">
          <span>{formatPrice(PRICE.min)}</span>
          <span className="font-medium text-ink">Jusqu'à {formatPrice(maxPrice)}</span>
        </div>
      </div>

      {availableColors.length > 0 && (
        <div>
          <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest2 text-ink">Couleur</h3>
          <div className="flex flex-wrap gap-2">
            {availableColors.map((c) => (
              <button
                key={c.name}
                onClick={() => toggleColor(c.name)}
                aria-label={`Filtrer par ${c.name}`}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition",
                  colors.includes(c.name)
                    ? "border-ink bg-ink text-white"
                    : "border-line text-ink-muted hover:border-ink/40"
                )}
              >
                <span
                  className="h-3.5 w-3.5 rounded-full border border-black/10"
                  style={{ backgroundColor: c.hex }}
                />
                {c.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {category !== "bijoux" && category !== "sacs" && (
        <div>
          <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest2 text-ink">Modèle iPhone</h3>
          <div className="flex flex-wrap gap-2">
            {availableModels.map((m) => (
              <button
                key={m}
                onClick={() => toggleModel(m)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs transition",
                  models.includes(m)
                    ? "border-ink bg-ink text-white"
                    : "border-line text-ink-muted hover:border-ink/40"
                )}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeFilters > 0 && (
        <button onClick={resetAll} className="text-xs font-medium text-gold-dark underline-offset-2 hover:underline">
          Réinitialiser les filtres ({activeFilters})
        </button>
      )}
    </div>
  );

  return (
    <div className="container-x py-8 md:py-12">
      <header className="mb-8">
        <p className="eyebrow">Boutique</p>
        <h1 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">
          {category ? CATEGORY_LABELS[category] : "Tous nos produits"}
        </h1>
        <p className="mt-2 text-sm text-ink-muted">
          {filtered.length} {filtered.length > 1 ? "articles" : "article"}
          {category && ` dans ${CATEGORY_LABELS[category]}`}
        </p>
      </header>

      <div className="flex gap-8">
        {/* Sidebar desktop */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-24">{FilterPanel}</div>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1">
          <div className="mb-5 flex items-center justify-between gap-3">
            <button
              onClick={() => setMobileFilters(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm text-ink lg:hidden"
            >
              <SlidersHorizontal size={15} /> Filtres
              {activeFilters > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-ink">
                  {activeFilters}
                </span>
              )}
            </button>

            <div className="ml-auto flex items-center gap-2">
              <label htmlFor="sort" className="hidden text-xs text-ink-muted sm:block">
                Trier par
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-lg border border-line bg-ivory px-3 py-2.5 text-sm text-ink focus:border-gold focus:outline-none"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line py-20 text-center">
              <p className="font-serif text-lg text-ink">Aucun produit ne correspond</p>
              <p className="mt-1 text-sm text-ink-muted">Essayez d'élargir vos filtres.</p>
              <button onClick={resetAll} className="btn-outline mt-5">
                Réinitialiser
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} priority={i < 3} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filters */}
      {mobileFilters && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setMobileFilters(false)} />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-ivory p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-xl">Filtres</h2>
              <button onClick={() => setMobileFilters(false)} aria-label="Fermer">
                <X size={22} />
              </button>
            </div>
            {FilterPanel}
            <button onClick={() => setMobileFilters(false)} className="btn-dark mt-6 w-full">
              Voir les {filtered.length} résultats
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
