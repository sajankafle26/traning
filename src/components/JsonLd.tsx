interface JsonLdProps {
  data: Record<string, any>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sangalo Tech Pvt. Ltd.",
  url: "https://sangalotech.com.np",
  logo: "https://sangalotech.com.np/logo.png",
  description:
    "Sangalo Tech is Nepal's leading web development company and IT training institute offering MERN Stack, React, Next.js, UI/UX, and Digital Marketing courses.",
  foundingDate: "2022",
  founder: {
    "@type": "Person",
    name: "Sajan Kafle",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bhaktapur",
    addressCountry: "NP",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+977-9851228383",
    contactType: "customer service",
    email: "studio@sangalotech.com",
  },
  sameAs: [
    "https://www.facebook.com/sangalotech",
    "https://www.instagram.com/sangalotech",
    "https://www.linkedin.com/company/sangalotech",
  ],
};

export const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sangalo Tech",
  url: "https://sangalotech.com.np",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://sangalotech.com.np/courses?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export const LOCAL_BUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Sangalo Tech Pvt. Ltd.",
  image: "https://sangalotech.com.np/logo.png",
  url: "https://sangalotech.com.np",
  telephone: "+977-9851228383",
  email: "studio@sangalotech.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Lokenthali",
    addressLocality: "Bhaktapur",
    addressRegion: "Bagmati",
    postalCode: "44800",
    addressCountry: "NP",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 27.671,
    longitude: 85.429,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "18:00",
  },
  priceRange: "$$",
};
