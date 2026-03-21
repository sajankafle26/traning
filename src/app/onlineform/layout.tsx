import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Online Enrollment Form',
  description: 'Enroll in our job-ready IT training programs at Sangalo Tech.',
};

export default function OnlineFormLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
