import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getStreamPosts, getStreamPost } from '@/lib/content';
import { StreamLayout } from '@/components/content/layouts/StreamLayout';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getStreamPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getStreamPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | The Stream`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      tags: post.tags,
    },
  };
}

export default async function StreamPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getStreamPost(slug);

  if (!post) {
    notFound();
  }

  // Calculate reading time (rough estimate: 200 words per minute)
  const wordCount = post.body.split(/\s+/).length;
  const readingTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

  return (
    <StreamLayout
      title={post.title}
      description={post.description}
      publishedAt={post.publishedAt}
      updatedAt={post.updatedAt}
      tags={post.tags}
      category={post.category}
      readingTime={readingTime}
    >
      {/* MDX content would be rendered here */}
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
    </StreamLayout>
  );
}
