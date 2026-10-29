"use client";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import BlogGrid from "@/components/blog/BlogGrid";
import type { Post } from "@/lib/types";
import { useApiList } from "@/hooks/useApi";

export default function Blog() {
  const { data: posts } = useApiList<Post>("/posts?limit=3");
  if (!posts?.length) return null;

  return (
    <section className="px-2 py-16 mb-20 bg-surface">
      <div className="rounded-[24px] ">
      <div className="mx-auto w-full sm:max-w-[768px] md:max-w-[768px] lg:max-w-[992px] xl:max-w-[1200px] 2xl:max-w-[1430px]">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-200/70 px-3 py-1.5 text-sm text-gray-700">
              <BookOpen size={15} />
              Blog
            </span>

            <h3 className="mt-5 max-w-[500px] text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Digital Marketing and Website Tips for Your Business
            </h3>

            <p className="mt-3 max-w-[570px] text-base text-gray-600">
              Simple, practical advice on SEO, websites and online marketing, to help you get found on Google and win more customers.
            </p>
          </div>



         <Link
              href="/blog"
              className="group flex items-center overflow-hidden rounded-full border border-line bg-white px-3.5 py-1.5 text-[12px] font-medium text-muted transition-all duration-500 hover:border-black hover:text-black"
            >
              <span className="mr-3 whitespace-nowrap">
                Visit Blog
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

        <div className="mt-12">
          <BlogGrid posts={posts} />
        </div>
      </div>
      </div>
    </section>
  );
}