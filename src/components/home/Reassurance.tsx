import { Droplets, Package, RotateCcw, ShieldCheck } from "lucide-react";
import { REASSURANCE } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";

const ICONS = {
  droplets: Droplets,
  package: Package,
  shield: ShieldCheck,
  rotate: RotateCcw,
} as const;

export function Reassurance() {
  return (
    <section className="container-x py-12 md:py-16">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {REASSURANCE.map((item, i) => {
          const Icon = ICONS[item.icon as keyof typeof ICONS];
          return (
            <Reveal key={item.title} delay={i * 70}>
              <div className="card-surface flex h-full flex-col items-center gap-2.5 px-4 py-6 text-center transition-shadow duration-300 hover:shadow-card sm:px-6 sm:py-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-soft text-gold-dark">
                  <Icon size={20} strokeWidth={1.6} />
                </span>
                <h3 className="font-sans text-[13px] font-semibold tracking-wide text-ink sm:text-sm">
                  {item.title}
                </h3>
                <p className="text-[11px] leading-relaxed text-ink-muted sm:text-xs">{item.text}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
