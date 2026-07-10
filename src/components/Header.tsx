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

function NavigationLinks({ mobile = false }: { mobile?: boolean }) {
  return (
    <nav aria-label="Główna nawigacja">
      <ul
        className={[
          "text-sm font-medium text-navy-800",
          mobile ? "grid gap-1" : "flex items-center gap-6",
        ].join(" ")}
      >
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              className={[
                "block rounded-sm transition duration-300 hover:text-medical-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-medical-green",
                mobile ? "px-3 py-3 hover:bg-medical-green-soft" : "",
              ].join(" ")}
              href={item.href}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Header() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Przejdź do treści
      </a>
      <header className="sticky top-3 z-40 px-3">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-2 rounded-lg border border-white/80 bg-white/88 px-4 py-3 shadow-[0_18px_60px_rgba(15,39,72,0.10)] backdrop-blur-xl sm:gap-4 lg:px-5">
        <Link
          className="flex min-w-0 items-center gap-3 text-navy-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-medical-green"
          href="/"
        >
          <BrandMark />
          <span className="min-w-0">
            <span className="block truncate text-xs font-bold sm:text-sm">
              KLINIKA WARSZAWA
            </span>
            <span className="hidden text-xs font-semibold uppercase text-slate-500 sm:block">
              Gabinety lekarskie
            </span>
          </span>
        </Link>
        <div className="hidden items-center gap-7 lg:flex">
          <NavigationLinks />
          <CTAButton className="md:min-h-10 md:px-4 md:py-2" href="/kontakt">
            Umów konsultację
          </CTAButton>
        </div>

        <details className="group shrink-0 lg:hidden">
          <summary
            aria-label="Otwórz menu"
            className="flex size-10 list-none items-center justify-center rounded-md border border-slate-200 text-navy-900 marker:hidden transition hover:border-medical-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-green [&::-webkit-details-marker]:hidden"
            title="Menu"
          >
            <span className="sr-only">Menu</span>
            <svg
              aria-hidden="true"
              className="size-4 transition group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          </summary>
          <div className="absolute left-0 right-0 top-[calc(100%+0.65rem)] rounded-lg border border-slate-200 bg-white p-3 shadow-[0_24px_70px_rgba(15,39,72,0.16)]">
            <NavigationLinks mobile />
            <CTAButton className="mt-3 w-full" href="/kontakt">
              Umów konsultację
            </CTAButton>
          </div>
        </details>
      </div>
      </header>
    </>
  );
}
