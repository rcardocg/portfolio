import type { Metadata } from "next";
import Link from "next/link";
import ProjectDetails from "@/components/desktop/ProjectDetails";

export const metadata: Metadata = {
  title: "Sesión pendiente | Ricardo Caballeros",
  description: "Ficción interactiva de terror psicológico: tres decisiones, tres finales y una terminal que recuerda tus respuestas.",
};

export default function ProjectPage() {
  return (
    <main className="project-page">
      <Link className="text-link back-link" href="/">← Volver al escritorio</Link>
      <section className="window standalone-window" aria-label="Ficha del proyecto">
        <div className="window-bar"><span className="window-mark" aria-hidden="true">~/</span><span>projects / sesion-pendiente.md</span></div>
        <div className="viewer-content"><ProjectDetails standalone /></div>
      </section>
    </main>
  );
}
