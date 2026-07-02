"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";

export function ReserverPageContent() {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <PageShell decorImage="/images/8.png" decorOpacity={0.3}>
      <section className="relative z-10 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-card lg:order-2"
            >
              <Image
                src="/images/2.png"
                alt="Ambiance Blessing"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            <div className="lg:order-1">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-amber">
                Réserver
              </p>
              <h1 className="font-display text-4xl font-light md:text-5xl">
                Votre table
                <br />
                <span className="italic text-amber">vous attend</span>
              </h1>
              <p className="mt-6 text-noir/65">
                Réservez pour une expérience sur place dans notre espace chaleureux
                et raffiné. Confirmation immédiate (simulation).
              </p>

              {confirmed ? (
                <GlassCard variant="light" hover={false} className="mt-8 text-center">
                  <p className="font-display text-2xl text-amber">Réservation confirmée</p>
                  <p className="mt-3 text-sm text-noir/60">
                    Nous avons bien enregistré votre demande. À très bientôt chez Blessing.
                  </p>
                </GlassCard>
              ) : (
                <GlassCard variant="light" hover={false} className="mt-8">
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setConfirmed(true);
                    }}
                  >
                    <div>
                      <label htmlFor="name" className="mb-1 block text-xs uppercase tracking-wider text-noir/50">
                        Nom
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        className="w-full rounded-xl border border-noir/15 bg-white/80 px-4 py-3 text-sm outline-none focus:border-amber"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label htmlFor="date" className="mb-1 block text-xs uppercase tracking-wider text-noir/50">
                        Date
                      </label>
                      <input
                        id="date"
                        type="date"
                        required
                        className="w-full rounded-xl border border-noir/15 bg-white/80 px-4 py-3 text-sm outline-none focus:border-amber"
                      />
                    </div>
                    <div>
                      <label htmlFor="guests" className="mb-1 block text-xs uppercase tracking-wider text-noir/50">
                        Convives
                      </label>
                      <select
                        id="guests"
                        className="w-full rounded-xl border border-noir/15 bg-white/80 px-4 py-3 text-sm outline-none focus:border-amber"
                      >
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n}>
                            {n} personne{n > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Button variant="primary" size="lg" className="w-full sm:w-auto">
                      Confirmer la réservation
                    </Button>
                  </form>
                </GlassCard>
              )}
            </div>
          </div>

          <section className="mt-24 rounded-3xl border border-noir/8 bg-white/55 p-8 md:p-12">
            <h2 className="font-display text-2xl">Informations pratiques</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {[
                { title: "Horaires", text: "Mar – Dim, 9h – 20h. Brunch le week-end dès 9h." },
                { title: "Accès", text: "Métro ligne 1, station Palais-Royal. Parking à proximité." },
                { title: "Groupes", text: "Réservations de 6+ personnes sur demande par e-mail." },
              ].map((info) => (
                <div key={info.title}>
                  <h3 className="text-sm font-medium uppercase tracking-wider text-amber">{info.title}</h3>
                  <p className="mt-2 text-sm text-noir/60">{info.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-24">
            <h2 className="mb-10 font-display text-3xl font-light">Types de réservation</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { title: "Table standard", text: "2 à 4 personnes, durée libre. Idéal pour un brunch ou un goûter." },
                { title: "Coin salon", text: "Fauteuils confortables pour 2, ambiance intimiste et feutrée." },
                { title: "Événement privé", text: "Privatisation partielle ou totale. Menu et déco sur mesure." },
              ].map((item) => (
                <GlassCard key={item.title} variant="light" hover={false}>
                  <h3 className="font-display text-xl text-amber">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-noir/60">{item.text}</p>
                </GlassCard>
              ))}
            </div>
          </section>

          <section className="mt-24 grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-light">
                Ce qui vous
                <br />
                <span className="italic text-amber">attend</span>
              </h2>
              <p className="mt-6 leading-relaxed text-noir/65">
                À votre arrivée, notre équipe vous guide vers votre table. Serviettes en
                lin, eau infusée aux agrumes et menu du jour vous sont présentés.
              </p>
              <p className="mt-4 leading-relaxed text-noir/55">
                Nous nous adaptons à vos préférences : sans gluten, sans lactose, vegan
                sur certaines créations. Mentionnez-le lors de la réservation.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card">
              <Image src="/images/5.png" alt="Table dressée Blessing" fill className="object-cover" sizes="50vw" />
            </div>
          </section>

          <section className="mt-24">
            <h2 className="mb-10 font-display text-3xl font-light">Occasions spéciales</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                { title: "Anniversaire", text: "Bougie, message personnalisé sur assiette et création surprise offerte." },
                { title: "Demande en mariage", text: "Décoration discrète, champagne sans alcool et dessert signature." },
                { title: "Brunch entre amis", text: "Formule partagée, pancakes à volonté le week-end." },
                { title: "Pause gourmande solo", text: "Un coin calme, wifi et prises — parfait pour travailler en douceur." },
              ].map((item) => (
                <GlassCard key={item.title} variant="light" hover={false}>
                  <h3 className="font-display text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm text-noir/60">{item.text}</p>
                </GlassCard>
              ))}
            </div>
          </section>
        </div>
      </section>
    </PageShell>
  );
}
