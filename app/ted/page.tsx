import type { Metadata } from "next";
import Monologue from "@/components/ted/Monologue";

export const metadata: Metadata = {
  title: "ted | Ricardo Caballeros",
  description: "???",
};

export default function TedPage() {
  return <Monologue />;
}
