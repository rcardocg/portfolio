import type { Project } from "@/types/project";

import ExternalLink from "@/components/ui/ExternalLink";

type ProjectRowProps = {
  project: Project;
};

export default function ProjectRow({ project }: ProjectRowProps) {
  return (
    <li className="flex flex-col gap-2 border-t border-neutral-900/10 py-6 sm:flex-row sm:items-baseline sm:gap-8">
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="text-lg uppercase leading-tight tracking-[0.06em] text-neutral-950">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-neutral-600">
          {project.description}
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
          {project.tags.join(" · ")}
        </p>
      </div>
      <ExternalLink
        href={project.url}
        className="text-[10px] uppercase tracking-[0.2em] text-neutral-600 hover:text-neutral-950 sm:pt-1"
      >
        Ver proyecto
      </ExternalLink>
    </li>
  );
}
