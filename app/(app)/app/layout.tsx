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
    <CSPostHogProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <CombinedSidebar>
          <AppLayout>{children}</AppLayout>
        </CombinedSidebar>
      </ThemeProvider>
    </CSPostHogProvider>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return <main className="p-4 w-full">{children}</main>;
}
