



// components/Services.tsx
// npm i @phosphor-icons/react lucide-react
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  EnvelopeSimpleIcon,
  FileTextIcon,
  MagnifyingGlassIcon,
  MonitorIcon,
  ShareNetworkIcon,
  TargetIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

type Service = {
  icon: PhosphorIcon;
  iconStyle: string;
  title: string;
  text: string;
  href: string;
};

const services: Service[] = [
  {
    icon: MonitorIcon,
    iconStyle: "bg-violet-100 text-violet-600",
    title: "Website Design & Development",
    text: "We create modern, responsive, and high-performance websites that combine great design with seamless functionality to deliver better user experiences and support business growth. ",
    href: "/services/website-design",
  },
  {
    icon: MagnifyingGlassIcon,
    iconStyle: "bg-lime-100 text-gray-900",
    title: "Search Engine Optimization (SEO) ",
    text: "We improve your website’s search visibility, attract relevant organic traffic, and help your business reach more potential customers through effective SEO strategies.",
    href: "/services/seo",
  },
  {
    icon: ShareNetworkIcon,
    iconStyle: "bg-indigo-100 text-indigo-600",
    title: "Social Media Marketing",
    text: "We help you build brand awareness, engage your target audience, and grow your online community through strategic social media marketing.",
    href: "/services/social-media",
  },
  {
    icon: TargetIcon,
    iconStyle: "bg-sky-100 text-sky-600",
    title: "Pay Per Click (PPC)",
    text: "We create targeted PPC campaigns that drive quality traffic, generate leads, and help your business achieve better results while maximizing your advertising budget.",
    href: "/services/ppc",
  },
  {
    icon: EnvelopeSimpleIcon,
    iconStyle: "bg-violet-100 text-violet-600",
    title: "Email Marketing Campaigns",
    text: "Create personalized, targeted email campaigns that turn new subscribers into repeat customers. Use powerful automation and analytics.",
    href: "/services/email-marketing",
  },
  {
    icon: FileTextIcon,
    iconStyle: "bg-cyan-100 text-cyan-600",
    title: "Content Writing & Copywriting",
    text: "SEO-driven content crafted to rank higher and attract organic traffic.",
    href: "/services/content-writing",
  },
];

export default function Services() {
  return (
    <section id="services" className="">
      <div className="mx-auto grid w-full max-w-[1430px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ icon: Icon, iconStyle, title, text, href }) => (
          <Link
            key={title}
            href={href}
            title={title}
            className="group flex min-h-[170px] flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 motion-reduce:transition-none"
          >
            <div className="flex items-start justify-between">
              <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${iconStyle}`}>
                <Icon size={24} weight="duotone" />
              </span>
              <ArrowRight
                size={16}
                className="text-gray-500 transition duration-300 group-hover:translate-x-1 group-hover:text-gray-900 motion-reduce:transition-none"
              />
            </div>

            <h4 className="mt-5 text-[20px] font-bold text-ink">{title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">{text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}