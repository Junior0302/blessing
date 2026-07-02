import type { Metadata } from "next";
import { ReserverPageContent } from "@/components/pages/ReserverPageContent";

export const metadata: Metadata = {
  title: "Réserver",
  description: "Réservez votre table chez Blessing.",
};

export default function ReserverPage() {
  return <ReserverPageContent />;
}
