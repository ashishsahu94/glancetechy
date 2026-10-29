import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const devApiTarget = (
  process.env.DEV_API_TARGET ?? "http://localhost:8000/api"
).replace(/\/$/, "");

const nextConfig: NextConfig = {
  // Production = static export (uploaded to Apache / shared hosting).
  ...(isDev ? {} : { output: "export", distDir: "dist" }),

  // Production (static export) needs /page/ folders. In dev it must be off,
  // otherwise Next.js redirects /api-proxy/posts to /api-proxy/posts/ (308)
  // and Laravel receives a URL with a trailing slash.
  trailingSlash: !isDev,

  images: { unoptimized: true },

  // The build calls the Laravel API from many pages. Keep it gentle so shared
  // hosting does not answer with 429/500 under load.
  experimental: {
    cpus: 2,
    staticGenerationMaxConcurrency: 2,
  },

  allowedDevOrigins: ["192.168.1.33"],

  // Dev only: proxy /api-proxy/* to the local Laravel server (avoids CORS).
  ...(isDev
    ? {
        async rewrites() {
          return [
            {
              source: "/api-proxy/:path*",
              destination: `${devApiTarget}/:path*`,
            },
          ];
        },
      }
    : {}),
};

export default nextConfig;
