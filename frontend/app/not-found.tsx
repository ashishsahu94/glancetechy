import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The requested page could not be found.",
  robots: {
    index: false,
    follow: false,
  },
};
export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="mx-auto w-full max-w-[900px] text-center">

        {/* 404 */}
        <h1 className="text-[clamp(9rem,25vw,20rem)] font-bold leading-none tracking-[-0.08em] text-ink">
          404<span className="text-primary">.</span>
        </h1>

        {/* Content */}
        <div className="mx-auto -mt-4 max-w-xl">
          <h2 className="text-3xl font-medium tracking-tight text-ink md:text-4xl">
            This page could not be found.
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-500 md:text-lg">
            The page you&apos;re looking for may have been moved,
            deleted, or the URL may be incorrect.
          </p>

          {/* Home Button */}
          <div className="mt-9 flex justify-center">
            <Link
              href="/"
              className="group flex h-14 items-center gap-3 rounded-2xl bg-ink px-2 pr-6 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-night-2"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-ink transition-transform duration-300 group-hover:rotate-[-5deg]">
                <Home size={17} />
              </span>

              <span>Back to Home</span>

              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Helpful links (for visitors and AI agents) */}
          <p className="mt-8 text-sm text-gray-500">
            Looking for something? Try our{" "}
            <Link href="/services" className="underline underline-offset-4 hover:text-ink">services</Link>,{" "}
            <Link href="/blog" className="underline underline-offset-4 hover:text-ink">blog</Link>,{" "}
            <Link href="/contact" className="underline underline-offset-4 hover:text-ink">contact page</Link>, the{" "}
            <a href="/sitemap.xml" className="underline underline-offset-4 hover:text-ink">sitemap</a> or{" "}
            <a href="/llms.txt" className="underline underline-offset-4 hover:text-ink">llms.txt</a>.
          </p>
        </div>
      </div>
    </main>
  );
}