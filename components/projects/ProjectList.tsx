import type { Project } from "@/types/project";

import ProjectRow from "@/components/projects/ProjectRow";

type ProjectListProps = {
  projects: Project[];
};

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <ul>
      {projects.map((project) => (
        <ProjectRow key={project.title} project={project} />
      ))}
    </ul>
  );
}
