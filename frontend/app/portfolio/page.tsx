// app/projects/page.tsx  (PURANI FILE REPLACE KARO) -> /projects
import type { Metadata } from "next";
import ProjectsList from "@/components/projects/ProjectsList";
import { Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects | Our work",
  description: "Websites and digital projects we have built for our clients.",
  alternates: { canonical: "/portfolio/" },
};

export default function ProjectsPage() {  return (
    <section className="p-2">
      <div className="rounded-[24px] bg-surface pb-20 lg:pt-[180px] pt-[120px]">
        <div className="mx-auto w-full sm:max-w-[768px] md:max-w-[768px] lg:max-w-[992px] xl:max-w-[1200px] 2xl:max-w-[1430px] px-4">
          <div data-reveal className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white py-1 pl-1 pr-4 text-sm text-gray-700">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
                <Layers size={14} />
              </span>
              Our work
            </span>
            <h1 className="mt-5 text-5xl font-light tracking-tight text-ink sm:text-6xl">All projects</h1>
            <p className="mt-5 mx-auto max-w-md text-base text-gray-600">
              A look at the websites and digital projects we have built for our clients.
            </p>
          </div>

          <div className="mt-12">
            <ProjectsList />
          </div>
        </div>
      </div>
    </section>
  );
}
