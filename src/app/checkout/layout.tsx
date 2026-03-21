import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Securely checkout and enroll in Sangalo Tech courses.',
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
