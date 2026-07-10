"use client";

import { useEffect, useState } from "react";

type ConsentPreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const storageKey = "klinika-cookie-consent-v1";

const defaultPreferences: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export function CookieConsent() {
  const [preferences, setPreferences] =
    useState<ConsentPreferences>(defaultPreferences);
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const saved = window.localStorage.getItem(storageKey);
      if (!saved) {
        setIsVisible(true);
        setIsReady(true);
        return;
      }

      try {
        setPreferences(JSON.parse(saved) as ConsentPreferences);
      } catch {
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
        className="fixed bottom-4 left-4 z-50 rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-navy-900 shadow-sm transition hover:border-medical-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-green"
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
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white shadow-2xl"
    >
      <div className="mx-auto grid max-w-7xl gap-5 px-5 py-5 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <h2 className="text-base font-semibold text-navy-950">
            Ustawienia prywatności
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Używamy plików niezbędnych do działania strony. Kategorie
            analityczne i marketingowe są domyślnie wyłączone. Strona nie
            ładuje pikseli ani skryptów reklamowych.
          </p>
          {showSettings ? (
            <div className="mt-4 grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 md:grid-cols-3">
              <label className="flex items-start gap-3">
                <input checked disabled type="checkbox" />
                <span>
                  <span className="block font-semibold text-navy-950">
                    Niezbędne
                  </span>
                  Wymagane do działania strony i zapamiętania wyboru.
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
                  Opcjonalna anonimowa analityka po zgodzie.
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
                  Kategoria informacyjna. Strona nie ładuje narzędzi
                  reklamowych.
                </span>
              </label>
            </div>
          ) : null}
        </div>
        <div className="grid gap-2 sm:grid-cols-3 md:min-w-[520px]">
          <button
            className="rounded-md border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-navy-900 transition hover:border-medical-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-green"
            onClick={() =>
              save({ necessary: true, analytics: true, marketing: true })
            }
            type="button"
          >
            Akceptuję wszystkie
          </button>
          <button
            className="rounded-md border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-navy-900 transition hover:border-medical-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-green"
            onClick={() => save(defaultPreferences)}
            type="button"
          >
            Odrzucam wszystkie
          </button>
          {showSettings ? (
            <button
              className="rounded-md border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-navy-900 transition hover:border-medical-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-green"
              onClick={() => save(preferences)}
              type="button"
            >
              Zapisz ustawienia
            </button>
          ) : (
            <button
              className="rounded-md border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-navy-900 transition hover:border-medical-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-green"
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
