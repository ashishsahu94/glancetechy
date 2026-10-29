"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

const POINTS = [
  { text: "Global Reach", pos: "left-[3%] top-[34%]", delay: 500 },
  { text: "Niche Expertise", pos: "left-[57.5%] top-[9%]", delay: 700 },
  { text: "Data Privacy", pos: "left-[71.5%] top-[68%]", delay: 900 },
];

// Orbit lines (fixed). Dots and avatars travel along them.
// `at` = start angle on the line, `dur` = seconds for one lap, `rev` = other direction.
const ORBITS = [
  { rx: 318, ry: 118, rot: 27, dots: [{ at: 150, r: 6.5, dur: 46 }, { at: 330, r: 3.5, dur: 58, rev: true }] },
  { rx: 312, ry: 128, rot: -24, dots: [{ at: 40, r: 6, dur: 52, rev: true }, { at: 215, r: 3.5, dur: 60 }] },
  { rx: 262, ry: 150, rot: 64, dots: [{ at: 300, r: 3.5, dur: 50 }, { at: 120, r: 5.5, dur: 64, rev: true }] },
  { rx: 290, ry: 80, rot: -6, dots: [{ at: 20, r: 3.5, dur: 56 }, { at: 200, r: 3.5, dur: 48, rev: true }] },
];

/**
 * Avatars that ride on the orbit lines.
 * Put your own photos in  public/assets/avatars/  (square, 200x200 or bigger, .webp/.jpg/.png)
 * and change `src` below. An avatar shows up only after its photo exists, so with no photos
 * the globe looks like the plain reference design.
 */
const AVATARS = [
  { src: "/assets/avatars/user-1.webp", name: "Client", r: 30, orbit: 0, at: 256, dur: 300, rev: false, skin: "#f2c5a0", hair: "#4a2c1a", bg: "#fcc419" },
  { src: "/assets/avatars/user-2.webp", name: "Client", r: 42, orbit: 1, at: 287, dur: 360, rev: true, skin: "#8d5a3c", hair: "#1c1410", bg: "#ff8fa3" },
  { src: "/assets/avatars/user-3.webp", name: "Client", r: 38, orbit: 2, at: 232, dur: 330, rev: false, skin: "#f0c09a", hair: "#2a1a10", bg: "#e9edf2" },
];

// Lucknow (lon, lat): the small pink pin on the globe
const HOME: [number, number] = [80.95, 26.85];

const ellipsePath = (rx: number, ry: number) =>
  `M${450 + rx} 250A${rx} ${ry} 0 1 1 ${450 - rx} 250A${rx} ${ry} 0 1 1 ${450 + rx} 250Z`;

/** Round avatar drawn in SVG: illustration underneath, your photo on top. */
function OrbitAvatar({ av, id, photo }: { av: (typeof AVATARS)[number]; id: string; photo: boolean }) {
  const k = (av.r * 2) / 64;
  return (
    <>
      <clipPath id={id}>
        <circle r={av.r} />
      </clipPath>
      <g clipPath={`url(#${id})`}>
        <circle r={av.r} fill={av.bg} />
        <g transform={`scale(${k}) translate(-32 -32)`}>
          <path d="M8 64c2-16 14-22 24-22s22 6 24 22z" fill="#1f2a44" />
          <rect x="27" y="36" width="10" height="9" rx="4" fill={av.skin} />
          <ellipse cx="32" cy="27" rx="12" ry="14" fill={av.skin} />
          <path d="M19 25c0-12 8-16 14-16s13 5 12 16c-4-5-8-7-13-7s-9 2-13 7z" fill={av.hair} />
        </g>
        {photo && <image href={av.src} x={-av.r} y={-av.r} width={av.r * 2} height={av.r * 2} preserveAspectRatio="xMidYMid slice" />}
      </g>
      <circle r={av.r} fill="none" stroke="#1f1f2e" strokeWidth="1.5" />
    </>
  );
}

/** Real rotating 3D globe (d3-geo orthographic on a canvas). Loaded lazily. */
function SpinningGlobe() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = wrap.current;
    const cv = canvas.current;
    if (!box || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let dead = false;
    let raf = 0;
    let visible = false;
    let size = 0;
    let last = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let lambda = -(HOME[0] - 22); // start with India slightly right of centre
    let phi = -18;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cleanup = () => {};

    Promise.all([import("d3-geo"), import("@/lib/land-110m.json")]).then(([d3, landMod]) => {
      if (dead) return;
      const land = (landMod as { default: unknown }).default as never;
      const projection = d3.geoOrthographic().clipAngle(90).precision(0.4);
      const path = d3.geoPath(projection, ctx);
      const sphere = { type: "Sphere" } as never;

      const fit = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        size = box.clientWidth;
        if (size < 8) return; // hidden or not laid out yet: nothing to draw
        cv.width = Math.round(size * dpr);
        cv.height = Math.round(size * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        projection.translate([size / 2, size / 2]).scale(size / 2 - 2);
        draw(performance.now());
      };

      function draw(now: number) {
        if (size < 8) return;
        const r = size / 2 - 2;
        projection.rotate([lambda, phi]);
        ctx!.clearRect(0, 0, size, size);

        // ocean
        ctx!.beginPath();
        path(sphere);
        ctx!.fillStyle = "#9bb5ff";
        ctx!.fill();

        // land
        ctx!.beginPath();
        path(land);
        ctx!.fillStyle = "#ffffff";
        ctx!.fill();

        // Lucknow pin with a pulsing ring (only when it faces us)
        const facing = d3.geoDistance(HOME, [-lambda, -phi]) < Math.PI / 2 - 0.08;
        const p = facing ? projection(HOME) : null;
        if (p) {
          const t = (now % 2000) / 2000;
          ctx!.beginPath();
          ctx!.arc(p[0], p[1], 4 + t * 16, 0, Math.PI * 2);
          ctx!.strokeStyle = `rgba(236,26,116,${0.55 * (1 - t)})`;
          ctx!.lineWidth = 2;
          ctx!.stroke();
          ctx!.beginPath();
          ctx!.arc(p[0], p[1], 4.5, 0, Math.PI * 2);
          ctx!.fillStyle = "#ec1a74";
          ctx!.fill();
          ctx!.lineWidth = 1.5;
          ctx!.strokeStyle = "#fff";
          ctx!.stroke();
        }
      }

      const tick = (now: number) => {
        raf = 0;
        if (dead || !visible) return;
        const dt = Math.min(now - last, 64);
        last = now;
        if (!dragging && !reduce) lambda += dt * 0.0085; // about 8.5 degrees per second
        draw(now);
        raf = requestAnimationFrame(tick);
      };
      const start = () => {
        if (!raf && visible && !reduce) {
          last = performance.now();
          raf = requestAnimationFrame(tick);
        }
      };

      fit();
      const ro = new ResizeObserver(fit);
      ro.observe(box);
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible) start();
      });
      io.observe(box);

      // drag to rotate
      const down = (e: PointerEvent) => {
        dragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
        cv.setPointerCapture(e.pointerId);
        cv.style.cursor = "grabbing";
      };
      const move = (e: PointerEvent) => {
        if (!dragging) return;
        lambda += (e.clientX - lastX) * 0.35;
        phi = Math.max(-50, Math.min(50, phi - (e.clientY - lastY) * 0.35));
        lastX = e.clientX;
        lastY = e.clientY;
        if (reduce) draw(performance.now());
      };
      const up = () => {
        dragging = false;
        cv.style.cursor = "grab";
      };
      cv.addEventListener("pointerdown", down);
      cv.addEventListener("pointermove", move);
      cv.addEventListener("pointerup", up);
      cv.addEventListener("pointercancel", up);

      cleanup = () => {
        ro.disconnect();
        io.disconnect();
        cv.removeEventListener("pointerdown", down);
        cv.removeEventListener("pointermove", move);
        cv.removeEventListener("pointerup", up);
        cv.removeEventListener("pointercancel", up);
      };
    });

    return () => {
      dead = true;
      if (raf) cancelAnimationFrame(raf);
      cleanup();
    };
  }, []);

  return (
    <div
      ref={wrap}
      className="absolute left-[26.1%] top-[7.4%] aspect-square w-[47.8%] rounded-full"
    >
      <canvas ref={canvas} className="h-full w-full cursor-grab rounded-full [touch-action:pan-y]" role="img" aria-label="Rotating globe showing our global reach" />
    </div>
  );
}

export default function TrustedGlobe() {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const [reduce, setReduce] = useState(false);
  // a photo is shown only after it loaded; until then the illustration stays
  const [photos, setPhotos] = useState<boolean[]>(AVATARS.map(() => false));

  useEffect(() => {
    AVATARS.forEach((av, i) => {
      const img = new window.Image();
      img.onload = () => setPhotos((p) => p.map((v, j) => (j === i ? true : v)));
      img.src = av.src;
    });
  }, []);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

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

  const reveal = (d: number) => ({ animationDelay: `${d}ms` });

  return (
    <section ref={ref} className="px-2 py-12">
      <div className="relative mx-auto w-full overflow-hidden rounded-3xl bg-[#eaf0ff] px-4 pb-24 pt-12 sm:max-w-[768px] sm:px-8 md:max-w-[768px] lg:max-w-[992px] xl:max-w-[1200px] 2xl:max-w-[1430px]">
        <div className={`${shown ? "animate-reveal" : "opacity-0"} relative mx-auto max-w-[720px] text-center`}>
          <h2 className="text-2xl font-medium tracking-tight text-ink sm:text-3xl">Trusted by Brands Since 2022</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
            We build websites and run SEO and marketing for businesses across India and beyond.
            Clear communication, quality work and results you can measure. That is how we keep clients for the long run.
          </p>
        </div>

        <div className="relative mx-auto mt-14 aspect-[900/470] w-full max-w-[900px]">
          <SpinningGlobe />

          {/* Orbits: lines stay fixed, dots and avatars travel along them */}
          <svg viewBox="0 0 900 470" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" fill="none" aria-hidden="true">
            {ORBITS.map((o, oi) => {
              const d = ellipsePath(o.rx, o.ry);
              return (
                <g key={oi} transform={`rotate(${o.rot} 450 250)`}>
                  <path d={d} stroke="#23233a" strokeOpacity=".9" strokeWidth="1" />

                  {o.dots.map((dot, i) => {
                    const a = (dot.at * Math.PI) / 180;
                    const x = 450 + o.rx * Math.cos(a);
                    const y = 250 + o.ry * Math.sin(a);
                    return (
                      <circle key={i} cx={reduce ? x : 0} cy={reduce ? y : 0} r={dot.r} fill="#ec1a74">
                        {!reduce && (
                          <animateMotion dur={`${dot.dur}s`} begin={`${-(dot.rev ? 1 - dot.at / 360 : dot.at / 360) * dot.dur}s`} repeatCount="indefinite" keyPoints={dot.rev ? "1;0" : "0;1"} keyTimes="0;1" calcMode="linear" path={d} />
                        )}
                      </circle>
                    );
                  })}

                  {AVATARS.map((av, ai) => {
                    if (av.orbit !== oi || !photos[ai]) return null;
                    const a = (av.at * Math.PI) / 180;
                    const x = 450 + o.rx * Math.cos(a);
                    const y = 250 + o.ry * Math.sin(a);
                    return (
                      <g key={ai} transform={reduce ? `translate(${x} ${y})` : undefined}>
                        {!reduce && (
                          <animateMotion dur={`${av.dur}s`} begin={`${-(av.rev ? 1 - av.at / 360 : av.at / 360) * av.dur}s`} repeatCount="indefinite" keyPoints={av.rev ? "1;0" : "0;1"} keyTimes="0;1" calcMode="linear" path={d} />
                        )}
                        {/* keep the face upright inside the tilted orbit */}
                        <g transform={`rotate(${-o.rot})`}>
                          <OrbitAvatar av={av} id={`av-${ai}`} photo />
                        </g>
                      </g>
                    );
                  })}
                </g>
              );
            })}
          </svg>

          {/* Labels (tablet and up) */}
          {POINTS.map(({ text, pos, delay }) => (
            <div
              key={text}
              style={reveal(delay)}
              className={`${shown ? "animate-reveal" : "opacity-0"} absolute hidden items-center gap-2.5 rounded-[20px] border border-slate-700 bg-white px-5 py-3.5 text-[13px] font-medium text-gray-800 md:flex lg:text-[16px] ${pos}`}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lime-500 text-white">
                <Check size={13} strokeWidth={3} aria-hidden="true" />
              </span>
              <span className="whitespace-nowrap">{text}</span>
            </div>
          ))}
        </div>

        {/* Labels (mobile) */}
        <ul className="relative mx-auto mt-14 grid max-w-[420px] gap-3 md:hidden">
          {POINTS.map(({ text }) => (
            <li key={text} className="flex items-center gap-2.5 rounded-2xl border border-slate-800 bg-white px-4 py-3 text-sm text-gray-800">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime-500 text-white">
                <Check size={13} strokeWidth={3} aria-hidden="true" />
              </span>
              {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}