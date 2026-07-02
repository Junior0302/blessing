"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Snap from "lenis/snap";
import { BRAND, NAV_LINKS } from "@/lib/constants";
import { GALLERY_SLIDES } from "@/lib/gallery-slides";
import { useNavigation } from "@/components/layout/NavigationProvider";

gsap.registerPlugin(ScrollTrigger);

const IMAGE_PARALLAX = { before: -50, after: 50 };
const TITLE_SCALE = { before: 1.45, after: 0.82 };

export function InfiniteGallery() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { startNavigation } = useNavigation();

  const slides = useMemo(() => [...GALLERY_SLIDES, ...GALLERY_SLIDES], []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    document.body.style.overflow = "hidden";

    const lenis = new Lenis({
      infinite: true,
      wrapper,
      content,
      syncTouch: true,
    });

    const snap = new Snap(lenis, {
      type: "mandatory",
      debounce: 500,
      duration: 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });

    ScrollTrigger.scrollerProxy(wrapper, {
      scrollTop(value?: number) {
        if (value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        } else {
          return lenis.scroll;
        }
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: wrapper.clientWidth,
          height: wrapper.clientHeight,
        };
      },
      pinType: "transform",
    });

    const sections = Array.from(content.querySelectorAll<HTMLElement>(".gallery-hero"));
    snap.addElements(sections, { align: "start" });

    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onLenisScroll);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      sections.forEach((hero) => {
        const image = hero.querySelector<HTMLElement>(".gallery-hero__image");
        const title = hero.querySelector<HTMLElement>(".gallery-hero__title");
        if (!image) return;

        const shared = {
          ease: "none" as const,
          scrollTrigger: {
            scroller: wrapper,
            trigger: hero,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            fastScrollEnd: true,
          },
        };

        gsap.set(image, { yPercent: IMAGE_PARALLAX.before });
        gsap.fromTo(
          image,
          { yPercent: IMAGE_PARALLAX.before },
          { yPercent: IMAGE_PARALLAX.after, ...shared },
        );

        if (title) {
          gsap.set(title, { scale: TITLE_SCALE.before });
          gsap.fromTo(
            title,
            { scale: TITLE_SCALE.before },
            { scale: TITLE_SCALE.after, ...shared },
          );
        }
      });
    }, content);

    const refresh = () => ScrollTrigger.refresh();
    const refreshTimer = window.setTimeout(refresh, 600);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("load", refresh);
      ctx.revert();
      gsap.ticker.remove(onTick);
      lenis.off("scroll", onLenisScroll);
      ScrollTrigger.scrollerProxy(wrapper, {});
      snap.destroy();
      lenis.destroy();
      document.body.style.overflow = "";
    };
  }, []);

  const handleNav = (href: string) => {
    if (href !== "/galerie") startNavigation();
  };

  return (
    <div className="gallery-page fixed inset-0 z-30 bg-noir text-cream">
      <header className="gallery-header pointer-events-none fixed inset-x-0 top-0 z-[60] flex items-center justify-between bg-gradient-to-b from-noir/85 to-transparent px-5 py-4 md:px-8">
        <Link
          href="/"
          onClick={() => handleNav("/")}
          className="pointer-events-auto font-brand text-2xl tracking-wide text-cream md:text-3xl"
        >
          {BRAND.name}
        </Link>
        <nav
          className="pointer-events-auto hidden items-center gap-6 lg:flex"
          aria-label="Navigation galerie"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => handleNav(link.href)}
              className={`text-[10px] font-medium uppercase tracking-[0.2em] transition-colors hover:text-amber-light ${
                link.href === "/galerie" ? "text-amber" : "text-cream/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      <div ref={wrapperRef} className="gallery-wrapper relative h-[100svh] overflow-hidden">
        <div ref={contentRef} className="gallery-content relative">
          {slides.map((slide, index) => (
            <section
              key={`${slide.image}-${index}`}
              className="gallery-hero relative grid h-[100svh] w-full place-items-center overflow-clip"
              aria-label={slide.title}
            >
              <div className="gallery-hero__image absolute inset-0 z-0 will-change-transform">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-noir/20 to-noir/35" />
              </div>

              <div className="gallery-hero__title relative z-10 mx-auto max-w-3xl px-6 text-center will-change-transform">
                <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.4em] text-amber-light">
                  {slide.tag}
                </p>
                <h2 className="font-display text-5xl font-light leading-tight md:text-7xl lg:text-8xl">
                  {slide.title}
                </h2>
                <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-cream/75 md:text-base">
                  {slide.caption}
                </p>
              </div>
            </section>
          ))}
        </div>
      </div>

      <footer className="gallery-footer pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex justify-center bg-gradient-to-t from-noir/80 to-transparent px-5 py-4">
        <p className="text-[10px] uppercase tracking-[0.35em] text-cream/45">
          Défilement infini · Parallaxe GSAP · Lenis
        </p>
      </footer>
    </div>
  );
}
