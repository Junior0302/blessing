"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface WelcomeContextValue {
  isWelcomeComplete: boolean;
  completeWelcome: () => void;
}

const WelcomeContext = createContext<WelcomeContextValue | null>(null);
const WELCOME_KEY = "blessing-welcomed";

function readWelcomeFromSession(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return !!sessionStorage.getItem(WELCOME_KEY);
  } catch {
    return false;
  }
}

export function WelcomeProvider({ children }: { children: ReactNode }) {
  const [isWelcomeComplete, setIsWelcomeComplete] = useState(readWelcomeFromSession);

  const completeWelcome = useCallback(() => {
    setIsWelcomeComplete(true);
    document.documentElement.classList.remove("welcome-loading");
    document.getElementById("welcome-preload")?.remove();
    document.body.style.overflow = "";
  }, []);

  useLayoutEffect(() => {
    if (isWelcomeComplete) {
      document.documentElement.classList.remove("welcome-loading");
      document.getElementById("welcome-preload")?.remove();
      document.body.style.overflow = "";
    }
  }, [isWelcomeComplete]);

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
