import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // AI-training crawlers blocked (ai-train=no intent, preserved from the prior
  // Cloudflare content-signals policy after the move to Vercel/DNS-only).
  // Search engines remain fully allowed.
  const aiTrainingBots = [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'CCBot',
    'Google-Extended',
    'anthropic-ai',
    'ClaudeBot',
    'Claude-Web',
    'PerplexityBot',
    'Amazonbot',
    'Applebot-Extended',
    'Bytespider',
    'Meta-ExternalAgent',
    'cohere-ai',
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: aiTrainingBots,
        disallow: '/',
      },
    ],
    sitemap: 'https://lastapple.com/sitemap.xml',
  };
}
