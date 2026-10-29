import type { Metadata } from "next";
import Link from "next/link";
import { CircleDollarSign } from "lucide-react";
import PricingPlans from "@/components/pricing/PricingPlans";

export const metadata: Metadata = {
  title: "Pricing | Website, SEO and digital marketing plans",
  description:
    "Simple plans for website design, SEO, social media and digital marketing. Pick a plan or ask for custom pricing.",
  alternates: { canonical: "/pricing/" },
};

export default function PricingPage() {
  return (
    <main>
      <section className="p-2">
        <div className="rounded-[24px] bg-surface">
          <div className="mx-auto w-full max-w-[1430px] px-4 pb-14 pt-32 text-center sm:pt-[170px] sm:pb-20">
            <span data-reveal className="inline-flex items-center gap-2 rounded-full bg-white py-1 pl-1 pr-4 text-sm text-gray-700">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
                <CircleDollarSign size={14} />
              </span>
              Pricing
            </span>
            <h1 data-reveal className="mx-auto mt-6 max-w-3xl text-4xl font-light leading-[1.1] tracking-tight text-charcoal-dark sm:text-6xl">
              Simple plans that grow with your business
            </h1>
            <p data-reveal className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-gray-600">
              Start small or go all in. Every plan comes with a free discovery call and no long contracts.{" "}
              <Link href="/services" className="underline underline-offset-4 hover:text-ink">
                See all services
              </Link>
            </p>
          </div>
        </div>
      </section>

      <div className="pt-6">
        <PricingPlans />
      </div>
    </main>
  );
}
