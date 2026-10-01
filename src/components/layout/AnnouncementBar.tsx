"use client";

import { Sparkles, Truck } from "lucide-react";

const MESSAGES = [
  "Livraison OFFERTE dès 35 € en France 🇫🇷",
  "Expédition sous 24/48h",
  "-10% sur votre 1ère commande avec le code ABYNEA10",
];

export function AnnouncementBar() {
  return (
    <div className="relative overflow-hidden bg-ink text-white">
      <div className="flex w-max animate-marquee whitespace-nowrap py-2.5 will-change-transform md:animate-none md:w-full md:justify-center">
        <div className="flex shrink-0 items-center md:hidden">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {MESSAGES.map((msg, i) => (
                <span key={`${dup}-${i}`} className="flex items-center gap-2 px-6 text-[11px] tracking-wide">
                  {i === 1 ? <Truck size={13} /> : <Sparkles size={13} className="text-gold" />}
                  {msg}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Desktop : message statique centré */}
        <div className="hidden items-center gap-3 text-[12px] tracking-wide md:flex">
          <Truck size={14} className="text-gold" />
          <span>Livraison OFFERTE dès 35 € en France 🇫🇷</span>
          <span className="text-white/30">|</span>
          <span>Expédition sous 24/48h</span>
          <span className="text-white/30">|</span>
          <span className="flex items-center gap-1.5">
            <Sparkles size={13} className="text-gold" /> -10% avec le code ABYNEA10
          </span>
        </div>
      </div>
    </div>
  );
}
