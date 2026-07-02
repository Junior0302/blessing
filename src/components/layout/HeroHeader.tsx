"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND, NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { useNavigation } from "./NavigationProvider";

export function HeroHeader() {
  const [scrolled, setScrolled] = useState(false);
  const {
    mobileMenuOpen,
    setMobileMenuOpen,
    startNavigation,
    closeMobileMenu,
  } = useNavigation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    if (href !== "/") {
      startNavigation();
    } else {
      closeMobileMenu();
    }
  };

  return (
    <>
      {/* ── Desktop header (lg+) : transparent sur la vidéo ── */}
      <header
        className={`absolute inset-x-0 top-0 z-50 hidden transition-all duration-500 lg:block ${
          scrolled ? "glass-dark py-3 shadow-glass" : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 lg:px-12">
          <Link
            href="/"
            className="font-brand text-4xl tracking-wide text-cream"
            aria-label={`${BRAND.name} — Accueil`}
          >
            {BRAND.name}
          </Link>

          <nav className="flex items-center gap-10" aria-label="Navigation principale">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`text-xs font-medium uppercase tracking-[0.2em] transition-colors hover:text-amber-light ${
                  link.href === "/" ? "text-amber" : "text-cream/85"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" href="/commander" onClick={() => handleNavClick("/commander")}>
              Commander
            </Button>
            <Button variant="primary" size="sm" href="/reserver" onClick={() => handleNavClick("/reserver")}>
              Réserver
            </Button>
          </div>
        </div>
      </header>

      {/* ── Mobile header (< lg) : barre compacte opaque ── */}
      <header className="absolute inset-x-0 top-0 z-50 lg:hidden">
        <div
          className={`flex items-center justify-between px-5 py-4 transition-colors ${
            mobileMenuOpen
              ? "bg-noir"
              : scrolled
                ? "bg-noir/80 backdrop-blur-md"
                : "bg-noir/50 backdrop-blur-sm"
          }`}
        >
          <Link
            href="/"
            className="font-brand text-2xl tracking-wide text-cream"
            onClick={() => handleNavClick("/")}
          >
            {BRAND.name}
          </Link>

          <button
            type="button"
            className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-1.5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            <span className={`block h-px w-6 bg-cream transition-all duration-300 ${mobileMenuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-cream transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-cream transition-all duration-300 ${mobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </header>

      {/* ── Mobile menu plein écran opaque ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[45] bg-noir lg:hidden"
          >
            <nav
              className="flex h-full flex-col items-center justify-center gap-7 px-8 pt-16"
              aria-label="Navigation mobile"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.35 }}
                  className="w-full text-center"
                >
                  <Link
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="font-display text-4xl font-light text-cream hover:text-amber"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 flex w-full max-w-xs flex-col gap-3"
              >
                <Button
                  variant="primary"
                  size="lg"
                  href="/commander"
                  className="w-full"
                  onClick={() => handleNavClick("/commander")}
                >
                  Commander
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  href="/reserver"
                  className="w-full"
                  onClick={() => handleNavClick("/reserver")}
                >
                  Réserver
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
