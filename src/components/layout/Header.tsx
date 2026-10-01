"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { useIsMounted } from "@/hooks/useMediaQuery";
import { SearchOverlay } from "./SearchOverlay";

export function Header() {
  const pathname = usePathname();
  const mounted = useIsMounted();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const openCart = useCart((s) => s.open);
  const totalItems = useCart((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.split("?")[0]) && href !== "/";
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-all duration-300",
          scrolled
            ? "border-line bg-ivory/90 backdrop-blur-md supports-[backdrop-filter]:bg-ivory/75"
            : "border-transparent bg-cream"
        )}
      >
        <div className="container-x">
          <div className="flex h-16 items-center justify-between gap-4 lg:h-[72px]">
            {/* Left: mobile menu / desktop nav */}
            <div className="flex flex-1 items-center gap-6">
              <button
                onClick={() => setMobileOpen(true)}
                className="text-ink lg:hidden"
                aria-label="Ouvrir le menu"
              >
                <Menu size={22} />
              </button>

              <nav className="hidden items-center gap-7 lg:flex">
                {NAV_LINKS.slice(0, 3).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "link-underline text-[13px] font-medium tracking-wide transition-colors",
                      isActive(link.href) ? "text-gold-dark" : "text-ink-soft hover:text-ink"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Center: logo */}
            <Link href="/" className="flex shrink-0 flex-col items-center" aria-label="ABYNÉA — Accueil">
              <span className="font-serif text-2xl font-semibold leading-none tracking-brand text-ink lg:text-[28px]">
                ABYNÉA
              </span>
              <span className="mt-0.5 hidden text-[8px] uppercase tracking-[0.3em] text-ink-faint sm:block">
                Accessoires & Bijoux
              </span>
            </Link>

            {/* Right: nav + actions */}
            <div className="flex flex-1 items-center justify-end gap-4">
              <nav className="hidden items-center gap-7 lg:flex">
                {NAV_LINKS.slice(3).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "link-underline text-[13px] font-medium tracking-wide transition-colors",
                      isActive(link.href) ? "text-gold-dark" : "text-ink-soft hover:text-ink"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-1.5 sm:gap-2.5">
                <button
                  onClick={() => setSearchOpen(true)}
                  aria-label="Rechercher"
                  className="rounded-full p-2 text-ink-soft transition hover:bg-sand hover:text-ink"
                >
                  <Search size={19} />
                </button>
                <Link
                  href="/compte"
                  aria-label="Mon compte"
                  className="hidden rounded-full p-2 text-ink-soft transition hover:bg-sand hover:text-ink sm:block"
                >
                  <User size={19} />
                </Link>
                <button
                  onClick={openCart}
                  aria-label="Ouvrir le panier"
                  className="relative rounded-full p-2 text-ink-soft transition hover:bg-sand hover:text-ink"
                >
                  <ShoppingBag size={19} />
                  <AnimatePresence>
                    {mounted && totalItems > 0 && (
                      <motion.span
                        key={totalItems}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                        className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-ink"
                      >
                        {totalItems}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-ink/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="flex h-full w-[82%] max-w-sm flex-col bg-ivory"
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <span className="font-serif text-xl tracking-brand">ABYNÉA</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Fermer le menu">
                  <X size={22} />
                </button>
              </div>
              <nav className="flex flex-col px-5 py-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="border-b border-line py-4 font-serif text-lg text-ink transition-colors hover:text-gold-dark"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto space-y-3 px-5 py-6">
                <Link href="/compte" className="btn-outline w-full">
                  <User size={16} /> Mon compte
                </Link>
                <p className="text-center text-xs text-ink-faint">
                  Livraison offerte dès 35 € · Retours 14 jours
                </p>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
