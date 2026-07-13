import {
  companyConfig,
  isLocalDemoPreview,
  isPublicDataVerified,
} from "@/config/companyConfig";

const publicPriceRows = [
  {
    service: "Konsultacja lekarska - pierwsza wizyta",
    detail: "Rozmowa, badanie i omówienie istotnych informacji",
    price: `${companyConfig.firstVisitPrice} zł`,
  },
  {
    service: "Konsultacja kontrolna",
    detail: "Rozmowa i omówienie kolejnych kroków podczas wizyty",
    price: `${companyConfig.followUpVisitPrice} zł`,
  },
];

const demoPriceRows = [
  {
    service: "Konsultacja lekarska - pierwsza wizyta",
    detail: "Rozmowa, badanie i omówienie istotnych informacji",
    price: `${companyConfig.demoFirstVisitPrice} zł`,
  },
  {
    service: "Konsultacja kontrolna",
    detail: "Rozmowa i omówienie kolejnych kroków podczas wizyty",
    price: `${companyConfig.demoFollowUpVisitPrice} zł`,
  },
];

export function PriceTable() {
  if (!isPublicDataVerified && !isLocalDemoPreview) {
    return (
      <div className="price-table">
        <div className="price-table__header">
          <div>
            <p className="price-table__eyebrow">Konsultacje stacjonarne</p>
            <h3 className="display-heading text-2xl font-semibold text-navy-950 md:text-3xl">
              Zakres konsultacji
            </h3>
          </div>
          <span className="price-table__stamp">Zakres</span>
        </div>
        <ul className="space-y-4 px-5 py-6 text-sm leading-6 text-slate-700 md:px-7">
          <li>
            <strong className="block text-navy-950">Pierwsza konsultacja</strong>
            Rozmowa, badanie i omówienie istotnych informacji.
          </li>
          <li>
            <strong className="block text-navy-950">Konsultacja kontrolna</strong>
            Rozmowa i omówienie kolejnych kroków podczas wizyty.
          </li>
        </ul>
        <p className="price-table__note">
          Ceny konsultacji zostaną opublikowane przed rozpoczęciem przyjmowania pacjentów.
        </p>
      </div>
    );
  }

  const priceRows = isPublicDataVerified ? publicPriceRows : demoPriceRows;
  const isDemoPricing = !isPublicDataVerified;

  return (
    <div className="price-table">
      <div className="price-table__header">
        <div>
          <p className="price-table__eyebrow">Konsultacje stacjonarne</p>
          <h3 className="display-heading text-2xl font-semibold text-navy-950 md:text-3xl">
            {isDemoPricing ? "Cennik demonstracyjny" : "Jasny zakres wizyty"}
          </h3>
        </div>
        <span className="price-table__stamp">{isDemoPricing ? "Demo" : "Cennik"}</span>
      </div>
      <table>
        <caption className="sr-only">Neutralny cennik konsultacji</caption>
        <thead>
          <tr>
            <th scope="col">Usługa</th>
            <th scope="col">Cena</th>
          </tr>
        </thead>
        <tbody>
          {priceRows.map((row, index) => (
            <tr key={row.service}>
              <th scope="row">
                <span className="price-table__number">0{index + 1}</span>
                <span className="price-table__service">{row.service}</span>
                <span className="price-table__detail">{row.detail}</span>
              </th>
              <td>{row.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="price-table__note">
        {isDemoPricing
          ? "Cennik demonstracyjny wersji próbnej. Kwoty wymagają potwierdzenia przed uruchomieniem placówki."
          : "Opłata dotyczy konsultacji lekarskiej, a nie recepty ani określonego wyniku wizyty. O terapii i ewentualnym wystawieniu recepty decyduje lekarz po osobistym badaniu."}
      </p>
    </div>
  );
}
