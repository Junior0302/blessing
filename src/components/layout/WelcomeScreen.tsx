"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND } from "@/lib/constants";
import { useWelcome } from "@/lib/welcome-context";

const WELCOME_DURATION_MS = 6500;
const EXIT_DURATION_MS = 1200;

export function WelcomeScreen() {
  const { isWelcomeComplete, completeWelcome } = useWelcome();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (isWelcomeComplete) return;

    document.body.style.overflow = "hidden";

    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(100, (elapsed / WELCOME_DURATION_MS) * 100));

      if (elapsed >= WELCOME_DURATION_MS) {
        clearInterval(interval);
        setVisible(false);
        window.setTimeout(() => {
          completeWelcome();
          document.body.style.overflow = "";
        }, EXIT_DURATION_MS);
      }
    }, 50);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, [isWelcomeComplete, completeWelcome]);

  return (
    <AnimatePresence>
      {!isWelcomeComplete && visible && (
        <motion.div
          key="welcome"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_DURATION_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-cream"
          role="dialog"
          aria-label="Bienvenue chez Blessing"
          aria-busy="true"
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="px-6 text-center"
          >
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-amber">
              Bienvenue
            </p>
            <h1 className="font-brand text-6xl text-noir md:text-8xl">{BRAND.name}</h1>
            <p className="mt-4 font-display text-xl italic text-noir/60 md:text-2xl">
              {BRAND.tagline}
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="mt-8 max-w-md text-sm leading-relaxed text-noir/50"
            >
              Préparez-vous à une expérience gourmande d&apos;exception…
            </motion.p>
          </motion.div>

          <div className="absolute bottom-16 left-1/2 w-48 -translate-x-1/2 md:bottom-20 md:w-64">
            <div className="h-px w-full overflow-hidden rounded-full bg-noir/10">
              <motion.div
                className="h-full bg-gradient-to-r from-amber to-gold"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-3 text-center text-[10px] uppercase tracking-[0.3em] text-noir/40">
              Chargement
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
