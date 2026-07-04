import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy of Sangalo Tech Pvt. Ltd. - IT training institute and software company in Nepal.',
  alternates: { canonical: 'https://sangalotech.com/privacy' },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
