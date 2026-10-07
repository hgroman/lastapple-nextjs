export interface Client {
  name: string;
  url: string;
  screenshot: string;
  tags: string[];
  featured?: boolean;
}

// Public portfolio is own properties only (CARD R4 / no-client-identification).
export const clients: Client[] = [
  {
    name: 'Trust and Obey',
    url: 'https://trustandobey.live',
    screenshot: '/images/portfolio/trustandobey.webp',
    tags: ['WordPress'],
    featured: true,
  },
  {
    name: 'ScraperSky',
    url: 'https://scrapersky.com',
    screenshot: '/images/portfolio/scrapersky.webp',
    tags: ['AI', 'SaaS', 'Data'],
    featured: true,
  },
  {
    name: 'HarmonyTech',
    url: 'https://harmonytech.io',
    screenshot: '/images/portfolio/harmonytech.webp',
    tags: ['WordPress', 'Consulting'],
    featured: true,
  },
  {
    name: 'Improve My Rankings',
    url: 'https://improvemyrankings.com',
    screenshot: '/images/portfolio/improvemyrankings.webp',
    tags: ['SEO'],
    featured: true,
  },
];
