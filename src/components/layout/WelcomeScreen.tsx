"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND } from "@/lib/constants";
import { useWelcome } from "@/lib/welcome-context";
import { CircularText } from "@/components/ui/CircularText";

const WELCOME_DURATION_MS = 6500;
const EXIT_DURATION_MS = 1200;
const WELCOME_KEY = "blessing-welcomed";

const CIRCLE_TEXT =
  " ✦ BLESSING ✦ ART DU DESSERT ✦ PANCAKES ✦ GAUFRES ✦ CHOCOLAT ✦ MIEL ✦ ";

export function WelcomeScreen() {
  const { isWelcomeComplete, completeWelcome } = useWelcome();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (isWelcomeComplete) return;

    try {
      if (sessionStorage.getItem(WELCOME_KEY)) {
        completeWelcome();
        return;
      }
    } catch {
      /* ignore */
    }

    document.body.style.overflow = "hidden";

    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(100, (elapsed / WELCOME_DURATION_MS) * 100));

      if (elapsed >= WELCOME_DURATION_MS) {
        clearInterval(interval);
        setVisible(false);
        window.setTimeout(() => {
          try {
            sessionStorage.setItem(WELCOME_KEY, "1");
          } catch {
            /* ignore */
          }
          completeWelcome();
          document.body.style.overflow = "";
        }, EXIT_DURATION_MS);
      }
    }, 50);

    const failsafe = window.setTimeout(() => {
      clearInterval(interval);
      try {
        sessionStorage.setItem(WELCOME_KEY, "1");
      } catch {
        /* ignore */
      }
      completeWelcome();
      document.body.style.overflow = "";
    }, WELCOME_DURATION_MS + EXIT_DURATION_MS + 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(failsafe);
      document.body.style.overflow = "";
    };
  }, [isWelcomeComplete, completeWelcome]);

  return (
    <AnimatePresence mode="wait">
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
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center px-6 text-center"
          >
            <CircularText
              text={CIRCLE_TEXT}
              size={280}
              centerImage="/images/1.png"
              centerLabel={BRAND.name}
              duration={16}
              className="mb-8 md:mb-10"
            />

            <p className="mb-3 text-xs font-medium uppercase tracking-[0.4em] text-amber">
              Bienvenue
            </p>
            <h1 className="font-brand text-5xl text-noir md:text-7xl">{BRAND.name}</h1>
            <p className="mt-3 font-display text-lg italic text-noir/60 md:text-xl">
              {BRAND.tagline}
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="mt-6 max-w-md text-sm leading-relaxed text-noir/50"
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
