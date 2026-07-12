import Link from "next/link";

export default function NotFound() {
  return (
    <section className="knowledge-hero flex min-h-[60vh] items-center px-5 py-16">
      <div className="mx-auto max-w-2xl">
        <p className="eyebrow">404</p>
        <h1 className="display-heading text-4xl font-semibold text-navy-950 md:text-6xl">
          Nie znaleziono tej strony
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          Adres mógł się zmienić albo być nieaktualny. Wróć do informacji o
          konsultacjach lub przejdź do materiałów dla pacjenta.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold">
          <Link className="text-medical-green hover:text-medical-green-dark" href="/">
            Strona główna
          </Link>
          <Link className="text-medical-green hover:text-medical-green-dark" href="/wiedza">
            Wiedza dla pacjenta
          </Link>
        </div>
      </div>
    </section>
  );
}
