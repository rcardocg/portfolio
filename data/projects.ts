import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    title: "Sistema de Gestión de Inventarios",
    description:
      "Aplicación web para el control y seguimiento de inventario en tiempo real, con reportes y alertas de stock mínimo.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    url: "https://github.com/rcardocg",
  },
  {
    title: "API de Reservaciones",
    description:
      "Servicio REST para la gestión de reservaciones, con autenticación JWT, validación de datos y documentación OpenAPI.",
    tags: ["Node.js", "Express", "MongoDB"],
    url: "https://github.com/rcardocg",
  },
  {
    title: "Landing Page Corporativa",
    description:
      "Sitio estático responsivo y optimizado para SEO, enfocado en rendimiento y accesibilidad.",
    tags: ["React", "Tailwind CSS"],
    url: "https://github.com/rcardocg",
  },
];
