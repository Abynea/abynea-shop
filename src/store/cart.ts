"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product, ProductVariant } from "@/lib/types";
import { getProductById } from "@/data/products";

type AddOptions = {
  color?: string;
  model?: string;
  quantity?: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  /** Code promo appliqué (démo) */
  promo: string | null;
  lastAdded: string | null;
  // Actions
  open: () => void;
  close: () => void;
  toggle: () => void;
  addItem: (product: Product, options?: AddOptions) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clear: () => void;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  // Selectors
  totalItems: () => number;
  subtotal: () => number;
  discount: () => number;
  total: (shipping?: number) => number;
};

const PROMO_CODES: Record<string, number> = {
  ABYNEA10: 0.1,
  WELCOME10: 0.1,
  TIKTOK15: 0.15,
};

function buildKey(productId: string, color?: string, model?: string) {
  return [productId, color ?? "", model ?? ""].join("__");
}

/** Détermine la variante à utiliser par défaut pour un produit */
export function getDefaultVariant(product: Product): ProductVariant | undefined {
  if (!product.variants?.length) return undefined;
  return product.variants.find((v) => v.stock > 0) ?? product.variants[0];
}

/** Stock disponible pour une combinaison couleur + modèle */
export function getVariantStock(product: Product, color?: string, model?: string) {
  const byColor = color
    ? product.variants.find((v) => v.type === "color" && v.label === color)
    : undefined;
  const byModel = model
    ? product.variants.find((v) => v.type === "model" && v.label === model)
    : undefined;
  if (byColor && byModel) return Math.min(byColor.stock, byModel.stock);
  return (byColor ?? byModel)?.stock ?? 0;
}

/** Prix final d'un produit selon ses variantes sélectionnées */
export function getVariantPrice(product: Product, color?: string, model?: string) {
  let price = product.price;
  const byColor = color ? product.variants.find((v) => v.type === "color" && v.label === color) : undefined;
  const byModel = model ? product.variants.find((v) => v.type === "model" && v.label === model) : undefined;
  if (byColor?.priceDelta) price += byColor.priceDelta;
  if (byModel?.priceDelta) price += byModel.priceDelta;
  return Math.round(price * 100) / 100;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      promo: null,
      lastAdded: null,

      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),

      addItem: (product, options = {}) => {
        const { color, model, quantity = 1 } = options;
        const key = buildKey(product.id, color, model);
        const stock = getVariantStock(product, color, model);
        const price = getVariantPrice(product, color, model);

        set((state) => {
          const existing = state.items.find((i) => i.key === key);
          let items: CartItem[];
          if (existing) {
            items = state.items.map((i) =>
              i.key === key
                ? { ...i, quantity: Math.min(i.quantity + quantity, Math.max(stock, 1)) }
                : i
            );
          } else {
            items = [
              ...state.items,
              {
                key,
                productId: product.id,
                slug: product.slug,
                name: product.name,
                image: product.images[0],
                price,
                quantity: Math.min(quantity, Math.max(stock, 1)),
                color,
                model,
                stock,
              },
            ];
          }
          return { items, isOpen: true, lastAdded: key };
        });
      },

      removeItem: (key) => set((s) => ({ items: s.items.filter((i) => i.key !== key) })),

      updateQuantity: (key, quantity) =>
        set((s) => ({
          items: s.items
            .map((i) => (i.key === key ? { ...i, quantity: Math.max(1, Math.min(quantity, i.stock)) } : i))
            .filter((i) => i.quantity > 0),
        })),

      clear: () => set({ items: [], promo: null, lastAdded: null }),

      applyPromo: (code) => {
        const normalized = code.trim().toUpperCase();
        if (PROMO_CODES[normalized]) {
          set({ promo: normalized });
          return true;
        }
        return false;
      },

      removePromo: () => set({ promo: null }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      discount: () => {
        const code = get().promo;
        if (!code || !PROMO_CODES[code]) return 0;
        return Math.round(get().subtotal() * PROMO_CODES[code] * 100) / 100;
      },
      total: (shipping = 0) => Math.max(0, get().subtotal() - get().discount() + shipping),
    }),
    {
      name: "abynea-cart",
      partialize: (state) => ({ items: state.items, promo: state.promo }),
    }
  )
);

/** Résout le produit complet d'un item du panier (utilisé côté UI) */
export function resolveItemProduct(item: CartItem): Product | undefined {
  return getProductById(item.productId);
}
