"use client";
// components/PageLoader.tsx  -> layout.tsx mein body ke sabse upar <PageLoader /> lagao
// Sirf full page load pe dikhta hai (pehli visit / refresh). Page ke andar navigate karne pe nahi.
import { useEffect, useState } from "react";
import Image from "next/image";


const MIN_MS = 1400;

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const min = reduce ? 0 : MIN_MS;
    let raf = 0;
    let done = false;

    document.body.style.overflow = "hidden"; // loader ke dauran scroll band

    const finish = () => {
      if (done) return;
      done = true;
      setProgress(100);
      setLeaving(true);
      document.body.style.overflow = "";
      setTimeout(() => setGone(true), reduce ? 0 : 900);
    };

    // Time khatam hone ke baad bhi page load na hua ho to load event ka wait
    const ready = () => {
      if (document.readyState === "complete") finish();
      else window.addEventListener("load", finish, { once: true });
    };

    if (min === 0) {
      ready();
    } else {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / min, 1);
        setProgress(Math.round((1 - Math.pow(1 - p, 3)) * 100));
        if (p < 1) raf = requestAnimationFrame(tick);
        else ready();
      };
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", finish);
      document.body.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <>
      {/* JS band ho to loader hamesha ke liye na atke */}
      <noscript>
        <style>{`#page-loader{display:none!important}`}</style>
      </noscript>

      <div
        id="page-loader"
        role="status"
        aria-live="polite"
        aria-label="Loading"
        className={`fixed inset-0 z-[100] flex flex-col justify-between bg-surface p-6 text-charcoal-dark transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none sm:p-10 ${
          leaving ? "-translate-y-full rounded-b-[48px]" : "translate-y-0"
        }`}>
        {/* Top: logo */}
      <div className="flex items-center gap-3 text-muted">
        <Image src="/assets/all_logo/logo-on-light.svg" width={321} height={64} className="h-8 w-auto" style={{ width: "auto" }} alt="GlanceTechy" />
      </div>

        {/* Bottom: counter + progress */}
        <div>
          <div className="flex items-end justify-between">
            <p className="text-7xl font-light leading-none tracking-tight tabular-nums sm:text-9xl">
              {progress}
              <span className="text-4xl text-gray-400 sm:text-6xl">%</span>
            </p>
            <p className="hidden pb-2 text-sm text-gray-500 sm:block">Getting things ready</p>
          </div>
          <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-slate-300/60">
            <div
              className="h-full origin-left rounded-full bg-primary"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>
        </div>
      </div>
    </>
  );
}