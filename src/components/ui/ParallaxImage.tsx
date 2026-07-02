"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Overlays (dégradés, légendes) rendus par-dessus l'image */
  children?: ReactNode;
}

/** Image avec léger défilement parallaxe au scroll (GSAP ScrollTrigger). */
export function ParallaxImage({
  src,
  alt,
  className = "",
  sizes = "100vw",
  priority = false,
  children,
}: ParallaxImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerRef.current,
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        },
      );
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      <div ref={innerRef} className="absolute inset-x-0 -inset-y-[10%]">
        <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} priority={priority} />
      </div>
      {children}
    </div>
  );
}
