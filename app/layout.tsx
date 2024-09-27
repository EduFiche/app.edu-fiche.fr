import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Edufiche",
  description: "Edufiche",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
