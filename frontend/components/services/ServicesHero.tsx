"use client";

import Link from "next/link";
import { Layers } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import ShareProjectButton from "../marketplace/ShareProjectButton";

export default function ServicesHero() {
  const { ref, shown } = useInView<HTMLElement>(0.2);
  const reveal = shown ? "animate-reveal" : "opacity-0";

  return (
    <section ref={ref} className="p-4">
      <div className="bg-surface rounded-[24px]">
        <div className="pt-[120px] lg:pt-[180px] pb-[80px] text-center">
          <div className="mx-auto max-w-3xl">
            <span className={`${reveal} inline-flex items-center gap-2 rounded-full bg-white py-1 pl-1 pr-4 text-sm text-gray-700`}>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
                <Layers size={14} />
              </span>
              Our services
            </span>

            <h1 className={`${reveal} mt-6 text-5xl font-light leading-[1.1] tracking-tight text-charcoal-dark sm:text-6xl lg:text-7xl`}>
              Everything you need to{" "}
              <span
                className={`inline-block rounded-2xl bg-gradient-to-r from-primary to-primary text-white bg-no-repeat px-4 pb-1 transition-[background-size] duration-1000 ease-out motion-reduce:transition-none ${
                  shown ? "bg-[length:100%_100%]" : "bg-[length:0%_100%]"
                }`}
                style={{ transitionDelay: "500ms" }}>
                grow online
              </span>
            </h1>

            <p
              className={`${reveal} mx-auto mt-6 max-w-xl text-lg leading-relaxed text-gray-600`}
              style={{ animationDelay: "150ms" }}
            >
              Websites, search, social, ads, email and content, all under one roof. Pick one service or build a full plan
              with us.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}