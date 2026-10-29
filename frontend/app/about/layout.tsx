import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Connect with GlanceTechy, a trusted digital marketing agency. We help businesses grow online with website design, development, SEO and marketing, wherever you are.",
  alternates: { canonical: "/about/" },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}