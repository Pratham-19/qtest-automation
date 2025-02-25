import "@/app/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { DashboardShell } from "@/components/dashboard-shell";
// import { TailwindIndicator } from "@/src/components/tailwind-indicator";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <DashboardShell>{children}</DashboardShell>
        {/* <TailwindIndicator /> */}
      </body>
    </html>
  );
}
