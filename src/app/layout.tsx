import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Sans_3, Ubuntu } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import StyledJsxRegistry from "@/components/StyledJsxRegistry";
import { GoogleAnalytics } from '@next/third-parties/google'
import ClientLayout from "@/components/ClientLayout";
import JsonLd, { ORGANIZATION_JSONLD, WEBSITE_JSONLD, LOCAL_BUSINESS_JSONLD } from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sangalotech.com"),
  title: {
    default: "Sangalo Tech | Best IT Training Institute & Software Company in Nepal",
    template: "%s | Sangalo Tech",
  },
  description: "Sangalo Tech Pvt. Ltd. is Nepal's best IT training institute and software company. MERN Stack training, WordPress training, web design training, website development training, PHP Laravel training, digital marketing training in Nepal. Also providing web design, website development, and software services.",
  keywords: [
    "MERN Stack training in Nepal",
    "WordPress training in Nepal",
    "web design training in Nepal",
    "website development training in Nepal",
    "PHP with Laravel training in Nepal",
    "digital marketing training in Nepal",
    "best training institute in Nepal",
    "web design in Nepal",
    "website development in Nepal",
    "IT training Nepal",
    "web development company Nepal",
    "React Next.js training Nepal",
    "UI UX design course Nepal",
    "Python Django training Nepal",
    "mobile app development Nepal",
    "SEO services Nepal",
    "coding bootcamp Nepal",
    "job ready IT programs Nepal",
    "IT institute Bhaktapur",
    "Sangalo Tech",
    "Sajan Kafle"
  ],
  authors: [{ name: "Sangalo Tech Pvt. Ltd.", url: "https://sangalotech.com" }],
  creator: "Sangalo Tech Pvt. Ltd.",
  publisher: "Sangalo Tech Pvt. Ltd.",
  openGraph: {
    title: {
      default: "Sangalo Tech | Best IT Training Institute & Software Company in Nepal",
      template: "%s | Sangalo Tech",
    },
    description: "Nepal's best IT training institute and software company. MERN Stack, WordPress, PHP Laravel, Digital Marketing training + web design, website development services.",
    url: "https://sangalotech.com",
    siteName: "Sangalo Tech",
    images: [
      {
        url: "https://sangalotech.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sangalo Tech - Best IT Training Institute & Software Company in Nepal",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sangalo Tech | Best IT Training Institute & Software Company in Nepal",
    description: "Nepal's best IT training institute and software company. MERN Stack, WordPress, PHP Laravel, Digital Marketing training + web design, website development services.",
    images: [
      {
        url: "https://sangalotech.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sangalo Tech - Best IT Training Institute & Software Company in Nepal",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.png", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  alternates: {
    canonical: "https://sangalotech.com/",
  },
};

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-heading',
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/logo.png" as="image" />
        <link rel="preload" href="/about/office.jpg" as="image" />
      </head>
      <body className={`${sourceSans.variable} ${ubuntu.variable} ${geistSans.variable} ${geistMono.variable}`} >
        <JsonLd data={ORGANIZATION_JSONLD} />
        <JsonLd data={WEBSITE_JSONLD} />
        <JsonLd data={LOCAL_BUSINESS_JSONLD} />
        <StyledJsxRegistry>
          <Providers>
            <ClientLayout>{children}</ClientLayout>
          </Providers>
        </StyledJsxRegistry>
      </body>
      <GoogleAnalytics gaId="G-33K8458JSC" />
    </html>
  );
}
