// components/services/ServiceDetail.tsx  (own page for one service)
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Clock, MessageCircle, Users } from "lucide-react";
import {
  EnvelopeSimpleIcon,
  FileTextIcon,
  MagnifyingGlassIcon,
  MonitorIcon,
  ShareNetworkIcon,
  TargetIcon,
  ShoppingCartIcon,
  FigmaLogoIcon,
  SparkleIcon,
  ChartLineUpIcon,
  PuzzlePieceIcon
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import Cover from "@/components/blog/Cover";
import { services, type Service } from "@/lib/services";
import { serviceDetails } from "@/lib/service-details";
import { SITE } from "@/lib/site";
import ShareProjectButton from "../marketplace/ShareProjectButton";

const icons: Record<string, { icon: PhosphorIcon; style: string }> = {
  "website-design": { icon: MonitorIcon, style: "bg-violet-100 text-violet-600" },
  seo: { icon: MagnifyingGlassIcon, style: "bg-lime-100 text-gray-900" },
  "social-media": { icon: ShareNetworkIcon, style: "bg-indigo-100 text-indigo-600" },
  ppc: { icon: TargetIcon, style: "bg-sky-100 text-sky-600" },
  "email-marketing": { icon: EnvelopeSimpleIcon, style: "bg-violet-100 text-violet-600" },
  "content-writing": { icon: FileTextIcon, style: "bg-cyan-100 text-cyan-600" },
  "ecommerce-development": { icon: ShoppingCartIcon, style: "bg-emerald-100 text-emerald-600" },
  "figma-uiux-design": { icon: FigmaLogoIcon, style: "bg-pink-100 text-pink-600" },
  "geo-ai-search": { icon: SparkleIcon, style: "bg-amber-100 text-amber-700" },
  "performance-marketing": { icon: ChartLineUpIcon, style: "bg-orange-100 text-orange-600" },
  "wordpress-design-development": { icon: PuzzlePieceIcon, style: "bg-blue-100 text-blue-600" },
};

function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function ServiceDetail({ service }: { service: Service }) {
  const d = serviceDetails[service.slug];
  const { icon: Icon, style } = icons[service.slug];
  const others = services.filter((s) => s.slug !== service.slug);
  const pageUrl = `${SITE.url}/services/${service.slug}/`;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: d.seoDescription,
      url: pageUrl,
      serviceType: service.title,
      provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: d.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/services/` },
        { "@type": "ListItem", position: 3, name: service.title, item: pageUrl },
      ],
    },
  ];

  return (
    <main>
      {schema.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(item) }}
        />
      ))}

      {/* HERO */}
      <section className="p-2">
        <div className="rounded-[24px] bg-surface">
          <div className="mx-auto grid w-full max-w-[1430px] items-center gap-10 px-4 pb-14 pt-32 sm:pt-[160px] lg:grid-cols-2 lg:gap-14 lg:pb-20">
            <div data-reveal>
              <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
                <Link href="/" className="hover:text-ink">Home</Link>
                <span className="mx-2">/</span>
                <Link href="/services" className="hover:text-ink">Services</Link>
                <span className="mx-2">/</span>
                <span className="text-ink">{service.title}</span>
              </nav>
              <span className={`mt-6 flex h-14 w-14 items-center justify-center rounded-2xl ${style}`}>
                <Icon size={30} weight="duotone" />
              </span>
              <h1 className="mt-5 text-4xl font-light leading-[1.1] tracking-tight text-charcoal-dark sm:text-5xl lg:text-6xl">
                {service.title}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-600">{service.tagline}</p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <ShareProjectButton />
                <Link
                  href="/pricing"
                  className="inline-flex h-[56px] items-center gap-2 rounded-2xl bg-white px-6 text-sm font-medium text-night transition hover:bg-white/70"
                >
                  See pricing
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>

              <ul className="mt-8 flex flex-wrap gap-2 text-sm text-gray-700">
                <li className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5">
                  <Clock size={14} aria-hidden="true" /> {d.timeline}
                </li>
                <li className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5">
                  <MessageCircle size={14} aria-hidden="true" /> Free consultation
                </li>
              </ul>
            </div>
            <div data-reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Cover art={service.art} className="h-full w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW + WHAT'S INCLUDED */}
      <section className="px-2 py-14 lg:py-20">
        <div className="mx-auto grid w-full max-w-[1430px] gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div>
            <div data-reveal>
              <span className="inline-flex rounded-full bg-surface px-4 py-1.5 text-sm text-gray-700">Overview</span>
              <h2 className="mt-4 text-3xl font-light tracking-tight text-ink sm:text-4xl">
                What you get with {service.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-600">{service.description}</p>
              {d.intro.map((p) => (
                <p key={p} className="mt-4 leading-relaxed text-gray-600">{p}</p>
              ))}
            </div>

            {d.sections.map((sec) => (
              <div key={sec.title} data-reveal className="mt-12">
                <h2 className="text-2xl font-light tracking-tight text-ink sm:text-3xl">{sec.title}</h2>
                {sec.paras.map((p) => (
                  <p key={p} className="mt-4 leading-relaxed text-gray-600">{p}</p>
                ))}
              </div>
            ))}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div data-reveal className="rounded-[28px] bg-surface p-6 sm:p-8">
              <h3 className="text-lg font-medium text-ink">What&apos;s included</h3>
              <ul className="mt-5 space-y-3">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      <Check size={12} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl bg-white p-4 text-sm leading-relaxed text-gray-600">
                <span className="font-medium text-ink">Best for: </span>
                {service.bestFor}
              </div>
              <Link
                href="contact"
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-charcoal text-sm font-medium text-white transition hover:opacity-90"
              >
                Talk to us about this <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="px-2 pb-14 lg:pb-20">
        <div className="mx-auto w-full max-w-[1430px] rounded-[28px] bg-charcoal px-6 py-12 sm:px-12 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div data-reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/80">
                <Users size={14} aria-hidden="true" /> Who it&apos;s for
              </span>
              <h2 className="mt-4 text-3xl font-light tracking-tight text-white sm:text-4xl">
                Is this the right fit for you?
              </h2>
              <p className="mt-4 leading-relaxed text-white/70">
                If one of these sounds like you, we can probably help. If not, we will tell you honestly.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {d.whoFor.map((w) => (
                <li key={w} data-reveal className="flex items-start gap-3 rounded-2xl bg-white/[0.06] p-5 text-white/90">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-night">
                    <Check size={12} strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="text-sm leading-relaxed">{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="px-2 pb-14 lg:pb-20">
        <div className="mx-auto w-full max-w-[1430px]">
          <h2 data-reveal className="text-3xl font-light tracking-tight text-ink sm:text-4xl">Why it works</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {d.benefits.map((b, i) => (
              <div key={b.title} data-reveal className="rounded-3xl bg-surface p-7 transition duration-300 hover:-translate-y-1">
                <span className="text-sm font-medium text-gray-400">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-xl font-medium text-ink">{b.title}</h3>
                <p className="mt-3 leading-relaxed text-gray-600">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-surface px-2 py-14 lg:py-20">
        <div className="mx-auto w-full max-w-[1430px]">
          <h2 data-reveal className="text-center text-3xl font-light tracking-tight text-charcoal-dark sm:text-4xl">
            How it works
          </h2>
          <p data-reveal className="mx-auto mt-3 max-w-xl text-center text-gray-600">
            Four clear steps, and you approve each one before we move on.
          </p>
          <ol className="relative mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <span
              aria-hidden="true"
              className="absolute left-[12.5%] right-[12.5%] top-[42px] hidden border-t border-dashed border-gray-300 lg:block"
            />
            {d.steps.map((st, i) => (
              <li key={st.title} data-reveal className="relative rounded-3xl bg-white p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-night ring-4 ring-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-medium text-ink">{st.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{st.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-2 py-14 lg:py-20">
        <div className="mx-auto w-full max-w-[900px]">
          <h2 data-reveal className="text-center text-3xl font-light tracking-tight text-ink sm:text-4xl">
            Questions about {service.title}
          </h2>
          <div className="mt-10 space-y-3">
            {d.faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-surface p-5 open:bg-slate-50">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink">
                  {f.q}
                  <span className="text-xl text-gray-400 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 leading-relaxed text-gray-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* OTHER SERVICES */}
      <section className="px-2 pb-20">
        <div className="mx-auto w-full max-w-[1430px]">
          <h2 data-reveal className="text-2xl font-light tracking-tight text-ink sm:text-3xl">Other services</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => {
              const { icon: OIcon, style: ostyle } = icons[o.slug];
              return (
                <Link
                  key={o.slug}
                  href={`/services/${o.slug}`}
                  className="group flex items-center gap-3 rounded-2xl border border-surface p-4 transition hover:bg-surface"
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${ostyle}`}>
                    <OIcon size={22} weight="duotone" />
                  </span>
                  <span className="flex-1 text-sm font-medium text-ink">{o.title}</span>
                  <ArrowRight size={16} className="text-gray-400 transition group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
