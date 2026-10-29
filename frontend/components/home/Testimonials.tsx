"use client";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import { useApiList } from "@/hooks/useApi";
import type { Testimonial } from "@/lib/types";

export default function Testimonials() {
  const { data } = useApiList<Testimonial>("/testimonials");
  if (!data?.length) return null;
  return <TestimonialsCarousel items={data} />;
}
