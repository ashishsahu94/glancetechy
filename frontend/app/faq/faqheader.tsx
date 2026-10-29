"use client";
import { useEffect, useRef, useState } from "react";

export default function FAQHEADER({ asH1 = false }: { asH1?: boolean }) {
    const Heading = asH1 ? "h1" : "h2";
    const ref = useRef<HTMLElement>(null);
    const [shown, setShown] = useState(false);
    const [cat, setCat] = useState(0);
    const [open, setOpen] = useState<number | null>(0);

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
        { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
    }, []);

    const reveal = shown ? "animate-reveal" : "opacity-0";

    return (
        <section ref={ref}>
            <div className={`text-center ${reveal}`}>
                <span className="inline-flex items-center gap-2 rounded-full bg-white py-1 pl-1 pr-4 text-sm text-gray-700">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold">?</span>
                FAQ
                </span>
                <Heading className="mx-auto mt-5 max-w-xl text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.15] tracking-tight text-charcoal-dark">
                We have the{" "}
                <span
                    className={`inline-block rounded-2xl bg-gradient-to-r from-primary to-primary bg-no-repeat px-4 pb-1 text-white transition-[background-size] duration-1000 ease-out motion-reduce:transition-none ${
                    shown ? "bg-[length:100%_100%]" : "bg-[length:0%_100%]"
                    }`}
                    style={{ transitionDelay: "500ms" }}
                >
                    answers
                </span>
                </Heading>
                <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-gray-600">
                Simple plans for founders and teams. No hidden fees, no long contracts. Ask us anything before you start.
                </p>
            </div>
        </section>
    );
}