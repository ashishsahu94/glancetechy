"use client";

// components/layout/ServiceAreas.tsx

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Globe } from "lucide-react";
import { apiGet } from "@/lib/api";

const VISIBLE = 6;

type ServiceAreaState = {
  id: number;
  name: string;
  slug: string;
  short_description?: string | null;
  status: boolean;
  sort_order: number;
};

type ServiceAreaCountry = {
  id: number;
  name: string;
  slug: string;
  short_description?: string | null;
  status: boolean;
  sort_order: number;
  states: ServiceAreaState[];
};

type CountriesResponse = {
  data: ServiceAreaCountry[];
};

export default function Agency() {
  const ref = useRef<HTMLElement>(null);

  const [shown, setShown] = useState(false);
  const [areas, setAreas] = useState<ServiceAreaCountry[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<Record<string, boolean>>({});

  /*
  |--------------------------------------------------------------------------
  | Scroll reveal
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const el = ref.current;

    if (!el) return;


    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    io.observe(el);

    return () => io.disconnect();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Load service areas
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let mounted = true;

    async function loadServiceAreas() {
      try {
        setLoading(true);

        const response = await apiGet<CountriesResponse>(
          "/agency"
        );

        if (!mounted) return;

        setAreas(response.data ?? []);
      } catch (error) {
        console.error("Failed to load service areas:", error);

        if (mounted) {
          setAreas([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadServiceAreas();

    return () => {
      mounted = false;
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Expand / collapse
  |--------------------------------------------------------------------------
  */

  const expandable = areas.filter(
    (area) => (area.states ?? []).length > VISIBLE
  );

  const allOpen =
    expandable.length > 0 &&
    expandable.every((area) => open[area.slug]);

  const toggle = (slug: string) => {
    setOpen((previous) => ({
      ...previous,
      [slug]: !previous[slug],
    }));
  };

  const toggleAll = () => {
    setOpen(
      Object.fromEntries(
        expandable.map((area) => [
          area.slug,
          !allOpen,
        ])
      )
    );
  };

  const reveal = shown ? "animate-reveal" : "opacity-0";

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <section ref={ref} className="bg-surface">
    <div aria-labelledby="agency-title" className="mx-auto w-full sm:max-w-[768px] md:max-w-[768px] lg:max-w-[992px] xl:max-w-[1200px] 2xl:max-w-[1430px] px-6 pt-14">
      <div className="border-b border-slate-300/60 pb-12">

        {/* --------------------------------------------------------------
            Heading
        -------------------------------------------------------------- */}

        <h2
          id="agency-title"
          className={`${reveal} flex items-center gap-3`}
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-muted shadow-sm">
            <Globe
              size={18}
              aria-hidden="true"
            />
          </span>

          <span className="text-lg font-medium text-navy">
            We Offer Our Services In
          </span>
        </h2>

        {/* --------------------------------------------------------------
            Loading
        -------------------------------------------------------------- */}

        {loading && (
          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-x-12">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse"
              >
                <div className="h-5 w-32 rounded bg-slate-200" />

                <div className="mt-5 flex flex-wrap gap-3">
                  {[1, 2, 3, 4, 5, 6].map((placeholder) => (
                    <span
                      key={placeholder}
                      className="h-5 w-20 rounded bg-slate-100"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --------------------------------------------------------------
            Countries / Locations
        -------------------------------------------------------------- */}

        {!loading && areas.length > 0 && (
          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-x-12">
            {areas.map((area, index) => {
              const isOpen = !!open[area.slug];

              /*
               * Backend now returns states for each country.
               * Keep fallback [] so undefined.length never happens.
               */
              const states = area.states ?? [];

              const visibleStates = states.slice(
                0,
                VISIBLE
              );

              const hiddenStates = states.slice(
                VISIBLE
              );

              const rest = hiddenStates.length;

              const listId = `agency-${area.id}`;

              return (
                <div
                  key={area.id}
                  className={reveal}
                  style={{
                    animationDelay: `${150 + index * 120}ms`,
                  }}
                >
                  {/* Country */}

                  <Link
                    href={`/agency/${area.slug}`}
                    className="group inline-flex items-center gap-2 text-lg font-medium text-muted transition-colors duration-300 hover:text-navy"
                  >
                    <span>
                      {area.name}
                    </span>

                    <ArrowRight
                      size={15}
                      className="translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </Link>

                  {/* Locations */}

                  {states.length > 0 && (
                    <ul
                      id={listId}
                      className="mt-4 flex flex-wrap gap-x-3.5 text-sm leading-7 text-gray-500"
                    >
                      {/* First 6 */}

                      {visibleStates.map((state) => (
                        <li key={state.id}>
                          <Link title={state.name}
                            href={`/agency/${area.slug}/${state.slug}`}
                            className="transition-colors duration-300 hover:text-primary-dark"
                          >
                            {state.name}
                          </Link>
                        </li>
                      ))}

                      {/* Remaining */}

                      {hiddenStates.map(
                        (state, hiddenIndex) => (
                          <li
                            key={state.id}
                            className={
                              isOpen
                                ? "animate-reveal"
                                : "hidden"
                            }
                            style={
                              isOpen
                                ? {
                                    animationDelay: `${
                                      hiddenIndex * 35
                                    }ms`,
                                  }
                                : undefined
                            }
                          >
                            <Link
                              href={`/agency/${area.slug}/${state.slug}`}
                              className="transition-colors duration-300 hover:text-primary-dark"
                            >
                              {state.name}
                            </Link>
                          </li>
                        )
                      )}

                      {/* +N More */}

                      {rest > 0 && (
                        <li>
                          <button
                            type="button"
                            onClick={() =>
                              toggle(area.slug)
                            }
                            aria-expanded={isOpen}
                            aria-controls={listId}
                            className="font-medium text-navy underline decoration-primary decoration-2 underline-offset-4 transition-colors duration-300 hover:text-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                          >
                            {isOpen
                              ? "Show less"
                              : `+${rest} more`}
                          </button>
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* --------------------------------------------------------------
            No Data
        -------------------------------------------------------------- */}

        {!loading && areas.length === 0 && (
          <div className={`${reveal} mt-10 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-gray-500`}>
            Service areas will be available soon.
          </div>
        )}

      

        <Link href="/agency" className={`${reveal} group mt-10 relative flex h-[56px] w-[235px] items-center overflow-hidden rounded-2xl bg-charcoal p-1 text-sm font-medium text-white`} style={{ animationDelay: "500ms",}}>
          <span className="absolute left-1 top-1 flex h-12 w-12 items-center rounded-[14px] bg-primary transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] group-hover:w-[calc(100%-8px)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-4 transition-all duration-500">
              <path d="M5 12H19M13 6L19 12L13 18" stroke="var(--color-night)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            <span className="absolute right-14 translate-x-3 whitespace-nowrap text-night opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
              View All Locations
            </span>
          </span>

          <span className="relative z-10 ml-[70px] transition-all duration-500 group-hover:translate-x-6 group-hover:opacity-0">
            View All Locations
          </span>
        </Link>
    
      </div>
    </div>
    </section>
  );
}