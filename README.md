# Portfolio

Ricardo Caballeros' portfolio. Systems engineer working in data science. A desktop-style interface with a terminal and file viewer, navigable with commands or buttons on mobile and desktop.

## Usage

- `help`: show available commands.
- `about`, `projects`, `contact`: open files in the viewer.
- `open projects/ted`: view project details.
- `ted`: open AM's monologue. Its terminal description is `???`.
- `clear`: clear the output. ↑/↓ browse command history and Tab completes unambiguous commands.

`ted` displays the supplied AM monologue from *I Have No Mouth, and I Must Scream* in three blocks. Lines appear gradually; “show block” skips the wait and “continue” advances. Restart or exit using the buttons, or press Escape to exit. Also available at `/ted`, with project details at `/projects/ted`. With reduced motion enabled, each block appears in full.

## Development

Requires Node.js 22.6 or later. `npm run dev` starts the site, `npm run build` builds for production, `npm run lint` checks the code, and `npm test` checks terminal commands.

Profile: `data/profile.ts`. Project: `data/projects.ts`. Commands: `lib/terminal.ts`. Monologue: `lib/ted.ts`.

## Hosting

Hosted on Vercel.
