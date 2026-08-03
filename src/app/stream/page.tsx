import { Metadata } from 'next';
import Link from 'next/link';
import { formatPostDate } from '@/lib/utils';
import { Calendar, ArrowRight, Tag, Sparkles } from 'lucide-react';
import { getStreamPosts } from '@/lib/content';
import { BaseLayout } from '@/components/content/layouts/BaseLayout';

export const metadata: Metadata = {
  alternates: { canonical: "/stream" },
  title: 'The Stream',
  description: 'Daily work logs, experiments, AI discoveries, and journey documentation from Last Apple.',
  openGraph: {
    title: 'The Stream | Last Apple Business Solutions',
    description: 'Daily work logs, experiments, AI discoveries, and journey documentation.',
    type: 'website',
  },
};

export default function StreamPage() {
  const posts = getStreamPosts();
  const [featured, ...rest] = posts;

  return (
    <BaseLayout maxWidth="lg" showGrid orbStrength="vivid">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          The <span className="gradient-text">Stream</span>
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
        <>
          {/* Featured latest post */}
          {featured && (
            <Link
              href={`/stream/${featured.slug}`}
              className="group relative block mb-10 rounded-2xl p-[1px] bg-gradient-to-br from-primary/50 via-border to-accent/40 hover:from-primary/70 hover:to-accent/60 transition-all duration-300"
            >
              <div className="relative overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm p-8 sm:p-10">
                <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
                <div className="relative">
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                      <Sparkles className="h-3.5 w-3.5" />
                      Latest
                    </span>
                    {featured.category && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                        {featured.category.toUpperCase()}
                      </span>
                    )}
                    <span className="ml-auto flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {formatPostDate(featured.publishedAt, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6 max-w-3xl">
                    {featured.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-medium">
                    Read the latest
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Rest of the stream */}
          <div className="grid gap-6">
          {rest.map((post) => (
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
                    {formatPostDate(post.publishedAt, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </article>
          ))}
          </div>
        </>
      )}
    </BaseLayout>
  );
}
