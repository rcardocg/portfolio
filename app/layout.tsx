import type { Metadata } from "next";
import { profile } from "@/data/profile";
import "./globals.css";

export const metadata: Metadata = {
  title: `${profile.name} | Ciencia de datos`,
  description: "El escritorio de Ricardo Caballeros. Ingeniero en sistemas que trabaja en ciencia de datos. Explora su perfil, proyectos y una pequeña ficción interactiva.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased">
      <body>{children}</body>
    </html>
  );
}
