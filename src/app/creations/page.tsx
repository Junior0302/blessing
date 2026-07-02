import type { Metadata } from "next";
import { CreationsPageContent } from "@/components/pages/CreationsPageContent";

export const metadata: Metadata = {
  title: "Créations",
  description: "Découvrez nos pancakes, gaufres, smoothies et milkshakes d'exception.",
};

export default function CreationsPage() {
  return <CreationsPageContent />;
}
