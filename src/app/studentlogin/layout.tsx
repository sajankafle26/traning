import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Student Login',
  description: 'Log in to your Sangalo Tech student dashboard.',
};

export default function StudentLoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
