import { notFound } from "next/navigation";
import { servicesData } from "../../../data/servicesData";
import ServiceDetailClient from "./ServiceDetailClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found | ScaleUp Web",
    };
  }

  const url = `https://www.scaleupweb.xyz/services/${slug}`;

  return {
    title: `${service.title} Development & Solutions`,
    description: service.shortDescription || service.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${service.title} Development & Solutions | ScaleUp Web`,
      description: service.shortDescription || service.description,
      url,
      siteName: "ScaleUp Web",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} Development & Solutions | ScaleUp Web`,
      description: service.shortDescription || service.description,
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} />;
}
