"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getLineDetails,
    summary,
    orderMessage,
    setOrderMessage,
    placeOrder,
    orderPlaced,
    itemCount,
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash">("card");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[180] bg-noir/40 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed inset-y-0 right-0 z-[190] flex w-full max-w-md flex-col bg-cream shadow-2xl"
            role="dialog"
            aria-label="Panier"
          >
            <div className="flex items-center justify-between border-b border-noir/10 px-6 py-5">
              <h2 className="font-display text-2xl font-light">
                Panier
                {itemCount > 0 && (
                  <span className="ml-2 text-sm text-amber">({itemCount})</span>
                )}
              </h2>
              <button
                type="button"
                onClick={closeCart}
                className="text-2xl text-noir/50 hover:text-noir"
                aria-label="Fermer le panier"
              >
                ×
              </button>
            </div>

            {orderPlaced ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber/15">
                  <span className="text-2xl text-amber">✓</span>
                </div>
                <h3 className="font-display text-2xl">Commande confirmée</h3>
                <p className="mt-3 text-sm text-noir/60">
                  Merci ! Votre commande a été enregistrée. Vous recevrez une
                  confirmation par e-mail (simulation).
                </p>
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <p className="text-noir/50">Votre panier est vide</p>
                <Button variant="primary" size="md" href="/creations" className="mt-6" onClick={closeCart}>
                  Voir nos créations
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <ul className="space-y-4">
                    {items.map((item) => {
                      const details = getLineDetails(item);
                      if (!details) return null;
                      return (
                        <li
                          key={item.key}
                          className="flex gap-4 rounded-2xl border border-noir/8 bg-white/70 p-4"
                        >
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                            <Image
                              src={details.product.image}
                              alt={details.product.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-noir">{details.product.name}</p>
                            <p className="text-xs text-noir/50">
                              {details.sizeLabel} · {details.weight}
                            </p>
                            <p className="mt-1 text-sm text-amber">
                              {formatPrice(details.unitPrice)}
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.key, item.quantity - 1)}
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-noir/15 text-sm"
                                disabled={item.quantity <= 1}
                              >
                                −
                              </button>
                              <span className="w-6 text-center text-sm">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.key, item.quantity + 1)}
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-noir/15 text-sm"
                              >
                                +
                              </button>
                              <button
                                type="button"
                                onClick={() => removeItem(item.key)}
                                className="ml-auto text-xs text-noir/40 hover:text-amber"
                              >
                                Retirer
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-6">
                    <label htmlFor="order-msg" className="mb-2 block text-xs uppercase tracking-wider text-noir/50">
                      Message pour la commande
                    </label>
                    <textarea
                      id="order-msg"
                      value={orderMessage}
                      onChange={(e) => setOrderMessage(e.target.value)}
                      placeholder="Allergie, instructions spéciales…"
                      rows={3}
                      className="w-full resize-none rounded-xl border border-noir/15 bg-white/80 px-4 py-3 text-sm outline-none focus:border-amber"
                    />
                  </div>

                  <div className="mt-4">
                    <p className="mb-2 text-xs uppercase tracking-wider text-noir/50">Paiement</p>
                    <div className="flex gap-2">
                      {(["card", "cash"] as const).map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setPaymentMethod(m)}
                          className={`rounded-full px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
                            paymentMethod === m
                              ? "bg-amber text-cream"
                              : "border border-noir/15 text-noir/60"
                          }`}
                        >
                          {m === "card" ? "Carte" : "Sur place"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-noir/10 px-6 py-5">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-noir/60">
                      <span>Sous-total</span>
                      <span>{formatPrice(summary.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-noir/60">
                      <span>Livraison</span>
                      <span>{formatPrice(summary.delivery)}</span>
                    </div>
                    <div className="flex justify-between text-noir/60">
                      <span>TVA (10%)</span>
                      <span>{formatPrice(summary.tax)}</span>
                    </div>
                    <div className="flex justify-between border-t border-noir/10 pt-2 font-display text-xl">
                      <span>Total</span>
                      <span className="text-amber">{formatPrice(summary.total)}</span>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="lg"
                    className="mt-5 w-full"
                    onClick={placeOrder}
                  >
                    Confirmer et payer {formatPrice(summary.total)}
                  </Button>
                  <p className="mt-2 text-center text-[10px] text-noir/35">
                    Simulation — aucun paiement réel
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
