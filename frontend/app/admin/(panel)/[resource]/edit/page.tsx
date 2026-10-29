// /admin/<resource>/edit/?id=...   (static hosting me har id ka folder nahi ban sakta, isliye id query me hai)
import { notFound } from "next/navigation";
import { Suspense } from "react";
import EditResource from "@/components/admin/EditResource";
import { isResource, RESOURCE_KEYS } from "@/lib/admin-config";

export const dynamicParams = false;

export function generateStaticParams() {
  return RESOURCE_KEYS.map((resource) => ({ resource }));
}

export default async function EditPage({ params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;
  if (!isResource(resource)) notFound();
  return (
    <Suspense fallback={null}>
      <EditResource resource={resource} />
    </Suspense>
  );
}
