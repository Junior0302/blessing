"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface WelcomeContextValue {
  isWelcomeComplete: boolean;
  completeWelcome: () => void;
}

const WelcomeContext = createContext<WelcomeContextValue | null>(null);

export function WelcomeProvider({ children }: { children: ReactNode }) {
  const [isWelcomeComplete, setIsWelcomeComplete] = useState(false);

  const completeWelcome = useCallback(() => {
    setIsWelcomeComplete(true);
    document.documentElement.classList.remove("welcome-loading");
    document.getElementById("welcome-preload")?.remove();
  }, []);

  const value = useMemo(
    () => ({ isWelcomeComplete, completeWelcome }),
    [isWelcomeComplete, completeWelcome],
  );

  return <WelcomeContext.Provider value={value}>{children}</WelcomeContext.Provider>;
}

export function useWelcome() {
  const ctx = useContext(WelcomeContext);
  if (!ctx) {
    throw new Error("useWelcome must be used within WelcomeProvider");
  }
  return ctx;
}
