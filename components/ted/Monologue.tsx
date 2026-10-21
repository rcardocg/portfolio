"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { monologue } from "@/lib/ted";

export default function Monologue({ embedded = false, onExit }: { embedded?: boolean; onExit?: () => void }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(1);
  const [closed, setClosed] = useState(false);
  const titleId = useId();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lines = monologue[step];
  const complete = visible >= lines.length;
  const Container = embedded ? "section" : "main";
  const Heading = embedded ? "h2" : "h1";

  useEffect(() => {
    if (closed) return;
    titleRef.current?.focus({ preventScroll: true });
  }, [step, closed]);

  useEffect(() => {
    if (closed || complete) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setVisible(reduced ? lines.length : visible + 1), reduced ? 0 : 1400);
    return () => window.clearTimeout(timer);
  }, [step, lines, visible, complete, closed]);

  function exit() {
    if (embedded) { setClosed(true); onExit?.(); }
    else router.push("/");
  }

  function advance() {
    if (!complete) setVisible(lines.length);
    else if (step < monologue.length - 1) { setStep(step + 1); setVisible(1); }
    else exit();
  }

  if (closed) return <p className="muted">Session closed.</p>;

  return (
    <Container className={embedded ? "ted-page ted-inline" : "ted-page"} aria-labelledby={titleId} onKeyDown={(event) => {
      if (event.key === "Escape") { event.stopPropagation(); exit(); }
    }}>
      <header className="ted-topbar">
        <button className="text-link" onClick={exit}>exit</button>
        <span className="muted">~/ted</span>
        <button className="text-link" onClick={() => { setStep(0); setVisible(1); }}>restart</button>
      </header>
      <div className="ted-content">
        <Heading id={titleId} ref={titleRef} tabIndex={-1}>AM <span className="muted">{step + 1} / {monologue.length}</span></Heading>
        <div className="ted-copy" aria-live="polite" aria-relevant="additions">
          {lines.slice(0, visible).map((line, index) => <p key={`${step}-${index}`}>{line}</p>)}
        </div>
        <button className="text-link ted-advance" onClick={advance}>{!complete ? "show block" : step < monologue.length - 1 ? "continue" : "exit"}</button>
        <p className="ted-credit muted">I Have No Mouth, and I Must Scream · AM</p>
      </div>
    </Container>
  );
}
