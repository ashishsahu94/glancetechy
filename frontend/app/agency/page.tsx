import Link from "next/link";
import {
  ArrowRight,
  Globe,
  MapPin,
} from "lucide-react";
import { apiGet } from "@/lib/api";

/* =========================================================
   TYPES
========================================================= */

type ServiceAreaState = {
  id: number;
  name: string;
  slug: string;
  short_description?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  status: boolean;
  sort_order: number;
};

type ServiceAreaCountry = {
  id: number;
  name: string;
  slug: string;
  short_description?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  status: boolean;
  sort_order: number;
  states: ServiceAreaState[];
};

type CountriesResponse = {
  data: ServiceAreaCountry[];
};

/* =========================================================
   SEO
========================================================= */

export const metadata = {
  title: "Our Services Across the World",

  description:
    "Explore the countries and locations where GlanceTechy provides website design, development, SEO and digital marketing services.",
    alternates: { canonical: "/agency/" },
};

/* =========================================================
   PAGE
========================================================= */

export default async function ServiceAreasPage() {
  let countries: ServiceAreaCountry[] = [];

  try {
    const response =
      await apiGet<CountriesResponse>(
        "/agency"
      );

    countries = response.data ?? [];
  } catch (error) {
    console.error(
      "Failed to load service areas:",
      error
    );
  }

  return (
    <main>

     <section className="px-2">
      <div className="rounded-[24px] bg-surface">

      <div className="mx-auto w-full max-w-[1430px] pt-32 sm:pt-[180px] pb-[80px]">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white py-1 pl-1 pr-4 text-sm text-gray-700">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
              <MapPin size={22} /> 
            </span>
            Agency
          </span>
          <h1 data-reveal className="text-4xl mt-5 font-semibold tracking-tight text-navy md:text-6xl">Our Services Across the World</h1>
          <p className="mt-6 mx-auto max-w-2xl text-base leading-7 text-gray-500 md:text-lg">We provide website design, development, SEO and digital marketing services to businesses across different countries and locations.</p>
        </div>

      </div>

      </div>
     </section>

      {/* =====================================================
          COUNTRIES
      ===================================================== */}

      <section className="mx-auto px-2 w-full max-w-[1430px] pt-20 pb-24">

        {countries.length === 0 ? (

          <div className="rounded-2xl border border-slate-200 bg-surface p-8 text-center text-gray-500">
            No locations available.
          </div>

        ) : (

          <div data-reveal className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {countries.map((country) => {

              const states = country.states ?? [];

              return (
                <Link
                  key={country.id}
                  href={`/agency/${country.slug}`}
                  className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg"
                >

                  {/* TOP */}

                  <div className="flex items-start justify-between gap-5">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-primary">
                      <Globe size={20} />
                    </div>

                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-navy transition-all duration-300 group-hover:bg-primary">
                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>

                  </div>

                  {/* COUNTRY */}

                  <h2 className="mt-7 text-xl font-semibold text-navy">
                    {country.name}
                  </h2>

                  {/* DESCRIPTION */}

                  {country.short_description && (
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">
                      {country.short_description}
                    </p>
                  )}

                  {/* STATE COUNT */}

                  <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">

                    <MapPin size={16} />

                    <span>
                      {states.length}{" "}
                      {states.length === 1
                        ? "state / region"
                        : "states / regions"}
                    </span>

                  </div>

                </Link>
              );
            })}

          </div>

        )}

      </section>

    </main>
  );
}