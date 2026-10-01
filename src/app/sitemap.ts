import type { MetadataRoute } from "next";
import { products } from "@/data/products";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://abynea.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/boutique",
    "/boutique?categorie=bijoux",
    "/boutique?categorie=coques",
    "/boutique?categorie=sacs",
    "/notre-histoire",
    "/livraison",
    "/politique-retour",
    "/faq",
    "/contact",
    "/cgv",
    "/mentions-legales",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const productRoutes = products.map((p) => ({
    url: `${BASE}/produit/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
