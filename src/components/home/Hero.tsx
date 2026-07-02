"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/lib/constants";
import { HeroHeader } from "@/components/layout/HeroHeader";
import { FloatingDecor } from "@/components/ui/FloatingDecor";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-eyebrow", { opacity: 0, y: 20, duration: 0.8, delay: 0.3 })
        .from(".hero-title", { opacity: 0, y: 40, duration: 1 }, "-=0.5")
        .from(".hero-desc", { opacity: 0, y: 24, duration: 0.8 }, "-=0.6")
        .from(".hero-cta", { opacity: 0, y: 20, duration: 0.7, stagger: 0.12 }, "-=0.4");

      // Ken Burns : zoom cinématique très lent sur la vidéo, en boucle
      gsap.to(videoRef.current, {
        scale: 1.08,
        duration: 22,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const play = () => video.play().catch(() => {});
    play();
    video.addEventListener("canplay", play);
    return () => video.removeEventListener("canplay", play);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[100dvh] min-h-[600px] w-full overflow-hidden bg-noir"
    >
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="h-full w-full object-cover will-change-transform"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-noir/45 via-noir/25 to-noir/55" />
        <FloatingDecor variant="dark" />
      </div>

      <HeroHeader />

      <section
        className="relative z-10 flex h-full items-center justify-center px-5 md:px-8"
        aria-label="Accueil"
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="hero-eyebrow mb-4 text-xs font-medium uppercase tracking-[0.35em] text-gold md:text-sm">
            {BRAND.tagline}
          </p>
          <h1 className="hero-title font-display text-5xl font-light leading-[1.1] tracking-wide text-cream sm:text-6xl md:text-7xl lg:text-8xl">
            Chaque bouchée,
            <br />
            <span className="text-gradient-gold italic">une émotion</span>
          </h1>
          <p className="hero-desc mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/90 md:mt-8 md:text-lg">
            {BRAND.description}
          </p>
          <div className="hero-cta mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-12">
            <Button variant="primary" size="lg" href="/creations">
              Découvrir nos créations
            </Button>
            <Button variant="secondary" size="lg" href="/about">
              Notre histoire
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
