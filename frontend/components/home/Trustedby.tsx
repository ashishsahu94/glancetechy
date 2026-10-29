"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Activity } from "lucide-react";

const logos = [
  { name: "Shilsha", src: "/assets/partners-logo/sm-logo01.webp" },
  { name: "Indastro", src: "/assets/partners-logo/sm-logo02.webp" },
  { name: "Partner", src: "/assets/partners-logo/sm-logo03.webp" },
  { name: "The Bombay Dalal", src: "/assets/partners-logo/sm-logo04.webp" },
  { name: "Fitu", src: "/assets/partners-logo/sm-logo05.webp" },
];

function LogoCard({ name, src }: { name: string; src: string }) {
  return (
    <li className="mr-4 flex h-20 w-[170px] bg-surface shrink-0 items-center justify-center rounded-2xl  px-6 shadow-sm sm:mr-5 sm:h-24 sm:w-[210px]">
      <Image
        src={src}
        alt={`${name} logo`}
        width={160}
        height={64}
        className="h-auto max-h-11 w-auto max-w-[130px] object-contain sm:max-h-12 sm:max-w-[150px]"
      />
    </li>
  );
}

export default function TrustedBy() {
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
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const reveal = shown ? "animate-reveal-blur" : "opacity-0";

  return (
    <section ref={ref} className="px-2 py-16">
      <div
        className={`${reveal} mx-auto w-full overflow-hidden sm:max-w-[768px] md:max-w-[768px] lg:max-w-[992px] xl:max-w-[1200px] 2xl:max-w-[1430px]`}
      >
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div className={reveal} style={{ animationDelay: "150ms" }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-200/70 px-3 py-1.5 text-sm text-gray-700">
              <span>●</span>
                Our clients
              </span>

            <h3 className="mt-5 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Trusted by Leading Brands
            </h3>
          </div>
        </div>

        {/* Auto-scrolling logos with faded edges */}
        <div
          className={`${reveal} mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:[mask-image:none]`}
          style={{ animationDelay: "450ms" }}
        >
          <ul className="animate-marquee flex w-max motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-4">
            {logos.map((l) => (
              <LogoCard key={l.src} {...l} />
            ))}
            {/* Duplicate set for a seamless loop */}
            {logos.map((l) => (
              <span key={`dup-${l.src}`} aria-hidden="true" className="contents motion-reduce:hidden">
                <LogoCard {...l} />
              </span>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}