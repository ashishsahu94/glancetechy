// /admin/<projects | posts | testimonials | countries | states | cities>
import { notFound } from "next/navigation";
import ResourceList from "@/components/admin/ResourceList";
import { isResource, RESOURCE_KEYS } from "@/lib/admin-config";

export const dynamicParams = false;

export function generateStaticParams() {
  return RESOURCE_KEYS.map((resource) => ({ resource }));
}

export default async function ListPage({ params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;
  if (!isResource(resource)) notFound();
  return <ResourceList resource={resource} />;
}
