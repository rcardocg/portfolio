# Portfolio

Portafolio de Ricardo Caballeros, ingeniero en sistemas que trabaja en ciencia de datos. Simula un escritorio con terminal guiada y un visor de archivos. Se puede navegar con comandos o botones, en móvil y escritorio.

## Uso

- `help`: comandos disponibles.
- `about`, `projects`, `contact`: abrir archivos en el visor.
- `open sesion-pendiente`: ficha del juego.
- `/scary`: entrar a la ficción interactiva «Sesión pendiente».
- `clear`: limpiar la salida. ↑/↓ recorren el historial y Tab completa comandos inequívocos.

`/scary` contiene una historia original de terror psicológico con tres decisiones, tres finales y 18 recorridos. No usa servicios externos, datos personales ni persistencia. Salir está siempre disponible; Escape vuelve al escritorio. La ficha del proyecto se puede compartir en `/projects/sesion-pendiente`.

## Desarrollo

Requiere Node.js 22.6 o posterior. `npm run dev` inicia el sitio, `npm run build` compila producción, `npm run lint` revisa el código y `npm test` comprueba los comandos y los recorridos narrativos.

Perfil: `data/profile.ts`. Proyecto: `data/projects.ts`. Comandos: `lib/terminal.ts`. Narrativa: `lib/scary.ts`.

## Extra
Proyecto en vercel
