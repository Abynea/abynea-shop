import type { Product } from "@/lib/types";

const U = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const products: Product[] = [
  {
    id: "p-01",
    slug: "creoles-dorees-nova",
    name: "Créoles Dorées « Nova »",
    category: "bijoux",
    categoryLabel: "Bijoux Inox",
    price: 24.9,
    compareAtPrice: 34.9,
    rating: 4.9,
    reviews: 412,
    badge: "Best-seller",
    isBestSeller: true,
    shortDescription:
      "Créoles minimalistes en acier inoxydable 316L, finition dorée 18 carats, waterproof et hypoallergéniques.",
    description:
      "Les créoles « Nova » réinventent l'essentiel : un anneau fin, épuré, qui capte la lumière sans jamais s'oxyder. Façonnées en acier inoxydable 316L et plaquées or 18 carats, elles résistent à l'eau, à la transpiration et au temps. Portez-les au quotidien, à la plage comme au bureau — leur éclat ne bouge pas.",
    materials:
      "Acier inoxydable 316L, plaqué or 18 carats (PVD). Sans nickel ni plomb. Fermoir à clip sécurisé.",
    care:
      "Rincez à l'eau claire après contact avec l'eau de mer ou les cosmétiques. Séchez avec un chiffon doux. Évitez les parfums directs.",
    images: [
      U("1611591437281-460bfbe1220a"),
      U("1515562141207-7a88fb7ce338"),
      U("1602751584552-8ba73aad10e1"),
      U("1535632066927-ab7c9ab60908"),
    ],
    colors: [
      { name: "Or", hex: "#D4AF37" },
      { name: "Argent", hex: "#C7CCD1" },
    ],
    variants: [
      { id: "or", label: "Or", type: "color", color: { name: "Or", hex: "#D4AF37" }, priceDelta: 0, stock: 34 },
      { id: "argent", label: "Argent", type: "color", color: { name: "Argent", hex: "#C7CCD1" }, priceDelta: 0, stock: 3 },
    ],
    tags: ["créoles", "or", "waterproof", "minimaliste"],
    isNew: false,
    createdAt: "2024-09-02",
  },
  {
    id: "p-02",
    slug: "collier-maille-fine-luna",
    name: "Collier Maille Fine « Luna »",
    category: "bijoux",
    categoryLabel: "Bijoux Inox",
    price: 29.9,
    compareAtPrice: 39.9,
    rating: 4.8,
    reviews: 356,
    badge: "Best-seller",
    isBestSeller: true,
    shortDescription:
      "Collier maille serpentine avec pendentif lune, acier inoxydable waterproof, à porter seul ou en superposition.",
    description:
      "Le collier « Luna » joue la carte du raffinement discret. Sa maille serpentine tombe parfaitement sur la clavicule et son pendentif lune ajoute une touche céleste. Acier inoxydable waterproof : douche, sport, mer — il ne noircit jamais. Le layering idéal avec vos autres chaînes ABYNÉA.",
    materials: "Acier inoxydable 316L, plaqué or 18 carats. Chaîne 40 cm + extension 5 cm. Pendentif 12 mm.",
    care: "Conservez dans la pochette ABYNÉA. Nettoyez avec un chiffon microfibre. Évitez le contact avec les parfums.",
    images: [
      U("1599643478518-a784e5dc4c8f"),
      U("1611085583191-a3b181a88401"),
      U("1515562141207-7a88fb7ce338"),
    ],
    colors: [
      { name: "Or", hex: "#D4AF37" },
      { name: "Argent", hex: "#C7CCD1" },
    ],
    variants: [
      { id: "or", label: "Or", type: "color", color: { name: "Or", hex: "#D4AF37" }, priceDelta: 0, stock: 41 },
      { id: "argent", label: "Argent", type: "color", color: { name: "Argent", hex: "#C7CCD1" }, priceDelta: 0, stock: 27 },
    ],
    tags: ["collier", "lune", "layering", "waterproof"],
    createdAt: "2024-08-21",
  },
  {
    id: "p-03",
    slug: "bracelet-jonc-grave-aura",
    name: "Bracelet Jonc Gravé « Aura »",
    category: "bijoux",
    categoryLabel: "Bijoux Inox",
    price: 27.9,
    rating: 4.9,
    reviews: 289,
    isBestSeller: true,
    shortDescription:
      "Jonc épuré et ajustable, finition satinée, à graver selon vos envies. Acier inoxydable waterproof.",
    description:
      "Le jonc « Aura » se glisse au poignet avec une élégance naturelle. Sa forme ouverte s'ajuste à tous les poignets et sa finition satinée capte la lumière avec douceur. Personnalisez-le d'une gravure pour en faire un cadeau inoubliable.",
    materials: "Acier inoxydable 316L satiné. Diamètre ajustable 55–65 mm. Largeur 3 mm.",
    care: "Évitez les chocs. Nettoyez à l'eau tiède savonneuse puis séchez.",
    images: [
      U("1601784551446-20c9e07cdbdb"),
      U("1573408301185-9146fe634ad0"),
      U("1602751584552-8ba73aad10e1"),
    ],
    colors: [
      { name: "Or", hex: "#D4AF37" },
      { name: "Argent", hex: "#C7CCD1" },
    ],
    variants: [
      { id: "or", label: "Or", type: "color", color: { name: "Or", hex: "#D4AF37" }, priceDelta: 0, stock: 22 },
      { id: "argent", label: "Argent", type: "color", color: { name: "Argent", hex: "#C7CCD1" }, priceDelta: 0, stock: 18 },
    ],
    tags: ["bracelet", "jonc", "gravure", "cadeau"],
    createdAt: "2024-07-14",
  },
  {
    id: "p-04",
    slug: "bague-fine-zircon-eclat",
    name: "Bague Fine Zircon « Éclat »",
    category: "bijoux",
    categoryLabel: "Bijoux Inox",
    price: 19.9,
    compareAtPrice: 26.9,
    rating: 4.7,
    reviews: 198,
    badge: "Nouveau",
    isNew: true,
    shortDescription:
      "Bague fine sertie d'un zircon taille brillant, effet solitaire, acier inoxydable waterproof.",
    description:
      "« Éclat » est la bague qui fait toute la différence. Son zircon taille brillant renvoie la lumière comme un véritable diamant, sur un anneau fin en acier inoxydable. Empilable, mixable, elle sublime aussi bien une tenue de jour qu'une soirée.",
    materials: "Acier inoxydable 316L, zircon cubique taille brillant. Largeur anneau 1,5 mm.",
    care: "Retirez la bague pour dormir ou lors d'activités manuelles. Nettoyez délicatement.",
    images: [
      U("1591561954557-26941169b49e"),
      U("1594633312681-425c7b97ccd1"),
      U("1535632066927-ab7c9ab60908"),
    ],
    colors: [
      { name: "Or", hex: "#D4AF37" },
      { name: "Argent", hex: "#C7CCD1" },
    ],
    variants: [
      { id: "or", label: "Or", type: "color", color: { name: "Or", hex: "#D4AF37" }, priceDelta: 0, stock: 30 },
      { id: "argent", label: "Argent", type: "color", color: { name: "Argent", hex: "#C7CCD1" }, priceDelta: 0, stock: 25 },
    ],
    tags: ["bague", "zircon", "solitaire", "finesse"],
    createdAt: "2025-01-10",
  },
  {
    id: "p-05",
    slug: "creoles-coeur-amour",
    name: "Créoles Cœur « Amour »",
    category: "bijoux",
    categoryLabel: "Bijoux Inox",
    price: 22.9,
    rating: 4.8,
    reviews: 174,
    isNew: true,
    badge: "Nouveau",
    shortDescription:
      "Petites créoles ornées d'un pendentif cœur, romantiques et waterproof. Le cadeau parfait.",
    description:
      "Un petit cœur qui se balance au creux de l'oreille : « Amour » est la touche romantique de la collection. Légères, confortables et waterproof, elles s'offrent autant qu'elles s'adoptent.",
    materials: "Acier inoxydable 316L, plaqué or 18 carats. Diamètre 14 mm. Pendentif cœur 6 mm.",
    care: "Nettoyez avec un chiffon doux. Évitez les produits chimiques agressifs.",
    images: [
      U("1522312346375-d1a52e2b99b3"),
      U("1611085583191-a3b181a88401"),
      U("1600185365483-26d7a4cc7519"),
    ],
    colors: [
      { name: "Or", hex: "#D4AF37" },
      { name: "Argent", hex: "#C7CCD1" },
    ],
    variants: [
      { id: "or", label: "Or", type: "color", color: { name: "Or", hex: "#D4AF37" }, priceDelta: 0, stock: 19 },
      { id: "argent", label: "Argent", type: "color", color: { name: "Argent", hex: "#C7CCD1" }, priceDelta: 0, stock: 12 },
    ],
    tags: ["créoles", "cœur", "romantique", "cadeau"],
    createdAt: "2025-02-01",
  },
  {
    id: "p-06",
    slug: "coque-magsafe-crystal",
    name: "Coque MagSafe Transparente « Crystal »",
    category: "coques",
    categoryLabel: "Coques Tech",
    price: 19.9,
    compareAtPrice: 27.9,
    rating: 4.9,
    reviews: 634,
    badge: "Best-seller",
    isBestSeller: true,
    shortDescription:
      "Coque transparente antichoc avec anneau MagSafe renforcé. Protection militaire sans sacrifier le design.",
    description:
      "La coque « Crystal » laisse toute la beauté de votre iPhone s'exprimer. Transparence anti-jaunissement, renforts d'angles antichoc et anneau MagSafe compatible charge rapide. Fine, légère, elle protège sans alourdir.",
    materials: "TPU + polycarbonate hybride. Revêtement antijaunissement. Anneau MagSafe magnétique N52.",
    care: "Retirez la coque pour la nettoyer à l'eau tiède. Évitez l'alcool et les solvants.",
    images: [
      U("1601784551446-20c9e07cdbdb"),
      U("1580910051074-3eb694886505"),
      U("1618354691373-d851c5c3a990"),
      U("1585060544812-6b45742d762f"),
    ],
    models: ["iPhone 13", "iPhone 14", "iPhone 15", "iPhone 16", "iPhone 16 Pro", "iPhone 16 Pro Max"],
    variants: [
      { id: "iphone-13", label: "iPhone 13", type: "model", priceDelta: 0, stock: 40 },
      { id: "iphone-14", label: "iPhone 14", type: "model", priceDelta: 0, stock: 35 },
      { id: "iphone-15", label: "iPhone 15", type: "model", priceDelta: 0, stock: 52 },
      { id: "iphone-16", label: "iPhone 16", type: "model", priceDelta: 0, stock: 44 },
      { id: "iphone-16-pro", label: "iPhone 16 Pro", type: "model", priceDelta: 2, stock: 3 },
      { id: "iphone-16-pro-max", label: "iPhone 16 Pro Max", type: "model", priceDelta: 2, stock: 21 },
    ],
    tags: ["coque", "magsafe", "transparente", "antichoc"],
    createdAt: "2024-06-18",
  },
  {
    id: "p-07",
    slug: "coque-magsafe-golden-wave",
    name: "Coque MagSafe Dorée « Golden Wave »",
    category: "coques",
    categoryLabel: "Coques Tech",
    price: 24.9,
    rating: 4.8,
    reviews: 421,
    badge: "Best-seller",
    isBestSeller: true,
    shortDescription:
      "Coque à vague dorée, finition brillante et anneau MagSafe. L'accessoire chic qui change tout.",
    description:
      "« Golden Wave » habille votre iPhone d'une vague dorée raffinée. La finition brillante et l'anneau MagSafe doré assorti créent un objet aussi beau qu'utile. Une coque que l'on remarque immédiatement.",
    materials: "TPU souple, décor sérigraphié haute résistance. Anneau MagSafe plaqué or.",
    care: "Nettoyez avec un chiffon doux légèrement humide.",
    images: [
      U("1618354691373-d851c5c3a990"),
      U("1580910051074-3eb694886505"),
      U("1622434641406-a158123450f9"),
    ],
    models: ["iPhone 13", "iPhone 14", "iPhone 15", "iPhone 16", "iPhone 16 Pro", "iPhone 16 Pro Max"],
    variants: [
      { id: "iphone-13", label: "iPhone 13", type: "model", priceDelta: 0, stock: 26 },
      { id: "iphone-14", label: "iPhone 14", type: "model", priceDelta: 0, stock: 24 },
      { id: "iphone-15", label: "iPhone 15", type: "model", priceDelta: 0, stock: 38 },
      { id: "iphone-16", label: "iPhone 16", type: "model", priceDelta: 0, stock: 3 },
      { id: "iphone-16-pro", label: "iPhone 16 Pro", type: "model", priceDelta: 2, stock: 15 },
      { id: "iphone-16-pro-max", label: "iPhone 16 Pro Max", type: "model", priceDelta: 2, stock: 11 },
    ],
    tags: ["coque", "magsafe", "dorée", "chic"],
    createdAt: "2024-10-05",
  },
  {
    id: "p-08",
    slug: "coque-silicone-velours-soft-touch",
    name: "Coque Silicone Velours « Soft Touch »",
    category: "coques",
    categoryLabel: "Coques Tech",
    price: 22.9,
    rating: 4.7,
    reviews: 267,
    shortDescription:
      "Coque silicone toucher velours, intérieur microfibre, compatible MagSafe. Douceur et protection.",
    description:
      "Le toucher velours de « Soft Touch » est immédiatement addictif. Intérieur doublé microfibre pour protéger votre iPhone des rayures, extérieur antidérapant et MagSafe compatible. Disponible en coloris doux et naturels.",
    materials: "Silicone liquide soft-touch, doublure microfibre, aimants MagSafe intégrés.",
    care: "Essuyez avec un chiffon microfibre. Évitez l'eau savonneuse excessive.",
    images: [
      U("1622434641406-a158123450f9"),
      U("1585060544812-6b45742d762f"),
      U("1618354691373-d851c5c3a990"),
    ],
    colors: [
      { name: "Sable", hex: "#D9C7A7" },
      { name: "Noir", hex: "#1B1B1B" },
      { name: "Camel", hex: "#B08A5E" },
    ],
    variants: [
      { id: "sable", label: "Sable", type: "color", color: { name: "Sable", hex: "#D9C7A7" }, priceDelta: 0, stock: 28 },
      { id: "noir", label: "Noir", type: "color", color: { name: "Noir", hex: "#1B1B1B" }, priceDelta: 0, stock: 33 },
      { id: "camel", label: "Camel", type: "color", color: { name: "Camel", hex: "#B08A5E" }, priceDelta: 0, stock: 9 },
    ],
    models: ["iPhone 13", "iPhone 14", "iPhone 15", "iPhone 16"],
    tags: ["coque", "silicone", "velours", "magsafe"],
    createdAt: "2024-11-12",
  },
  {
    id: "p-09",
    slug: "coque-magsafe-marbre-elegance",
    name: "Coque MagSafe Marbre « Élégance »",
    category: "coques",
    categoryLabel: "Coques Tech",
    price: 26.9,
    rating: 4.9,
    reviews: 188,
    isNew: true,
    badge: "Édition limitée",
    shortDescription:
      "Effet marbre blanc et or, anneau MagSafe, finition mate anti-traces. Une pièce unique au poignet.",
    description:
      "Chaque coque « Élégance » arbore un motif marbre blanc veiné d'or, unique en son genre. La finition mate anti-traces garde votre iPhone impeccable, tandis que l'anneau MagSafe assure une charge rapide et un maintien parfait.",
    materials: "Coque rigide PC + bordure TPU, impression marbre HD, revêtement mat anti-traces.",
    care: "Nettoyez avec un chiffon doux. Évitez les produits abrasifs.",
    images: [
      U("1580910051074-3eb694886505"),
      U("1601784551446-20c9e07cdbdb"),
      U("1585060544812-6b45742d762f"),
    ],
    models: ["iPhone 14", "iPhone 15", "iPhone 16", "iPhone 16 Pro", "iPhone 16 Pro Max"],
    variants: [
      { id: "iphone-14", label: "iPhone 14", type: "model", priceDelta: 0, stock: 17 },
      { id: "iphone-15", label: "iPhone 15", type: "model", priceDelta: 0, stock: 22 },
      { id: "iphone-16", label: "iPhone 16", type: "model", priceDelta: 0, stock: 14 },
      { id: "iphone-16-pro", label: "iPhone 16 Pro", type: "model", priceDelta: 2, stock: 8 },
      { id: "iphone-16-pro-max", label: "iPhone 16 Pro Max", type: "model", priceDelta: 2, stock: 3 },
    ],
    tags: ["coque", "marbre", "magsafe", "édition limitée"],
    createdAt: "2025-01-28",
  },
  {
    id: "p-10",
    slug: "sac-banane-milano",
    name: "Sac Banane « Milano »",
    category: "sacs",
    categoryLabel: "Sacs & Accessoires",
    price: 34.9,
    compareAtPrice: 44.9,
    rating: 4.8,
    reviews: 302,
    badge: "Best-seller",
    isBestSeller: true,
    shortDescription:
      "Sac banane en cuir vegan, porté ceinture ou bandoulière. Compact, chic, indispensable.",
    description:
      "Le « Milano » est le compagnon de toutes vos sorties. Assez compact pour être oublié, assez malin pour contenir l'essentiel : téléphone, carte bancaire, rouge à lèvres. Bandoulière réglable pour le porter à la taille ou en travers du corps.",
    materials: "Cuir vegan PU haut de gamme, doublure polyester, fermeture zippée dorée. 24 × 14 × 7 cm.",
    care: "Nettoyez avec un chiffon humide. Évitez l'exposition prolongée au soleil.",
    images: [
      U("1548036328-c9fa89d128fa"),
      U("1584917865442-de89df76afd3"),
      U("1590874103328-eac38a683ce7"),
    ],
    colors: [
      { name: "Camel", hex: "#B08A5E" },
      { name: "Noir", hex: "#1B1B1B" },
      { name: "Crème", hex: "#EFE7D8" },
    ],
    variants: [
      { id: "camel", label: "Camel", type: "color", color: { name: "Camel", hex: "#B08A5E" }, priceDelta: 0, stock: 21 },
      { id: "noir", label: "Noir", type: "color", color: { name: "Noir", hex: "#1B1B1B" }, priceDelta: 0, stock: 26 },
      { id: "creme", label: "Crème", type: "color", color: { name: "Crème", hex: "#EFE7D8" }, priceDelta: 0, stock: 4 },
    ],
    tags: ["sac", "banane", "cuir vegan", "ceinture"],
    createdAt: "2024-09-20",
  },
  {
    id: "p-11",
    slug: "pochette-bandouliere-paris",
    name: "Pochette Bandoulière « Paris »",
    category: "sacs",
    categoryLabel: "Sacs & Accessoires",
    price: 39.9,
    rating: 4.9,
    reviews: 156,
    isNew: true,
    badge: "Nouveau",
    shortDescription:
      "Pochette élégante à chaîne dorée amovible, format soirée comme quotidien. Cuir vegan premium.",
    description:
      "« Paris » se porte à l'épaule, en bandoulière ou à la main grâce à sa chaîne dorée amovible. Son format rectangulaire structuré accueille téléphone, portefeuille et petits essentiels. La pochette qui accompagne toutes vos soirées.",
    materials: "Cuir vegan PU grainé, chaîne métal doré amovible, doublure satinée. 20 × 12 × 6 cm.",
    care: "Rangez dans un sac de protection. Nettoyez délicatement.",
    images: [
      U("1584917865442-de89df76afd3"),
      U("1548036328-c9fa89d128fa"),
      U("1591561954557-26941169b49e"),
    ],
    colors: [
      { name: "Noir", hex: "#1B1B1B" },
      { name: "Crème", hex: "#EFE7D8" },
      { name: "Or", hex: "#D4AF37" },
    ],
    variants: [
      { id: "noir", label: "Noir", type: "color", color: { name: "Noir", hex: "#1B1B1B" }, priceDelta: 0, stock: 18 },
      { id: "creme", label: "Crème", type: "color", color: { name: "Crème", hex: "#EFE7D8" }, priceDelta: 0, stock: 15 },
      { id: "or", label: "Or", type: "color", color: { name: "Or", hex: "#D4AF37" }, priceDelta: 4, stock: 7 },
    ],
    tags: ["pochette", "bandoulière", "soirée", "chaîne"],
    createdAt: "2025-02-08",
  },
  {
    id: "p-12",
    slug: "porte-cartes-cuir-vegan-essentiel",
    name: "Porte-cartes « Essentiel »",
    category: "sacs",
    categoryLabel: "Sacs & Accessoires",
    price: 24.9,
    rating: 4.7,
    reviews: 143,
    shortDescription:
      "Porte-cartes fin en cuir vegan, 6 emplacements + poche centrale. Le minimalisme à l'état pur.",
    description:
      "« Essentiel » fait le pari du minimalisme. Ultra fin, il se glisse dans n'importe quelle poche et accueille jusqu'à 6 cartes plus quelques billets. Un accessoire discret qui structure votre quotidien.",
    materials: "Cuir vegan PU, intérieur doublé, 6 fentes cartes + poche centrale. 10 × 7,5 cm.",
    care: "Évitez l'humidité prolongée. Nettoyez avec un chiffon sec.",
    images: [
      U("1590874103328-eac38a683ce7"),
      U("1548036328-c9fa89d128fa"),
      U("1600185365483-26d7a4cc7519"),
    ],
    colors: [
      { name: "Noir", hex: "#1B1B1B" },
      { name: "Camel", hex: "#B08A5E" },
    ],
    variants: [
      { id: "noir", label: "Noir", type: "color", color: { name: "Noir", hex: "#1B1B1B" }, priceDelta: 0, stock: 37 },
      { id: "camel", label: "Camel", type: "color", color: { name: "Camel", hex: "#B08A5E" }, priceDelta: 0, stock: 29 },
    ],
    tags: ["porte-cartes", "minimaliste", "cuir vegan"],
    createdAt: "2024-12-03",
  },
];

export const CATEGORY_ORDER = ["bijoux", "coques", "sacs"] as const;

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function getBestSellers(limit = 8) {
  return products.filter((p) => p.isBestSeller).slice(0, limit);
}

export function getNewArrivals(limit = 4) {
  return [...products].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4) {
  const sameCategory = products.filter((p) => p.category === product.category && p.id !== product.id);
  const others = products.filter((p) => p.category !== product.category && p.id !== product.id);
  return [...sameCategory, ...others].slice(0, limit);
}

export function getPriceRange() {
  const prices = products.map((p) => p.price);
  return { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) };
}

/** Retourne tous les coloris distincts d'une catégorie */
export function getColorsByCategory(category?: string) {
  const pool = category ? products.filter((p) => p.category === category) : products;
  const map = new Map<string, string>();
  pool.forEach((p) => p.colors?.forEach((c) => map.set(c.name, c.hex)));
  return Array.from(map, ([name, hex]) => ({ name, hex }));
}

/** Retourne tous les modèles iPhone distincts disponibles */
export function getAllModels() {
  const set = new Set<string>();
  products.forEach((p) => p.models?.forEach((m) => set.add(m)));
  return Array.from(set);
}
