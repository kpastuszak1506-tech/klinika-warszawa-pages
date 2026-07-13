"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type ConsentPreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

export const cookieSettingsEvent = "klinika:open-cookie-settings";

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

    const handleOpenSettings = () => {
      setShowSettings(true);
      setIsVisible(true);
    };

    window.addEventListener(cookieSettingsEvent, handleOpenSettings);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener(cookieSettingsEvent, handleOpenSettings);
    };
  }, []);

  function save(nextPreferences: ConsentPreferences) {
    setPreferences(nextPreferences);

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(nextPreferences));
    } catch {
      // The choice still applies for this render if storage is unavailable.
    }

    setIsVisible(false);
    setShowSettings(false);
  }

  if (!isReady) {
    return null;
  }

  if (!isVisible) {
    return null;
  }

  return (
    <section
      aria-labelledby="cookie-sheet-title"
      className="cookie-sheet"
      role="dialog"
    >
      <div className="cookie-sheet__content">
        <div className="cookie-sheet__copy">
          <p className="cookie-sheet__kicker">Prywatność</p>
          <h2 className="text-base font-semibold text-navy-950" id="cookie-sheet-title">
            Ustawienia cookies
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
            <div className="cookie-preferences" role="group" aria-label="Kategorie cookies">
              <label className="cookie-preference">
                <input checked disabled type="checkbox" />
                <span>
                  <strong>Niezbędne</strong>
                  Utrzymują działanie strony i zapis wyboru prywatności.
                </span>
              </label>
              <label className="cookie-preference">
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
                  <strong>Analityczne</strong>
                  Opcjonalne. W obecnej wersji nie są używane.
                </span>
              </label>
              <label className="cookie-preference">
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
                  <strong>Marketingowe</strong>
                  Opcjonalne. Strona nie ładuje narzędzi reklamowych.
                </span>
              </label>
            </div>
          ) : null}
        </div>
        <div className="cookie-sheet__actions">
          <button
            className="cookie-action"
            onClick={() =>
              save({ necessary: true, analytics: true, marketing: true })
            }
            type="button"
          >
            Akceptuję wszystkie
          </button>
          <button
            className="cookie-action"
            onClick={() => save(defaultPreferences)}
            type="button"
          >
            Odrzucam wszystkie
          </button>
          {showSettings ? (
            <button
              className="cookie-action cookie-action--accent"
              onClick={() => save(preferences)}
              type="button"
            >
              Zapisz ustawienia
            </button>
          ) : (
            <button
              className="cookie-action"
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
