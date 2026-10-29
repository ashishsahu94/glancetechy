"use client";
// Edit page: loads the row using ?id= and displays the form
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ResourceForm from "@/components/admin/ResourceForm";
import { adminRequest } from "@/lib/admin-api";
import { configs, type ResourceKey } from "@/lib/admin-config";

export default function EditResource({ resource }: { resource: ResourceKey }) {
  const id = useSearchParams().get("id") ?? "";
  const [item, setItem] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    let alive = true;
    adminRequest<Record<string, unknown>>(`/${resource}/${encodeURIComponent(id)}`)
      .then((d) => alive && setItem(d))
      .catch((e) => alive && setError(e instanceof Error ? e.message : "Unable to load."));
    return () => {
      alive = false;
    };
  }, [resource, id]);

  if (!id) return <p className="text-red-600">ID not found.</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!item) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold sm:text-3xl">{configs[resource].singular} Edit</h1>
      <ResourceForm resource={resource} item={item} />
    </div>
  );
}