import type { Project } from "@/types/project";

import Section from "@/components/ui/Section";
import ProjectList from "@/components/projects/ProjectList";

type ProjectsSectionProps = {
  projects: Project[];
};

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <Section title="Proyectos">
      <ProjectList projects={projects} />
    </Section>
  );
}
