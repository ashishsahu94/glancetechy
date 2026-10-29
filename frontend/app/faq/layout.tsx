import type { Metadata } from "next";
import FAQHEADER from "./faqheader";

export const metadata: Metadata = {
  title: "FAQ - Web Design & SEO Questions",
  description:
    "Answers to common questions about website design, development, SEO, pricing, timelines and how we work with clients at GlanceTechy.",
  alternates: { canonical: "/faq/" },
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <section className="p-2">
      <div className="[&_*]: rounded-[24px] bg-surface pb-20 px-2 lg:pt-[180px] pt-[120px]">
        <FAQHEADER asH1 />
      </div>

      {children}
    </section>
    </>
  );
}