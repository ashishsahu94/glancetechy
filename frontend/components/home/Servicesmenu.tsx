const services = [
  { label: "SEO", dot: "bg-emerald-400", ring: "bg-emerald-100" },
  { label: "Social Media", dot: "bg-sky-500", ring: "bg-sky-100" },
  { label: "PPC", dot: "bg-orange-400", ring: "bg-orange-100" },
  { label: "Email Marketing", dot: "bg-rose-500", ring: "bg-rose-100" },
];

export default function Servicesmenu() {
  return (
    <div className="group w-56 inline-block absolute bottom-0 right-0 animate-float">
      <ul className="top-full z-10 mt-2 rounded-2xl border border-gray-100 bg-white p-3 shadow-lg transition  ease-out">
        {services.map(({ label, dot, ring }, i) => (
          <li key={label} style={{ transitionDelay: `${i * 50}ms` }} className="transition duration-200   motion-reduce:transition-none">
            <a href="#" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-800 transition hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gray-900">
              <span className={`flex h-4 w-4 items-center justify-center rounded-full ${ring}`}>
                <span className={`h-2 w-2 rounded-full ${dot} transition-transform duration-200 group-hover:scale-110`} />
              </span>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}