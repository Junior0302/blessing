import type { Metadata } from "next";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez l'histoire et les valeurs de Blessing, pâtisserie haut de gamme.",
};

export default function AboutPage() {
  return <AboutContent />;
}
