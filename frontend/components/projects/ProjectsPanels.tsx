"use client";
// components/projects/ProjectsPanels.tsx  (purane Projects.tsx ka client hissa, ab props se data leta hai)
import { useCallback, useState } from "react";
import Image from "next/image";
import LivePreviewButton from "@/components/projects/LivePreviewButton";
import { ProjectModal, type ProjectDetails } from "@/components/projects/ProjectModal";
import type { Project } from "@/lib/types";

export default function ProjectsPanels({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<ProjectDetails | null>(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <section className="">
      <div className="mx-auto flex w-full max-w-[1430px] flex-col gap-3 lg:h-[480px] lg:flex-row">
        {projects.map((p, i) => {
          const isActive = i === active;
          return (
            <article
              key={p.id}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              style={{flexGrow: isActive ? 3.4 : 1 }}
              className="relative h-72 min-w-0 flex-none overflow-hidden rounded-3xl transition-[flex-grow] duration-500 ease-out motion-reduce:transition-none lg:h-auto lg:flex-1 lg:basis-0"
            >
              {p.img && (
                <div className="absolute inset-0" aria-hidden="true">
                  <Image src={p.img} alt={p.title} title={p.title} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

              {/* Whole card opens the details popup */}
              <button
                type="button"
                onClick={() => setOpen(p as ProjectDetails)}
                aria-haspopup="dialog"
                aria-label={`View details of ${p.title || "project"}`}
                className="absolute inset-0 z-10 cursor-pointer rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
              />

              <span
                className={`absolute bottom-6 left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-sm font-medium text-white transition-opacity duration-300 [writing-mode:vertical-rl] lg:block ${
                  isActive ? "opacity-0" : "opacity-100"
                }`}
              >
                {p.title}
              </span>

              <div
                className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 p-6 transition-opacity duration-500 motion-reduce:transition-none ${
                  isActive ? "lg:opacity-100" : "lg:pointer-events-none lg:opacity-0"
                }`}
              >
                <p className="text-xs text-white/70">{p.category}</p>
                <h3 className="mb-5 mt-1 whitespace-nowrap text-xl font-semibold text-white">{p.title}</h3>
                {/* Live Preview keeps its own link; it must stay clickable */}
                <div className={`pointer-events-auto w-fit ${isActive ? "" : "lg:pointer-events-none"}`}>
                  <LivePreviewButton href={p.href} tabIndex={isActive ? 0 : -1} />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {open && <ProjectModal project={open} onClose={close} />}
    </section>
  );
}