"use client";
// /portfolio page ka grid - Laravel API se saare projects
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import { useApiList } from "@/hooks/useApi";
import type { Project } from "@/lib/types";

export default function ProjectsList() {
  const { data, error, loading } = useApiList<Project>("/projects");

  if (loading)
    return (
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-6" role="status" aria-label="Loading projects">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="skeleton h-[260px] rounded-3xl sm:h-[340px]" />
        ))}
      </div>
    );
  if (error) return <p className="py-20 text-center text-red-600">{error}</p>;
  if (!data?.length) return <p className="py-20 text-center text-gray-500">No projects yet.</p>;
  return <ProjectsGrid projects={data} />;
}
