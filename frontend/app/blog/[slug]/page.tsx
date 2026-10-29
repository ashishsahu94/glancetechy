import type { Metadata } from "next";
import BlogPostView from "@/components/blog/BlogPostView";
import { fetchPost, fetchPosts } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

/**
 * Static export needs the slugs at build time. "_" is a fallback shell:
 * Apache (see public/.htaccess) serves it for posts published after the build,
 * and <BlogPostView /> then reads the real slug from the URL.
 */
export async function generateStaticParams() {
  const posts = await fetchPosts();
  return [...posts.map((p) => ({ slug: p.slug })), { slug: "_" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "_") return { title: "Blog", robots: { index: false } };

  const post = await fetchPost(slug, { strict: true });
  if (!post) return { title: "Blog" };

  // SEO fields from the admin panel, with fallbacks when they are left empty
  const title = post.meta_title?.trim() || post.title;
  const description = post.meta_description?.trim() || post.excerpt || undefined;
  const focusKeyword = post.focus_keyword?.trim();

  return {
    title,
    description,
    keywords: focusKeyword ? [focusKeyword] : undefined,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: { title, description, url: `/blog/${post.slug}/`, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function PostPage() {
  return <BlogPostView />;
}