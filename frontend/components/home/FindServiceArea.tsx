"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Search } from "lucide-react";
import { apiGet } from "@/lib/api";

type Item = { id: number; name: string; slug: string };
type Country = Item & { states?: Item[] };
type StateDetail = Item & { cities?: Item[] };

const SELECT =
  "h-14 w-full appearance-none rounded-xl bg-white pl-5 pr-12 text-[15px] outline-none ring-1 ring-transparent transition focus:ring-gray-900 disabled:cursor-not-allowed disabled:text-gray-400";

function Field({
  label,
  value,
  onChange,
  disabled,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        aria-label={label}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`${SELECT} ${value ? "font-medium text-ink" : "text-gray-500"}`}
      >
        {children}
      </select>
      <ChevronDown
        size={18}
        aria-hidden="true"
        className={`pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 ${
          disabled ? "text-gray-300" : "text-gray-700"
        }`}
      />
    </div>
  );
}

export default function FindServiceArea() {
  const router = useRouter();

  const [countries, setCountries] = useState<Country[]>([]);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [cities, setCities] = useState<Item[]>([]);
  const [city, setCity] = useState("");
  const [loadingCities, setLoadingCities] = useState(false);

  // All countries (each one already carries its states)
  useEffect(() => {
    let live = true;
    apiGet<{ data?: Country[] }>("/agency")
      .then((res) => live && setCountries(res.data ?? []))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);

  // New country -> reset state and city
  useEffect(() => {
    setState("");
  }, [country]);

  // New state -> load its cities
  useEffect(() => {
    setCity("");
    setCities([]);
    if (!country || !state) return;

    let live = true;
    setLoadingCities(true);
    apiGet<{ data?: StateDetail }>(`/agency/${country}/${state}`)
      .then((res) => live && setCities(res.data?.cities ?? []))
      .catch(() => {})
      .finally(() => live && setLoadingCities(false));
    return () => {
      live = false;
    };
  }, [country, state]);

  function go() {
    // city > state > country > all areas
    if (country && state && city) router.push(`/agency/${country}/${state}/${city}/`);
    else if (country && state) router.push(`/agency/${country}/${state}/`);
    else if (country) router.push(`/agency/${country}/`);
    else router.push("/agency/");
  }

  const states = countries.find((c) => c.slug === country)?.states ?? [];

  return (
    <section className="px-2 py-10">
      <div className="mx-auto w-full rounded-3xl bg-[#f4f4f5] px-5 py-10 sm:max-w-[768px] sm:px-8 md:max-w-[768px] lg:max-w-[992px] xl:max-w-[1200px] 2xl:max-w-[1430px]">
        <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Looking for a Digital Agency Near You?
        </h2>
        <p className="mt-2 max-w-[760px] text-sm text-gray-500 sm:text-base">
          Choose your country, state and city. We will take you to the right page.
        </p>

        <form
          className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          onSubmit={(e) => {
            e.preventDefault();
            go();
          }}
        >
          <Field label="Select country" value={country} onChange={setCountry} disabled={!countries.length}>
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </Field>

          <Field label="Select state" value={state} onChange={setState} disabled={!country || !states.length}>
            <option value="">All States</option>
            {states.map((s) => (
              <option key={s.id} value={s.slug}>
                {s.name}
              </option>
            ))}
          </Field>

          <Field label="Select city" value={city} onChange={setCity} disabled={!state || loadingCities || !cities.length}>
            <option value="">{loadingCities ? "Loading..." : "All Cities"}</option>
            {cities.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </Field>

          <button
            type="submit"
            className="group flex h-14 items-center justify-center gap-3 rounded-xl border border-gray-900 bg-transparent px-6 text-sm font-semibold uppercase tracking-wide text-gray-900 transition hover:bg-gray-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            Find Your Area
            <Search size={20} aria-hidden="true" />
          </button>
        </form>
      </div>
    </section>
  );
}
