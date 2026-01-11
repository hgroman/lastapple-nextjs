import type { Metadata } from "next";
import Script from "next/script";
import { Navigation } from "@/components/Navigation";
import { CursorGlow } from "@/components/CursorGlow";
import "./globals.css";

// Analytics IDs from environment variables
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

export const metadata: Metadata = {
  title: {
    default: "Last Apple Business Solutions",
    template: "%s | Last Apple",
  },
  description: "30 years of system integration expertise. AI-powered solutions. WordPress that actually works.",
  keywords: ["WordPress", "AI", "business solutions", "system integration", "digital marketing"],
  metadataBase: new URL("https://lastapple.com"),
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
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
        telephone: "+1-714-813-9973",
        contactType: "customer service",
        email: "hank@lastapple.com",
        areaServed: "US",
        availableLanguage: "English",
      },
      sameAs: [
        "https://www.linkedin.com/in/hankgroman/",
        "https://www.facebook.com/LastAppleConsulting",
        "https://www.instagram.com/hjgroman/",
        "https://www.youtube.com/channel/UC3OPbkyTemkxPwFNvIhHu2g",
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
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}

        {/* Microsoft Clarity */}
        {CLARITY_PROJECT_ID && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
            `}
          </Script>
        )}

        <CursorGlow />
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
