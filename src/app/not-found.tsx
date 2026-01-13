import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-xl">
        {/* Large 404 */}
        <h1 className="text-[150px] md:text-[200px] font-bold leading-none bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mt-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mt-4 text-lg">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-border hover:border-primary/50 text-foreground font-medium rounded-lg transition-colors"
          >
            Contact Us
          </Link>
        </div>

        {/* Helpful links */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Here are some helpful links:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/services" className="text-accent hover:text-accent/80 transition-colors">
              Services
            </Link>
            <Link href="/solutions" className="text-accent hover:text-accent/80 transition-colors">
              Solutions
            </Link>
            <Link href="/stream" className="text-accent hover:text-accent/80 transition-colors">
              Blog
            </Link>
            <Link href="/about" className="text-accent hover:text-accent/80 transition-colors">
              About
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
