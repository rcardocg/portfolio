export const commands = [
  { name: "help", description: "Ver los comandos disponibles" },
  { name: "about", description: "Un poco sobre mí" },
  { name: "projects", description: "Explorar proyectos" },
  { name: "contact", description: "Correo y GitHub" },
  { name: "clear", description: "Limpiar la terminal" },
  { name: "/scary", description: "Una sesión que quedó abierta" },
] as const;

export const completions = [
  ...commands.map((command) => command.name),
  "open sesion-pendiente",
];

export type View = "about" | "projects" | "contact";
export type CommandResult =
  | { kind: "help"; text: string }
  | { kind: "view"; view: View; text: string }
  | { kind: "clear" }
  | { kind: "navigate"; href: "/scary"; text: string }
  | { kind: "error"; text: string };

export function resolveCommand(input: string): CommandResult {
  const command = input.trim().toLowerCase().replace(/\s+/g, " ");

  switch (command) {
    case "help":
      return { kind: "help", text: "Elige un comando o escríbelo abajo. También puedes usar los archivos del visor." };
    case "about":
    case "cat about.md":
      return { kind: "view", view: "about", text: "Abierto: ~/about.md\nMi presentación está en el visor." };
    case "projects":
    case "ls":
    case "ls projects":
    case "cd projects":
    case "open sesion-pendiente":
      return { kind: "view", view: "projects", text: "Abierto: ~/projects/\nSesión pendiente — ficción interactiva de terror psicológico.\nSelecciona el proyecto en el visor para conocerlo o jugar." };
    case "contact":
    case "cat contact.txt":
      return { kind: "view", view: "contact", text: "Abierto: ~/contact.txt\nPuedes escribirme por correo o visitar mi GitHub desde el visor." };
    case "clear":
      return { kind: "clear" };
    case "/scary":
    case "scary":
    case "open /scary":
      return { kind: "navigate", href: "/scary", text: "Abriendo una sesión pendiente…" };
    default:
      return { kind: "error", text: "No encontré ese comando. Prueba «help» o selecciona un acceso rápido." };
  }
}
