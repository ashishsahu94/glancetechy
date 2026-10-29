import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { getCity, getCountries, getCountry, getState } from "@/lib/agency";
import CityExploreBar from "@/components/agency/CityExploreBar";
import { CityFaq, CityServiceList, CityValues } from "@/components/agency/CitySections";

/* =========================================================
   TYPES
========================================================= */

type ServiceAreaCountry = {
  id: number;
  name: string;
  slug: string;
};

type ServiceAreaState = {
  id: number;
  name: string;
  slug: string;
};

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

type CityData = ServiceAreaCity & {
  country: ServiceAreaCountry;
  state: ServiceAreaState;
};

type CountriesResponse = {
  data: ServiceAreaCountry[];
};

type CountryResponse = {
  data: ServiceAreaCountry & {
    states: ServiceAreaState[];
  };
};

type StateResponse = {
  data: ServiceAreaState & {
    country: ServiceAreaCountry;
    cities: ServiceAreaCity[];
  };
};

/* =========================================================
   GENERATE STATIC PARAMS
========================================================= */

export async function generateStaticParams() {
  const countries = await getCountries<CountriesResponse["data"][number]>();
  const params: { country: string; state: string; city: string }[] = [];

  for (const country of countries) {
    const detail = await getCountry<CountryResponse["data"]>(country.slug);

    for (const state of detail?.states ?? []) {
      // The state response already lists all its cities (one request per state)
      const stateData = await getState<StateResponse["data"]>(country.slug, state.slug);

      for (const city of stateData?.cities ?? []) {
        params.push({ country: country.slug, state: state.slug, city: city.slug });
      }
    }
  }

  // "output: export" needs at least one route
  return params.length ? params : [{ country: "_", state: "_", city: "_" }];
}

/* =========================================================
   DYNAMIC SEO METADATA
========================================================= */

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    country: string;
    state: string;
    city: string;
  }>;
}) {
  const {
    country,
    state,
    city,
  } = await params;

  try {
    const data = await getCity<CityData>(country, state, city);
    if (!data) throw new Error("Location not found");

    return {
      title: `Best Digital Marketing Agency in ${data.name}`,
      alternates: {
        canonical: `/agency/${data.country.slug}/${data.state.slug}/${data.slug}/`,
      },
      description:
        data.meta_description ||
        data.short_description ||
        `GlanceTechy provides website design, web development, SEO and digital marketing services in ${data.name}, ${data.state.name}, ${data.country.name}.`,
    };
  } catch {
    return {
      title: "Agency",
      
      description:
        "Explore GlanceTechy agency locations.",
    };
  }
}

/* =========================================================
   CITY SERVICE AREA PAGE
========================================================= */

export default async function CityServiceAreaPage({
  params,
}: {
  params: Promise<{
    country: string;
    state: string;
    city: string;
  }>;
}) {
  const {
    country,
    state,
    city,
  } = await params;

  let data: CityData | null = null;

  data = await getCity<CityData>(country, state, city);

  /* =========================================================
     NOT FOUND
  ========================================================= */

  if (!data) {
    return (
      <main className="min-h-screen bg-white">
        <section className="mx-auto w-full max-w-[1430px] px-2 pb-24 pt-32">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center">
            <h1 className="text-2xl font-semibold text-navy">
              Location not found
            </h1>

            <p className="mt-3 text-gray-500">
              We could not find this location.
            </p>

            <Link
              href={`/agency/${country}/${state}`}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-3 text-sm font-medium text-white transition hover:bg-navy-hover"
            >
              Back to State
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
    );
  }

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <main>
      <div className="px-2">
        <div className="rounded-[24px] bg-surface">
          <div className="mx-auto w-full max-w-[1430px] pt-32 sm:pt-[180px] pb-[80px] text-center">
            <div className="mb-5">
              <div className="flex flex-wrap justify-center items-center gap-2 text-sm text-gray-400">
                <Link href="/agency" className="transition hover:text-navy">Agency</Link>
                <span>/</span>
                <Link href={`/agency/${data.country.slug}`} className="transition hover:text-navy">
                  {data.country.name}
                </Link>
                <span>/</span>
                <Link href={`/agency/${data.country.slug}/${data.state.slug}`} className="transition hover:text-navy">
                  {data.state.name}
                </Link>
                <span>/</span>
                <span className="text-navy">
                  {data.name}
                </span>
              </div>
            </div>
          
            <div className="">
              <span className="inline-flex items-center gap-2 rounded-full bg-white py-1 pl-1 pr-4 text-sm text-gray-700">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
                  <MapPin size={22} /> 
                </span>
                {data.state.name},{" "}
                {data.country.name}
              </span>

              <h1 data-reveal className="text-4xl mt-5 font-semibold tracking-tight text-navy md:text-6xl">
               Best Digital Marketing Agency
                in {data.name}
              </h1>

              {data.short_description && (
                <p className="mt-6 mx-auto max-w-3xl text-base leading-7 text-gray-500 md:text-lg">
                  {data.short_description}
                </p>
              )}

              <div className="mt-8 flex justify-center flex-wrap al gap-3">

                <Link href="/contact" className="group relative flex h-[56px] w-[185px] items-center overflow-hidden rounded-2xl bg-charcoal p-1 text-sm font-medium text-white">
                  <span className="absolute left-1 top-1 flex h-12 w-12 items-center rounded-[14px] bg-primary transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] group-hover:w-[calc(100%-8px)]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-4 transition-all duration-500">
                      <path d="M5 12H19M13 6L19 12L13 18" stroke="var(--color-night)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                    <span className="absolute right-14 translate-x-3 whitespace-nowrap text-night opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                      Get started
                    </span>
                  </span>

                  <span className="relative z-10 ml-[70px] transition-all duration-500 group-hover:translate-x-6 group-hover:opacity-0">
                    Get started
                  </span>
                </Link>


                <Link href="/services" className="group relative flex h-[56px] w-[195px] items-center overflow-hidden rounded-2xl bg-white p-1 text-sm font-medium text-night">
                  <span className="absolute left-1 top-1 flex h-12 w-12 items-center rounded-[14px] bg-surface transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] group-hover:w-[calc(100%-8px)]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-4">
                      <path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                    <span className="absolute right-14 translate-x-3 whitespace-nowrap opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                      Explore services
                    </span>
                  </span>

                  <span className="relative z-10 ml-[70px] transition-all duration-500 group-hover:translate-x-6 group-hover:opacity-0">
                    Explore services
                  </span>
                </Link>

              </div>
            </div>
          </div>
        </div>
      </div>


      <CityExploreBar city={data.name} />

      <CityServiceList city={data.name} />

      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section className="px-2">
        <div className="mx-auto w-full max-w-[1430px] py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-surface py-1 pl-4 pr-4 text-sm text-gray-700">
              Our Services
            </span>

            <h2 data-reveal className="mt-3 text-3xl font-semibold tracking-tight text-navy md:text-4xl">
              Digital solutions for businesses in{" "}
              {data.name}
            </h2>
            <p className="mt-5 leading-7 text-gray-500">We help businesses in {data.name} build stronger digital experiences and grow their online presence.</p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {[
              {
                title: "Website Design",
                text: "Modern, conversion-focused website design tailored to your business.",
              },
              {
                title: "Web Development",
                text: "Fast, responsive and scalable websites built for modern businesses.",
              },
              {
                title: "SEO Services",
                text: "Search engine optimization strategies designed to improve visibility.",
              },
              {
                title: "Digital Marketing",
                text: "Performance-driven digital marketing campaigns to reach your audience.",
              },
              {
                title: "UI/UX Design",
                text: "User-focused interfaces designed for better usability and conversions.",
              },
              {
                title: "E-commerce Development",
                text: "Professional online stores built for growth and customer experience.",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="rounded-3xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg"
              >

                <div className="flex items-center gap-3">

                  <CheckCircle2
                    size={20}
                    className="text-primary-dark"
                  />

                  <h3 className="font-semibold text-navy">
                    {service.title}
                  </h3>

                </div>

                <p className="mt-4 text-sm leading-6 text-gray-500">
                  {service.text}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>

      <CityValues />

      <CityFaq city={data.name} state={data.state.name} />

    </main>
  );
}