"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getBestSellers, getNewArrivals } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";

export function BestSellers() {
  const products = getBestSellers(8);

  return (
    <section className="container-x py-12 md:py-16">
      <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Les incontournables</p>
          <h2 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">Nos best-sellers</h2>
          <p className="mt-2 max-w-lg text-sm text-ink-muted">
            Les pièces préférées de la communauté, testées et approuvées par des milliers de clientes.
          </p>
        </div>
        <Link
          href="/boutique"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-gold-dark"
        >
          Voir tout
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>

      <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 lg:grid-cols-4">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} priority={i < 2} />
        ))}
      </div>
    </section>
  );
}

export function NewArrivals() {
  const products = getNewArrivals(4);

  return (
    <section className="container-x py-12 md:py-16">
      <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Fraîchement arrivé</p>
          <h2 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">Nouveautés</h2>
        </div>
        <Link
          href="/boutique?tri=nouveautes"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-gold-dark"
        >
          Toutes les nouveautés
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>

      <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 lg:grid-cols-4">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}

const CATEGORIES = [
  {
    title: "Bijoux Inox",
    subtitle: "Waterproof & hypoallergéniques",
    href: "/boutique?categorie=bijoux",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Coques MagSafe",
    subtitle: "Protection & style pour iPhone",
    href: "/boutique?categorie=coques",
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=80",
  },
];

export function Categories() {
  return (
    <section className="container-x py-12 md:py-16">
      <Reveal className="mb-8 text-center">
        <p className="eyebrow">Explorez</p>
        <h2 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">Nos univers</h2>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2">
        {CATEGORIES.map((cat, i) => (
          <Reveal key={cat.title} delay={i * 90}>
            <Link href={cat.href} className="group relative block overflow-hidden rounded-2xl">
              <div className="relative aspect-[4/3] sm:aspect-[5/4]">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-6">
                <div className="text-white">
                  <h3 className="font-serif text-2xl">{cat.title}</h3>
                  <p className="mt-1 text-xs text-white/80">{cat.subtitle}</p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ivory/90 text-ink transition-transform duration-300 group-hover:scale-110">
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const UGC = [
  {
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=80",
    handle: "@lea.style",
    caption: "Mes créoles waterproof ✨",
    likes: "12,4k",
  },
  {
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    handle: "@camille.p",
    caption: "La coque MagSafe parfaite 🖤",
    likes: "8,9k",
  },
  {
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80",
    handle: "@chloe.mnl",
    caption: "Layering de colliers réussi",
    likes: "21,3k",
  },
  {
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    handle: "@sarah.lux",
    caption: "Mon sac banane de tous les jours",
    likes: "15,7k",
  },
  {
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80",
    handle: "@ines.paris",
    caption: "Le doré qui ne ternit pas 💛",
    likes: "9,2k",
  },
];

export function TikTokSection() {
  return (
    <section className="overflow-hidden py-12 md:py-16">
      <div className="container-x">
        <Reveal className="mb-8 text-center">
          <p className="eyebrow">Communauté</p>
          <h2 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">Vu sur TikTok</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Partagez votre look avec <span className="font-medium text-ink">#ABYNEA</span> pour être repostée.
          </p>
        </Reveal>
      </div>

      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 no-scrollbar sm:px-6 lg:justify-center lg:px-8">
        {UGC.map((post, i) => (
          <motion.a
            key={post.handle}
            href="https://tiktok.com/@abynea"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group relative w-[220px] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[240px]"
          >
            <div className="relative aspect-[9/14]">
              <Image
                src={post.image}
                alt={post.caption}
                fill
                sizes="240px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/10" />
            </div>
            <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-ink/60 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur">
              ♪ TikTok
            </div>
            <div className="absolute inset-x-0 bottom-0 p-3.5 text-white">
              <p className="text-xs font-semibold">{post.handle}</p>
              <p className="mt-0.5 text-[11px] text-white/85">{post.caption}</p>
              <p className="mt-1.5 text-[10px] text-white/70">❤️ {post.likes} j'aime</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
