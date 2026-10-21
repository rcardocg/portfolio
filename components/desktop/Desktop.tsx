"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ExternalLink from "@/components/ui/ExternalLink";
import ProjectDetails from "@/components/desktop/ProjectDetails";
import { profile } from "@/data/profile";
import { commands, completions, resolveCommand, type CommandResult, type View } from "@/lib/terminal";

type Entry = { id: number; command: string; result: Exclude<CommandResult, { kind: "clear" }> };
const files: { view: View; file: string; label: string }[] = [
  { view: "about", file: "about.md", label: "Sobre mí" },
  { view: "projects", file: "projects/", label: "Proyectos" },
  { view: "contact", file: "contact.txt", label: "Contacto" },
];

export default function Desktop() {
  const router = useRouter();
  const [view, setView] = useState<View>("about");
  const [input, setInput] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const draftRef = useRef("");
  const entryId = useRef(0);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = entries.length ? logRef.current.scrollHeight : 0;
  }, [entries]);

  function execute(raw: string) {
    const command = raw.trim().slice(0, 160);
    if (!command) return;
    const result = resolveCommand(command);
    setHistory((previous) => [...previous, command].slice(-64));
    setHistoryIndex(null);
    setInput("");
    draftRef.current = "";
    if (result.kind === "clear") {
      setEntries([]);
    } else {
      const entry = { id: ++entryId.current, command, result };
      setEntries((previous) => [...previous, entry].slice(-40));
      if (result.kind === "view") setView(result.view);
      if (result.kind === "navigate") router.push(result.href);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    execute(input);
  }

  function handleKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp" && history.length) {
      event.preventDefault();
      if (historyIndex === null) draftRef.current = input;
      const index = Math.max(0, (historyIndex ?? history.length) - 1);
      setHistoryIndex(index);
      setInput(history[index]);
    } else if (event.key === "ArrowDown" && historyIndex !== null) {
      event.preventDefault();
      const index = historyIndex + 1;
      setHistoryIndex(index < history.length ? index : null);
      setInput(index < history.length ? history[index] : draftRef.current);
    } else if (event.key === "Tab" && !event.shiftKey && input.trim()) {
      const matches = completions.filter((command) => command.startsWith(input.toLowerCase().trim()));
      if (matches.length === 1 && matches[0] !== input) {
        event.preventDefault();
        setInput(matches[0]);
      }
    }
  }

  const currentFile = files.find((file) => file.view === view)!;

  return (
    <div className="desktop">
      <a className="skip-link" href="#viewer">Ir a la información del portafolio</a>
      <header className="desktop-topbar">
        <Link href="/" className="desktop-brand" aria-label="Inicio: escritorio de Ricardo"><span className="brand-symbol" aria-hidden="true">rc.</span><span>espacio de trabajo</span></Link>
        <span className="desktop-location">{profile.location}</span>
      </header>

      <main className="desktop-main">
        <div className="desktop-intro">
          <div><p className="eyebrow">~/portfolio</p><h1>{profile.name}</h1><p className="intro-description">{profile.role} <span aria-hidden="true">/</span> Ciencia de datos</p></div>
          <p className="desktop-invitation"><span className="status-dot" aria-hidden="true" />Explora a tu ritmo.</p>
        </div>

        <div className="desktop-layout">
          <section className="window terminal-window" aria-labelledby="terminal-title">
            <div className="window-bar"><span className="window-mark" aria-hidden="true">&gt;_</span><h2 id="terminal-title">terminal <span className="window-path">— ~/portfolio</span></h2><span className="window-dots" aria-hidden="true">···</span></div>
            <div className="terminal-log" ref={logRef} role="log" aria-label="Historial de la terminal" aria-live="polite" tabIndex={0}>
              <div className="terminal-welcome">
                <p className="terminal-comment"># Una pequeña ventana a lo que hago.</p>
                <p>Hola, soy <span className="terminal-highlight">Ricardo</span>.</p>
                <p>{profile.role}.<br />{profile.description}</p>
                <p className="muted">Puedes escribir un comando o elegir una opción.<br />Empieza por <button className="inline-command" onClick={() => execute("help")}>help</button> si quieres dar una vuelta.</p>
                <div className="welcome-options">
                  {files.map((file) => <button key={file.view} onClick={() => execute(file.view)}><span>{file.view}</span><span className="muted">{file.label}</span><span aria-hidden="true">↗</span></button>)}
                </div>
              </div>
              {entries.map((entry) => (
                <div className="terminal-entry" key={entry.id}>
                  <p className="command-echo"><span aria-hidden="true">~ $</span> {entry.command}</p>
                  <p className={entry.result.kind === "error" ? "command-output command-error" : "command-output"}>{entry.result.text}</p>
                  {entry.result.kind === "help" && <div className="help-commands">{commands.map((command) => <button onClick={() => execute(command.name)} key={command.name}><span>{command.name}</span><span>{command.description}</span></button>)}<p className="terminal-comment">open sesion-pendiente · abrir la ficha del juego</p></div>}
                  {entry.result.kind === "view" && <a className="terminal-view-link" href="#viewer">Ver en el visor <span aria-hidden="true">→</span></a>}
                </div>
              ))}
            </div>
            <form className="terminal-input" onSubmit={submit}>
              <label htmlFor="command" className="terminal-prompt"><span className="prompt-user">visitante</span><span>@ricardo</span><span className="prompt-path">:~$</span></label>
              <input id="command" aria-label="Comando de terminal" aria-describedby="terminal-hint" autoComplete="off" autoCapitalize="none" spellCheck={false} maxLength={160} placeholder="escribe help…" value={input} onChange={(event) => { setInput(event.target.value); setHistoryIndex(null); draftRef.current = event.target.value; }} onKeyDown={handleKey} />
              <button type="submit" className="command-submit" aria-label="Ejecutar comando">↵</button>
            </form>
            <div className="window-status" id="terminal-hint"><span>↑ ↓ historial <span aria-hidden="true">·</span> Tab completar</span><span>listo<span className="status-dot" aria-hidden="true" /></span></div>
          </section>

          <section className="window viewer-window" id="viewer" aria-labelledby="viewer-title" tabIndex={-1}>
            <div className="window-bar"><span className="window-mark" aria-hidden="true">~/</span><h2 id="viewer-title">visor <span className="window-path">— {currentFile.file}</span></h2><span className="window-dots" aria-hidden="true">···</span></div>
            <nav className="file-tabs" aria-label="Archivos del portafolio">{files.map((file) => <button key={file.view} aria-pressed={view === file.view} onClick={() => setView(file.view)}>{file.file}</button>)}</nav>
            <div className="viewer-content">
              {view === "about" && <article className="about-file"><p className="eyebrow">about.md</p><div className="profile-monogram" aria-hidden="true">RC<span>_</span></div><h2>Un poco sobre mí.</h2><p className="viewer-lead">Soy {profile.name}, {profile.role.toLowerCase()}.</p><p>{profile.description} Aquí puedes conocerme, explorar mis proyectos y ponerte en contacto conmigo.</p><dl className="profile-facts"><div><dt>Ubicación</dt><dd>{profile.location}</dd></div><div><dt>Ahora</dt><dd>Ciencia de datos</dd></div><div><dt>En la web</dt><dd><ExternalLink href={profile.githubUrl}>github.com/{profile.github} ↗</ExternalLink></dd></div></dl><button className="text-link" onClick={() => execute("projects")}>Explorar proyectos <span aria-hidden="true">→</span></button></article>}
              {view === "projects" && <ProjectDetails />}
              {view === "contact" && <article className="contact-file"><p className="eyebrow">contact.txt</p><h2>Sigamos la conversación.</h2><p className="viewer-lead">Si tienes una idea, un proyecto o simplemente quieres saludar, puedes escribirme.</p><a className="contact-address" href={`mailto:${profile.email}`}>{profile.email} <span aria-hidden="true">↗</span></a><p className="muted">Se abrirá tu aplicación de correo.</p><div className="contact-github"><span className="eyebrow">También en</span><ExternalLink href={profile.githubUrl}>GitHub / {profile.github} ↗</ExternalLink></div></article>}
            </div>
            <div className="window-status"><span>{currentFile.file}</span><span>lectura pública</span></div>
          </section>
        </div>

        <footer className="desktop-footer"><span>Hecho para explorar, con o sin comandos.</span><Link href="/scary" className="scary-shortcut"><span aria-hidden="true">⌁</span> /scary <span className="scary-shortcut-note">una sesión pendiente</span></Link></footer>
      </main>
    </div>
  );
}
