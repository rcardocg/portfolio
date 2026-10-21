"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { choose, getScene, initialSession, type Choice } from "@/lib/scary";

export default function ScaryGame() {
  const router = useRouter();
  const [session, setSession] = useState(initialSession);
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const titleRef = useRef<HTMLHeadingElement>(null);
  const previousPhase = useRef(session.phase);
  const scene = getScene(session);
  const step = { intro: 0, identity: 1, permission: 2, closure: 3, ending: 3 }[session.phase];

  useEffect(() => {
    function escape(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") router.push("/");
    }
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [router]);

  useEffect(() => {
    if (previousPhase.current === session.phase) return;
    previousPhase.current = session.phase;
    titleRef.current?.focus();
    titleRef.current?.scrollIntoView({ block: "start" });
  }, [session.phase]);

  function answer(choice: Choice) {
    const next = choose(session, choice.id);
    setSession(next);
    setHistory((previous) => choice.id === "restart" ? [] : choice.id === "enter" ? [] : [...previous, choice.label]);
    setInput("");
    setMessage("");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const command = input.trim().toLowerCase();
    if (command === "salir" || command === "exit") { router.push("/"); return; }
    if (command === "reiniciar") { restart(); return; }
    const choice = scene.choices.find((option, index) => option.id === command || String(index + 1) === command || option.label.toLowerCase() === command);
    if (choice) answer(choice);
    else setMessage(command === "help" ? "Escribe el número de una respuesta, «reiniciar» o «salir». También puedes usar los botones." : "Esa respuesta no está disponible. Elige un botón o escribe su número.");
  }

  function restart() {
    setSession(initialSession);
    setHistory([]);
    setInput("");
    setMessage("");
  }

  return (
    <main className="scary-page" data-phase={session.phase}>
      <header className="scary-topbar"><Link className="text-link" href="/">← Salir al escritorio</Link><span className="scary-path">~/scary <span aria-hidden="true">/</span> sesión_pendiente</span><button className="quiet-button" onClick={restart}>Reiniciar</button></header>
      <div className="scary-container">
        <div className="session-status"><span><span className="status-dot" aria-hidden="true" />{session.phase === "intro" ? "sin iniciar" : session.phase === "ending" ? "sesión terminada" : "sesión recuperada"}</span><span>{step ? `${step} / 3` : "ficción interactiva"}</span></div>
        <section className="session-window" aria-labelledby="scene-title">
          <div className="session-code">{scene.code}</div>
          <h1 id="scene-title" ref={titleRef} tabIndex={-1}>{scene.title}</h1>
          {session.phase === "intro" && <p className="session-subtitle">Un sistema original de ficción. Una conversación que no terminó.</p>}
          <div className="story-copy">{scene.paragraphs.map((paragraph, index) => <p key={`${session.phase}-${index}`}>{paragraph}</p>)}</div>
          {history.length > 0 && <details className="session-history"><summary>Lo que has elegido <span aria-hidden="true">({history.length})</span></summary><ol>{history.map((answer, index) => <li key={index}><span aria-hidden="true">&gt;</span> {answer}</li>)}</ol></details>}
          <div className="session-choices" aria-label="Respuestas disponibles">{scene.choices.map((choice, index) => <button key={choice.id} onClick={() => answer(choice)}><span className="choice-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span>{choice.label}</span><span aria-hidden="true">↵</span></button>)}</div>
          {session.phase === "ending" && <Link className="text-link ending-exit" href="/">Cerrar esta historia y volver al escritorio →</Link>}
          <form className="session-input" onSubmit={submit}>
            <label htmlFor="response"><span aria-hidden="true">&gt;</span><span className="sr-only">Tu respuesta</span></label>
            <input id="response" value={input} onChange={(event) => setInput(event.target.value)} maxLength={100} autoComplete="off" autoCapitalize="none" spellCheck={false} placeholder={session.phase === "intro" || session.phase === "ending" ? "1 para empezar · salir para volver" : "Escribe 1, 2 o 3…"} aria-describedby="response-help" />
            <button type="submit" aria-label="Enviar respuesta">↵</button>
          </form>
          <p id="response-help" className="response-help" role="status">{message || "help · ayuda     salir · volver al escritorio     Esc · salir"}</p>
        </section>
        <footer className="scary-footer"><span>Una historia de Ricardo Caballeros.</span><span>Todo ocurre dentro de esta ficción.</span></footer>
      </div>
    </main>
  );
}
