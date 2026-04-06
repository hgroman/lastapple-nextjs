export interface Client {
  name: string;
  url: string;
  screenshot: string;
  tags: string[];
  featured?: boolean;
}

export const clients: Client[] = [
  {
    name: 'DaxCopilot.ai',
    url: 'https://daxcopilot.ai',
    screenshot: '/images/portfolio/daxcopilot.webp',
    tags: ['AI', 'Copilot'],
    featured: true,
  },
  {
    name: 'Carrier Advisors',
    url: 'https://carrier-advisors.com',
    screenshot: '/images/portfolio/carrier-advisors.webp',
    tags: ['WordPress'],
    featured: true,
  },
  {
    name: 'Duke Multimedia',
    url: 'https://duke-multimedia.com',
    screenshot: '/images/portfolio/duke-multimedia.webp',
    tags: ['WordPress', 'Video'],
  },
  {
    name: 'Advan Bio',
    url: 'https://advan-bio.com',
    screenshot: '/images/portfolio/advan-bio.webp',
    tags: ['WordPress', 'Biotech', 'Analytics'],
    featured: true,
  },
  {
    name: 'Trust and Obey',
    url: 'https://trustandobey.live',
    screenshot: '/images/portfolio/trustandobey.webp',
    tags: ['WordPress'],
  },
  {
    name: 'Idyll Awhile',
    url: 'https://idyll-awhile.com',
    screenshot: '/images/portfolio/idyll-awhile.webp',
    tags: ['WordPress'],
  },
  {
    name: 'SAG Exterior Cleaning',
    url: 'https://sagexteriorcleaning.com',
    screenshot: '/images/portfolio/sagexteriorcleaning.webp',
    tags: ['WordPress', 'SEO'],
  },
  {
    name: 'Thriving Numbers',
    url: 'https://thrivingnumbers.com',
    screenshot: '/images/portfolio/thrivingnumbers.webp',
    tags: ['WordPress', 'Automation'],
    featured: true,
  },
  {
    name: 'ScraperSky',
    url: 'https://scrapersky.com',
    screenshot: '/images/portfolio/scrapersky.webp',
    tags: ['AI', 'SaaS', 'Data'],
  },
  {
    name: 'HarmonyTech',
    url: 'https://harmonytech.io',
    screenshot: '/images/portfolio/harmonytech.webp',
    tags: ['WordPress', 'Consulting'],
  },
  {
    name: 'Improve My Rankings',
    url: 'https://improvemyrankings.com',
    screenshot: '/images/portfolio/improvemyrankings.webp',
    tags: ['SEO'],
  },
];
