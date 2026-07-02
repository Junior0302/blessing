"use client";

import dynamic from "next/dynamic";
import { WelcomeScreen } from "@/components/layout/WelcomeScreen";
import { PageTransition } from "@/components/layout/PageTransition";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { NavigationProvider } from "@/components/layout/NavigationProvider";
import { CartProvider } from "@/lib/cart-context";

const CustomCursor = dynamic(
  () => import("@/components/layout/CustomCursor").then((m) => m.CustomCursor),
  { ssr: false },
);

const GlobalButterfly = dynamic(
  () => import("@/components/layout/GlobalButterfly").then((m) => m.GlobalButterfly),
  { ssr: false },
);

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <NavigationProvider>
        <WelcomeScreen />
        <PageTransition />
        <CustomCursor />
        <GlobalButterfly />
        <CartDrawer />
        {children}
      </NavigationProvider>
    </CartProvider>
  );
}
