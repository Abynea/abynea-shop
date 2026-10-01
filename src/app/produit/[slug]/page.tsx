import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductCard } from "@/components/product/ProductCard";

type Params = { slug: string };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Produit introuvable" };
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.images[0] }],
      type: "website",
    },
  };
}

export default function ProductPage({ params }: { params: Params }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 4);

  return (
    <>
      <ProductDetail product={product} />

      {/* Vous aimerez aussi */}
      <section className="container-x pb-16 pt-4">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Sélection</p>
            <h2 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">Vous aimerez aussi</h2>
          </div>
          <Link
            href="/boutique"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-gold-dark"
          >
            Tout voir <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 lg:grid-cols-4">
          {related.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
