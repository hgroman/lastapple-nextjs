import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { CursorGlow } from "@/components/CursorGlow";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Last Apple Business Solutions",
    template: "%s | Last Apple",
  },
  description: "30 years of system integration expertise. AI-powered solutions. WordPress that actually works.",
  keywords: ["WordPress", "AI", "business solutions", "system integration", "digital marketing"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-background text-foreground">
        <CursorGlow />
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
