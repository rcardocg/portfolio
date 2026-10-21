import type { Metadata } from "next";
import Link from "next/link";
import ProjectDetails from "@/components/desktop/ProjectDetails";

export const metadata: Metadata = {
  title: "ted | Ricardo Caballeros",
  description: "???",
};

export default function ProjectPage() {
  return (
    <main className="project-page">
      <Link className="text-link back-link" href="/">← Back to desktop</Link>
      <section className="window standalone-window" aria-label="Project details">
        <div className="window-bar"><span className="window-mark" aria-hidden="true">~/</span><span>projects / ted.md</span></div>
        <div className="viewer-content"><ProjectDetails standalone /></div>
      </section>
    </main>
  );
}
