import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Cover from "./Cover";
import { assetUrl } from "@/lib/api";
import { formatDate } from "@/lib/format";
import type { Post } from "@/lib/types";

export const BLOG_BG = "var(--color-soft)";

const ART = [
  "seo",
  "speed",
  "ppc",
  "social",
  "email",
  "content",
  "ecommerce",
  "uiux",
  "geo",
  "performance",
] as const;


export default function BlogCard({
  post,
  className = "",
  style,
}: {
  post: Post;
  className?: string;
  style?: React.CSSProperties;
}) {
  const image = assetUrl(post.image);

  return (
    <Link href={`/blog/${encodeURIComponent(post.slug)}`} prefetch={false} style={style} className={`${className} group relative flex flex-col overflow-hidden rounded-3xl bg-white p-2  transition duration-300 hover:-translate-y-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none`}>
      <div className="relative aspect-[4/2] overflow-hidden rounded-2xl">
        {image ? (
          <Image
            src={image}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
          />
        ) : (
          <Cover
            art={ART.includes(post.art) ? post.art : "seo"}
            className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col px-4 pb-6 pt-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-slate-100 px-3.5 py-1.5 text-xs text-gray-700">{post.category}</span>
          <time dateTime={post.date} className="shrink-0 text-xs text-gray-400">
            {formatDate(post.date)}
          </time>
        </div>
        <h3 className="mt-5 text-xl font-normal leading-snug text-ink">{post.title}</h3>
      </div>

      <div className="border-t border-slate-100 px-4 py-5 text-sm text-gray-500 transition-colors group-hover:text-ink">
        Read article
      </div>

      <span
        aria-hidden="true"
        className="absolute bottom-0 right-0 rounded-tl-3xl p-1.5 pl-2 pt-2"
        style={{ backgroundColor: BLOG_BG }}
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-ink transition-colors duration-300 group-hover:bg-charcoal group-hover:text-accent">
          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:-rotate-45 motion-reduce:transition-none"
          />
        </span>
      </span>
    </Link>
  );
}
