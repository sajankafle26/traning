import Link from 'next/link';
import { FaChevronRight, FaHome } from 'react-icons/fa';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://sangalotech.com.np",
      },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.label,
        ...(item.href ? { item: `https://sangalotech.com.np${item.href}` } : {}),
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
        <Link
          href="/"
          className="flex items-center gap-1 text-white/60 hover:text-white transition-colors no-underline"
        >
          <FaHome className="text-xs" />
          Home
        </Link>
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-2">
            <FaChevronRight className="text-[8px] text-white/40" />
            {item.href ? (
              <Link
                href={item.href}
                className="text-white/60 hover:text-white transition-colors no-underline"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-white font-medium">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
