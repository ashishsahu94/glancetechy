import Link from "next/link";
import { ArrowRight, Building2, MapPin } from "lucide-react";
import { getCountries, getCountry, getState } from "@/lib/agency";

type ServiceAreaCity = {
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
};

type ServiceAreaState = {
  id: number;
  country_id: number;
  name: string;
  slug: string;
  short_description?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  status: boolean;
  sort_order: number;
  country: ServiceAreaCountry;
  cities: ServiceAreaCity[];
};

type StateResponse = {
  data: ServiceAreaState;
};

type CountriesResponse = {
  data: {
    id: number;
    name: string;
    slug: string;
    states: {
      id: number;
      name: string;
      slug: string;
    }[];
  }[];
};

type CountryResponse = {
  data: {
    id: number;
    name: string;
    slug: string;
    states: {
      id: number;
      name: string;
      slug: string;
    }[];
  };
};

/**
 * Generate all state URLs at build time.
 *
 * Example:
 * /agency/india/uttar-pradesh
 * /agency/india/delhi
 */
export async function generateStaticParams() {
  const countries = await getCountries<CountriesResponse["data"][number]>();
  const params: { country: string; state: string }[] = [];

  for (const country of countries) {
    const detail = await getCountry<CountryResponse["data"]>(country.slug);

    for (const state of detail?.states ?? []) {
      params.push({ country: country.slug, state: state.slug });
    }
  }

  // "output: export" needs at least one route
  return params.length ? params : [{ country: "_", state: "_" }];
}

/**
 * Dynamic SEO metadata
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{
    country: string;
    state: string;
  }>;
}) {
  const { country, state } = await params;

  try {
    const data = await getState<StateResponse["data"]>(country, state);
    if (!data) throw new Error("Location not found");

    return {
      title: `Top Digital Marketing Agency in ${data.name}`,

      alternates: {
        canonical: `/agency/${data.country.slug}/${data.slug}/`,
      },

      description:
        data.meta_description ||
        data.short_description ||
        `Explore website design, development, SEO and digital marketing services in ${data.name}, ${data.country.name}.`,
    };
  } catch {
    return {
      title: "Agency",
      description:
        "Explore GlanceTechy agency locations.",
    };
  }
}

export default async function StateServiceAreaPage({
  params,
}: {
  params: Promise<{
    country: string;
    state: string;
  }>;
}) {
  const { country, state } = await params;

  let data: ServiceAreaState | null = null;

  data = await getState<StateResponse["data"]>(country, state);

  if (!data) {
    return (
      <main>
        <section className="mx-auto w-full max-w-[1430px] px-2 pb-24 pt-32">
          <div className="rounded-3xl border border-slate-200 bg-surface p-10 text-center">
            <h1 className="text-2xl font-semibold text-navy">Location not found</h1>
            <p className="mt-3 text-gray-500">We could not find this state or region.</p>

            <Link
              href={`/agency/${country}`}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-3 text-sm font-medium text-white transition hover:bg-navy-hover"
            >
              Back to {country}
              <ArrowRight size={16} />

            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <div className="px-2">
        <div className="rounded-[24px] bg-surface">
          <div className="mx-auto w-full max-w-[1430px] pt-32 sm:pt-[180px] pb-20 text-center">
            <div className="flex flex-wrap justify-center items-center gap-2 mb-5 text-sm text-gray-400">
              <Link href="/agency" className="transition hover:text-navy">
                Agency
              </Link>
              <span>/</span>
              <Link href={`/agency/${data.country.slug}`} className="transition hover:text-navy">
                {data.country.name}
              </Link>
              <span>/</span>
              <span className="text-navy">
                {data.name}
              </span>
            </div>

            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white py-1 pl-1 pr-4 text-sm text-gray-700">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
                  <MapPin size={22} /> 
                </span>
                {data.country.name}
              </span>

              <h1 data-reveal className="text-4xl mt-5 font-semibold tracking-tight text-navy md:text-6xl">Top Digital Marketing Agency in {data.name}</h1>
              {data.short_description && (
                <p className="mt-6 mx-auto max-w-3xl text-base leading-7 text-gray-500 md:text-lg">
                  {data.short_description}
                </p>
              )}
            </div>
          </div>

     
        </div>
      </div>

      {/* Cities */}
      <section className="mx-auto px-2 w-full max-w-[1430px] py-20">
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-surface py-1 pl-4 pr-4 text-sm text-gray-700">Cities</span>
          <h2 data-reveal className="mt-2 text-3xl font-semibold tracking-tight text-navy md:text-4xl">Cities We Serve in {data.name}</h2>
          <p className="mt-4 max-w-2xl text-gray-500">Explore our website design, development, SEO and digital marketing services available across cities in{" "}{data.name}.</p>
        </div>

        {data.cities?.length ? (
          <div data-reveal className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.cities.map((city) => (
              <Link
                key={city.id}
                href={`/agency/${data.country.slug}/${data.slug}/${city.slug}`}
                className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-primary">
                    <Building2 size={20} />
                  </div>

                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-navy transition-all duration-300 group-hover:bg-primary">
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-semibold text-navy">
                  {city.name}
                </h3>

                {city.short_description && (
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">
                    {city.short_description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-surface p-10 text-center">
            <Building2
              size={28}
              className="mx-auto text-gray-400"
            />

            <p className="mt-4 text-gray-500">
              Cities for this region will be available soon.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}