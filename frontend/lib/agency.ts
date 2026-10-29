// lib/agency.ts - agency data for the static pages (used at build time).
//
// `next build` renders ~120 pages from this data. Calling the live API once per
// page overloads shared hosting (500/429), so:
//  - results are memoised per build process (every state is requested once)
//  - city pages are derived from the state response (it already contains the
//    country and all cities) instead of one extra request per city.
import { ApiError, apiGet } from "./api";

const memo = new Map<string, Promise<unknown>>();
const useMemo = process.env.NODE_ENV === "production"; // dev must stay fresh

function once<T>(key: string, load: () => Promise<T>): Promise<T> {
  if (!useMemo) return load();

  let promise = memo.get(key) as Promise<T> | undefined;
  if (!promise) {
    promise = load().catch((error) => {
      memo.delete(key); // do not cache failures
      throw error;
    });
    memo.set(key, promise);
  }
  return promise;
}

/** `{ data: T }` response. 404 -> null, any other error is thrown. */
async function get<T>(path: string): Promise<T | null> {
  try {
    const res = await apiGet<{ data?: T }>(path);
    return res.data ?? null;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

export const getCountries = <T>() =>
  once("countries", async () => (await get<T[]>("/agency")) ?? []) as Promise<T[]>;

export const getCountry = <T>(country: string) =>
  once(`country:${country}`, () => get<T>(`/agency/${country}`)) as Promise<T | null>;

export const getState = <T>(country: string, state: string) =>
  once(`state:${country}/${state}`, () =>
    get<T>(`/agency/${country}/${state}`)
  ) as Promise<T | null>;

type StateWithCities = {
  country?: unknown;
  cities?: { slug: string }[];
  [key: string]: unknown;
};

/** One city = its row from the state response + `state` and `country`. */
export async function getCity<T>(
  country: string,
  state: string,
  city: string
): Promise<T | null> {
  const data = await getState<StateWithCities>(country, state);
  const row = data?.cities?.find((c) => c.slug === city);
  if (!data || !row) return null;

  const stateOnly = { ...data };
  delete stateOnly.cities;
  const countryData = stateOnly.country;
  delete stateOnly.country;

  return { ...row, state: stateOnly, country: countryData } as T;
}
