"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigation } from "./NavigationProvider";
import { BRAND } from "@/lib/constants";

const MIN_TRANSITION_MS = 450;
const MAX_TRANSITION_MS = 2500;

export function PageTransition() {
  const pathname = usePathname();
  const { isNavigating, endNavigation } = useNavigation();
  const navStartedAt = useRef(0);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (!isNavigating) return;
    navStartedAt.current = Date.now();
    const maxTimer = setTimeout(endNavigation, MAX_TRANSITION_MS);
    return () => clearTimeout(maxTimer);
  }, [isNavigating, endNavigation]);

  // Dès que la route a changé, on retire l'overlay (après un court délai visuel).
  useEffect(() => {
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;

    if (!isNavigating) return;

    const elapsed = Date.now() - navStartedAt.current;
    const remaining = Math.max(0, MIN_TRANSITION_MS - elapsed);
    const timer = setTimeout(endNavigation, remaining);
    return () => clearTimeout(timer);
  }, [pathname, isNavigating, endNavigation]);

  return (
    <AnimatePresence mode="wait">
      {isNavigating && (
        <motion.div
          key="page-transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-cream"
          role="progressbar"
          aria-label="Transition de page"
          aria-busy="true"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-center"
          >
            <p className="font-brand text-4xl text-noir md:text-5xl">{BRAND.name}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.35em] text-noir/45">
              Chargement en cours
            </p>
          </motion.div>

          <motion.div
            className="absolute bottom-20 left-1/2 h-px w-40 -translate-x-1/2 overflow-hidden rounded-full bg-noir/10 md:w-56"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-amber via-gold to-amber"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ width: "50%" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
