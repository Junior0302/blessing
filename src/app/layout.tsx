import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import localFont from "next/font/local";
import { ClientProviders } from "@/components/layout/ClientProviders";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const sugarLoved = localFont({
  src: "../../public/fonts/Sugar Loved.ttf",
  variable: "--font-brand-face",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Blessing — L'art du dessert",
    template: "%s | Blessing",
  },
  description:
    "Pâtisserie haut de gamme. Créations d'exception, expérience immersive et saveurs inoubliables.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf6f1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`welcome-loading ${cormorant.variable} ${outfit.variable} ${sugarLoved.variable}`}
    >
      <body className="min-h-screen antialiased">
        <Script id="welcome-skip" strategy="beforeInteractive">
          {`(function(){try{if(sessionStorage.getItem('blessing-welcomed')){document.documentElement.classList.remove('welcome-loading');var p=document.getElementById('welcome-preload');if(p)p.remove();}}catch(e){}})();`}
        </Script>
        <div
          id="welcome-preload"
          className="pointer-events-none fixed inset-0 z-[499] bg-cream"
          aria-hidden="true"
        />
        <ClientProviders>
          <main>{children}</main>
        </ClientProviders>
      </body>
    </html>
  );
}
