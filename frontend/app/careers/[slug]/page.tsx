import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JobDetail from "@/components/careers/JobDetail";
import { jobs } from "@/lib/careers";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = jobs.find((j) => j.slug === slug);
  if (!job) return { title: "Careers" };
  return {
    title: `${job.title} | Careers at GlanceTechy`,
    description: job.summary.slice(0, 160),
    alternates: { canonical: `/careers/${job.slug}/` },
  };
}

export default async function JobPage({ params }: Props) {
  const { slug } = await params;
  const job = jobs.find((j) => j.slug === slug);
  if (!job) notFound();
  return <JobDetail job={job} />;
}
