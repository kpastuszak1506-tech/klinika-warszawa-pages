import Link from "next/link";
import { companyConfig } from "@/config/companyConfig";
import { footerNavItems, legalNavItems } from "@/lib/siteContent";

const phoneHref = `tel:${companyConfig.phone.replace(/[^+\d]/g, "")}`;

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <p className="text-sm font-bold text-navy-950">
            KLINIKA WARSZAWA
          </p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
            Stacjonarne konsultacje lekarskie w Warszawie w zakresie oceny
            wskazań do terapii kannabinoidowej.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-navy-950">Kontakt</h2>
          <address className="mt-3 not-italic text-sm leading-6 text-slate-600">
            <span className="block">{companyConfig.medicalOfficeAddress}</span>
            <a
              className="block rounded-sm hover:text-medical-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-green"
              href={phoneHref}
            >
              {companyConfig.phone}
            </a>
            <a
              className="block rounded-sm hover:text-medical-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-green"
              href={`mailto:${companyConfig.email}`}
            >
              {companyConfig.email}
            </a>
          </address>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-navy-950">Strony</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {footerNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="rounded-sm hover:text-medical-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-green"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-navy-950">
            Informacje prawne
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {legalNavItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="rounded-sm hover:text-medical-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-green"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 bg-slate-50">
        <p className="mx-auto max-w-7xl px-5 py-5 text-xs leading-6 text-slate-600">
          {companyConfig.companyName}, {companyConfig.legalForm},{" "}
          {companyConfig.registeredOfficeAddress}. NIP: {companyConfig.nip},
          REGON: {companyConfig.regon}, RPWDL: {companyConfig.rpwdlNumber}.
        </p>
      </div>
    </footer>
  );
}
