import { notFound } from "next/navigation";
import ResourceForm from "@/components/admin/ResourceForm";
import { configs, isResource, RESOURCE_KEYS } from "@/lib/admin-config";

export const dynamicParams = false;

export function generateStaticParams() {
  return RESOURCE_KEYS.map((resource) => ({ resource }));
}

export default async function NewPage({ params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;
  if (!isResource(resource)) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold sm:text-3xl">{configs[resource].newLabel}</h1>
      <ResourceForm resource={resource} />
    </div>
  );
}
