import { authMetadata } from "@/utils/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = authMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
