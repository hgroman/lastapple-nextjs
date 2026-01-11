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
        <footer className="relative border-t border-border py-12 mt-16">
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 to-transparent" />
          <div className="relative z-10 container">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="text-sm text-muted-foreground">
                  &copy; {new Date().getFullYear()} Last Apple Business Solutions. All rights reserved.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  La Palma, CA &middot; 714-813-9973 &middot; hank@lastapple.com
                </p>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
                <a href="/terms" className="hover:text-foreground transition-colors">Terms</a>
                <a href="/contact" className="hover:text-foreground transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
