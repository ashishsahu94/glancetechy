import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { MagnifyingGlassIcon, NotePencilIcon, TargetIcon } from "@phosphor-icons/react/dist/ssr";
import { services } from "@/lib/services";

const WRAP = "mx-auto w-full max-w-[1430px]";

/* ------------------------------------------------------------------
   Every service on its own line: "{Service} in {City}"
------------------------------------------------------------------ */
export function CityServiceList({ city }: { city: string }) {
  return (
    <section className="px-2">
      <div className={`${WRAP} py-16`}>
        <h2 className="text-2xl font-semibold tracking-tight text-navy md:text-4xl">
          Best Digital Marketing Services in {city}
        </h2>

        <div className="mt-10 grid gap-10 lg:grid-cols-[270px_1fr]">
          <div className="h-fit rounded-xl border border-slate-200 bg-[#fafafa] p-6">
            <p className="text-2xl font-semibold leading-snug text-navy md:text-[28px]">
              Discover the top-notch digital marketing services in <span className="text-amber-500">{city}</span> by browsing through our wide range of services
            </p>
            <Link href="/services" title="All services" aria-label="View all services" className="mt-6 inline-flex text-amber-500 transition hover:translate-x-1">
              <ArrowRight size={28} />
            </Link>
          </div>

          <ul className="grid content-start gap-x-10 sm:grid-cols-2">
            {services.map((s) => (
              <li key={s.slug} className="border-b border-slate-200">
                <Link
                  href={`/services/${s.slug}/`}
                  title={`${s.title} in ${city}`}
                  className="block py-3 text-[15px] text-gray-800 transition hover:text-navy hover:underline"
                >
                  {s.title} in {city}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Our values
------------------------------------------------------------------ */
const VALUES = [
  {
    icon: NotePencilIcon,
    title: "Transparency",
    text: "You see what we do and why. Clear scope, honest pricing and regular updates, so there are no surprises on the way.",
  },
  {
    icon: MagnifyingGlassIcon,
    title: "Quality Work",
    text: "We build fast, clean websites and run campaigns we can measure. Every project is reviewed before it goes live.",
  },
  {
    icon: TargetIcon,
    title: "Focus on Results",
    text: "We start from your goals, whether that is more enquiries, more sales or better rankings, and shape the plan around them.",
  },
];

export function CityValues() {
  return (
    <section className="px-2">
      <div className={`${WRAP} py-12`}>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-navy md:text-4xl">Our Values: Quality and Trust</h2>
          <p className="text-sm text-gray-600">See the standards we hold ourselves to.</p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {VALUES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl bg-[#fff6e5] p-6">
              <Icon size={38} weight="duotone" className="text-ink" />
              <h3 className="mt-5 text-lg font-medium text-ink">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   FAQ (works without JavaScript, plus FAQPage structured data)
------------------------------------------------------------------ */
function faqs(city: string, state: string) {
  const list = services.map((s) => s.title).join(", ");
  return [
    {
      q: "What is a digital marketing agency?",
      a: "A digital marketing agency plans and runs your online growth: your website, search engine optimisation (SEO), paid ads, social media, email and content. Instead of hiring several people, you get a team that works on all of it together.",
    },
    {
      q: `Digital marketing agency vs freelancer in ${city}: which is right for you?`,
      a: "A freelancer can be a good fit for one small, clear task. An agency suits you when you need several skills together, such as design, development, SEO and ads, along with a process, backup if someone is away, and one point of contact. If your needs are growing, an agency is usually the safer choice.",
    },
    {
      q: `What services do digital marketing agencies in ${city} offer?`,
      a: `Common services are ${list}. At GlanceTechy you can pick one service or combine several.`,
    },
    {
      q: "Do you need comprehensive services or basic solutions from an agency?",
      a: "It depends on your stage. A new business often starts with a good website and basic SEO. A growing business usually adds paid ads, content and email. We can start small and add services as your results grow, so you only pay for what you need.",
    },
    {
      q: `What is the cost of hiring a digital marketing agency in ${city}?`,
      a: `Cost depends on the services, the size of your project and how long we work together. A simple website costs far less than a full SEO and advertising plan. Share your goals and budget on our contact page and we will send a clear quote. You can also see our plans on the pricing page.`,
    },
    {
      q: `Why should you hire a digital marketing agency in ${city}?`,
      a: `Competition in ${city}, ${state} is online as much as it is on the street. A good agency helps customers find you on Google, makes your website easy to use and turns visitors into enquiries, while you focus on running the business.`,
    },
    {
      q: `How does GlanceTechy work with businesses in ${city}?`,
      a: `GlanceTechy is based in Lucknow, India, and works with clients in ${city} online. We use calls, email and WhatsApp, agree meeting times that suit your time zone, and share progress regularly, so working remotely feels like working with a local team.`,
    },
  ];
}

export function CityFaq({ city, state }: { city: string; state: string }) {
  const items = faqs(city, state);
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };

  return (
    <section className="px-2">
      <div className={`${WRAP} py-12`}>
        <h2 className="max-w-[900px] text-2xl font-semibold tracking-tight text-navy md:text-4xl">
          Questions to Help You Choose the Best Digital Marketing Agency in {city}
        </h2>

        <div className="mt-8 space-y-3">
          {items.map(({ q, a }) => (
            <details key={q} className="group rounded-lg bg-[#f4f4f5]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[15px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {q}
                <Plus size={20} aria-hidden="true" className="shrink-0 text-pink-500 transition-transform duration-200 group-open:rotate-45" />
              </summary>
              <p className="px-6 pb-5 text-sm leading-relaxed text-gray-600">{a}</p>
            </details>
          ))}
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </div>
    </section>
  );
}
