
import Process from "@/components/services/Process";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesList from "@/components/services/ServicesList";
import type { Metadata } from "next";
import FAQ from "../faq/page";


export const metadata: Metadata = {
  title: "Services | Web design, SEO, ads, social media, email & content",
  description: "Website design and development, SEO, social media marketing, PPC, email marketing and content writing for growing businesses.",
  alternates: { canonical: "/services/" },
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <ServicesList />
      <Process />
      <FAQ />
    </main>
  );
}