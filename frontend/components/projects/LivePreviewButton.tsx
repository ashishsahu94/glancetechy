import Link from "next/link";

export default function LivePreviewButton({
  href,
  label = "Live Preview",
  tabIndex,
}: {
  href?: string | null;
  label?: string;
  tabIndex?: number;
}) {
  // Do not render the button if no URL is available
  if (!href) {
    return null;
  }

  const grow =
    "group-hover/btn:w-[calc(100%-8px)] group-focus-visible/btn:w-[calc(100%-8px)]";

  const show =
    "group-hover/btn:translate-x-0 group-hover/btn:opacity-100 group-focus-visible/btn:translate-x-0 group-focus-visible/btn:opacity-100";

  const hide =
    "group-hover/btn:translate-x-6 group-hover/btn:opacity-0 group-focus-visible/btn:translate-x-6 group-focus-visible/btn:opacity-0";

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={tabIndex}
      className="group/btn relative flex h-14 w-[195px] items-center overflow-hidden rounded-2xl bg-charcoal p-1 text-sm font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {/* Lime box */}
      <span
        aria-hidden="true"
        className={`absolute left-1 top-1 h-12 w-12 overflow-hidden rounded-[14px] bg-primary transition-[width] duration-500 ease-[cubic-bezier(.4,0,.2,1)] motion-reduce:transition-none ${grow}`}
      >
        <span
          className={`absolute inset-y-0 left-0 right-12 flex translate-x-3 items-center justify-center whitespace-nowrap text-night opacity-0 transition duration-500 motion-reduce:transition-none ${show}`}
        >
          {label}
        </span>

        <span className="absolute inset-y-0 right-0 flex w-12 items-center justify-center">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5 12H19M13 6L19 12L13 18"
              stroke="var(--color-night)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>

      {/* Normal text */}
      <span
        className={`pointer-events-none absolute inset-0 flex items-center justify-center pl-12 transition duration-500 motion-reduce:transition-none ${hide}`}
      >
        {label}
      </span>
    </Link>
  );
}