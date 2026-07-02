import { SiteHeader } from "./SiteHeader";
import { Footer } from "./Footer";
import { DecorBackground } from "./DecorBackground";
import { FloatingDecor } from "@/components/ui/FloatingDecor";

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
  decorImage?: string;
  decorOpacity?: number;
}

export function PageShell({
  children,
  className = "",
  decorImage = "/images/7.png",
  decorOpacity = 0.35,
}: PageShellProps) {
  return (
    <div className={`relative min-h-screen text-noir ${className}`}>
      <DecorBackground image={decorImage} opacity={decorOpacity} overlayStrength="medium" />
      <div className="relative z-10">
        <FloatingDecor />
        <SiteHeader />
        {children}
        <Footer variant="light" />
      </div>
    </div>
  );
}
