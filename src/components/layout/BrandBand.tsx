import { Logo } from "@/components/ui/Logo";
import { SITE } from "@/lib/constants";

/** Bandeau signature : fond encre, logotype en version blanche (variant="light"). */
export function BrandBand() {
  return (
    <section className="relative mt-16 overflow-hidden bg-ink py-16 text-white sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl"
      />
      <div className="container-x relative flex flex-col items-center text-center">
        <Logo variant="light" className="h-8 sm:h-10" />
        <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-white/60">
          Accessoires & Bijoux
        </p>
        <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/75">
          {SITE.description}
        </p>
        <p className="mt-6 text-[11px] uppercase tracking-widest2 text-gold">
          Fait avec ♥ à Paris
        </p>
      </div>
    </section>
  );
}
