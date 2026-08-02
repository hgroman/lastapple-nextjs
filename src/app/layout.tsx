import type { Metadata } from "next";
import Script from "next/script";
import { Navigation } from "@/components/Navigation";
import { CursorGlow } from "@/components/CursorGlow";
import "./globals.css";

// Analytics IDs from environment variables.
// trim() is load-bearing: a trailing newline in the Vercel dashboard value lands
// inside a single-quoted JS string literal below and kills the whole inline script
// with "SyntaxError: Invalid or unexpected token" — silently, at runtime only, with
// a green build. That is exactly what happened (2026-01 → 2026-08-02, no analytics).
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim();

export const metadata: Metadata = {
  title: {
    default: "Last Apple Business Solutions",
    template: "%s | Last Apple",
  },
  description: "30 years of system integration expertise. AI-powered solutions. WordPress that actually works.",
  keywords: ["WordPress", "AI", "business solutions", "system integration", "digital marketing"],
  metadataBase: new URL("https://lastapple.com"),
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Last Apple Business Solutions",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@hankgroman",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://lastapple.com/#organization",
      name: "Last Apple Business Solutions",
      url: "https://lastapple.com",
      logo: {
        "@type": "ImageObject",
        url: "https://lastapple.com/images/logo.png",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-949-529-9017",
        contactType: "customer service",
        email: "hank@lastapple.com",
        areaServed: "US",
        availableLanguage: "English",
      },
      // sameAs tells Google which accounts ARE this organization. A dead or personal
      // profile here actively misinforms the knowledge graph. COMPANY accounts only,
      // verified against asset_social_media 2026-08-02 (task ea75e32b).
      sameAs: [
        "https://www.facebook.com/LastAppleAI",
        "https://x.com/lastappleai",
        "https://www.instagram.com/lastappleai/",
        "https://www.youtube.com/@lastappleai",
        "https://linkedin.com/company/lastapple",
      ],
      founder: {
        "@type": "Person",
        name: "Hank Groman",
        jobTitle: "Founder & Principal Consultant",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "La Palma",
        addressRegion: "CA",
        addressCountry: "US",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://lastapple.com/#website",
      url: "https://lastapple.com",
      name: "Last Apple Business Solutions",
      publisher: {
        "@id": "https://lastapple.com/#organization",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen bg-background text-foreground">
        {/* Google Analytics */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', ${JSON.stringify(GA_MEASUREMENT_ID)});
              `,
              }}
            />
          </>
        )}

        {/* Microsoft Clarity */}
        {CLARITY_PROJECT_ID && (
          <Script
            id="microsoft-clarity"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", ${JSON.stringify(CLARITY_PROJECT_ID)});
            `,
            }}
          />
        )}

        <CursorGlow />
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
