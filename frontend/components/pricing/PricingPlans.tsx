"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ListChecks, Plus } from "lucide-react";
import { CURRENCY, enterprise, plans, type Plan } from "@/lib/pricing";

type Billing = "annual" | "monthly";

function format(n: number) {
  return n.toLocaleString("en-IN");
}

/** Same animated arrow button used across the site. */
function ArrowButton({
  href,
  label,
  dark,
  wide,
}: {
  href: string;
  label: string;
  dark?: boolean;
  wide?: boolean;
}) {
  return (
    // <Link
    //   href={href}
    //   className={`group/btn relative flex items-center overflow-hidden rounded-2xl p-1 text-sm font-medium ${
    //     wide ? "h-[58px] w-full sm:w-[320px]" : "h-[56px] w-full"
    //   } ${dark ? "bg-charcoal text-white" : "bg-surface text-ink"}`}
    // >
    //   <span
    //     className={`absolute bottom-1 left-1 top-1 flex w-12 items-center rounded-[14px] transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] group-hover/btn:w-[calc(100%-8px)] ${
    //       dark ? "bg-primary" : "bg-white"
    //     }`}
    //   >
    //     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="absolute right-[15px]" aria-hidden="true">
    //       <path d="M5 12H19M13 6L19 12L13 18" stroke="var(--color-night)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    //     </svg>
    //     <span className="absolute left-0 right-0 m-auto translate-x-3 whitespace-nowrap text-night opacity-0 transition-all duration-500 group-hover/btn:translate-x-2 group-hover/btn:opacity-100">
    //       {label}
    //     </span>
    //   </span>
    //   <span className="relative z-10 flex-1 whitespace-nowrap pl-10 text-center transition-all duration-500 group-hover/btn:translate-x-6 group-hover/btn:opacity-0">
    //     {label}
    //   </span>
    // </Link>




   <Link
  href={href}
  className="group relative flex h-[56px] w-full items-center overflow-hidden rounded-2xl bg-charcoal p-1 text-sm font-medium text-white"
>
  <span className="absolute left-1 top-1 flex h-12 w-12 items-center rounded-[14px] bg-primary transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] group-hover:w-[calc(100%-8px)]">
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute right-4 transition-all duration-500"
    >
      <path
        d="M5 12H19M13 6L19 12L13 18"
        stroke="var(--color-night)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>

    <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-night opacity-0 transition-opacity duration-500 group-hover:opacity-100">
      {label}
    </span>
  </span>

  <span className="relative z-10 d-block text-center w-full  transition-all duration-500 group-hover:translate-x-14 group-hover:opacity-0">
    {label}
  </span>
</Link>






  );
}

function PlanCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  const price = billing === "annual" ? plan.annual : plan.monthly;

  return (
    <article data-reveal className="flex flex-col rounded-[22px] bg-white p-6 sm:p-8">
      <h3 className="text-2xl font-light tracking-tight text-charcoal-dark sm:text-[28px]">{plan.name}</h3>
      <p className="mt-4 max-w-[260px] text-sm leading-relaxed text-gray-400">{plan.description}</p>

      <p className="mt-12 flex items-baseline gap-1 text-ink">
        <span className="text-5xl font-medium tracking-tight sm:text-6xl">
          {CURRENCY}
          {format(price)}
        </span>
        <span className="text-2xl font-light sm:text-3xl">/mo</span>
      </p>
      <p className="mt-3 text-sm text-gray-400">
        {plan.unit}
        {billing === "annual" ? ", billed yearly" : ""}
      </p>

      <div className="mt-10">
        <ArrowButton href={`/contact?plan=${plan.id}`} label={plan.cta} dark={plan.featured} />
      </div>

      <ul className="mt-10">
        {plan.includes && (
          <li className="flex items-center gap-3 border-b border-surface py-3.5 text-sm text-ink">
            <Check size={16} className="shrink-0 text-gray-500" />
            {plan.includes}
          </li>
        )}
        {plan.features.map((f, i) => (
          <li
            key={f}
            className={`flex items-center gap-3 py-3.5 text-sm text-ink ${
              i < plan.features.length - 1 ? "border-b border-surface" : ""
            }`}
          >
            <Plus size={16} strokeWidth={1.5} className="shrink-0 text-gray-400" />
            {f}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function PricingPlans() {
  const [billing, setBilling] = useState<Billing>("annual");

  return (
    <section className="px-2 pb-16 sm:px-4 lg:pb-24">
      <div className="mx-auto w-full max-w-[1430px]">
        {/* Billing toggle */}
        <div className="mx-auto flex w-full max-w-[360px] rounded-t-[22px] bg-surface p-1.5 pb-0">
          <div role="tablist" aria-label="Billing period" className="grid w-full grid-cols-2 rounded-t-2xl p-0">
            {(["annual", "monthly"] as const).map((b) => {
              const active = billing === b;
              return (
                <button
                  key={b}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => setBilling(b)}
                  className={`rounded-t-2xl px-4 py-3.5 text-sm capitalize transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink ${
                    active ? "bg-white text-ink" : "text-gray-500 hover:text-ink"
                  }`}
                >
                  {b}
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel */}
        <div className="rounded-[26px] bg-gradient-to-b from-surface to-slate-300/80 p-1.5 sm:p-2">
          <div className="grid gap-1.5 sm:gap-2 md:grid-cols-3">
            {plans.map((p) => (
              <PlanCard key={p.id} plan={p} billing={billing} />
            ))}
          </div>

          {/* Enterprise */}
          <div data-reveal className="mt-1.5 flex flex-col justify-between gap-8 rounded-[22px] bg-gradient-to-br from-surface to-slate-200 p-6 sm:mt-2 sm:p-8 lg:flex-row lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm text-ink">
                <ListChecks size={14} />
                Enterprise plans
              </span>
              <h3 className="mt-6 text-3xl font-light tracking-tight text-charcoal-dark sm:text-4xl">{enterprise.title}</h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-500">{enterprise.text}</p>
            </div>
            <div className="w-[250]">
              <ArrowButton href="/contact" label={enterprise.cta} dark wide />
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Prices are indicative and exclude taxes. Final scope and quote are confirmed after a free call.
        </p>
      </div>
    </section>
  );
}
