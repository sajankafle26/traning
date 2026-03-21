import { Metadata } from 'next';
import { apiService } from '@/services/apiService';
import { SERVICES } from '@/constants';

export async function generateMetadata({ params }: { params: { slug: string } | Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  let service;
  try {
    service = await apiService.getServiceBySlug(slug);
  } catch (error) {
    service = SERVICES.find(s => s.slug === slug);
  }

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: service.title,
    description: service.description,
  };
}

export default function ServiceDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
