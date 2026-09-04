import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // AI crawlers are split by PURPOSE, not by vendor — the two behave differently
  // and the old single list conflated them. Training crawlers ingest the site into
  // model weights and get nothing back; retrieval crawlers fetch a page to cite it
  // in an answer, which sends real readers here. CEO decision 2026-09-04: keep the
  // ai-train=no stance, but stop hiding the work from the systems prospects now use
  // to evaluate AI vendors.
  const aiTrainingBots = [
    'GPTBot',
    'CCBot',
    'Google-Extended',
    'anthropic-ai',
    'ClaudeBot',
    'Amazonbot',
    'Applebot-Extended',
    'Bytespider',
    'Meta-ExternalAgent',
    'cohere-ai',
  ];

  // Allowed: these fetch a page in order to answer a question and attribute it.
  // OAI-SearchBot -> ChatGPT Search index; ChatGPT-User -> user-initiated fetch;
  // PerplexityBot -> Perplexity citations; Claude-Web -> user-initiated fetch.
  // They are covered by the '*' allow rule above and are deliberately NOT listed
  // as blocked. Do not "tidy" them back into aiTrainingBots.

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
