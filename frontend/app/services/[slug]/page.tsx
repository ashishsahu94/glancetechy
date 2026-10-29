import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetail from "@/components/services/ServiceDetail";
import { services } from "@/lib/services";
import { serviceDetails } from "@/lib/service-details";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return { title: "Services" };
  return {
    title: serviceDetails[s.slug]?.seoTitle ?? s.title,
    description: serviceDetails[s.slug]?.seoDescription ?? `${s.tagline} ${s.description}`.slice(0, 160),
    alternates: { canonical: `/services/${s.slug}/` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((x) => x.slug === slug);
  if (!service) notFound();
  return <ServiceDetail service={service} />;
}
