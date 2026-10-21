import Link from "next/link";
import { sessionProject as project } from "@/data/projects";

export default function ProjectDetails({ standalone = false }: { standalone?: boolean }) {
  return (
    <article className="project-detail">
      <p className="eyebrow">01 / {project.category}</p>
      <h2>{project.name}</h2>
      <p className="project-lead">{project.description}</p>
      <div className="project-tags" aria-label="Tecnologías">
        {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
      </div>
      <dl className="project-facts">
        <div><dt>La idea</dt><dd>Explorar el aislamiento y la confianza a través de una conversación con un sistema que recuerda tus decisiones.</dd></div>
        <div><dt>La experiencia</dt><dd>Tres decisiones, tres finales y pequeños cambios en el relato según el camino elegido. Una partida breve, de unos 3–5 minutos.</dd></div>
        <div><dt>La construcción</dt><dd>Narrativa original con ramas escritas, estado local y respuestas mediante botones o teclado. Se puede salir en cualquier momento.</dd></div>
      </dl>
      <p className="project-note">Terror psicológico y temas de aislamiento. Sin sonido ni sobresaltos.</p>
      <div className="project-actions">
        <Link className="button button-primary" href={project.href}>Entrar al juego <span aria-hidden="true">↗</span></Link>
        {!standalone && <Link className="text-link" href={project.detailHref}>Abrir ficha <span aria-hidden="true">↗</span></Link>}
      </div>
    </article>
  );
}
