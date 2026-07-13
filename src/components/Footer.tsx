"use client";

import Link from "next/link";
import { displayCompanyData, isPublicDataVerified } from "@/config/companyConfig";
import { cookieSettingsEvent } from "./CookieConsent";
import { footerNavItems, legalNavItems } from "@/lib/siteContent";

function RegistryLine({
  data,
}: {
  data: NonNullable<typeof displayCompanyData>;
}) {
  return (
    <>
      {data.companyName}, {data.legalForm}, {data.registeredOfficeAddress}. NIP: {data.nip},
      {" "}REGON: {data.regon}, REGON zakładu leczniczego: {data.medicalRegon}, RPWDL:
      {" "}{data.rpwdlNumber}.
    </>
  );
}

export function Footer() {
  const contactData = displayCompanyData;
  const isDemoData = Boolean(contactData && !isPublicDataVerified);

  return (
    <footer className="site-footer" id="footer">
      <div className="site-footer__top">
        <div className="site-footer__brand">
          <div className="footer-wordmark">
            <span>
              <strong>Konsultacje lekarskie</strong>
              <small>Warszawa</small>
            </span>
          </div>
          <p>Stacjonarne konsultacje lekarskie w Warszawie.</p>
          {contactData ? (
            <Link className="footer-primary-link" href="/kontakt">
              Kontakt i rezerwacja <span aria-hidden="true">→</span>
            </Link>
          ) : null}
        </div>

        {contactData ? (
          <div className="site-footer__column site-footer__contact">
            <h2>
              Kontakt
              {isDemoData ? (
                <span className="footer-demo-badge">Dane demonstracyjne</span>
              ) : null}
            </h2>
            <address>
              <span>{contactData.medicalOfficeAddress}</span>
              <a href={`tel:${contactData.phone.replace(/[^+\d]/g, "")}`}>
                {contactData.phone}
              </a>
              <a href={`mailto:${contactData.email}`}>{contactData.email}</a>
            </address>
          </div>
        ) : null}

        <div className="site-footer__column">
          <h2>Przejdź dalej</h2>
          <ul>
            {footerNavItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__column">
          <h2>Informacje prawne</h2>
          <ul>
            {legalNavItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <button
            className="footer-cookie-button"
            onClick={() => window.dispatchEvent(new Event(cookieSettingsEvent))}
            type="button"
          >
            Ustawienia cookies
          </button>
        </div>
      </div>

      <div className="site-footer__bottom">
        <p className={isDemoData ? "footer-registry footer-registry--demo" : "footer-registry"}>
          {contactData ? (
            <RegistryLine data={contactData} />
          ) : (
            "Dane kontaktowe zostaną opublikowane przed uruchomieniem placówki."
          )}
        </p>
        <span>Informacja organizacyjna · Warszawa</span>
      </div>
    </footer>
  );
}
