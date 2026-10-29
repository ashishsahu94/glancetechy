import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { getCountries, getCountry } from "@/lib/agency";

type ServiceAreaState = {
  id: number;
  name: string;
  slug: string;
  short_description?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  status: boolean;
  sort_order: number;
  cities_count?: number;
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

type CountryResponse = {
  data: ServiceAreaCountry;
};

type CountriesResponse = {
  data: ServiceAreaCountry[];
};

/**
 * Generate all country URLs at build time.
 *
 * Required because next.config.ts uses:
 * output: "export"
 */
export async function generateStaticParams() {
  const countries = await getCountries<CountriesResponse["data"][number]>();
  const params = countries.map((country) => ({ country: country.slug }));

  // "output: export" needs at least one route
  return params.length ? params : [{ country: "_" }];
}

/**
 * Dynamic SEO metadata
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;

  try {
    const data = await getCountry<CountryResponse["data"]>(country);
    if (!data) throw new Error("Location not found");

    return {
      title: `Top Digital Marketing Agency in ${data.name}`,

      description:
        data.meta_description ||
        data.short_description ||
        `Explore GlanceTechy's Website Design, Development, SEO and digital marketing services in ${data.name}.`,

         alternates: { canonical: `/agency/${data.slug}/` },
    };
  } catch {
    return {
      title: "Agency",
      description:
        "Explore GlanceTechy agency locations.",
    };
  }
}

export default async function CountryServiceAreaPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;

  let data: ServiceAreaCountry | null = null;

  data = await getCountry<CountryResponse["data"]>(country);

  if (!data) {
    return (
      <main className="min-h-screen bg-white">
        <section className="mx-auto w-full max-w-[1430px] px-2 pb-24 pt-32">
          <div className="rounded-3xl border border-slate-200 bg-surface p-10 text-center">
            <h1 className="text-2xl font-semibold text-navy">
              Location not found
            </h1>

            <p className="mt-3 text-gray-500">
              We could not find this location.
            </p>

          <Link href="/agency" className="group mt-10 relative flex h-[56px] w-[235px] items-center overflow-hidden rounded-2xl bg-charcoal p-1 text-sm font-medium text-white">
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
        </section>
      </main>
    );
  }

  return (
    
    <main>
      
      {/* Hero */}
      <section className="p-2">
        <div className="rounded-[24px] bg-surface">
          <div className="mx-auto w-full max-w-[1430px] pt-32 sm:pt-[180px] pb-[80px]">
            <div className="text-center">
              <div className="flex justify-center">
                <Link href="/agency" className="group relative flex h-[36px] w-[155px] items-center overflow-hidden rounded-xl bg-white p-0.5 text-sm font-medium text-night" >
                  {/* Moving Icon Box */}
                  <span className="absolute left-0.5 top-0.5 flex h-8 w-8 items-center rounded-[9px] bg-surface transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] group-hover:left-0.5 group-hover:right-auto group-hover:w-[calc(100%-4px)]">

                    {/* Icon */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-2 rotate-180 transition-all duration-500">
                      <path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                    {/* Text inside moving icon box */}
                    <span className="absolute right-10 whitespace-nowrap translate-x-3 opacity-0 transition-all duration-500 group-hover:translate-x-3 group-hover:opacity-100">
                      All countries
                    </span>
                  </span>

                  {/* Normal Text */}
                  <span className="relative z-10 ml-[50px] transition-all duration-500 group-hover:translate-x-6 group-hover:opacity-0">
                    All countries
                  </span>
                </Link>
              </div>

              <h1 data-reveal className="text-4xl mt-5 font-semibold tracking-tight text-navy md:text-6xl">Top Digital Marketing Agency in {data.name}</h1>

              {data.short_description && (
                <p className="mt-6 mx-auto max-w-3xl text-base leading-7 text-gray-500 md:text-lg">
                  {data.short_description}
                </p>
              )}
            </div>
          </div>
        </div>

      </section>

      {/* States */}
      <section className="mx-auto p-2 w-full max-w-[1430px] pt-20 pb-20">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
          
            <span className="inline-flex items-center gap-2 rounded-full bg-white py-1 pl-1 pr-4 text-sm text-gray-700">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
                <MapPin size={15} /> 
              </span>
              Locations
            </span>

            <h2 data-reveal className="mt-2 text-3xl font-semibold tracking-tight text-navy md:text-4xl">
              States & Regions in {data.name}
            </h2>
          </div>

        </div>

        {data.states?.length ? (
          <div data-reveal className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.states.map((state) => (
              <Link
                key={state.id}
                href={`/agency/${data.slug}/${state.slug}`}
                className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-primary">
                    <MapPin size={20} />
                  </div>

                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-navy transition-all duration-300 group-hover:bg-primary">
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-semibold text-navy">
                  {state.name}
                </h3>

                {state.short_description && (
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">
                    {state.short_description}
                  </p>
                )}

                <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={15} />

                  <span>
                    {state.cities_count ?? 0}{" "}
                    {(state.cities_count ?? 0) === 1
                      ? "city"
                      : "cities"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-surface p-10 text-center">
            <p className="text-gray-500">
              No states or regions available yet.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}