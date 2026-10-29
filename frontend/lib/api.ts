// lib/api.ts - single place for every Laravel API call.

const isBrowser = typeof window !== "undefined";

const PUBLIC_API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "https://glancetechy.com/backend/public/index.php/api"
).replace(/\/$/, "");
/**
 * In dev, NEXT_PUBLIC_API_URL is the relative "/api-proxy" (handled by the
 * rewrite in next.config.ts). That only works in the browser: server components
 * need an absolute URL, so on the server we call Laravel directly.
 */
export const API_URL =
  !isBrowser && PUBLIC_API_URL.startsWith("/")
    ? (process.env.DEV_API_TARGET || "http://localhost:8000/api").replace(/\/$/, "")
    : PUBLIC_API_URL;

export class ApiError extends Error {
  status: number;
  errors: Record<string, string>;

  constructor(message: string, status: number, errors: Record<string, string> = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

/**
 * Low-level request helper.
 *
 * Caching:
 * - Browser: always "no-store", so admin edits show up immediately
 *   ("force-cache" in the browser would serve stale data forever).
 * - Build (static export): default fetch cache, so the page can be pre-rendered.
 */
export async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");

  if (init.body && !(init.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const url = `${API_URL}${path}`;
  const method = (init.method ?? "GET").toUpperCase();

  // During `next build` ~150 pages call the API almost at once. Shared hosting
  // answers with 429/5xx under that load, so server-side GETs are retried.
  const attempts = !isBrowser && method === "GET" ? 4 : 1;

  for (let attempt = 1; ; attempt++) {
    let res: Response | null = null;

    try {
      res = await fetch(url, {
        ...init,
        headers,
        ...(isBrowser ? { cache: init.cache ?? "no-store" } : {}),
      });
    } catch (error) {
      if (attempt < attempts) {
        await sleep(500 * attempt);
        continue;
      }
      console.error("API connection failed:", url, error);
      throw new ApiError("Unable to connect to the server. Please try again later.", 0);
    }

    const json = await res.json().catch(() => null);

    // A 404 that is NOT JSON never came from Laravel (Laravel always answers
    // JSON here): it is the web server / hosting (wrong URL, missing
    // .htaccess, stale deploy, firewall). Retry it too, then report it clearly.
    const serverLevel404 = res.status === 404 && json === null;

    if (
      (res.status === 429 || res.status >= 500 || serverLevel404) &&
      attempt < attempts
    ) {
      await sleep(500 * attempt);
      continue;
    }

    if (!res.ok) {
      if (!isBrowser && json === null) {
        console.error(`API ${res.status} (non-JSON response, not from Laravel): ${method} ${url}`);
      }

      throw new ApiError(
        json?.error ||
          json?.message ||
          `API request failed (${res.status}) ${method} ${path}`,
        res.status,
        json?.errors ?? {}
      );
    }

    return json as T;
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiGet = <T>(path: string, init: RequestInit = {}) =>
  request<T>(path, { ...init, method: "GET" });

export const apiPost = <T>(path: string, body: unknown) =>
  request<T>(path, { method: "POST", body: JSON.stringify(body) });

export const apiPut = <T>(path: string, body: unknown) =>
  request<T>(path, { method: "PUT", body: JSON.stringify(body) });

export const apiDelete = <T>(path: string) => request<T>(path, { method: "DELETE" });

/* ------------------------------------------------------------------ */
/* Response normalisers                                               */
/* Laravel can answer with a bare array, `{ data: [...] }` (API       */
/* Resource) or `{ data: [...], meta }` (paginated). Accept all three. */
/* ------------------------------------------------------------------ */

export function asList<T>(res: unknown): T[] {
  if (Array.isArray(res)) return res as T[];
  if (res && typeof res === "object") {
    const data = (res as { data?: unknown }).data;
    if (Array.isArray(data)) return data as T[];
    if (data && typeof data === "object") return asList<T>(data);
  }
  return [];
}

export function asItem<T>(res: unknown): T | null {
  if (!res || typeof res !== "object" || Array.isArray(res)) return null;
  const data = (res as { data?: unknown }).data;
  if (data && typeof data === "object" && !Array.isArray(data)) return data as T;
  return res as T;
}

/**
 * Backend origin (API_URL without the trailing "/api"). Used to resolve
 * relative upload paths like "/storage/posts/a.jpg" returned by Laravel.
 */
const BACKEND_ORIGIN = API_URL.startsWith("/")
  ? "http://localhost:8000" // dev: relative proxy URL
  : API_URL.replace(/\/api$/, "");

export function assetUrl(path?: string | null): string {
  if (!path) return "";
  if (/^(https?:)?\/\//i.test(path) || path.startsWith("data:")) return path;
  if (path.startsWith("/assets/")) return path; // bundled with the frontend
  return `${BACKEND_ORIGIN}/${path.replace(/^\/+/, "")}`;
}
