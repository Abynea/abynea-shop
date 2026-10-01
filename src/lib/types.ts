export type Category = "bijoux" | "coques" | "sacs";

export type ColorOption = {
  name: string;
  hex: string;
};

export type ProductVariant = {
  /** Identifiant unique de la variante, ex: "or" ou "iphone-15" */
  id: string;
  /** Libellé affiché, ex: "Or", "iPhone 15 Pro" */
  label: string;
  /** Type d'axe de déclinaison */
  type: "color" | "model";
  /** Couleur associée (si type = color) */
  color?: ColorOption;
  /** Impact sur le prix (0 = pas de changement) */
  priceDelta?: number;
  /** Stock disponible pour cette variante */
  stock: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  categoryLabel: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviews: number;
  /** Badge marketing: "Best-seller", "Nouveau", "Édition limitée" */
  badge?: string;
  shortDescription: string;
  description: string;
  materials: string;
  care: string;
  images: string[];
  colors?: ColorOption[];
  models?: string[];
  variants: ProductVariant[];
  tags: string[];
  isBestSeller?: boolean;
  isNew?: boolean;
  createdAt: string;
};

export type CartItem = {
  /** Clé unique = productId + variantes sélectionnées */
  key: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  color?: string;
  model?: string;
  stock: number;
};

export type ShippingMethod = {
  id: string;
  name: string;
  carrier: string;
  price: number;
  eta: string;
  description: string;
};
