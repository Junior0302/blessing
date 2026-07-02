"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface NavigationContextValue {
  isNavigating: boolean;
  startNavigation: () => void;
  endNavigation: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  closeMobileMenu: () => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [isNavigating, setIsNavigating] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const startNavigation = useCallback(() => {
    setIsNavigating(true);
    // L'overlay de transition opaque couvre l'écran : on peut fermer
    // le menu immédiatement sans que l'utilisateur ne le voie.
    setMobileMenuOpen(false);
  }, []);

  const endNavigation = useCallback(() => {
    setIsNavigating(false);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      isNavigating,
      startNavigation,
      endNavigation,
      mobileMenuOpen,
      setMobileMenuOpen,
      closeMobileMenu,
    }),
    [isNavigating, startNavigation, endNavigation, mobileMenuOpen, closeMobileMenu],
  );

  return (
    <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return ctx;
}
