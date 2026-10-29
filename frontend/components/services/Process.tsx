"use client";
// components/services/Process.tsx
import { useInView } from "@/hooks/useInView";
import { processSteps } from "@/lib/services";

export default function Process() {
  const { ref, shown } = useInView<HTMLElement>(0.15);
  const reveal = shown ? "animate-reveal" : "opacity-0";

  return (
    <section ref={ref} className="px-6 py-16 lg:py-20 bg-surface">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className={`text-center ${reveal}`}>
          <span className="inline-block rounded-full bg-white px-4 py-1.5 text-sm text-gray-700">How we work</span>
          <h2 className="mx-auto mt-5 max-w-xl text-4xl font-light leading-tight tracking-tight text-charcoal-dark sm:text-5xl">
            A clear process, from planning to launch
          </h2>
        </div>

        <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => {
            const icons = [
              // Discover
              <svg
                key="discover"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
                <path d="M11 8v6M8 11h6" />
              </svg>,

              // Plan
              <svg
                key="plan"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <rect x="5" y="4" width="14" height="17" rx="2" />
                <path d="M9 4.5V3h6v1.5" />
                <path d="m8.5 11 1.5 1.5 3-3" />
                <path d="M8.5 16H15" />
              </svg>,

              // Design & Develop
              <svg
                key="develop"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d="m8 8-4 4 4 4" />
                <path d="m16 8 4 4-4 4" />
                <path d="m14 5-4 14" />
              </svg>,

              // Launch & Improve
              <svg
                key="launch"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d="M12 19c-3-2-5-5-5-9 0-3 2-6 5-8 3 2 5 5 5 8 0 4-2 7-5 9Z" />
                <circle cx="12" cy="10" r="2" />
                <path d="m7 13-3 2v4l5-2" />
                <path d="m17 13 3 2v4l-5-2" />
                <path d="M12 19v3" />
              </svg>,
            ];

            return (
              <li
                key={step.title}
                className={`${reveal} group rounded-3xl bg-white p-8 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl motion-reduce:transition-none`}
                style={{ animationDelay: `${150 + i * 130}ms` }}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-ink transition-all duration-300 group-hover:scale-110 group-hover:rounded-full motion-reduce:transition-none">
                  {icons[i]}
                </span>

                <h3 className="mt-14 text-2xl font-light tracking-tight text-ink">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {step.text}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}