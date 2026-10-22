"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import Monologue from "@/components/ted/Monologue";
import ExternalLink from "@/components/ui/ExternalLink";
import ProjectDetails from "@/components/desktop/ProjectDetails";
import { profile } from "@/data/profile";
import { commands, completions, resolveCommand, type CommandResult, type View } from "@/lib/terminal";

type Entry = { id: number; command: string; result: Exclude<CommandResult, { kind: "clear" }> };
const files: { view: View; file: string; label: string }[] = [
  { view: "about", file: "about.md", label: "About me" },
  { view: "projects", file: "projects/", label: "Projects" },
  { view: "contact", file: "contact.txt", label: "Contact" },
];

export default function Desktop({ logo }: { logo: string }) {
  const [input, setInput] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const draftRef = useRef("");
  const entryId = useRef(0);

  useEffect(() => {
    if (entries.length) logRef.current?.lastElementChild?.scrollIntoView({ block: "start" });
    const result = entries.at(-1)?.result;
    if (result?.kind !== "view" || result.view !== "ted") inputRef.current?.focus({ preventScroll: true });
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

  return (
    <main className="terminal-screen" aria-label="Portfolio terminal">
      <a className="skip-link" href="#command">Skip to command line</a>
              <div className="terminal-welcome">
                <pre className="ascii-logo" role="img" aria-label="ASCII sheep logo">{logo}</pre>
                <h1>{profile.name}</h1>
                <p>{profile.role}.<br />{profile.description}</p>
                <p className="muted">Type <button className="inline-command" onClick={() => execute("help")}>help</button> to see available commands.</p>
                <div className="terminal-shortcuts" aria-label="Portfolio commands">
                  {files.map((file) => <button key={file.view} onClick={() => execute(file.view)}><span>{file.view}</span><span className="muted">{file.label}</span></button>)}
                </div>
              </div>
            <div ref={logRef} role="log" aria-label="Terminal history" aria-live="polite">
              {entries.map((entry) => (
                <div className="terminal-entry" key={entry.id}>
                  <p className="command-echo"><span aria-hidden="true">~ $</span> {entry.command}</p>
                  {entry.result.kind !== "view" && <p className={entry.result.kind === "error" ? "command-output command-error" : "command-output"}>{entry.result.text}</p>}
                  {entry.result.kind === "help" && <div className="help-commands">{commands.map((command) => <button onClick={() => execute(command.name)} key={command.name}><span>{command.name}</span><span>{command.description}</span></button>)}<p className="terminal-comment">open projects/ted · view project details</p></div>}
                  {entry.result.kind === "view" && <div className="viewer-content terminal-result">
                    {entry.result.view === "about" && <article className="about-file"><p className="eyebrow">about.md</p><h2>A little about me.</h2><p className="viewer-lead">I’m {profile.name}, a {profile.role.toLowerCase()}.</p><p>{profile.description}</p><dl className="profile-facts"><div><dt>Location</dt><dd>{profile.location}</dd></div><div><dt>Now</dt><dd>Data science</dd></div><div><dt>On the web</dt><dd><ExternalLink href={profile.githubUrl}>github.com/{profile.github} ↗</ExternalLink></dd></div></dl><button className="text-link" onClick={() => execute("projects")}>Browse projects</button></article>}
                    {entry.result.view === "projects" && <ProjectDetails onPlay={() => execute("ted")} onDetails={() => execute("open projects/ted")} />}
                    {entry.result.view === "ted" && <Monologue embedded onExit={() => { inputRef.current?.focus(); }} />}
                    {entry.result.view === "contact" && <article className="contact-file"><p className="eyebrow">contact.txt</p><h2>Let’s talk.</h2><p className="viewer-lead">Have an idea, a project, or just want to say hello? Send me an email.</p><a className="contact-address" href={`mailto:${profile.email}`}>{profile.email}</a><p className="muted">Opens your email app.</p><div className="contact-github"><ExternalLink href={profile.githubUrl}>GitHub / {profile.github} ↗</ExternalLink></div></article>}
                  </div>}
                </div>
              ))}
            </div>
            <form className="terminal-input" onSubmit={submit}>
              <label htmlFor="command" className="terminal-prompt"><span className="prompt-user">visitor</span><span>@ricardo</span><span className="prompt-path">:~$</span></label>
              <input ref={inputRef} id="command" aria-label="Terminal command" aria-describedby="terminal-hint" autoComplete="off" autoCapitalize="none" spellCheck={false} maxLength={160} placeholder="type help…" value={input} onChange={(event) => { setInput(event.target.value); setHistoryIndex(null); draftRef.current = event.target.value; }} onKeyDown={handleKey} />
              <button type="submit" className="command-submit" aria-label="Run command">↵</button>
            </form>
      <div className="terminal-hint" id="terminal-hint"><span>↑ ↓ history · Tab complete</span><button onClick={() => execute("ted")}>ted</button></div>
    </main>
  );
}
