import type { Metadata } from "next";
import { GaleriePageContent } from "@/components/pages/GaleriePageContent";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Galerie immersive Blessing — défilement infini et parallaxe sur nos créations gourmandes.",
};

export default function GaleriePage() {
  return <GaleriePageContent />;
}
