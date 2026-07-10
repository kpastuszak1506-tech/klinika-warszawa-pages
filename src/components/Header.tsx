import Link from "next/link";
import { navItems } from "@/lib/siteContent";
import { CTAButton } from "./CTAButton";

function BrandMark() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex size-10 items-center justify-center rounded-lg border border-medical-green/30 bg-white text-medical-green shadow-sm"
    >
      <svg
        className="size-6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M12 4v16" />
        <path d="M4 12h16" />
      </svg>
    </span>
  );
}

export function Header() {
  return (
    <header className="sticky top-3 z-40 px-3">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 rounded-2xl border border-white/80 bg-white/85 px-4 py-4 shadow-[0_18px_60px_rgba(15,39,72,0.10)] backdrop-blur-xl md:flex-row md:items-center md:justify-between md:rounded-full md:px-5">
        <Link
          className="flex items-center gap-3 text-navy-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-medical-green"
          href="/"
        >
          <BrandMark />
          <span>
            <span className="block text-sm font-bold">
              KLINIKA WARSZAWA
            </span>
            <span className="block text-xs font-semibold uppercase text-slate-500">
              Gabinety lekarskie
            </span>
          </span>
        </Link>
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <nav aria-label="Główna nawigacja">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-navy-800 md:gap-x-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    className="rounded-sm transition duration-300 hover:text-medical-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-medical-green"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <CTAButton className="md:min-h-10 md:px-4 md:py-2" href="/kontakt">
            Umów konsultację
          </CTAButton>
        </div>
      </div>
    </header>
  );
}
