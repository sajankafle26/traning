import type { Metadata } from "next";
import ClientCourseLoader from "./client-only-loader";
import JsonLd from "@/components/JsonLd";

import { COURSES } from "@/constants";
import dbConnect from "@/lib/dbConnect";
import LiveCourse from "@/models/LiveCourse";

export async function generateMetadata({ params }: { params: { slug: string } | Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  let course = COURSES.find(c => c.slug === slug || c.id === slug);

  if (!course) {
    await dbConnect();
    // Try to find in database
    const dbCourse = await LiveCourse.findOne({
      $or: [{ slug: slug }, { _id: slug.match(/^[0-9a-fA-F]{24}$/) ? slug : null }]
    }).lean();

    if (dbCourse) {
      course = {
        ...dbCourse,
        id: (dbCourse as any)._id.toString(),
        title: (dbCourse as any).title,
        description: (dbCourse as any).description,
        image: (dbCourse as any).image,
      } as any;
    }
  }

  if (!course) {
    return {
      title: "Course Not Found | Sangalo Tech",
    };
  }

  return {
    title: `${course.title} in Nepal | Sangalo Tech`,
    description: `${course.title} training in Nepal at Sangalo Tech. Join job-ready course with internship, live projects, certification, and placement assistance.`,
    keywords: [course.title, `${course.title} Nepal`, 'IT training Nepal', 'Sangalo Tech'],
    openGraph: {
      title: `${course.title} in Nepal | Sangalo Tech`,
      description: `${course.title} training in Nepal. Job-ready program with internship and placement assistance.`,
      url: `https://sangalotech.com/courses/${course.slug || slug}`,
      siteName: 'Sangalo Tech',
      type: 'website',
      images: course.image ? [{ url: course.image, width: 1200, height: 630, alt: course.title }] : [],
    },
    alternates: { canonical: `https://sangalotech.com/courses/${course.slug || slug}` },
  };
}

// Course + Product Schema
function CourseSchema({ course, slug }: { course: any; slug: string }) {
  const courseUrl = `https://sangalotech.com/courses/${slug}`;
  const price = course.price || 0;
  const currency = "NPR";
  const availability = price > 0 ? "https://schema.org/InStock" : "https://schema.org/Free";

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description || `${course.title} training in Nepal at Sangalo Tech.`,
    provider: {
      "@type": "Organization",
      name: "Sangalo Tech Pvt. Ltd.",
      url: "https://sangalotech.com",
      sameAs: [
        "https://www.facebook.com/sangalotech",
        "https://www.instagram.com/sangalotech",
        "https://www.linkedin.com/company/sangalotech",
        "https://x.com/sangalotech",
      ],
    },
    offers: {
      "@type": "Offer",
      url: courseUrl,
      price: price,
      priceCurrency: currency,
      availability: availability,
      seller: {
        "@type": "Organization",
        name: "Sangalo Tech Pvt. Ltd.",
      },
    },
    educationalLevel: "Beginner to Advanced",
    educationalCredentialAwarded: "Certificate of Completion",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: course.duration || "PT40H",
    },
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: course.title,
    description: course.description || `${course.title} training in Nepal.`,
    image: course.image,
    brand: {
      "@type": "Brand",
      name: "Sangalo Tech",
    },
    offers: {
      "@type": "Offer",
      url: courseUrl,
      price: price,
      priceCurrency: currency,
      availability: availability,
      seller: {
        "@type": "Organization",
        name: "Sangalo Tech Pvt. Ltd.",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
      bestRating: "5",
    },
    category: "IT Training",
  };

  return (
    <>
      <JsonLd data={courseJsonLd} />
      <JsonLd data={productJsonLd} />
    </>
  );
}

export default async function Page({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  // Unwrap params if it's a promise
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  let course = COURSES.find(c => c.slug === slug || c.id === slug);

  if (!course) {
    await dbConnect();
    const dbCourse = await LiveCourse.findOne({
      $or: [{ slug: slug }, { _id: slug.match(/^[0-9a-fA-F]{24}$/) ? slug : null }]
    }).lean();

    if (dbCourse) {
      course = {
        ...dbCourse,
        id: (dbCourse as any)._id.toString(),
        title: (dbCourse as any).title,
        description: (dbCourse as any).description,
        image: (dbCourse as any).image,
      } as any;
    }
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-black text-slate-900">Course Not Found</h1>
          <p className="text-slate-500">The course you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <CourseSchema course={course} slug={slug} />
      <ClientCourseLoader slug={slug} />
    </>
  );
}
