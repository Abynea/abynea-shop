export const SITE = {
  name: "ABYNÉA",
  tagline: "Accessoires & Bijoux indispensables",
  description:
    "Bijoux en acier inoxydable waterproof, coques MagSafe chics et petite maroquinerie. Livraison offerte dès 35 € en France.",
  email: "bonjour@abynea.fr",
  phone: "+33 1 84 80 00 00",
  instagram: "https://instagram.com/abynea",
  tiktok: "https://tiktok.com/@abynea",
  pinterest: "https://pinterest.com/abynea",
  address: "12 rue de la Paix, 75002 Paris, France",
} as const;

/** Seuil de livraison offerte en euros */
export const FREE_SHIPPING_THRESHOLD = 35;

export const SHIPPING_METHODS = [
  {
    id: "lettre-suivie",
    name: "Lettre suivie",
    carrier: "La Poste",
    price: 3.9,
    eta: "3 à 5 jours ouvrés",
    description: "Boîte aux lettres, suivi inclus",
  },
  {
    id: "colissimo",
    name: "Colissimo Domicile",
    carrier: "La Poste",
    price: 5.9,
    eta: "2 à 3 jours ouvrés",
    description: "Remise en main propre, suivi inclus",
  },
  {
    id: "mondial-relay",
    name: "Point Relais",
    carrier: "Mondial Relay",
    price: 3.5,
    eta: "3 à 6 jours ouvrés",
    description: "Retrait en point relais près de chez vous",
  },
] as const;

export const NAV_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Bijoux", href: "/boutique?categorie=bijoux" },
  { label: "Coques Tech", href: "/boutique?categorie=coques" },
  { label: "Sacs & Accessoires", href: "/boutique?categorie=sacs" },
  { label: "Notre Histoire", href: "/notre-histoire" },
] as const;

export const REASSURANCE = [
  {
    icon: "droplets",
    emoji: "💧",
    title: "Acier Inoxydable",
    text: "Imperméable & hypoallergénique, ne noircit pas.",
  },
  {
    icon: "package",
    emoji: "📦",
    title: "Expédition 24/48h",
    text: "Préparé et expédié depuis la France.",
  },
  {
    icon: "shield",
    emoji: "🔒",
    title: "Paiement 100% Sécurisé",
    text: "Transactions chiffrées via Stripe.",
  },
  {
    icon: "rotate",
    emoji: "🔄",
    title: "Retours sous 14 jours",
    text: "Satisfait ou remboursé, sans justification.",
  },
] as const;

export const CATEGORY_LABELS: Record<string, string> = {
  bijoux: "Bijoux Inox",
  coques: "Coques Tech",
  sacs: "Sacs & Accessoires",
};

export const IPHONE_MODELS = [
  "iPhone 13",
  "iPhone 14",
  "iPhone 15",
  "iPhone 16",
  "iPhone 16 Pro",
  "iPhone 16 Pro Max",
];
