import type { Metadata } from "next";
import { BookOpen } from "lucide-react";

import BlogList from "@/components/blog/BlogList";
import FAQ from "../faq/page";

export const metadata: Metadata = {
  title: "Blog | All insights",
  description:
    "Tips and guides on websites, SEO, ads, social media and email marketing.",
    alternates: { canonical: "/blog/" },
};


export default function BlogPage() {
  return (
    <>
    
    <section className="p-2">

      <div className="rounded-[24px] bg-surface pb-20 lg:pt-[180px] pt-[120px]">

        <div className="mx-auto w-full sm:max-w-[768px] md:max-w-[768px] lg:max-w-[992px] xl:max-w-[1200px] 2xl:max-w-[1430px] px-4">

          {/* =====================================================
              HEADER
          ===================================================== */}

          <div data-reveal className="text-center">

            {/* Blog Badge */}

            <span className="inline-flex items-center gap-2 rounded-full bg-white py-1 pl-1 pr-4 text-sm text-gray-700">

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">

                <BookOpen size={15} />

              </span>

              Blog

            </span>


            {/* Heading */}

            <h1 className="mt-5 text-5xl font-light tracking-tight text-ink sm:text-6xl">
              All insights
            </h1>


            {/* Description */}

            <p className="mx-auto mt-5 max-w-md text-base text-gray-600">
              Guides and ideas to help you build a better website
              and grow your business online.
            </p>

          </div>


          {/* =====================================================
              BLOG GRID
          ===================================================== */}

          <div className="mt-12">

            <BlogList />
          </div>

        </div>

      </div>

    </section>

    <FAQ />
    </>
  );
}