"use client";

import { useMemo } from "react";
import Image from "next/image";

interface CircularTextProps {
  text: string;
  size?: number;
  centerImage?: string;
  centerLabel?: string;
  duration?: number;
  reverse?: boolean;
  className?: string;
}

/**
 * Texte tournant en cercle autour d'une image centrale.
 * Inspiré de https://codepen.io/pedroo-andre/pen/gOeqqEb
 */
export function CircularText({
  text,
  size = 240,
  centerImage,
  centerLabel,
  duration = 14,
  reverse = false,
  className = "",
}: CircularTextProps) {
  const radius = size / 2;
  const innerSize = Math.round(size * 0.68);

  const letters = useMemo(() => {
    const chars = text.split("");
    const step = 360 / chars.length;
    return chars.map((char, index) => ({
      char: char === " " ? "\u00A0" : char,
      rotation: index * step,
    }));
  }, [text]);

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-hidden={!centerLabel}
    >
      <div
        className={`circular-text-ring absolute inset-0 ${reverse ? "circular-text-ring--reverse" : ""}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {letters.map((item, index) => (
          <span
            key={`${item.char}-${index}`}
            className="circular-text-char absolute left-1/2 text-[9px] font-medium uppercase tracking-[0.28em] text-amber md:text-[10px]"
            style={{
              transform: `rotate(${item.rotation}deg)`,
              transformOrigin: `0 ${radius}px`,
            }}
          >
            {item.char}
          </span>
        ))}
      </div>

      {centerImage ? (
        <div
          className="relative z-10 overflow-hidden rounded-full border border-amber/25 shadow-card ring-2 ring-cream/80"
          style={{ width: innerSize, height: innerSize }}
        >
          <Image
            src={centerImage}
            alt={centerLabel ?? ""}
            fill
            className="object-cover"
            sizes="180px"
            priority
          />
        </div>
      ) : centerLabel ? (
        <span className="relative z-10 font-brand text-3xl text-noir md:text-4xl">
          {centerLabel}
        </span>
      ) : null}
    </div>
  );
}
