import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Reassurance } from "@/components/home/Reassurance";
import { BestSellers, Categories, NewArrivals, TikTokSection } from "@/components/home/HomeSections";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE.name} — Bijoux waterproof & coques MagSafe chics`,
  description: SITE.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Reassurance />
      <BestSellers />
      <Categories />
      <NewArrivals />
      <TikTokSection />
    </>
  );
}
