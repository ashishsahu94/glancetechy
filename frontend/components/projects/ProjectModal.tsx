"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { assetUrl } from "@/lib/api";
import type { Project } from "@/lib/types";
import LivePreviewButton from "./LivePreviewButton";

// Extra fields are optional: they show in the popup only when the admin/API provides them.
export type ProjectDetails = Project & {
  description?: string | null;
  client?: string | null;
  year?: string | number | null;
  services?: string[] | string | null;
  technologies?: string[] | string | null;
};

const toList = (v?: string[] | string | null): string[] =>
  Array.isArray(v) ? v.filter(Boolean) : v ? v.split(",").map((s) => s.trim()).filter(Boolean) : [];

export function ProjectModal({ project, onClose }: { project: ProjectDetails; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !dialogRef.current) return;
      // keep keyboard focus inside the popup
      const f = dialogRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, [onClose]);

  const services = toList(project.services);
  const tech = toList(project.technologies);
  const facts = [
    { label: "Category", value: project.category },
    { label: "Client", value: project.client },
    { label: "Year", value: project.year ? String(project.year) : "" },
  ].filter((f) => f.value);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        data-lenis-prevent
        className="animate-reveal relative max-h-[92vh] w-full max-w-[880px] overflow-y-auto overscroll-contain rounded-t-[28px] bg-white shadow-2xl sm:rounded-[28px]"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <div className="relative aspect-[16/10] w-full bg-surface sm:aspect-[2/1]">
          <Image
            src={assetUrl(project.img) || "/assets/project-placeholder.webp"}
            alt={`${project.title || "Project"} website screenshot`}
            fill
            sizes="(min-width: 880px) 880px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="p-6 sm:p-9">
          {project.category && (
            <span className="inline-flex rounded-full bg-surface px-3.5 py-1.5 text-xs font-medium text-gray-700">
              {project.category}
            </span>
          )}
          <h2 id="project-modal-title" className="mt-3 text-3xl font-light tracking-tight text-ink sm:text-4xl">
            {project.title}
          </h2>

          {project.description && (
            <p className="mt-4 whitespace-pre-line leading-relaxed text-gray-600">{project.description}</p>
          )}

          {facts.length > 0 && (
            <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {facts.map((f) => (
                <div key={f.label} className="rounded-2xl bg-surface p-4">
                  <dt className="text-xs text-gray-500">{f.label}</dt>
                  <dd className="mt-1 text-sm font-medium text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {services.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-ink">Services</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {services.map((s) => (
                  <li key={s} className="rounded-full border border-surface px-3.5 py-1.5 text-sm text-gray-700">{s}</li>
                ))}
              </ul>
            </div>
          )}

          {tech.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-ink">Technologies</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {tech.map((t) => (
                  <li key={t} className="rounded-full bg-surface px-3.5 py-1.5 text-sm text-gray-700">{t}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <LivePreviewButton href={project.href} />
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink underline-offset-4 hover:underline"
            >
              Want a website like this? <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
