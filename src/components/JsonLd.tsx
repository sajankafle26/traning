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
  url: "https://sangalotech.com",
  logo: "https://sangalotech.com/logo.png",
  description:
    "Sangalo Tech is Nepal's best IT training institute and software company offering MERN Stack, WordPress, PHP Laravel, Digital Marketing training and web design, website development services.",
  foundingDate: "2022",
  founder: {
    "@type": "Person",
    name: "Sajan Kafle",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Lokenthali",
    addressLocality: "Bhaktapur",
    addressRegion: "Bagmati",
    postalCode: "44800",
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
    "https://x.com/sangalotech",
  ],
};

export const WEBSITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sangalo Tech",
  url: "https://sangalotech.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://sangalotech.com/courses?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export const LOCAL_BUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Sangalo Tech Pvt. Ltd.",
  alternateName: "Sangalo Tech IT Training Institute Nepal",
  image: "https://sangalotech.com/logo.png",
  url: "https://sangalotech.com",
  telephone: "+977-9851228383",
  email: "studio@sangalotech.com",
  description: "Nepal's best IT training institute and software company. MERN Stack training, WordPress training, web design training, website development training, PHP Laravel training, digital marketing training in Nepal.",
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
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sunday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    bestRating: "5",
    ratingCount: "150",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "IT Training Courses & Software Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name: "MERN Stack Training in Nepal",
          description: "Complete MERN Stack development course with MongoDB, Express.js, React, and Node.js. Job-ready program with internship and placement assistance.",
          url: "https://sangalotech.com/courses/mern-stack",
          provider: { "@type": "Organization", name: "Sangalo Tech Pvt. Ltd." },
          educationalLevel: "Beginner to Advanced",
          timeRequired: "3-6 months",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name: "WordPress Training in Nepal",
          description: "Professional WordPress development training. Learn theme customization, plugin development, and WooCommerce setup.",
          url: "https://sangalotech.com/courses/wordpress",
          provider: { "@type": "Organization", name: "Sangalo Tech Pvt. Ltd." },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name: "Web Design Training in Nepal",
          description: "UI/UX design course covering Figma, Adobe XD, prototyping, wireframing, and design systems.",
          url: "https://sangalotech.com/courses/ui-ux-design",
          provider: { "@type": "Organization", name: "Sangalo Tech Pvt. Ltd." },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name: "PHP with Laravel Training in Nepal",
          description: "Complete PHP and Laravel framework training. Build REST APIs, MVC applications, and full-stack projects.",
          url: "https://sangalotech.com/courses/laravel",
          provider: { "@type": "Organization", name: "Sangalo Tech Pvt. Ltd." },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name: "Digital Marketing Training in Nepal",
          description: "Complete digital marketing course covering SEO, Google Ads, social media marketing, content marketing, and analytics.",
          url: "https://sangalotech.com/courses/digital-marketing",
          provider: { "@type": "Organization", name: "Sangalo Tech Pvt. Ltd." },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web Design in Nepal",
          description: "Professional website design and development services for businesses in Nepal.",
          url: "https://sangalotech.com/services",
          provider: { "@type": "Organization", name: "Sangalo Tech Pvt. Ltd." },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Website Development in Nepal",
          description: "Custom website development services using React, Next.js, PHP, Laravel, and WordPress.",
          url: "https://sangalotech.com/services",
          provider: { "@type": "Organization", name: "Sangalo Tech Pvt. Ltd." },
        },
      },
    ],
  },
};
