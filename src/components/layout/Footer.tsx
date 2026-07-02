import { BRAND } from "@/lib/constants";

interface FooterProps {
  variant?: "dark" | "light";
}

export function Footer({ variant = "dark" }: FooterProps) {
  const isLight = variant === "light";

  return (
    <footer
      className={`border-t py-12 md:py-16 ${
        isLight
          ? "border-noir/8 bg-cream-muted/50 text-noir"
          : "border-cream/8 bg-noir text-cream"
      }`}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 md:flex-row md:px-8 lg:px-12">
        <div className="text-center md:text-left">
          <p className={`font-brand text-2xl tracking-wide ${isLight ? "text-noir" : "text-cream"}`}>
            {BRAND.name}
          </p>
          <p className={`mt-2 text-sm ${isLight ? "text-noir/50" : "text-cream/50"}`}>
            {BRAND.tagline}
          </p>
        </div>
        <p className={`text-xs ${isLight ? "text-noir/40" : "text-cream/40"}`}>
          © {new Date().getFullYear()} {BRAND.name}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
