"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { DecorBackground } from "@/components/layout/DecorBackground";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

const values = [
  {
    id: "card-passion",
    title: "Passion",
    text: "Chaque recette naît d'une obsession pour la perfection et le détail.",
  },
  {
    id: "card-savoir",
    title: "Savoir-faire",
    text: "Des techniques ancestrales sublimées par une vision contemporaine.",
  },
  {
    id: "card-matiere",
    title: "Matières",
    text: "Ingrédients d'exception, sourcés avec exigence et respect.",
  },
];

const timeline = [
  { year: "2018", event: "Naissance de Blessing dans une petite rue parisienne." },
  { year: "2020", event: "Première médaille au concours national de pâtisserie." },
  { year: "2023", event: "Ouverture de notre atelier et élargissement de la carte." },
  { year: "2025", event: "Lancement de la commande en ligne et des ateliers." },
];

const craftSteps = [
  { title: "Sélection", text: "Chaque matin, nous choisissons les fruits, le beurre et le cacao du jour." },
  { title: "Préparation", text: "Pâtes reposées, sirop réduit, chocolat tempéré — rien n'est précipité." },
  { title: "Cuisson", text: "Pancakes et gaufres cuits à la commande, servis encore fumants." },
  { title: "Dressage", text: "Chaque assiette est composée à la main, comme une petite œuvre d'art." },
];

const team = [
  { name: "Élise M.", role: "Fondatrice & Chef pâtissière", bio: "Formée chez les plus grands, elle insuffle l'âme créative de Blessing." },
  { name: "Lucas B.", role: "Chef de cuisine sucrée", bio: "Spécialiste des textures et des équilibres, garant de notre signature chocolat." },
  { name: "Sarah K.", role: "Responsable salon", bio: "Elle veille à ce que chaque visite soit aussi chaleureuse que délicieuse." },
];

export function AboutContent() {
  return (
    <div className="relative min-h-screen text-noir">
      <DecorBackground image="/images/7.png" opacity={0.42} overlayStrength="soft" />

      <div className="relative z-10">
        <SiteHeader />

        <section className="px-5 pt-10 md:px-8 md:pt-14 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-amber">
                À propos
              </p>
              <h1 className="font-display text-4xl font-light leading-tight md:text-5xl lg:text-6xl">
                L&apos;élégance
                <br />
                <span className="italic text-amber">en mouvement</span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-noir/70 md:text-lg">
                Blessing est née d&apos;une conviction simple : le dessert est un art
                vivant. Le papillon qui accompagne votre navigation symbolise la
                légèreté, la précision et la beauté de nos créations.
              </p>
              <p className="mt-4 max-w-lg leading-relaxed text-noir/60">
                Faites défiler la page — il vous guide à travers notre univers de
                douceur, de la passion à la matière première.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-card"
            >
              <Image
                src="/images/6.png"
                alt="Création dessert Blessing"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </div>
        </section>

        <section className="px-5 py-12 md:px-8 lg:px-12">
          <ParallaxImage
            src="/images/4.png"
            alt="Coulis de chocolat"
            className="mx-auto aspect-[21/9] max-w-7xl rounded-3xl shadow-card"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-noir/45 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="font-display text-2xl text-cream md:text-3xl">Coulis de chocolat</p>
            </div>
          </ParallaxImage>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
            <h2 className="mb-10 font-display text-3xl font-light md:text-4xl">Nos valeurs</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {values.map((item) => (
                <GlassCard key={item.id} id={item.id} variant="light">
                  <h3 className="font-display text-2xl font-light">{item.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-noir/65">{item.text}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
            <h2 className="mb-12 font-display text-3xl font-light">Notre histoire</h2>
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 border-b border-noir/10 pb-8 last:border-0"
                >
                  <span className="font-display text-2xl text-amber">{item.year}</span>
                  <p className="pt-1 text-noir/65">{item.event}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24 md:pb-32">
          <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
            <GlassCard variant="light" hover={false} className="!bg-white/80">
              <p className="font-display text-2xl font-light italic leading-relaxed md:text-3xl">
                &ldquo;La vraie luxure, c&apos;est de prendre le temps de savourer
                l&apos;instant.&rdquo;
              </p>
              <footer className="mt-6 text-sm uppercase tracking-[0.2em] text-amber">
                — L&apos;équipe Blessing
              </footer>
            </GlassCard>
          </div>
        </section>

        <section className="pb-24 md:pb-32">
          <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="font-display text-3xl font-light md:text-4xl">
                  Un lieu pensé
                  <br />
                  <span className="text-amber">pour vous</span>
                </h2>
                <p className="mt-6 leading-relaxed text-noir/65">
                  Notre espace allie le raffinement d&apos;un café parisien à la
                  chaleur d&apos;une pâtisserie de quartier. Bois nobles, lumière
                  tamisée et parfums envoûtants vous accueillent dès le seuil.
                </p>
                <p className="mt-4 leading-relaxed text-noir/55">
                  Venez découvrir notre comptoir en marbre, nos fauteuils en velours
                  et la vue sur notre laboratoire ouvert. La transparence fait partie
                  de notre ADN.
                </p>
              </div>
              <GlassCard variant="light" hover={false}>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b border-noir/10 pb-3">
                    <span className="text-noir/50">Adresse</span>
                    <span>12 Rue des Délices, Paris</span>
                  </div>
                  <div className="flex justify-between border-b border-noir/10 pb-3">
                    <span className="text-noir/50">Horaires</span>
                    <span>Mar – Dim, 9h – 20h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-noir/50">Contact</span>
                    <span>bonjour@blessing.fr</span>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        <section className="pb-24 md:pb-32">
          <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
            <h2 className="mb-10 font-display text-3xl font-light">De la matière à l&apos;assiette</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {craftSteps.map((step, i) => (
                <GlassCard key={step.title} variant="light" hover={false}>
                  <span className="text-xs text-amber">0{i + 1}</span>
                  <h3 className="mt-2 font-display text-xl">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-noir/60">{step.text}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24 md:pb-32">
          <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
            <h2 className="mb-10 font-display text-3xl font-light">L&apos;équipe</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {team.map((member) => (
                <GlassCard key={member.name} variant="light" hover={false}>
                  <h3 className="font-display text-xl">{member.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-wider text-amber">{member.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-noir/60">{member.bio}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24 md:pb-32">
          <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card">
                <Image src="/images/1.png" alt="Création Blessing" fill className="object-cover" sizes="50vw" />
              </div>
              <div>
                <h2 className="font-display text-3xl font-light">
                  Une démarche
                  <br />
                  <span className="italic text-amber">responsable</span>
                </h2>
                <p className="mt-6 leading-relaxed text-noir/65">
                  Nous travaillons avec des producteurs locaux, limitons le gaspillage
                  alimentaire et privilégions des emballages recyclables pour nos
                  commandes à emporter.
                </p>
                <p className="mt-4 leading-relaxed text-noir/55">
                  Notre objectif : proposer le meilleur du gourmand tout en respectant
                  la planète et les hommes qui cultivent nos ingrédients.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer variant="light" />
      </div>
    </div>
  );
}
