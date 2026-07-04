import { Metadata } from 'next';
import dbConnect from '@/lib/dbConnect';
import Service from '@/models/Service';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    await dbConnect();
    const service = await Service.findOne({ slug }).lean();
    if (!service) return { title: 'Service Not Found' };
    return {
      title: `${service.title} in Nepal`,
      description: `${service.title} by Sangalo Tech Pvt. Ltd. - Professional ${service.title.toLowerCase()} services in Nepal.`,
      openGraph: {
        title: `${service.title} in Nepal | Sangalo Tech`,
        description: `Professional ${service.title.toLowerCase()} services in Nepal by Sangalo Tech Pvt. Ltd.`,
        url: `https://sangalotech.com/services/${slug}`,
        siteName: 'Sangalo Tech',
        type: 'website',
        images: service.image
          ? [{ url: service.image, width: 1200, height: 630, alt: service.title }]
          : [{ url: 'https://sangalotech.com/og-image.png', width: 1200, height: 630, alt: service.title }],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${service.title} | Sangalo Tech`,
        description: `Professional ${service.title.toLowerCase()} services in Nepal.`,
        images: [service.image || 'https://sangalotech.com/og-image.png'],
      },
      alternates: { canonical: `https://sangalotech.com/services/${slug}` },
    };
  } catch {
    return { title: 'Service | Sangalo Tech' };
  }
}

export default function ServiceDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
