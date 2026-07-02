"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const [isNavigating, setIsNavigating] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const startNavigation = useCallback(() => {
    setIsNavigating(true);
    setMobileMenuOpen(false);
  }, []);

  const endNavigation = useCallback(() => {
    setIsNavigating(false);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // Filet de sécurité : la route a changé → on débloque toujours l'interface.
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      setIsNavigating(false);
      setMobileMenuOpen(false);
    }
  }, [pathname]);

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
