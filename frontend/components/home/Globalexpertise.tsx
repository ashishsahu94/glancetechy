import { Globe } from "lucide-react";

/**
 * "Global Expertise" badge: pill with a globe icon, two dashed orbits
 * with small dots that rotate slowly, and a soft pink block behind.
 * Use: <GlobalExpertise />  (change the label with the `label` prop)
 */
export default function GlobalExpertise({ label = "Global Expertise" }: { label?: string }) {
  return (
    <div className="relative inline-block h-[150px] w-[300px]" aria-label={label}>

      {/* orbits (decorative) */}
      <svg
        viewBox="0 0 300 150"
        className="absolute inset-0 h-full w-full overflow-visible"
        fill="none"
        aria-hidden="true"
      >
        <g className="origin-[75px_75px] animate-[spin_24s_linear_infinite] motion-reduce:animate-none">
          <circle cx="75" cy="75" r="58" stroke="#1f2937" strokeWidth="1" strokeDasharray="3 4" />
          <circle cx="20" cy="75" r="3" fill="#1f2937" />
          <circle cx="95" cy="21" r="2.5" fill="#1f2937" />
        </g>
        <g className="origin-[75px_75px] animate-[spin_36s_linear_infinite_reverse] motion-reduce:animate-none">
          <circle cx="75" cy="75" r="44" stroke="#1f2937" strokeWidth="1" strokeDasharray="3 4" />
          <circle cx="33" cy="75" r="2.5" fill="#1f2937" />
          <circle cx="104" cy="112" r="2.5" fill="#1f2937" />
        </g>
      </svg>

      {/* pill */}
      <div className="absolute left-[48px] top-1/2 flex -translate-y-1/2 items-center gap-3 rounded-2xl border border-gray-800 bg-white px-5 py-3.5 shadow-sm">
        <Globe size={24} className="text-lime-600" strokeWidth={2} aria-hidden="true" />
        <span className="whitespace-nowrap text-base font-medium text-gray-900">{label}</span>
      </div>
    </div>
  );
}