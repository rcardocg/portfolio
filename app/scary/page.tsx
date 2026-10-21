import type { Metadata } from "next";
import ScaryGame from "@/components/scary/ScaryGame";

export const metadata: Metadata = {
  title: "Sesión pendiente | /scary",
  description: "Una ficción interactiva de terror psicológico. Tres decisiones, tres finales y una sesión que espera tu respuesta.",
};

export default function ScaryPage() {
  return <ScaryGame />;
}
