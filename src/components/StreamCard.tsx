import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { StreamPost } from '../../content/schema/stream';

interface StreamCardProps {
  post: StreamPost;
}

export function StreamCard({ post }: StreamCardProps) {
  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/stream/${post.slug}`}>
      <Card className="h-full transition-colors hover:bg-accent/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <time className="text-sm text-muted-foreground">{date}</time>
            {post.featured && (
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                Featured
              </span>
            )}
          </div>
          <CardTitle className="text-xl">{post.title}</CardTitle>
          <CardDescription>{post.description}</CardDescription>
        </CardHeader>
        {post.tags && post.tags.length > 0 && (
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </Link>
  );
}
