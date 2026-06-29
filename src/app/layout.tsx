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
  metadataBase: new URL("https://sangalotech.com.np"),
  title: {
    default: "Sangalo Tech | Web Development Company & IT Training Institute in Nepal",
    template: "%s | Sangalo Tech",
  },
  description: "Sangalo Tech Pvt. Ltd. is Nepal's leading web development company and IT training institute. We build custom web apps, mobile apps, and provide SEO services. Also offering MERN Stack, React, Python Django, UI/UX, and Digital Marketing training courses.",
  keywords: [
    "IT institute Nepal", "web development company Nepal", "IT training Nepal", "MERN Stack course Nepal",
    "React Next.js training Nepal", "UI UX design course Nepal", "digital marketing course Nepal",
    "Python Django training Nepal", "web development services Nepal", "mobile app development Nepal",
    "SEO services Nepal", "best IT institute Bhaktapur", "coding bootcamp Nepal", "job ready IT programs Nepal",
    "Sangalo Tech", "Sajan Kafle"
  ],
  authors: [{ name: "Sangalo Tech Pvt. Ltd.", url: "https://sangalotech.com.np" }],
  creator: "Sangalo Tech Pvt. Ltd.",
  publisher: "Sangalo Tech Pvt. Ltd.",
  openGraph: {
    title: {
      default: "Sangalo Tech | Web Development & IT Training in Nepal",
      template: "%s | Sangalo Tech",
    },
    description: "Nepal's leading web development company and IT training institute. Custom web apps, mobile apps, SEO services + professional courses in MERN Stack, React, UI/UX, Digital Marketing.",
    url: "https://sangalotech.com.np",
    siteName: "Sangalo Tech",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sangalo Tech - Best Web Development Company & IT Training Institute in Nepal",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sangalo Tech | Web Development & IT Training in Nepal",
    description: "Nepal's leading web development company and IT training institute. MERN Stack, React, UI/UX courses and professional web services.",
    images: ["/og-image.png"],
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
    canonical: "https://sangalotech.com.np",
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
