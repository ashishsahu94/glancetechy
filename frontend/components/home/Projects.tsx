"use client";
// Home pe <Projects /> - admin me "Home page pe dikhao" wale pehle 4 projects
import ProjectsPanels from "@/components/projects/ProjectsPanels";
import { useApiList } from "@/hooks/useApi";
import type { Project } from "@/lib/types";

export default function Projects() {
  const { data } = useApiList<Project>("/projects?featured=1&limit=4");
  if (!data?.length) return null;
  return <ProjectsPanels projects={data} />;
}
