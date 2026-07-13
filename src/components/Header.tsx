"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { navItems } from "@/lib/siteContent";
import { CTAButton } from "./CTAButton";

const focusableSelector =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function BrandMark() {
  return (
    <span aria-hidden="true" className="brand-mark">
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
  );
}

function NavigationLinks({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <nav aria-label="Główna nawigacja">
      <ul className={mobile ? "mobile-nav-list" : "desktop-nav-list"}>
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              className={mobile ? "mobile-nav-link" : "desktop-nav-link"}
              href={item.href}
              onClick={onNavigate}
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    window.requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    document.body.classList.add("menu-open");

    const focusTimer = window.setTimeout(() => {
      const firstFocusable = menuPanelRef.current?.querySelector<HTMLElement>(
        focusableSelector,
      );
      firstFocusable?.focus();
    }, 0);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !menuPanelRef.current) {
        return;
      }

      const focusable = Array.from(
        menuPanelRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      );

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.classList.remove("menu-open");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMenu, isMenuOpen]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Przejdź do treści
      </a>
      <header className="site-header sticky top-0 z-50 px-3 pt-3">
        <div className="site-header__bar">
          <Link
            aria-label="Klinika Warszawa - strona główna"
            className="brand-lockup"
            href="/"
          >
            <BrandMark />
            <span className="min-w-0">
              <span className="brand-lockup__name">KLINIKA WARSZAWA</span>
              <span className="brand-lockup__detail">Gabinety lekarskie</span>
            </span>
          </Link>

          <div className="site-header__desktop-nav">
            <NavigationLinks />
            <CTAButton className="header-cta" href="/kontakt">
              Umów konsultację
            </CTAButton>
          </div>

          <button
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
            className="menu-trigger"
            onClick={() => setIsMenuOpen((open) => !open)}
            ref={menuButtonRef}
            type="button"
          >
            <span aria-hidden="true" className="menu-trigger__icon">
              <span />
              <span />
              <span />
            </span>
            <span className="sr-only">{isMenuOpen ? "Zamknij" : "Menu"}</span>
          </button>
        </div>

        {isMenuOpen ? (
          <div className="mobile-menu-layer">
            <button
              aria-label="Zamknij menu"
              className="mobile-menu__backdrop"
              onClick={closeMenu}
              type="button"
            />
            <div
              aria-labelledby="mobile-navigation-title"
              aria-modal="true"
              className="mobile-menu__panel"
              id="mobile-navigation"
              ref={menuPanelRef}
              role="dialog"
            >
              <div className="mobile-menu__topline">
                <p className="eyebrow">Nawigacja</p>
                <button
                  aria-label="Zamknij menu"
                  className="mobile-menu__close"
                  onClick={closeMenu}
                  type="button"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <h2
                className="display-heading mobile-menu__title"
                id="mobile-navigation-title"
              >
                Co chcesz sprawdzić?
              </h2>
              <NavigationLinks mobile onNavigate={closeMenu} />
              <CTAButton className="mobile-menu__cta" href="/kontakt" onClick={closeMenu}>
                Umów konsultację
              </CTAButton>
              <p className="mobile-menu__note">
                Konsultacje odbywają się stacjonarnie w gabinecie w Warszawie.
              </p>
            </div>
          </div>
        ) : null}
      </header>
    </>
  );
}
