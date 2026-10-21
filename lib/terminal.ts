export const commands = [
  { name: "help", description: "Show available commands" },
  { name: "about", description: "A little about me" },
  { name: "projects", description: "Browse projects" },
  { name: "contact", description: "Email and GitHub" },
  { name: "clear", description: "Clear the terminal" },
  { name: "ted", description: "???" },
] as const;

export const completions = [
  ...commands.map((command) => command.name),
  "open projects/ted",
];

export type View = "about" | "projects" | "contact" | "ted";
export type CommandResult =
  | { kind: "help"; text: string }
  | { kind: "view"; view: View; text: string }
  | { kind: "clear" }
  | { kind: "error"; text: string };

export function resolveCommand(input: string): CommandResult {
  const command = input.trim().toLowerCase().replace(/\s+/g, " ");

  switch (command) {
    case "help":
      return { kind: "help", text: "Choose a command or type it below." };
    case "about":
    case "cat about.md":
      return { kind: "view", view: "about", text: "~/about.md" };
    case "projects":
    case "ls":
    case "ls projects":
    case "cd projects":
    case "open projects/ted":
      return { kind: "view", view: "projects", text: "~/projects/" };
    case "contact":
    case "cat contact.txt":
      return { kind: "view", view: "contact", text: "~/contact.txt" };
    case "clear":
      return { kind: "clear" };
    case "/ted":
    case "ted":
    case "open /ted":
      return { kind: "view", view: "ted", text: "~/ted" };
    default:
      return { kind: "error", text: 'Command not found. Try "help" or choose a shortcut.' };
  }
}
