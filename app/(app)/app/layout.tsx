import type { Metadata } from "next";
import "../../globals.css";
import { defaultMetadata } from "@/utils/metadata";
import { CSPostHogProvider } from "@/providers/post-hog-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import CombinedSidebar from "@/components/shared/sidebar/combined-sidebar";

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <CSPostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <CombinedSidebar>{children}</CombinedSidebar>
          </ThemeProvider>
        </CSPostHogProvider>
      </body>
    </html>
  );
}
