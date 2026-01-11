import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import { getStreamPosts } from '@/lib/content';
import { BaseLayout } from '@/components/content/layouts/BaseLayout';

export const metadata: Metadata = {
  title: 'The Stream | Last Apple Business Solutions',
  description: 'Daily work logs, experiments, AI discoveries, and journey documentation from Last Apple.',
  openGraph: {
    title: 'The Stream | Last Apple Business Solutions',
    description: 'Daily work logs, experiments, AI discoveries, and journey documentation.',
    type: 'website',
  },
};

export default function StreamPage() {
  const posts = getStreamPosts();

  return (
    <BaseLayout maxWidth="lg" showGrid>
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          The Stream
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Daily work logs, experiments, AI discoveries, and journey documentation.
          This is where the real work happens — unfiltered and in progress.
        </p>
      </header>

      {/* Posts Grid */}
      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">
            No posts yet. Check back soon.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group relative bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
            >
              <Link href={`/stream/${post.slug}`} className="absolute inset-0 z-10" />

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Category */}
                  {post.category && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-3">
                      {post.category.toUpperCase()}
                    </span>
                  )}

                  {/* Title */}
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {post.description}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground"
                        >
                          <Tag className="h-3 w-3" />
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{post.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Date & Arrow */}
                <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-2">
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </BaseLayout>
  );
}
