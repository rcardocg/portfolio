import type { Metadata } from "next";
import { profile } from "@/data/profile";
import "./globals.css";

export const metadata: Metadata = {
  title: `${profile.name} | Data science`,
  description: "Ricardo Caballeros' desktop. Systems engineer working in data science. Browse his profile and projects.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body>{children}</body>
    </html>
  );
}
