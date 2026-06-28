import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const title = slug
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());

    return {
        title: `${title} | Sangalo Tech`,
        description: `Professional ${title} services by Sangalo Tech Pvt. Ltd. in Nepal.`,
    };
}

export default function ServiceSlugLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
