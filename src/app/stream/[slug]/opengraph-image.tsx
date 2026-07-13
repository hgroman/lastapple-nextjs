import { ImageResponse } from 'next/og';
import { getStreamPost } from '@/lib/content';

// Per-post social share card for Stream entries — branded crimson→teal on the
// warm dark background, generated at build time for every slug (SSG). Fixes the
// site-wide gap where og:image / twitter:image were absent.
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Last Apple — Live from the Lab';

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getStreamPost(slug);
  const title = post?.title ?? 'The Stream';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background:
            'linear-gradient(160deg, #141010 0%, #1c1616 62%, #17100f 100%)',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* top row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 32,
              fontWeight: 700,
              color: '#f4ecec',
              letterSpacing: '-0.5px',
            }}
          >
            Last Apple
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              fontWeight: 600,
              color: '#4db3a8',
              letterSpacing: '3px',
            }}
          >
            LIVE FROM THE LAB
          </div>
        </div>

        {/* title block */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              height: '10px',
              width: '190px',
              borderRadius: '5px',
              marginBottom: '38px',
              background:
                'linear-gradient(120deg, #d16b6b 0%, #c74a4a 35%, #4db3a8 100%)',
            }}
          />
          <div
            style={{
              display: 'flex',
              fontSize: title.length > 70 ? 58 : 66,
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.12,
              letterSpacing: '-1.5px',
              maxWidth: '1040px',
            }}
          >
            {title}
          </div>
        </div>

        {/* footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 24,
            color: '#9a8f8f',
          }}
        >
          <div style={{ display: 'flex' }}>lastapple.com/stream</div>
          <div style={{ display: 'flex', color: '#c74a4a', fontWeight: 700 }}>
            The Stream
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
