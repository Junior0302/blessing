"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND, NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { useNavigation } from "./NavigationProvider";
import { useCart } from "@/lib/cart-context";

export function SiteHeader() {
  const pathname = usePathname();
  const {
    mobileMenuOpen,
    setMobileMenuOpen,
    startNavigation,
    closeMobileMenu,
  } = useNavigation();
  const { openCart, itemCount } = useCart();

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    if (href !== pathname) {
      startNavigation();
    } else {
      closeMobileMenu();
    }
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-[220] border-b border-noir/8 bg-cream/90 py-4 shadow-soft backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8 lg:px-12">
          <Link
            href="/"
            onClick={() => handleNavClick("/")}
            className="font-brand text-2xl tracking-wide text-noir md:text-3xl"
          >
            {BRAND.name}
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`text-xs font-medium uppercase tracking-[0.18em] transition-colors hover:text-amber ${
                  isActive(link.href) ? "text-amber" : "text-noir/65"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={openCart}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-noir/15 text-noir/70 transition-colors hover:border-amber hover:text-amber"
              aria-label={`Panier${itemCount > 0 ? `, ${itemCount} article${itemCount > 1 ? "s" : ""}` : ""}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M6 6h15l-1.5 9h-12z" />
                <circle cx="9" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
                <path d="M6 6L5 3H2" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber text-[10px] text-cream">
                  {itemCount}
                </span>
              )}
            </button>
            <Button variant="outline" size="sm" href="/commander" onClick={() => handleNavClick("/commander")} className="!border-noir/20 !text-noir hover:!border-amber">
              Commander
            </Button>
            <Button variant="primary" size="sm" href="/reserver" onClick={() => handleNavClick("/reserver")}>
              Réserver
            </Button>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={openCart}
              className="relative flex h-9 w-9 items-center justify-center text-noir/70"
              aria-label="Panier"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 6h15l-1.5 9h-12z" />
                <circle cx="9" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber text-[10px] text-cream">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              type="button"
              className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-1.5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <span className={`block h-px w-6 bg-noir transition-all ${mobileMenuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`block h-px w-6 bg-noir transition-all ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-px w-6 bg-noir transition-all ${mobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[215] bg-cream lg:hidden"
          >
            <nav
              className="flex h-full flex-col items-center justify-center gap-8"
              aria-label="Navigation mobile"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="font-display text-3xl text-noir hover:text-amber"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-6 flex flex-col gap-3">
                <Button variant="outline" size="md" href="/commander" onClick={() => handleNavClick("/commander")}>
                  Commander
                </Button>
                <Button variant="primary" size="md" href="/reserver" onClick={() => handleNavClick("/reserver")}>
                  Réserver
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
