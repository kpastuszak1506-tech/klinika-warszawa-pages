"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { formMedicalDataNotice, formSuccessMessage } from "@/lib/siteContent";
import { RiskNotice } from "./RiskNotice";

const initialForm = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  preferredDate: "",
  contactPreference: "telefon",
  privacyAccepted: false,
  rulesAccepted: false,
  contactConsent: false,
};

type FormState = typeof initialForm;

export function BookingContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(false);
    setError("");

    const missingRequired =
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.phone.trim() ||
      !form.email.trim() ||
      !form.preferredDate.trim() ||
      !form.privacyAccepted ||
      !form.rulesAccepted ||
      !form.contactConsent;

    if (missingRequired) {
      setError("Uzupełnij wymagane pola i zaznacz wymagane zgody.");
      return;
    }

    // TODO: Podłączyć bezpieczny backend albo system rezerwacji z TLS,
    // ograniczoną retencją, kontrolą dostępu, antyspamem i bez wysyłki
    // danych do narzędzi reklamowych.
    setSubmitted(true);
    setForm(initialForm);
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <RiskNotice title="Formularz służy wyłącznie do kontaktu">
        <p>{formMedicalDataNotice}</p>
      </RiskNotice>
      {submitted ? (
        <p
          aria-live="polite"
          className="mt-5 rounded-md border border-medical-green/20 bg-medical-green-soft px-4 py-3 text-sm leading-6 text-navy-950"
          role="status"
        >
          {formSuccessMessage}
        </p>
      ) : null}
      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-navy-950">
            Imię
            <input
              autoComplete="given-name"
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm text-navy-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-medical-green focus:ring-2 focus:ring-medical-green/20"
              onChange={(event) => updateField("firstName", event.target.value)}
              required
              type="text"
              value={form.firstName}
            />
          </label>
          <label className="block text-sm font-medium text-navy-950">
            Nazwisko
            <input
              autoComplete="family-name"
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm text-navy-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-medical-green focus:ring-2 focus:ring-medical-green/20"
              onChange={(event) => updateField("lastName", event.target.value)}
              required
              type="text"
              value={form.lastName}
            />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-navy-950">
            Telefon
            <input
              autoComplete="tel"
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm text-navy-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-medical-green focus:ring-2 focus:ring-medical-green/20"
              onChange={(event) => updateField("phone", event.target.value)}
              required
              type="tel"
              value={form.phone}
            />
          </label>
          <label className="block text-sm font-medium text-navy-950">
            E-mail
            <input
              autoComplete="email"
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm text-navy-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-medical-green focus:ring-2 focus:ring-medical-green/20"
              onChange={(event) => updateField("email", event.target.value)}
              required
              type="email"
              value={form.email}
            />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-navy-950">
            Preferowany termin
            <input
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm text-navy-950 shadow-sm outline-none transition focus:border-medical-green focus:ring-2 focus:ring-medical-green/20"
              onChange={(event) =>
                updateField("preferredDate", event.target.value)
              }
              required
              type="datetime-local"
              value={form.preferredDate}
            />
          </label>
          <label className="block text-sm font-medium text-navy-950">
            Preferowana forma kontaktu
            <select
              className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm text-navy-950 shadow-sm outline-none transition focus:border-medical-green focus:ring-2 focus:ring-medical-green/20"
              onChange={(event) =>
                updateField("contactPreference", event.target.value)
              }
              value={form.contactPreference}
            >
              <option value="telefon">Telefon</option>
              <option value="email">E-mail</option>
            </select>
          </label>
        </div>

        <div className="space-y-3 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-700">
          <label className="flex gap-3">
            <input
              checked={form.privacyAccepted}
              className="mt-1 size-4 rounded border-slate-300 text-medical-green focus:ring-medical-green"
              onChange={(event) =>
                updateField("privacyAccepted", event.target.checked)
              }
              required
              type="checkbox"
            />
            <span>
              Zapoznałem/am się z{" "}
              <Link className="font-medium underline" href="/polityka-prywatnosci">
                polityką prywatności
              </Link>
              .
            </span>
          </label>
          <label className="flex gap-3">
            <input
              checked={form.rulesAccepted}
              className="mt-1 size-4 rounded border-slate-300 text-medical-green focus:ring-medical-green"
              onChange={(event) =>
                updateField("rulesAccepted", event.target.checked)
              }
              required
              type="checkbox"
            />
            <span>
              Akceptuję{" "}
              <Link className="font-medium underline" href="/regulamin-rezerwacji">
                regulamin rezerwacji wizyt
              </Link>
              .
            </span>
          </label>
          <label className="flex gap-3">
            <input
              checked={form.contactConsent}
              className="mt-1 size-4 rounded border-slate-300 text-medical-green focus:ring-medical-green"
              onChange={(event) =>
                updateField("contactConsent", event.target.checked)
              }
              required
              type="checkbox"
            />
            <span>
              Wyrażam zgodę na kontakt w sprawie rezerwacji wizyty.
            </span>
          </label>
        </div>

        {error ? (
          <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </p>
        ) : null}
        <button
          className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-medical-green bg-medical-green px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-medical-green-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-green sm:w-auto"
          type="submit"
        >
          Wyślij zgłoszenie rezerwacyjne
        </button>
      </form>
    </div>
  );
}
