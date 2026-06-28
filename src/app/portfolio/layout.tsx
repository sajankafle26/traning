import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Our Portfolio | Sangalo Tech',
    description: 'Explore our latest digital transformations and high-impact web solutions for global clients.',
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
