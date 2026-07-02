"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigation } from "./NavigationProvider";
import { BRAND } from "@/lib/constants";

const TRANSITION_MS = 4000;

export function PageTransition() {
  const { isNavigating, endNavigation } = useNavigation();

  // Durée fixe depuis le clic : la navigation client Next.js aboutit bien
  // avant la fin des 4 s, et l'overlay se retire toujours (pas de blocage).
  useEffect(() => {
    if (!isNavigating) return;
    const timer = setTimeout(endNavigation, TRANSITION_MS);
    return () => clearTimeout(timer);
  }, [isNavigating, endNavigation]);

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-cream"
          role="progressbar"
          aria-label="Transition de page"
          aria-busy="true"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
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
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-amber via-gold to-amber"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 1.8,
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
