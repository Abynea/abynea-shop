"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, Truck, X } from "lucide-react";
import { useEffect } from "react";
import { useCart } from "@/store/cart";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";
import { cn, formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const router = useRouter();
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const items = useCart((s) => s.items);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const subtotal = useCart((s) => s.subtotal());
  const discount = useCart((s) => s.discount());
  const totalItems = useCart((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const freeShipping = remaining <= 0 && subtotal > 0;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  function goToCheckout() {
    close();
    router.push("/checkout");
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-ink/40 backdrop-blur-sm"
          onClick={close}
        >
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-ivory shadow-drawer"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} />
                <h2 className="font-serif text-lg">
                  Mon panier {totalItems > 0 && <span className="text-ink-faint">({totalItems})</span>}
                </h2>
              </div>
              <button onClick={close} aria-label="Fermer le panier" className="text-ink-muted hover:text-ink">
                <X size={22} />
              </button>
            </div>

            {/* Free shipping progress */}
            {items.length > 0 && (
              <div className="border-b border-line bg-sand/60 px-5 py-3.5">
                <div className="mb-2 flex items-center gap-2 text-xs">
                  <Truck size={14} className="text-gold-dark" />
                  {freeShipping ? (
                    <span className="font-medium text-ink">🎉 Livraison offerte débloquée !</span>
                  ) : (
                    <span className="text-ink-soft">
                      Plus que <strong className="text-ink">{formatPrice(remaining)}</strong> pour la livraison offerte !
                    </span>
                  )}
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-gold-light to-gold"
                    initial={false}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", damping: 24, stiffness: 200 }}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sand">
                    <ShoppingBag size={26} className="text-ink-muted" />
                  </div>
                  <p className="font-serif text-lg text-ink">Votre panier est vide</p>
                  <p className="mt-1 max-w-[240px] text-sm text-ink-muted">
                    Découvrez nos best-sellers et laissez-vous tenter.
                  </p>
                  <Link href="/boutique" onClick={close} className="btn-gold mt-6">
                    Découvrir la boutique
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-line">
                  {items.map((item) => (
                    <li key={item.key} className="flex gap-4 py-4">
                      <Link
                        href={`/produit/${item.slug}`}
                        onClick={close}
                        className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-sand"
                      >
                        <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                      </Link>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/produit/${item.slug}`}
                            onClick={close}
                            className="font-serif text-sm leading-snug text-ink hover:text-gold-dark"
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeItem(item.key)}
                            aria-label={`Retirer ${item.name}`}
                            className="shrink-0 text-ink-faint transition hover:text-red-500"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        {(item.color || item.model) && (
                          <p className="mt-0.5 text-[11px] text-ink-faint">
                            {[item.color, item.model].filter(Boolean).join(" · ")}
                          </p>
                        )}
                        {item.stock <= 5 && (
                          <p className="mt-1 text-[11px] font-medium text-gold-dark">
                            Plus que {item.stock} en stock !
                          </p>
                        )}
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center rounded-lg border border-line">
                            <button
                              onClick={() => updateQuantity(item.key, item.quantity - 1)}
                              aria-label="Diminuer la quantité"
                              className="px-2.5 py-1.5 text-ink-muted transition hover:text-ink"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-7 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.key, item.quantity + 1)}
                              disabled={item.quantity >= item.stock}
                              aria-label="Augmenter la quantité"
                              className="px-2.5 py-1.5 text-ink-muted transition hover:text-ink disabled:opacity-30"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-ink">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-line px-5 py-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-ink-soft">
                    <span>Sous-total</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-gold-dark">
                      <span>Remise</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-ink-soft">
                    <span>Livraison</span>
                    <span className={cn(freeShipping && "font-medium text-gold-dark")}>
                      {freeShipping ? "Offerte" : "Calculée au paiement"}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-line pt-2 text-base font-semibold text-ink">
                    <span>Total</span>
                    <span>{formatPrice(subtotal - discount)}</span>
                  </div>
                </div>

                <button onClick={goToCheckout} className="btn-dark mt-4 w-full">
                  Passer la commande
                </button>
                <button
                  onClick={close}
                  className="mt-2 w-full py-2 text-center text-xs text-ink-muted underline-offset-2 hover:underline"
                >
                  Continuer mes achats
                </button>
                <p className="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-ink-faint">
                  🔒 Paiement sécurisé · Retours sous 14 jours
                </p>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
