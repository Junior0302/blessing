import type { Metadata } from "next";
import { CommanderPageContent } from "@/components/pages/CommanderPageContent";

export const metadata: Metadata = {
  title: "Commander",
  description: "Commandez vos créations Blessing en ligne.",
};

export default function CommanderPage() {
  return <CommanderPageContent />;
}
