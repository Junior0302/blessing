"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Orbes lumineux ambrés flottant doucement en arrière-plan —
 * évoque le miel, le caramel et la vapeur sucrée.
 */
export function FloatingDecor({ variant = "light" }: { variant?: "light" | "dark" }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".decor-orb").forEach((orb, i) => {
        gsap.to(orb, {
          y: "random(-45, 45)",
          x: "random(-35, 35)",
          scale: "random(0.85, 1.15)",
          duration: "random(7, 12)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.6,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const opacityClass = variant === "dark" ? "opacity-100" : "opacity-80";

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${opacityClass}`}
      aria-hidden="true"
    >
      <div className="decor-orb absolute left-[6%] top-[12%] h-44 w-44 rounded-full bg-amber/12 blur-3xl" />
      <div className="decor-orb absolute right-[10%] top-[30%] h-60 w-60 rounded-full bg-gold/12 blur-3xl" />
      <div className="decor-orb absolute bottom-[18%] left-[18%] h-52 w-52 rounded-full bg-amber/10 blur-3xl" />
      <div className="decor-orb absolute bottom-[8%] right-[22%] h-36 w-36 rounded-full bg-gold/14 blur-2xl" />
    </div>
  );
}
