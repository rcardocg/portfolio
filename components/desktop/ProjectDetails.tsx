import Link from "next/link";
import { sessionProject as project } from "@/data/projects";

export default function ProjectDetails({ standalone = false, onPlay, onDetails }: { standalone?: boolean; onPlay?: () => void; onDetails?: () => void }) {
  return (
    <article className="project-detail">
      <p className="eyebrow">01 / {project.category}</p>
      <h2>{project.name}</h2>
      <p className="project-lead">{project.description}</p>
      <div className="project-tags" aria-label="Technologies">
        {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
      </div>
      <div className="project-actions">
        {onPlay ? <button className="text-link" onClick={onPlay}>ted</button> : <Link className="button button-primary" href={project.href}>ted</Link>}
        {!standalone && (onDetails ? <button className="text-link" onClick={onDetails}>Project details</button> : <Link className="text-link" href={project.detailHref}>Project details</Link>)}
      </div>
    </article>
  );
}
