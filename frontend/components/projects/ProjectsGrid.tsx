"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { assetUrl } from "@/lib/api";
import type { Project } from "@/lib/types";
import LivePreviewButton from "./LivePreviewButton";
import { ProjectModal, type ProjectDetails } from "./ProjectModal";

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [active, setActive] = useState<ProjectDetails | null>(null);
  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-1 gap-3 lg:gap-10 md:grid-cols-2">
      {projects.map((p, i) => (
        <article
          key={p.id ?? `project-${i}`}
          style={{ animationDelay: `${(i % 2) * 150}ms` }}
          className={`${
            shown ? "animate-reveal" : "opacity-0"
          } group relative h-[340px] overflow-hidden rounded-3xl sm:h-[420px]`}
        >
          <Image
            src={assetUrl(p.img) || "/assets/project-placeholder.jpg"}
            alt={p.title || "Project"}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

          {/* Whole card opens the details popup */}
          <button
            type="button"
            onClick={() => setActive(p as ProjectDetails)}
            aria-haspopup="dialog"
            aria-label={`View details of ${p.title || "project"}`}
            className="absolute inset-0 z-10 cursor-pointer rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-7">
            <p className="text-xs text-white/70">{p.category}</p>
            <h3 className="mb-5 mt-1 text-2xl font-semibold text-white">{p.title}</h3>
            {/* Live Preview keeps its own link; it must stay clickable */}
            <div className="pointer-events-auto w-fit">
              <LivePreviewButton href={p.href} />
            </div>
          </div>
        </article>
      ))}

      {active && <ProjectModal project={active} onClose={close} />}
    </div>
  );
}
