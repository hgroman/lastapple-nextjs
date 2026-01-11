import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServices, getService } from '@/lib/content';
import { sanitizeContent } from '@/lib/sanitize';
import { ServiceLayout } from '@/components/content/layouts/ServiceLayout';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = getServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${service.title} | Services | Last Apple`,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      type: 'website',
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  return (
    <ServiceLayout
      title={service.title}
      description={service.description}
      icon={service.icon}
      category={service.category}
      features={service.features}
      pricing={service.pricing}
      cta={service.cta}
    >
      {/* Sanitized content - XSS protected */}
      <div dangerouslySetInnerHTML={{ __html: sanitizeContent(service.body) }} />
    </ServiceLayout>
  );
}
