"use client";

import Link from "next/link";
import { companyConfig } from "@/config/companyConfig";
import { cookieSettingsEvent } from "./CookieConsent";
import { footerNavItems, legalNavItems } from "@/lib/siteContent";

const phoneHref = `tel:${companyConfig.phone.replace(/[^+\d]/g, "")}`;

export function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="site-footer__top">
        <div className="site-footer__brand">
          <div className="footer-wordmark">
            <span aria-hidden="true" className="brand-mark brand-mark--dark">
              <svg
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path d="M12 4v16" />
                <path d="M4 12h16" />
              </svg>
            </span>
            <span>
              <strong>KLINIKA WARSZAWA</strong>
              <small>Gabinety lekarskie</small>
            </span>
          </div>
          <p>
            Stacjonarne konsultacje lekarskie w Warszawie w zakresie oceny
            wskazań do terapii kannabinoidowej.
          </p>
          <Link className="footer-primary-link" href="/kontakt">
            Umów konsultację <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="site-footer__column">
          <h2>Kontakt</h2>
          <address>
            <span>{companyConfig.medicalOfficeAddress}</span>
            <a href={phoneHref}>{companyConfig.phone}</a>
            <a href={`mailto:${companyConfig.email}`}>{companyConfig.email}</a>
          </address>
        </div>

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
        <p>
          {companyConfig.companyName}, {companyConfig.legalForm},{" "}
          {companyConfig.registeredOfficeAddress}. NIP: {companyConfig.nip},
          REGON: {companyConfig.regon}, RPWDL: {companyConfig.rpwdlNumber}.
        </p>
        <span>Informacja organizacyjna · Warszawa</span>
      </div>
    </footer>
  );
}
