import { getStreamPosts } from '@/lib/content';

const BASE_URL = 'https://lastapple.com';

export async function GET() {
  const posts = getStreamPosts();

  const feedItems = posts
    .slice(0, 20) // Limit to 20 most recent posts
    .map((post) => {
      const pubDate = new Date(post.publishedAt).toUTCString();
      const link = `${BASE_URL}/stream/${post.slug}`;

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${pubDate}</pubDate>
      ${post.category ? `<category>${post.category}</category>` : ''}
      ${post.tags?.map((tag) => `<category>${tag}</category>`).join('\n      ') || ''}
    </item>`;
    })
    .join('');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>The Stream | Last Apple Business Solutions</title>
    <link>${BASE_URL}/stream</link>
    <description>Daily work logs, experiments, AI discoveries, and journey documentation from Last Apple.</description>
    <language>en-us</language>
    <managingEditor>hank@lastapple.com (Hank Groman)</managingEditor>
    <webMaster>hank@lastapple.com (Hank Groman)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${BASE_URL}/images/logo.png</url>
      <title>Last Apple Business Solutions</title>
      <link>${BASE_URL}</link>
    </image>
    ${feedItems}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
