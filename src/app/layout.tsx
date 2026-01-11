import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navigation } from "@/components/Navigation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background font-sans`}
      >
        <Navigation />
        <main>{children}</main>
        <footer className="border-t py-8 mt-16">
          <div className="container text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Last Apple Business Solutions. All rights reserved.</p>
            <p className="mt-2">La Palma, CA &middot; 714-813-9973 &middot; hank@lastapple.com</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
