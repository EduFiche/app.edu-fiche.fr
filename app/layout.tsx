import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ResponsiveSidebar from "@/components/common/responsive-sidebar";

export const metadata: Metadata = {
  title: "Edufiche - Votre plateforme de révision",
  description:
    "Edufiche est une plateforme de révision en ligne qui vous permet de réviser vos cours de manière interactive et ludique.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ResponsiveSidebar>{children}</ResponsiveSidebar>
        </ThemeProvider>
      </body>
    </html>
  );
}
