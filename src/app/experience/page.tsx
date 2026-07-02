import type { Metadata } from "next";
import { ExperiencePageContent } from "@/components/pages/ExperiencePageContent";

export const metadata: Metadata = {
  title: "Expérience",
  description: "Vivez l'expérience Blessing — ambiance premium et service attentionné.",
};

export default function ExperiencePage() {
  return <ExperiencePageContent />;
}
