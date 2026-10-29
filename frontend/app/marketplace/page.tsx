import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { MagnifyingGlassIcon, NotePencilIcon, TargetIcon } from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import TrustedBy from "@/components/home/Trustedby";
import TrustedGlobe from "@/components/home/TrustedGlobe";
import ShareProjectButton from "@/components/marketplace/ShareProjectButton";
import ExploreTabs from "@/components/marketplace/ExploreTabs";

export const metadata: Metadata = {
  title: "Share Your Project and Get a Free Quote",
  description:
    "Tell GlanceTechy about your website, SEO or marketing project and get a personalised quote. Share your goals, budget and timeline in one simple form.",
  alternates: { canonical: "/marketplace/" },
};

const STEPS: { icon: PhosphorIcon; title: string; text: string }[] = [
  {
    icon: NotePencilIcon,
    title: "Share Your Project Details",
    text: "Briefly describe your project and goals. The more details you give, the better we can plan.",
  },
  {
    icon: MagnifyingGlassIcon,
    title: "We Review and Match",
    text: "Our team reviews your project and picks the right specialists for the work.",
  },
  {
    icon: TargetIcon,
    title: "Receive a Tailored Quote",
    text: "We contact you to discuss the plan and send a clear quote for your budget and timeline.",
  },
];

const CHIPS = ["Personalized Quotes", "Experienced Team", "Free Consultation"];

const WRAP = "mx-auto w-full sm:max-w-[768px] md:max-w-[768px] lg:max-w-[992px] xl:max-w-[1200px] 2xl:max-w-[1430px]";

export default function MarketplacePage() {
  return (
    <>
      {/* HERO */}
      <section className="px-2 pb-6 pt-28 lg:pt-36">
        <div className={`${WRAP} grid items-center gap-12 px-3 lg:grid-cols-[1fr_1fr]`}>
          <div>
            <h1 className="text-4xl font-light leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Share Your Project, Get a Perfect Match
            </h1>
            <p className="mt-6 max-w-[520px] text-base leading-relaxed text-gray-600 sm:text-lg">
              Tell us what you want to build or grow. We will review it and send you a free, personalised quote for your website, SEO or digital marketing project.
            </p>
            <div className="mt-8">
              <ShareProjectButton />
            </div>
          </div>

          {/* Illustration */}
          <div className="relative mx-auto h-[340px] w-full max-w-[520px]" aria-hidden="true">
            <div className="absolute right-[6%] top-[8%] h-[84%] w-[62%] rounded-3xl bg-sky-100" />
            <div className="animate-float absolute left-[12%] top-[26%] w-[66%] rounded-2xl bg-white p-4 shadow-2xl shadow-slate-300/60">
              <p className="text-xs font-medium text-gray-500">Your project</p>
              <p className="mt-1 text-lg font-semibold text-ink">New website + SEO</p>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                {["Goals and audience", "Budget and timeline", "Pages and features"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-lime-500 text-[9px] text-white">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-4 rounded-lg bg-primary/20 px-3 py-2 text-xs font-medium text-primary-dark">Quote ready in 1 to 2 days</div>
            </div>

            {CHIPS.map((c, i) => (
              <span
                key={c}
                className={`absolute flex items-center gap-2 rounded-xl border border-slate-700 bg-white px-3.5 py-2 text-xs font-medium text-ink shadow-sm ${
                  ["left-[2%] top-[6%]", "right-0 top-[20%]", "left-[0%] bottom-[8%]"][i]
                }`}
              >
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-lime-500 text-[9px] text-white">✓</span>
                {c}
              </span>
            ))}
            <span className="absolute right-[2%] top-[2%] h-3 w-10 text-amber-400">
              <svg viewBox="0 0 40 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 8c4-8 8-8 12 0s8 8 12 0 8-8 12 0" />
              </svg>
            </span>
            <span className="absolute bottom-[14%] right-[6%] h-6 w-6 rounded-full border-[3px] border-amber-400" />
          </div>
        </div>
      </section>

      <TrustedBy />

      {/* HOW IT WORKS */}
      <section className="px-2 py-16">
        <div className={WRAP}>
          <div className="mx-auto mb-12 max-w-[640px] text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-200/70 px-3 py-1.5 text-sm text-gray-700">
              <BookOpen size={15} />
              How It Works
            </span>
            <h2 className="mt-5 text-3xl font-light tracking-tight text-ink lg:text-5xl">How Sharing Your Project Works</h2>
            <p className="mt-4 text-base text-gray-600">Tell us about your project and get a quote in 3 easy steps.</p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="rounded-3xl bg-[#fff6e5] p-7">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-ink shadow-sm">
                  <Icon size={30} weight="duotone" />
                </span>
                <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-amber-600">Step {i + 1}</p>
                <h3 className="mt-1 text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE */}
      <section className="px-2 py-12">
        <div className={WRAP}>
          <div className="mx-auto mb-10 max-w-[640px] text-center">
            <h2 className="text-3xl font-light tracking-tight text-ink lg:text-5xl">Explore Our Services and Locations</h2>
            <p className="mt-4 text-base text-gray-600">Browse what we do by service, or find the page for your country, state or city.</p>
          </div>
          <ExploreTabs />
        </div>
      </section>

      <TrustedGlobe />

    </>
  );
}
