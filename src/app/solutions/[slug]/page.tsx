import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSolutions, getSolution } from '@/lib/content';
import { sanitizeContent } from '@/lib/sanitize';
import { SolutionLayout } from '@/components/content/layouts/SolutionLayout';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const solutions = getSolutions();
  return solutions.map((solution) => ({
    slug: solution.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);

  if (!solution) {
    return {
      title: 'Solution Not Found',
    };
  }

  return {
    title: `${solution.title} | Solutions | Last Apple`,
    description: solution.description,
    openGraph: {
      title: solution.title,
      description: solution.description,
      type: 'website',
    },
  };
}

export default async function SolutionPage({ params }: PageProps) {
  const { slug } = await params;
  const solution = getSolution(slug);

  if (!solution) {
    notFound();
  }

  return (
    <SolutionLayout
      title={solution.title}
      description={solution.description}
      icon={solution.icon}
      category={solution.category}
      outcomes={solution.outcomes}
      caseStudy={solution.caseStudy}
    >
      {/* Sanitized content - XSS protected */}
      <div dangerouslySetInnerHTML={{ __html: sanitizeContent(solution.body) }} />
    </SolutionLayout>
  );
}
