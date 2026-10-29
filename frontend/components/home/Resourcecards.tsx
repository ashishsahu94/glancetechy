"use client";
// components/ResourceCards.tsx
// npm i lucide-react
// Zaroori: globals.css mein `.animate-reveal` keyframe (pehle wala reveal-up)
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BookOpen, MessageCircle, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const WHATSAPP = "https://wa.me/+91 91988 59019";

type Card = {
  icon: LucideIcon;
  title: string;
  text: string;
  cta: string;
  href: string;
  external?: boolean;
};

const cards: Card[] = [
  {
    icon: BookOpen,
    title: "Help Center",
    text: "Browse guides, tutorials, and FAQs to get the most out of our services.",
    cta: "Read Guides",
    href: "/faq",
    external: true,
  },
  {
    icon: Sparkles,
    title: "Case Studies",
    text: "See our latest projects and the real results we delivered for clients.",
    cta: "View Work",
    href: "/portfolio",
    external: true,
  },
  {
    icon: MessageCircle,
    title: "Let's Chat",
    text: "Message us on WhatsApp for quick answers, free advice and project quotes.",
    cta: "Chat Now",
    href: WHATSAPP,
    external: true,
  },
];

export default function ResourceCards() {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16">
      <div className="mx-auto w-full sm:max-w-[768px] md:max-w-[768px] lg:max-w-[992px] xl:max-w-[1200px] 2xl:max-w-[1430px] px-4">
        <div className="mx-auto grid gap-4 md:grid-cols-3">
          {cards.map(({ icon: Icon, title, text, cta, href, external }, i) => {
            const className = `${
              shown ? "animate-reveal" : "opacity-0"
            } group flex flex-col rounded-3xl bg-white p-9 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none`;
            const style = { animationDelay: `${i * 150}ms` };

            const body = (
              <>
                <Icon
                  size={34}
                  strokeWidth={1.2}
                  className="text-gray-400 transition duration-300 group-hover:-translate-y-1 group-hover:text-ink motion-reduce:transition-none"
                />

                <h3 className="mt-16 text-2xl font-light tracking-tight text-ink">{title}</h3>
                <p className="mt-3 mb-7 max-w-[32ch] text-sm leading-relaxed text-gray-600">{text}</p>

              
              <span  className="group relative flex h-[36px] w-[155px] items-center overflow-hidden rounded-xl bg-white p-0.5 text-sm font-medium text-night">
                  {/* Moving Icon Box */}
                  <span className="absolute left-0.5 top-0.5 flex h-8 w-8 items-center rounded-[9px] bg-surface transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] group-hover:left-0.5 group-hover:right-auto group-hover:w-[calc(100%-4px)]">
                  {/* Icon */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-2 transition-all duration-500 group-hover:right-2">
                      <path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
          
                  {/* Text inside moving icon box */}
                  <span className="absolute right-10 whitespace-nowrap translate-x-3 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                      {cta}
                  </span>
                  </span>
          
                  {/* Normal Text */}
                  <span className="relative z-10 ml-[50px] transition-all duration-500 group-hover:translate-x-6 group-hover:opacity-0">
                  {cta}
                  </span>
              </span>
              </>
            );

            return external ? (
              <a key={title} href={href} target="_blank" rel="noopener noreferrer" style={style} className={className}>
                {body}
              </a>
            ) : (
              <Link key={title} href={href} style={style} className={className}>
                {body}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}