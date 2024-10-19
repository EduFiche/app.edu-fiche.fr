import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "EduFiche - Votre plateforme pour réussir vos études !",
  description:
    "Générer des fiches de révision, des flashcards prenez des notes créer mindmap faites des quiz et des résumés de vos notes et tout cela en un seul endroit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
