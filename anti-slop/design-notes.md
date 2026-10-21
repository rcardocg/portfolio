# Ajuste visual del escritorio

Dirección del propietario: conservar el diseño, retirar los textos accesorios y usar colores de terminal Linux.

Lectura: portafolio personal para quienes consultan el perfil y los proyectos de Ricardo, con lenguaje de escritorio Linux. ENERGY 1 / RHYTHM 2 / MOTION 1.

- Color: negro y gris neutro para las superficies, texto claro y verde de terminal para comandos, enlaces y selección. Azul para la ruta del prompt y rojo para errores, como señales funcionales.
- Composición: se conservan la terminal operativa y el visor, según la preferencia explícita del propietario; no es una terminal decorativa.
- Tipografía: se conserva la monoespaciada por su relación con la interfaz de comandos que Ricardo utiliza.
- Espaciado: se conserva el existente; se eliminan los rótulos sin añadir elementos de relleno.
- Identidad: el nombre sigue siendo el foco, con el prompt y los archivos como motivo recurrente.
- Tema oscuro: responde a la preferencia explícita del propietario por su terminal Linux.
- Movimiento: se conservan los estados interactivos sin añadir animaciones.
- Contenido: se retiran «~/portfolio», «espacio de trabajo», «Hecho para explorar, con o sin comandos» y «Explora a tu ritmo».

Alcance: ajuste de textos y paleta sobre el diseño existente, sin rediseño ni auditoría integral de contenido.

## Delivery Gate del cambio

- Hard Gate PASS: los cuatro rótulos ya no aparecen en la captura; las tres rutas no desbordan a 320 y 390 px; no hubo excepciones del navegador. No se incorporaron controles, datos ni assets. El verde #8ae234 supera 10:1 sobre #171717 y el gris #a3a3a3 supera 6:1 sobre #252525.
- Purpose-Gate PASS: los colores se derivan de la preferencia Linux del propietario; el verde identifica comandos y acciones, el azul la ruta y el rojo los errores. Las razones de tipografía y composición constan arriba.
- Liveliness PASS: ENERGY 1 / RHYTHM 2 / MOTION 1; captura de escritorio revisada, nombre como foco, ventanas con funciones distintas y motivo de prompt conservado.
- Craftsmanship PASS: build de producción con webpack, lint, pruebas de comandos y recorridos narrativos, y revisión en Chromium. Se conserva el diseño solicitado sin inventar contenido ni agregar dependencias.

Recorrido registrado en Chromium: help muestra comandos; clear limpia entradas; flechas restauran el historial; Tab completa projects; Enter abre el proyecto; pestaña contact muestra correo; entrada desconocida muestra error. Juego: iniciar, elegir por teclado y botones, respuesta inválida, tres finales, reiniciar y salir con Escape. Las pestañas de proyectos y contacto también se revisaron en móvil. Sin excepciones de navegador.

Capturas locales: `/tmp/portfolio-terminal-desktop.png` y `/tmp/portfolio-mobile-desktop.png`. El recorrido valida los controles existentes ejercitados; no verifica la entrega de correo ni la disponibilidad externa de GitHub.
