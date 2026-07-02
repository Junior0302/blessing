"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  id?: string;
  dataLandable?: boolean;
  variant?: "dark" | "light";
}

export function GlassCard({
  children,
  className = "",
  hover = true,
  id,
  dataLandable,
  variant = "light",
}: GlassCardProps) {
  const isLight = variant === "light";

  return (
    <motion.article
      id={id}
      data-landable={dataLandable ? "true" : undefined}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={
        hover
          ? { y: -4, transition: { duration: 0.35, ease: "easeOut" } }
          : undefined
      }
      className={`rounded-2xl p-6 shadow-card md:p-8 ${
        isLight
          ? "border border-noir/8 bg-white/75 backdrop-blur-md"
          : "glass shadow-glass"
      } ${className}`}
    >
      {children}
    </motion.article>
  );
}
