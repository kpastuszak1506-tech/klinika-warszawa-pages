"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type ConsentPreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const storageKey = "klinika-cookie-consent-v2";

const defaultPreferences: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

function parsePreferences(value: string | null): ConsentPreferences | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as Partial<ConsentPreferences>;

    if (
      parsed.necessary === true &&
      typeof parsed.analytics === "boolean" &&
      typeof parsed.marketing === "boolean"
    ) {
      return {
        necessary: true,
        analytics: parsed.analytics,
        marketing: parsed.marketing,
      };
    }
  } catch {
    return null;
  }

  return null;
}

export function CookieConsent() {
  const [preferences, setPreferences] =
    useState<ConsentPreferences>(defaultPreferences);
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const savedPreferences = parsePreferences(
        window.localStorage.getItem(storageKey),
      );

      if (savedPreferences) {
        setPreferences(savedPreferences);
      } else {
        setIsVisible(true);
      }

      setIsReady(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  function save(nextPreferences: ConsentPreferences) {
    setPreferences(nextPreferences);
    window.localStorage.setItem(storageKey, JSON.stringify(nextPreferences));
    setIsVisible(false);
    setShowSettings(false);
  }

  if (!isReady) {
    return null;
  }

  if (!isVisible) {
    return (
      <button
        aria-label="Otwórz ustawienia cookies"
        className="cookie-fab"
        onClick={() => setIsVisible(true)}
        type="button"
      >
        Ustawienia cookies
      </button>
    );
  }

  return (
    <section
      aria-label="Ustawienia cookies"
      aria-live="polite"
      className="cookie-sheet"
    >
      <div className="cookie-sheet__content">
        <div>
          <h2 className="text-base font-semibold text-navy-950">
            Ustawienia prywatności
          </h2>
          <p className="mt-1.5 max-w-3xl text-sm leading-5 text-slate-600">
            Niezbędne mechanizmy są aktywne. Analityka i marketing pozostają
            wyłączone do czasu Twojej zgody. {" "}
            <Link
              className="font-semibold text-medical-green underline underline-offset-2"
              href="/polityka-cookies"
            >
              Polityka cookies
            </Link>
          </p>
          {showSettings ? (
            <div className="mt-4 grid gap-3 border-t border-slate-200 pt-4 text-sm text-slate-700 md:grid-cols-3">
              <label className="flex items-start gap-3">
                <input checked disabled type="checkbox" />
                <span>
                  <span className="block font-semibold text-navy-950">
                    Niezbędne
                  </span>
                  Utrzymują działanie strony i zapis wyboru prywatności.
                </span>
              </label>
              <label className="flex items-start gap-3">
                <input
                  checked={preferences.analytics}
                  onChange={(event) =>
                    setPreferences((current) => ({
                      ...current,
                      analytics: event.target.checked,
                    }))
                  }
                  type="checkbox"
                />
                <span>
                  <span className="block font-semibold text-navy-950">
                    Analityczne
                  </span>
                  Opcjonalne. W obecnej wersji nie są używane.
                </span>
              </label>
              <label className="flex items-start gap-3">
                <input
                  checked={preferences.marketing}
                  onChange={(event) =>
                    setPreferences((current) => ({
                      ...current,
                      marketing: event.target.checked,
                    }))
                  }
                  type="checkbox"
                />
                <span>
                  <span className="block font-semibold text-navy-950">
                    Marketingowe
                  </span>
                  Opcjonalne. Strona nie ładuje narzędzi reklamowych.
                </span>
              </label>
            </div>
          ) : null}
        </div>
        <div className="grid grid-cols-3 gap-2 lg:min-w-[500px]">
          <button
            className="min-h-12 rounded-md border border-slate-300 bg-white px-2 py-2 text-[11px] font-semibold leading-4 text-navy-900 transition hover:border-medical-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-green sm:px-4 sm:text-sm"
            onClick={() =>
              save({ necessary: true, analytics: true, marketing: true })
            }
            type="button"
          >
            Akceptuję wszystkie
          </button>
          <button
            className="min-h-12 rounded-md border border-slate-300 bg-white px-2 py-2 text-[11px] font-semibold leading-4 text-navy-900 transition hover:border-medical-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-green sm:px-4 sm:text-sm"
            onClick={() => save(defaultPreferences)}
            type="button"
          >
            Odrzucam wszystkie
          </button>
          {showSettings ? (
            <button
              className="min-h-12 rounded-md border border-medical-green bg-medical-green px-2 py-2 text-[11px] font-semibold leading-4 text-white transition hover:bg-medical-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-green sm:px-4 sm:text-sm"
              onClick={() => save(preferences)}
              type="button"
            >
              Zapisz ustawienia
            </button>
          ) : (
            <button
              className="min-h-12 rounded-md border border-slate-300 bg-white px-2 py-2 text-[11px] font-semibold leading-4 text-navy-900 transition hover:border-medical-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-green sm:px-4 sm:text-sm"
              onClick={() => setShowSettings(true)}
              type="button"
            >
              Ustawienia
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
