import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'The Journey | How We Built an AI-Native Digital Platform',
  description: 'The true story of migrating from WordPress to Next.js—consulting 4 AI platforms, writing 100K+ characters of research, and building a foundation for 10 more sites.',
  openGraph: {
    title: 'The Journey | How We Built an AI-Native Digital Platform',
    description: 'The true story of migrating from WordPress to Next.js—consulting 4 AI platforms, writing 100K+ characters of research, and building a foundation for 10 more sites.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Journey | How We Built an AI-Native Digital Platform',
    description: 'The true story of migrating from WordPress to Next.js—consulting 4 AI platforms, writing 100K+ characters of research.',
  },
};

export default function JourneyLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
