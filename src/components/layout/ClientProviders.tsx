"use client";

import dynamic from "next/dynamic";
import { WelcomeScreen } from "@/components/layout/WelcomeScreen";
import { PageTransition } from "@/components/layout/PageTransition";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { NavigationProvider } from "@/components/layout/NavigationProvider";
import { CartProvider } from "@/lib/cart-context";
import { WelcomeProvider, useWelcome } from "@/lib/welcome-context";

const CustomCursor = dynamic(
  () => import("@/components/layout/CustomCursor").then((m) => m.CustomCursor),
  { ssr: false },
);

const GlobalButterfly = dynamic(
  () => import("@/components/layout/GlobalButterfly").then((m) => m.GlobalButterfly),
  { ssr: false },
);

function AppContent({ children }: { children: React.ReactNode }) {
  const { isWelcomeComplete } = useWelcome();

  // Rien d'autre n'est rendu tant que le welcome n'est pas terminé.
  if (!isWelcomeComplete) return null;

  return (
    <>
      <PageTransition />
      <CustomCursor />
      <GlobalButterfly />
      <CartDrawer />
      {children}
    </>
  );
}

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <WelcomeProvider>
      <WelcomeScreen />
      <CartProvider>
        <NavigationProvider>
          <AppContent>{children}</AppContent>
        </NavigationProvider>
      </CartProvider>
    </WelcomeProvider>
  );
}
