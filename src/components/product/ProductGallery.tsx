"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  images: string[];
  name: string;
  badge?: string;
};

export function ProductGallery({ images, name, badge }: Props) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const frameRef = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin({ x, y });
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row-reverse sm:gap-4">
      {/* Main image */}
      <div
        ref={frameRef}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={handleMove}
        className="group relative aspect-square flex-1 overflow-hidden rounded-2xl bg-sand"
      >
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0"
        >
          <Image
            src={images[active]}
            alt={`${name} — visuel ${active + 1}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 55vw"
            className={cn(
              "object-cover transition-transform duration-300 ease-out",
              zoom && "scale-[1.75]"
            )}
            style={zoom ? { transformOrigin: `${origin.x}% ${origin.y}%` } : undefined}
          />
        </motion.div>

        {badge && (
          <span className="absolute left-4 top-4 rounded-full bg-ivory/95 px-3 py-1 text-[10px] font-medium uppercase tracking-widest2 text-ink shadow-sm">
            {badge}
          </span>
        )}

        <span className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-ink/60 px-3 py-1.5 text-[10px] text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
          <ZoomIn size={12} /> Survolez pour zoomer
        </span>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 sm:w-20 sm:flex-col">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Voir le visuel ${i + 1}`}
            className={cn(
              "relative aspect-square w-16 shrink-0 overflow-hidden rounded-lg border transition sm:w-full",
              active === i ? "border-ink" : "border-line hover:border-ink/40"
            )}
          >
            <Image src={img} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
