import type { Metadata } from "next";
import "./globals.css";
import { defaultMetadata } from "@/utils/metadata";
import AuthProvider from "@/providers/auth-provider";
import { CSPostHogProvider } from "@/providers/post-hog-provider";

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
          <AuthProvider>{children}</AuthProvider>
        </CSPostHogProvider>
      </body>
    </html>
  );
}
