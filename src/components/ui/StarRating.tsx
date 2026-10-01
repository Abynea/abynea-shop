"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  rating: number;
  reviews?: number;
  size?: number;
  className?: string;
  showValue?: boolean;
};

export function StarRating({ rating, reviews, size = 14, className, showValue = true }: Props) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.round(rating);
          return (
            <Star
              key={i}
              size={size}
              className={cn(filled ? "fill-gold text-gold" : "fill-none text-ink/20")}
              strokeWidth={1.5}
            />
          );
        })}
      </div>
      {showValue && (
        <span className="text-xs text-ink-muted">
          {rating.toFixed(1)}
          {typeof reviews === "number" && <span className="text-ink-faint"> ({reviews})</span>}
        </span>
      )}
    </div>
  );
}

export function AnimatedStarRating(props: Props) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
      <StarRating {...props} />
    </motion.div>
  );
}
