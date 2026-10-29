"use client";
// Single blog post. Data is fetched from the API in the browser, so new or
// edited posts show up without rebuilding the static export.
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, Link2 } from "lucide-react";
import { SITE } from "@/lib/site";
import Cover from "@/components/blog/Cover";
import PostContent from "@/components/blog/PostContent";
import PostFaq, { parseFaqs } from "@/components/blog/PostFaq";
import { assetUrl } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { fetchPost, fetchPosts } from "@/lib/posts";
import type { CoverArt, Post } from "@/lib/types";

const ART: CoverArt[] = ["seo", "speed", "ppc", "social", "email", "content"];

/** "/blog/my-post/" -> "my-post" */
function slugFromPath(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const i = parts.indexOf("blog");
  return i >= 0 && parts[i + 1] ? decodeURIComponent(parts[i + 1]) : "";
}

const time = (d?: string | null) => {
  const t = d ? new Date(d).getTime() : 0;
  return Number.isNaN(t) ? 0 : t;
};

/** Newest first, without the "_" fallback shell. */
const sortNewest = (list: Post[]) =>
  list
    .filter((p) => p.slug && p.slug !== "_")
    .sort((a, b) => time(b.date) - time(a.date));

type State = { slug: string; post: Post | null };


/* ---------- Reading time ---------- */
function readingMinutes(content: Post["content"]) {
  const text = (Array.isArray(content) ? content.join(" ") : content || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/* ---------- Share ---------- */
function Share({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = `${SITE.url}/blog/${slug}/`;
  const enc = encodeURIComponent;
  const cls =
    "flex h-10 items-center gap-2 rounded-full bg-slate-200/70 px-4 text-sm text-gray-700 transition-colors hover:bg-slate-300/70";
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-medium text-ink">Share:</span>
      <a className={cls} target="_blank" rel="noopener noreferrer"
        href={`https://wa.me/?text=${enc(`${title} ${url}`)}`}>WhatsApp</a>
      <a className={cls} target="_blank" rel="noopener noreferrer"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`}>LinkedIn</a>
      <a className={cls} target="_blank" rel="noopener noreferrer"
        href={`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`}>Facebook</a>
      <button
        type="button"
        className={cls}
        onClick={() => {
          navigator.clipboard?.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          });
        }}
      >
        <Link2 size={14} /> {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}

/* ---------- Previous / next article ---------- */
function PostNav({ prev, next }: { prev?: Post; next?: Post }) {
  if (!prev && !next) return null;

  return (
    <nav aria-label="More articles" className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-0">
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          prefetch={false}
          rel="prev"
          aria-label={`Previous article: ${prev.title}`}
          className="group flex items-center gap-4 sm:pr-8"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-200/70 text-gray-700 transition-colors group-hover:bg-slate-300/70">
            <ArrowLeft size={18} />
          </span>
          <span className="text-sm leading-snug text-gray-600 transition-colors group-hover:text-ink">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span />
      )}

      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          prefetch={false}
          rel="next"
          aria-label={`Next article: ${next.title}`}
          className="group flex flex-row-reverse items-center gap-4 text-right sm:border-l sm:border-slate-200 sm:pl-8"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-200/70 text-gray-700 transition-colors group-hover:bg-slate-300/70">
            <ArrowRight size={18} />
          </span>
          <span className="text-sm leading-snug text-gray-600 transition-colors group-hover:text-ink">
            {next.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}

/* ---------- See also: latest 3 posts ---------- */
function SeeAlso({ posts }: { posts: Post[] }) {
  if (!posts.length) return null;

  return (
    <section aria-labelledby="see-also" className="mx-auto mt-16 mb-10 w-full max-w-[1430px]">
      <h2 id="see-also" className="text-3xl font-light tracking-tight text-ink sm:text-4xl">
        See also
      </h2>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => {
          const img = assetUrl(p.image);
          return (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
          prefetch={false}
                className="group flex h-full flex-col overflow-hidden rounded-3xl bg-surface p-2 transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[20px]">
                  {img ? (
                    <Image
                      src={img}
                      alt={p.title}
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <Cover
                      art={ART.includes(p.art) ? p.art : "seo"}
                      className="h-full w-full"
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col px-4 pb-5 pt-5">
                  <div className="flex items-center gap-3 text-xs">
                    {p.category && (
                      <span className="rounded-full bg-slate-200/70 px-3 py-1 text-gray-700">
                        {p.category}
                      </span>
                    )}
                    {p.date && (
                      <time dateTime={p.date} className="text-gray-400">
                        {formatDate(p.date)}
                      </time>
                    )}
                  </div>
                  <h3 className="mt-3 text-lg font-medium leading-snug text-ink">
                    {p.title}
                  </h3>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default function BlogPostView() {
  const slug = slugFromPath(usePathname());
  const [state, setState] = useState<State | null>(null);
  const [all, setAll] = useState<Post[]>([]);

  useEffect(() => {
    if (!slug) return;
    let alive = true;
    fetchPost(slug).then((post) => alive && setState({ slug, post }));
    return () => {
      alive = false;
    };
  }, [slug]);

  // All posts: used for previous/next and "See also"
  useEffect(() => {
    let alive = true;
    fetchPosts()
      .then((list) => alive && setAll(sortNewest([...list])))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const loading = !state || state.slug !== slug;
  const post = loading ? null : state.post;
  const faqs = useMemo(() => parseFaqs(post?.faqs), [post]);
  const minutes = post ? readingMinutes(post.content) : 0;

  const image = assetUrl(post?.image);

  // Article + breadcrumb structured data (FAQ schema is added by <PostFaq />)
  const schema = useMemo(() => {
    if (!post) return null;
    const url = `${SITE.url}/blog/${post.slug}/`;
    return [
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.meta_title?.trim() || post.title,
        description: post.meta_description?.trim() || post.excerpt || undefined,
        image: image || undefined,
        datePublished: post.date || undefined,
        dateModified: post.date || undefined,
        mainEntityOfPage: url,
        author: { "@type": "Organization", name: SITE.name, url: SITE.url },
        publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog/` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ];
  }, [post, image]);

  // `all` is newest first: the next index is the older post, the previous index the newer one.
  const idx = all.findIndex((p) => p.slug === slug);
  const prevPost = idx >= 0 ? all[idx + 1] : undefined; // older article (left)
  const nextPost = idx > 0 ? all[idx - 1] : undefined; // newer article (right)
  const seeAlso = all.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
    {schema && (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
    )}
    <section className="p-2">
      <div className="rounded-[24px] bg-surface pb-[80px] pt-[180px] px-3">
        <article className="mx-auto w-full max-w-6xl">
          <div data-reveal="fade" className="flex flex-col items-center text-center">
            <Link href="/blog" className="group relative flex h-[36px] w-[155px] items-center overflow-hidden rounded-xl bg-white p-0.5 text-sm font-medium text-night" >
              {/* Moving Icon Box */}
              <span className="absolute left-0.5 top-0.5 flex h-8 w-8 items-center rounded-[9px] bg-surface transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] group-hover:left-0.5 group-hover:right-auto group-hover:w-[calc(100%-4px)]">

                {/* Icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-2 rotate-180 transition-all duration-500">
                  <path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                {/* Text inside moving icon box */}
                <span className="absolute right-10 whitespace-nowrap translate-x-3 opacity-0 transition-all duration-500 group-hover:translate-x-3 group-hover:opacity-100">
                  Back to blog
                </span>
              </span>

              {/* Normal Text */}
              <span className="relative z-10 ml-[50px] transition-all duration-500 group-hover:translate-x-6 group-hover:opacity-0">
                Back to blog
              </span>
            </Link>

            {post && (
              <>
                <div className="mt-6 flex items-center gap-3 text-xs">
                  {post.category && (
                    <span className="rounded-full bg-slate-200/70 px-3.5 py-1.5 text-gray-700">
                      {post.category}
                    </span>
                  )}
                  {post.date && (
                    <time dateTime={post.date} className="text-gray-500">
                      {formatDate(post.date)}
                    </time>
                  )}
                  <span className="flex items-center gap-1 text-gray-500">
                    <Clock size={13} /> {minutes} min read
                  </span>
                </div>
                <h1 className="mt-5 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
                  {post.title}
                </h1>
                {post.excerpt && (
                  <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                )}
              </>
            )}
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl bg-white">
            {loading && (
              <div className="p-2" role="status" aria-label="Loading article">
                <div className="skeleton aspect-[16/9] rounded-3xl" />
                <div className="space-y-3 px-4 pb-8 pt-8 sm:px-8">
                  <div className="skeleton h-4 w-full rounded-full" />
                  <div className="skeleton h-4 w-11/12 rounded-full" />
                  <div className="skeleton h-4 w-4/5 rounded-full" />
                </div>
              </div>
            )}

            {!loading && !post && (
              <div className="p-16 text-center">
                <h1 className="text-2xl font-semibold text-ink">Article not found</h1>
                <p className="mt-3 text-gray-500">
                  This article may have been moved or removed.
                </p>
              </div>
            )}

            {post && (
              <>
                <div className="relative aspect-[16/9] p-2">
                  {image ? (
                    <Image
                      src={image}
                      alt={post.title}
                      fill
                      priority
                      sizes="(min-width: 768px) 768px, 100vw"
                      className="overflow-hidden rounded-3xl object-cover"
                    />
                  ) : (
                    <Cover
                      art={ART.includes(post.art) ? post.art : "seo"}
                      className="h-full w-full overflow-hidden rounded-3xl"
                    />
                  )}
                </div>

                <div className="mx-auto max-w-5xl px-5 pb-10 pt-10 sm:px-8">
                  {post.content?.length ? (
                    <PostContent content={post.content} />
                  ) : (
                    <p className="text-gray-500">The content for this article is not available yet.</p>
                  )}

                  <PostFaq faqs={faqs} />

                  <div className="mt-10 border-t border-slate-200 pt-6">
                    <Share title={post.title} slug={post.slug} />
                  </div>
                </div>

                {/* Date pill + previous / next article */}
                <div className="px-6 pb-10 sm:px-10">
                  <PostNav prev={prevPost} next={nextPost} />
                </div>
              </>
            )}
          </div>
        </article>
      </div>
    </section>

      {/* See also: latest 3 articles */}
      {post && <SeeAlso posts={seeAlso} />}
    </>
  );
}