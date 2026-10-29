import type { Metadata } from "next";
import { Briefcase } from "lucide-react";
import CareersList from "@/components/careers/CareersList";

export const metadata: Metadata = {
  title: "Careers | Join the GlanceTechy team",
  description: "See open roles at GlanceTechy in design, development, SEO and digital marketing, or send us your CV.",
  alternates: { canonical: "/careers/" },
};

export default function CareersPage() {
  return (
    <main>
      <section className="p-2">
        <div className="rounded-[24px] bg-surface">
          <div className="mx-auto w-full max-w-[1430px] px-4 pb-14 pt-32 text-center sm:pt-[170px] sm:pb-20">
            <span data-reveal className="inline-flex items-center gap-2 rounded-full bg-white py-1 pl-1 pr-4 text-sm text-gray-700">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
                <Briefcase size={14} />
              </span>
              Careers
            </span>
            <h1 data-reveal className="mx-auto mt-6 max-w-3xl text-4xl font-light leading-[1.1] tracking-tight text-charcoal-dark sm:text-6xl">
              Build great websites and brands with us
            </h1>
            <p data-reveal className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-gray-600">
              We are a small, focused team. Pick an open role below and send us your CV and a few lines about your work.
            </p>
          </div>
          <CareersList />
        </div>        
      </section>
    </main>
  );
}
