"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Search } from "lucide-react";
import { services } from "@/lib/services";

/** "Explore our services in {City}": pick a service, press FIND. */
export default function CityExploreBar({ city }: { city: string }) {
  const router = useRouter();
  const [slug, setSlug] = useState("");

  return (
    <section className="px-2 pt-6">
      <div className="mx-auto flex w-full max-w-[1430px] flex-col gap-5 rounded-2xl bg-[#f4f4f5] px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <Search size={30} strokeWidth={1.8} aria-hidden="true" className="mt-1 shrink-0 text-amber-500" />
          <div>
            <h2 className="text-xl font-medium text-ink sm:text-2xl">
              Explore our services in <strong className="font-semibold">{city}</strong>
            </h2>
            <p className="mt-1 text-sm text-gray-600">Select a service type to see how we can help your business.</p>
          </div>
        </div>

        <form
          className="flex w-full gap-3 lg:w-auto"
          onSubmit={(e) => {
            e.preventDefault();
            router.push(slug ? `/services/${slug}/` : "/services/");
          }}
        >
          <div className="relative min-w-0 flex-1 lg:w-[340px] lg:flex-none">
            <select
              aria-label="Search by service"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="h-14 w-full cursor-pointer appearance-none rounded-xl bg-white pl-5 pr-12 text-[15px] font-semibold text-ink outline-none ring-1 ring-transparent transition focus:ring-gray-900"
            >
              <option value="">Search By Service</option>
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.title}
                </option>
              ))}
            </select>
            <ChevronDown size={18} aria-hidden="true" className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-700" />
          </div>

          <button
            type="submit"
            className="h-14 rounded-xl border border-gray-900 px-7 text-sm font-semibold uppercase tracking-wide text-gray-900 transition hover:bg-gray-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            Find
          </button>
        </form>
      </div>
    </section>
  );
}
