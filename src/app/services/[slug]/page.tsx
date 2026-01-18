import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getServices, getService } from '@/lib/content';
import { ServiceLayout } from '@/components/content/layouts/ServiceLayout';
import { mdxComponents } from '@/lib/mdx-components';

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
      heroImage={service.heroImage}
      tierImages={service.tierImages}
    >
      <MDXRemote source={service.body} components={mdxComponents} />
    </ServiceLayout>
  );
}
