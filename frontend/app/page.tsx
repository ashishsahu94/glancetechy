import Link from "next/link";
import { BookOpen } from "lucide-react";
import type { Metadata } from "next";
import Services from "@/components/home/Services";
import WhyChooseUs from "@/components/home/Whychooseus";
import Projects from "@/components/home/Projects";
import Testimonials from "@/components/home/Testimonials";
import TrustedBy from "@/components/home/Trustedby";
import Blog from "@/components/home/Blog";

import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import TrustedGlobe from "@/components/home/TrustedGlobe";
import FindServiceArea from "@/components/home/FindServiceArea";


export const metadata: Metadata = {
  title: { absolute: "GlanceTechy | Website Design & Development Agency" },
  description:
    "GlanceTechy helps businesses build a strong online presence with custom website design, web development, UI/UX design, SEO and digital marketing services.",
  alternates: { canonical: "/" },
};

export default function Home() {

  return (
    <>
      <Hero />

      <TrustedBy />


      <Stats />

      <FindServiceArea />

      <section className="px-2 py-16">
        <div className="mx-auto w-full sm:max-w-[768px] md:max-w-[768px] lg:max-w-[992px] xl:max-w-[1200px] 2xl:max-w-[1430px]">
          <div className="mb-14 flex items-center justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-200/70 px-3 py-1.5 text-sm text-gray-700">
                <BookOpen size={15} />
                Our Services
              </span>

              <h2 className="mt-5 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                What We Do
              </h2>

              <p className="mt-5 max-w-[600px] text-base text-gray-600">
                Website development, SEO, PPC advertising, and digital marketing services to grow your online visibility and reach more customers. 
              </p>
            </div>

            <Link
              href="/services" title="View All Services"
              className="group flex items-center overflow-hidden rounded-full border border-line bg-white px-3.5 py-1.5 text-[12px] font-medium text-muted transition-all duration-500 hover:border-black hover:text-black"
            >
              <span className="mr-3 whitespace-nowrap">
                View All Services
              </span>

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M13 6L19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
          <Services />
        </div>
      </section>

      <TrustedGlobe />


      {/* <WhyChooseUs /> */}
 


      {/* PROJECTS */}
      <section className="px-2 py-16">
        <div className="mx-auto w-full sm:max-w-[768px] md:max-w-[768px] lg:max-w-[992px] xl:max-w-[1200px] 2xl:max-w-[1430px]">
          <div className="mb-14 flex items-center justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-200/70 px-3 py-1.5 text-sm text-gray-700">
                <BookOpen size={15} />
                Our Work
              </span>

              <h3 className="mt-5 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Recent Projects by GlanceTechy
              </h3>

              <p className="mt-2 max-w-[600px] text-base text-gray-600">
                See how we help businesses transform their digital presence into high-performing platforms that drive real inquiries and revenue.
              </p>
            </div>

            <Link href="/portfolio" className="group flex items-center overflow-hidden rounded-full border border-line bg-white px-3.5 py-1.5 text-[12px] font-medium text-muted transition-all duration-500 hover:border-black hover:text-black">
              <span className="mr-3 whitespace-nowrap">View All Projects</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          <Projects />
        </div>
      </section>

      <Testimonials />

      <Blog />
    </>
  );
}