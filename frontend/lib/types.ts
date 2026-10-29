export type CoverArt =
  | "seo"
  | "speed"
  | "ppc"
  | "social"
  | "email"
  | "content"
  | "ecommerce"
  | "uiux"
  | "geo"
  | "performance";

type Base = { id: string; createdAt: string };

export type Project = Base & {
  title: string;
  category: string;
  href: string;
  bg: string;
  img: string;
  description?: string;
  featured: boolean;
};

export type Post = Base & {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  art: CoverArt;
  image: string;
  /** Paragraph list (admin "paragraphs" field) or an HTML / plain-text string. */
  content: string[] | string;
  /** Per-post FAQ: "Q: ...\nA: ..." pairs separated by a blank line (admin "FAQ" rows). */
  faqs?: string;
  /** SEO fields (optional, set from the admin panel) */
  focus_keyword?: string;
  meta_title?: string;
  meta_description?: string;
};

export type Testimonial = Base & {
  name: string;
  role: string;
  quote: string;
  avatar: string;
  /** Where the review is from: google, freelancer, upwork, fiverr, clutch, linkedin, facebook, whatsapp, direct (or empty). */
  source?: string;
  /** Optional link to the original review (e.g. the Google review). "Read more" opens it. */
  source_url?: string;
};

export type Collections = {
  projects: Project[];
  posts: Post[];
  testimonials: Testimonial[];
};
export type CollectionName = keyof Collections;