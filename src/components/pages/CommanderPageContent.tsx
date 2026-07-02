"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { formatPrice } from "@/lib/products";

const orderModes = [
  {
    title: "À emporter",
    text: "Commandez en ligne, retirez en boutique sous 20 à 35 minutes. Emballage soigné et écologique.",
  },
  {
    title: "Sur place",
    text: "Ajoutez vos créations au panier et réglez à la caisse. Installez-vous dans notre salon.",
  },
  {
    title: "Livraison",
    text: "Dans un rayon de 3 km. Frais fixes de 3,50 €, livraison en 45 minutes environ (simulation).",
  },
];

const popularCombos = [
  { name: "Brunch duo", items: "2 pancakes moyens + 2 smoothies", price: 28.5 },
  { name: "Chocolat lovers", items: "Pancakes coulis + milkshake cacao", price: 22.0 },
  { name: "Fruits & fraîcheur", items: "Gaufre fruits + smoothie mangue", price: 24.5 },
];

export function CommanderPageContent() {
  const { openCart, itemCount, summary } = useCart();

  return (
    <PageShell decorImage="/images/3.png" decorOpacity={0.33}>
      <section className="relative z-10 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-amber">
              Commander
            </p>
            <h1 className="font-display text-4xl font-light md:text-5xl">
              Votre commande
            </h1>
            <p className="mt-6 text-noir/65">
              {itemCount > 0
                ? `Vous avez ${itemCount} article${itemCount > 1 ? "s" : ""} dans votre panier.`
                : "Parcourez nos créations et ajoutez vos favoris au panier."}
            </p>

            {itemCount > 0 && (
              <p className="mt-2 font-display text-2xl text-amber">
                Total estimé : {formatPrice(summary.total)}
              </p>
            )}

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button variant="primary" size="lg" onClick={openCart}>
                {itemCount > 0 ? "Voir le panier" : "Ouvrir le panier"}
              </Button>
              <Button variant="outline" size="lg" href="/creations" className="!border-noir/20 !text-noir">
                Parcourir le menu
              </Button>
            </div>
          </motion.div>

          <section className="mt-24">
            <h2 className="mb-10 text-center font-display text-3xl font-light">Modes de commande</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {orderModes.map((mode) => (
                <GlassCard key={mode.title} variant="light" hover={false}>
                  <h3 className="font-display text-xl text-amber">{mode.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-noir/60">{mode.text}</p>
                </GlassCard>
              ))}
            </div>
          </section>

          <section className="mt-24 grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card">
              <Image src="/images/6.png" alt="Commande Blessing" fill className="object-cover" sizes="50vw" />
            </div>
            <div>
              <h2 className="font-display text-3xl font-light">Comment ça marche</h2>
              <ol className="mt-6 space-y-4 text-sm leading-relaxed text-noir/65">
                <li className="flex gap-4">
                  <span className="font-display text-lg text-amber">1</span>
                  <span>Choisissez vos créations sur la page Menu et sélectionnez la taille souhaitée.</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-display text-lg text-amber">2</span>
                  <span>Ajoutez au panier, personnalisez avec un message (allergies, instructions).</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-display text-lg text-amber">3</span>
                  <span>Vérifiez le récapitulatif : sous-total, livraison, TVA 10% et total TTC.</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-display text-lg text-amber">4</span>
                  <span>Confirmez et payez (simulation). Votre commande est enregistrée instantanément.</span>
                </li>
              </ol>
            </div>
          </section>

          <section className="mt-24">
            <h2 className="mb-10 font-display text-3xl font-light">Combos populaires</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {popularCombos.map((combo) => (
                <GlassCard key={combo.name} variant="light" hover={false}>
                  <h3 className="font-display text-xl">{combo.name}</h3>
                  <p className="mt-2 text-sm text-noir/55">{combo.items}</p>
                  <p className="mt-4 font-display text-2xl text-amber">{formatPrice(combo.price)}</p>
                </GlassCard>
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-noir/45">
              Ajoutez chaque produit individuellement depuis la page Créations.
            </p>
          </section>

          <section className="mt-24 rounded-2xl border border-noir/8 bg-white/60 p-6 md:p-10">
            <p className="font-medium text-noir">Simulation de commande</p>
            <ul className="mt-4 grid gap-2 text-sm text-noir/55 sm:grid-cols-2">
              <li>• Prix TTC avec TVA 10%</li>
              <li>• Frais de livraison : {formatPrice(3.5)}</li>
              <li>• Paiement par carte ou sur place</li>
              <li>• Message personnalisé pour chaque commande</li>
              <li>• Retrait en boutique sans frais</li>
              <li>• Confirmation immédiate (démo)</li>
            </ul>
          </section>
        </div>
      </section>
    </PageShell>
  );
}
