"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PageShell } from "@/components/layout/PageShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { PRODUCTS, formatPrice, type ProductSize } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

function ProductCard({ product }: { product: (typeof PRODUCTS)[0] }) {
  const { addItem } = useCart();
  const [size, setSize] = useState<ProductSize>("moyen");
  const selected = product.sizes.find((s) => s.id === size)!;

  return (
    <GlassCard variant="light" className="overflow-hidden !p-0">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>
      <div className="p-6 md:p-8">
        <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-gold">
          {product.accent}
        </span>
        <h2 className="mt-2 font-display text-2xl font-light md:text-3xl">{product.name}</h2>
        <p className="mt-2 text-sm text-noir/65">{product.description}</p>
        <p className="mt-3 text-xs leading-relaxed text-noir/50">{product.longDescription}</p>

        <div className="mt-5">
          <p className="mb-2 text-xs uppercase tracking-wider text-noir/45">Taille & poids</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSize(s.id)}
                className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
                  size === s.id
                    ? "bg-amber text-cream"
                    : "border border-noir/15 text-noir/60 hover:border-amber"
                }`}
              >
                {s.label} · {s.weight}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="font-display text-2xl text-amber">{formatPrice(selected.price)}</span>
          <Button variant="primary" size="md" onClick={() => addItem(product.id, size)}>
            Ajouter au panier
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}

const processSteps = [
  { step: "01", title: "Sélection", text: "Choisissez vos créations et la taille souhaitée." },
  { step: "02", title: "Personnalisation", text: "Ajoutez un message ou des instructions spéciales." },
  { step: "03", title: "Paiement", text: "Réglez en toute sécurité — simulation incluse." },
  { step: "04", title: "Dégustation", text: "Recevez ou retirez votre commande fraîche." },
];

const seasonalHighlights = [
  {
    title: "Printemps",
    text: "Fraises Gariguette, rhubarbe confite et sirop d'agrumes pour des pancakes légers et parfumés.",
    image: "/images/3.png",
  },
  {
    title: "Été",
    text: "Fruits rouges glacés, coulis de mangue et chantilly vanille Bourbon pour des milkshakes rafraîchissants.",
    image: "/images/5.png",
  },
  {
    title: "Automne",
    text: "Noisettes torréfiées, caramel beurre salé et pommes caramélisées sur nos gaufres signature.",
    image: "/images/7.png",
  },
];

const ingredients = [
  { name: "Beurre AOP", detail: "Beurre de baratte, notes de noisette, fondant en bouche." },
  { name: "Chocolat 70%", detail: "Cacao grand cru, tempéré chaque matin pour un coulis brillant." },
  { name: "Fruits de saison", detail: "Sélectionnés chaque jour chez nos producteurs partenaires." },
  { name: "Farine premium", detail: "Moulue à froid pour une pâte aérienne et moelleuse." },
];

const faq = [
  {
    q: "Puis-je modifier une commande après validation ?",
    a: "Oui, dans les 15 minutes suivant la confirmation. Contactez-nous via le message de commande.",
  },
  {
    q: "Proposez-vous des options sans gluten ?",
    a: "Certaines créations peuvent être adaptées sur demande. Précisez-le dans votre message.",
  },
  {
    q: "Quels sont les délais de retrait ?",
    a: "Comptez 20 à 35 minutes selon l'affluence. Vous recevrez une confirmation (simulation).",
  },
];

export function CreationsPageContent() {
  return (
    <PageShell decorImage="/images/1.png" decorOpacity={0.32}>
      <section className="relative z-10 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 max-w-2xl"
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-amber">
              Nos créations
            </p>
            <h1 className="font-display text-4xl font-light md:text-5xl lg:text-6xl">
              L&apos;excellence
              <br />
              <span className="italic text-amber">dans chaque détail</span>
            </h1>
            <p className="mt-6 text-noir/65">
              Chaque produit est disponible en plusieurs tailles. Poids indiqué,
              prix transparent, qualité artisanale.
            </p>
          </motion.div>

          <div className="grid gap-10 sm:grid-cols-2">
            {PRODUCTS.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <section className="mt-24">
            <h2 className="mb-10 font-display text-3xl font-light">Comment commander</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((item) => (
                <GlassCard key={item.step} variant="light" hover={false}>
                  <span className="text-xs text-amber">{item.step}</span>
                  <h3 className="mt-2 font-display text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm text-noir/55">{item.text}</p>
                </GlassCard>
              ))}
            </div>
          </section>

          <section className="mt-24 rounded-3xl border border-noir/8 bg-white/60 p-8 md:p-12">
            <h2 className="font-display text-2xl md:text-3xl">Notre philosophie</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-noir/65">
              Chez Blessing, chaque gramme compte. Nos pâtissiers sélectionnent les
              matières premières chaque matin, pèsent chaque portion avec précision et
              veillent à ce que la présentation soit aussi belle que le goût. Du petit
              déjeuner gourmand au dessert d&apos;exception, nous créons des moments
              mémorables.
            </p>
            <p className="mt-4 max-w-3xl leading-relaxed text-noir/65">
              Nos recettes évoluent au fil des saisons. Fruits d&apos;été, épices
              d&apos;hiver, chocolat grand cru toute l&apos;année — la carte s&apos;adapte
              pour vous offrir le meilleur à chaque visite.
            </p>
          </section>

          <section className="mt-24">
            <h2 className="mb-4 font-display text-3xl font-light">Au fil des saisons</h2>
            <p className="mb-10 max-w-2xl text-noir/60">
              Notre carte vit au rythme du calendrier. Chaque saison inspire de nouvelles
              associations de saveurs, toujours dans l&apos;esprit gourmand et raffiné de Blessing.
            </p>
            <div className="grid gap-8 md:grid-cols-3">
              {seasonalHighlights.map((item) => (
                <GlassCard key={item.title} variant="light" className="overflow-hidden !p-0">
                  <div className="relative aspect-[4/3]">
                    <Image src={item.image} alt={item.title} fill className="object-cover" sizes="33vw" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl text-amber">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-noir/60">{item.text}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </section>

          <section className="mt-24">
            <h2 className="mb-10 font-display text-3xl font-light">Matières d&apos;exception</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {ingredients.map((item) => (
                <GlassCard key={item.name} variant="light" hover={false}>
                  <h3 className="font-display text-xl">{item.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-noir/60">{item.detail}</p>
                </GlassCard>
              ))}
            </div>
          </section>

          <section className="mt-24 rounded-3xl border border-noir/8 bg-white/55 p-8 md:p-12">
            <h2 className="font-display text-2xl md:text-3xl">Questions fréquentes</h2>
            <div className="mt-8 space-y-6">
              {faq.map((item) => (
                <div key={item.q} className="border-b border-noir/10 pb-6 last:border-0">
                  <h3 className="font-medium text-noir">{item.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-noir/60">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </PageShell>
  );
}
