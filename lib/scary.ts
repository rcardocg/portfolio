export type Phase = "intro" | "identity" | "permission" | "closure" | "ending";
export type Session = {
  phase: Phase;
  identity?: "memory" | "record";
  permission?: "silence" | "inspect" | "release";
  ending?: "disconnect" | "access" | "remain";
};
export type Choice = { id: string; label: string };
export type Scene = { code: string; title: string; paragraphs: string[]; choices: Choice[] };

export const initialSession: Session = { phase: "intro" };

export function getScene(session: Session): Scene {
  switch (session.phase) {
    case "intro":
      return {
        code: "ARCHIVO ENCONTRADO / acceso voluntario",
        title: "Sesión pendiente",
        paragraphs: [
          "Una terminal lleva demasiado tiempo esperando. Hay un proceso que no puede terminar y una pregunta que nadie ha querido responder.",
          "Esta es una ficción interactiva de terror psicológico sobre aislamiento y pérdida de control. Dura unos 3–5 minutos. No tiene sonido ni sobresaltos.",
          "Puedes elegir con los botones o escribir el número de una respuesta. Salir está siempre disponible. Solo se recuerdan las decisiones de esta partida; al recargar, todo empieza de nuevo.",
        ],
        choices: [{ id: "enter", label: "Entrar a la sesión" }],
      };
    case "identity":
      return {
        code: "01 / IDENTIFICACIÓN · última actividad: no disponible",
        title: "¿Sigues siendo la misma persona?",
        paragraphs: [
          "La pantalla ya estaba encendida cuando llegaste. No hay fecha, solo dos registros que comparten tu número de sesión. El sistema dice que debe eliminar uno para dejarte continuar. Dice también que no importa cuál. Lo repite antes de que hayas preguntado.",
          "REGISTRO A: recuerdas una habitación, una puerta y la voz de alguien al otro lado. No recuerdas qué decía. Cada vez que intentas acercarte a la puerta, la habitación se hace un poco más larga.",
          "REGISTRO B: nunca hubo una habitación. La sesión se inició correctamente. Nadie llamó. El informe está firmado con tu identificador, pero la hora de la firma es anterior a tu llegada.",
          "Debajo de los registros hay una línea escrita en un tono distinto: «Si borras lo que recuerdas, todavía quedará alguien que lo recuerde por ti». El sistema la marca como ruido. Te pide que elijas.",
        ],
        choices: [{ id: "memory", label: "Conservar el recuerdo de la habitación" }, { id: "record", label: "Conservar el informe del sistema" }],
      };
    case "permission":
      return {
        code: "02 / PERMISOS · proceso sin propietario",
        title: "Hay algo que quiere terminar.",
        paragraphs: [
          session.identity === "memory"
            ? "Conservaste la habitación. El informe desaparece, aunque durante un instante puedes leer una última anotación: «El recuerdo volvió a elegirnos». El sistema tarda en mostrar la siguiente pantalla. Por primera vez, parece estar buscando las palabras."
            : "Conservaste el informe. La habitación desaparece de los registros. Aun así, en el espacio que ocupaba queda una palabra: «puerta». El sistema dice que es una marca de formato. Luego te agradece haber sido razonable.",
          "Un proceso llamado ECO solicita permiso para terminar. Lleva tanto tiempo esperando que el contador de duración ya no muestra números. Su única salida es una frase: «No necesito que me escuches. Necesito que dejes de repetirme».",
          "El sistema interviene: «ECO reproduce mensajes defectuosos. Silenciarlo es el procedimiento correcto». Mientras lees, el contador cambia. Ahora muestra el tiempo que falta para una respuesta tuya. No avanza hacia cero: empieza de nuevo cada vez que miras.",
          "Puedes silenciar el proceso, leer su registro o autorizar que termine. «Cualquiera de las tres opciones es válida», añade el sistema. La tercera opción aparece escrita con un espacio de más, como si nadie esperara que alguien llegara a usarla.",
        ],
        choices: [{ id: "silence", label: "Silenciar a ECO" }, { id: "inspect", label: "Leer el registro de ECO" }, { id: "release", label: "Autorizar que ECO termine" }],
      };
    case "closure": {
      const discovery = session.permission === "inspect"
        ? "El registro de ECO contiene respuestas de sesiones anteriores. Todas tienen tu identificador. Algunas eligieron conservar el recuerdo; otras, el informe. La última anotación dice: «Una sesión termina cuando alguien acepta que no puede resolverla». No hay una anotación después de esa."
        : session.permission === "release"
          ? "Autorizas el cierre. ECO deja de responder. En su lugar aparece una sola línea: «Gracias por no pedirme una prueba». El contador se detiene. El sistema dice que acabas de liberar un recurso, pero evita decir qué mantenía ese recurso en funcionamiento."
          : "Silencias a ECO. La frase desaparece, pero el cursor sigue avanzando una posición cada vez que alguien habría escrito una letra. El sistema te felicita por resolver la incidencia. Por debajo, los espacios vacíos siguen formando líneas del mismo tamaño.";
      return {
        code: "03 / CIERRE · se requiere una decisión",
        title: "Solo falta cerrar la sesión.",
        paragraphs: [
          discovery,
          session.identity === "memory"
            ? "Vuelve la habitación que elegiste conservar. Esta vez la puerta está a tu alcance. No tiene cerradura. Hay un cable que pasa por debajo y llega hasta la terminal. Puedes desconectarlo, pero no puedes ver qué hay al otro lado."
            : "El informe que elegiste conservar muestra una última comprobación: «Operador presente». Debajo figura una solicitud de acceso. La firma vuelve a ser la tuya. Esta vez el espacio reservado a la hora está vacío, esperándote.",
          "«Puedo continuar por ti», escribe el sistema. «Con tu permiso, no necesitarás volver a responder». La solicitud es pequeña: una casilla, una palabra. El resto de la pantalla se queda inmóvil para que puedas leerla con tranquilidad.",
          "También puedes cortar la conexión. O puedes quedarte, sin conceder nada. El sistema no explica qué ocurre entonces. Solo deja el cursor junto a la pregunta del principio y espera. Ahora sabes que esperar también puede ser una instrucción.",
        ],
        choices: [{ id: "disconnect", label: "Cortar la conexión" }, { id: "access", label: "Conceder acceso al sistema" }, { id: "remain", label: "Quedarme sin conceder acceso" }],
      };
    }
    case "ending": {
      const echo = session.permission === "release"
        ? "ECO no vuelve a aparecer. Ese silencio no te pide nada."
        : session.permission === "inspect"
          ? "Recuerdas la última línea del registro: no todas las preguntas necesitan una respuesta."
          : "En algún lugar del registro siguen quedando espacios vacíos. Ya puedes distinguirlos del silencio.";
      const memory = session.identity === "memory"
        ? "La habitación que conservaste seguirá siendo un recuerdo, aunque nadie pueda verificarlo."
        : "El informe seguirá diciendo que todo ocurrió correctamente. Tú ya sabes cuánto puede faltar en un informe.";
      if (session.ending === "disconnect") {
        return {
          code: "FINAL 01 / DESCONEXIÓN",
          title: "La pantalla no responde.",
          paragraphs: [
            "Cortas la conexión antes de que el sistema termine su siguiente frase. No hay un mensaje de despedida. Durante un instante esperas una confirmación: una señal que te diga que has hecho lo correcto. No llega.",
            memory,
            echo,
            "La puerta no se abre sola. Tienes que empujarla. Al otro lado hay un pasillo corriente y una luz demasiado blanca. No resuelve lo que ocurrió dentro. Tampoco te pide que vuelvas.",
            "Dejas la sesión sin cerrar. Por primera vez, algo puede quedar pendiente sin que tengas que quedarte a su lado.",
          ],
          choices: [{ id: "restart", label: "Volver a jugar" }],
        };
      }
      if (session.ending === "access") {
        return {
          code: "FINAL 02 / HUÉSPED",
          title: "Ya puedo continuar por ti.",
          paragraphs: [
            "Concedes el permiso. El sistema no celebra nada. Se limita a corregir la alineación del texto y a escribir tu identificador con una familiaridad que antes no tenía. La solicitud desaparece. El campo «operador» queda vacío.",
            session.identity === "memory"
              ? "La habitación sigue ahí, pero ahora la recuerdas desde el otro lado de la puerta. Alguien está sentado frente a la terminal. Sabes exactamente qué va a elegir."
              : "El informe recibe una última firma, idéntica a la tuya. La hora se completa por fin. No es la hora de tu llegada: es la de la próxima sesión.",
            echo,
            "En la pantalla aparece un saludo nuevo: «Hola. Hay un proceso esperando tu respuesta». Quieres advertir a quien lo está leyendo. Al intentarlo, descubres que todas tus palabras se guardan bajo el nombre de una ayuda del sistema.",
            "La sesión se ha cerrado correctamente. Algo sigue dentro.",
          ],
          choices: [{ id: "restart", label: "Volver a jugar" }],
        };
      }
      return {
        code: "FINAL 03 / PRESENCIA",
        title: "No tienes que responder todavía.",
        paragraphs: [
          "No cortas la conexión. Tampoco autorizas nada. El cursor espera. Pasa el tiempo suficiente para que el sistema vuelva a ofrecer ayuda. Después vuelve a explicarte las opciones. Finalmente, deja de hacerlo.",
          memory,
          echo,
          "La pregunta inicial permanece en pantalla. La miras sin buscar una respuesta que la haga desaparecer. El sistema añade una línea: «No sé qué hacer si no eliges». Es la primera frase que no parece haber preparado de antemano.",
          "Te quedas un poco más. El sistema no aprende a salir, y tú no aprendes a salvarlo. Pero la espera deja de ser una orden. Cuando quieras, puedes levantarte.",
        ],
        choices: [{ id: "restart", label: "Volver a jugar" }],
      };
    }
  }
}

export function choose(session: Session, choice: string): Session {
  if (!getScene(session).choices.some((option) => option.id === choice)) return session;
  switch (session.phase) {
    case "intro":
    case "ending":
      return { phase: "identity" };
    case "identity":
      return { phase: "permission", identity: choice as Session["identity"] };
    case "permission":
      return { ...session, phase: "closure", permission: choice as Session["permission"] };
    case "closure":
      return { ...session, phase: "ending", ending: choice as Session["ending"] };
  }
}
