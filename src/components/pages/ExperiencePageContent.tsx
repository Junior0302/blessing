"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PageShell } from "@/components/layout/PageShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

const highlights = [
  { label: "Ingrédients", value: "100% sélectionnés" },
  { label: "Préparation", value: "Artisanale quotidienne" },
  { label: "Ambiance", value: "Premium & chaleureuse" },
];

const testimonials = [
  {
    quote: "Le coulis de chocolat est une révélation. Onctueux, intense, parfaitement équilibré.",
    author: "Marie L.",
  },
  {
    quote: "Une expérience sensorielle complète. L'ambiance, le service, les saveurs — tout est au top.",
    author: "Thomas R.",
  },
  {
    quote: "Le brunch du dimanche est devenu notre rituel. Pancakes dorés, café filtre, musique douce.",
    author: "Camille D.",
  },
];

const sensoryJourney = [
  { sense: "Vue", text: "Assiettes dressées comme des œuvres, couleurs chaudes et lumière dorée." },
  { sense: "Odorat", text: "Beurre noisette, vanille, cacao — des parfums qui annoncent le plaisir." },
  { sense: "Toucher", text: "Textures contrastées : croustillant, fondant, crémeux, aérien." },
  { sense: "Goût", text: "Équilibre sucré-salé, intensité maîtrisée, finale longue et élégante." },
];

export function ExperiencePageContent() {
  return (
    <PageShell decorImage="/images/4.png" decorOpacity={0.4}>
      <section className="relative z-10 overflow-hidden py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 max-w-2xl"
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-amber">
              L&apos;expérience
            </p>
            <h1 className="font-display text-4xl font-light md:text-5xl lg:text-6xl">
              Un moment
              <br />
              <span className="italic text-amber">hors du temps</span>
            </h1>
          </motion.div>

          <ParallaxImage
            src="/images/4.png"
            alt="Pancakes au coulis de chocolat"
            priority
            className="mb-16 aspect-[16/9] rounded-3xl shadow-card md:aspect-[21/9]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-noir/50 via-noir/10 to-transparent" />
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
              <p className="text-xs uppercase tracking-[0.3em] text-cream/80">Notre signature</p>
              <p className="mt-1 font-display text-3xl text-cream md:text-4xl">Coulis de chocolat</p>
            </div>
          </ParallaxImage>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-noir/70">
                Entrez dans un univers où chaque détail a été pensé pour éveiller vos
                sens. Le coulis de chocolat fondant, les textures soyeuses et les
                saveurs intenses composent une expérience inoubliable.
              </p>
              <p className="leading-relaxed text-noir/60">
                Notre chocolat noir 70% est tempéré chaque matin. Le coulis est versé
                à la main en zigzag sur des pancakes encore fumants. L&apos;équilibre
                entre l&apos;amertume du cacao et la douceur de la pâte est notre
                signature.
              </p>
            </div>
            <GlassCard variant="light" hover={false}>
              <div className="space-y-6">
                {highlights.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-baseline justify-between border-b border-noir/10 pb-4 last:border-0"
                  >
                    <span className="text-sm uppercase tracking-widest text-noir/50">{stat.label}</span>
                    <span className="font-display text-xl md:text-2xl">{stat.value}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          <div className="mt-20 grid gap-6 md:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-soft">
              <Image src="/images/5.png" alt="Brunch Blessing" fill className="object-cover" sizes="50vw" />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-soft">
              <Image src="/images/2.png" alt="Création fruits et sirop" fill className="object-cover" sizes="50vw" />
            </div>
          </div>

          <section className="mt-24">
            <h2 className="mb-10 font-display text-3xl font-light">Ce qu&apos;ils en disent</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {testimonials.map((t) => (
                <GlassCard key={t.author} variant="light" hover={false}>
                  <p className="font-display text-lg italic leading-relaxed text-noir/75">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-widest text-amber">{t.author}</p>
                </GlassCard>
              ))}
            </div>
          </section>

          <section className="mt-24 rounded-3xl border border-noir/8 bg-white/55 p-8 md:p-12">
            <h2 className="font-display text-2xl md:text-3xl">L&apos;art de recevoir</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-noir/65">
              Bois nobles, lumière tamisée, vaisselle soignée. Chaque table est dressée
              avec attention. Notre équipe connaît vos préférences et anticipe vos envies.
              Que ce soit pour un brunch entre amis ou un moment en solo, Blessing vous
              accueille dans un cocon de douceur.
            </p>
            <p className="mt-4 max-w-3xl leading-relaxed text-noir/65">
              Nous proposons également des ateliers pâtisserie le week-end. Apprenez à
              réaliser nos pancakes signature et repartez avec nos secrets de chef.
            </p>
          </section>

          <section className="mt-24">
            <h2 className="mb-10 font-display text-3xl font-light">Voyage sensoriel</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {sensoryJourney.map((item) => (
                <GlassCard key={item.sense} variant="light" hover={false}>
                  <span className="text-xs uppercase tracking-[0.25em] text-amber">{item.sense}</span>
                  <p className="mt-3 text-sm leading-relaxed text-noir/65">{item.text}</p>
                </GlassCard>
              ))}
            </div>
          </section>

          <section className="mt-24 grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card">
              <Image src="/images/8.png" alt="Brunch du week-end" fill className="object-cover" sizes="50vw" />
            </div>
            <div>
              <h2 className="font-display text-3xl font-light">
                Brunch
                <br />
                <span className="italic text-amber">du week-end</span>
              </h2>
              <p className="mt-6 leading-relaxed text-noir/65">
                Chaque samedi et dimanche, de 9h à 14h, découvrez notre formule brunch :
                pancakes à volonté, jus pressés, café de spécialité et une sélection de
                viennoiseries maison.
              </p>
              <p className="mt-4 leading-relaxed text-noir/55">
                Réservez à l&apos;avance les week-ends chargés. Nous accueillons aussi les
                groupes de 4 à 8 personnes sur demande.
              </p>
            </div>
          </section>

          <section className="mt-24 rounded-3xl border border-noir/8 bg-white/60 p-8 md:p-12">
            <h2 className="font-display text-2xl md:text-3xl">Événements privés</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-noir/65">
              Anniversaires, team building, dégustations privées — notre espace se transforme
              pour vos moments spéciaux. Menu sur mesure, animation pâtisserie et service
              dédié pour une expérience mémorable.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                { title: "Dégustation", text: "Parcours de 5 créations commentées par notre chef." },
                { title: "Atelier", text: "2h pour apprendre nos techniques et repartir avec vos créations." },
                { title: "Privatisation", text: "Espace entier réservé pour 15 à 40 convives." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-noir/8 bg-cream/50 p-5">
                  <h3 className="font-display text-lg text-amber">{item.title}</h3>
                  <p className="mt-2 text-sm text-noir/60">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-16 text-center">
            <Button variant="primary" size="lg" href="/reserver">
              Réserver une table
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
