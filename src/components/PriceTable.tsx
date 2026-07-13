import { companyConfig } from "@/config/companyConfig";

const priceRows = [
  {
    service: "Konsultacja lekarska - pierwsza wizyta",
    detail: "Rozmowa, badanie i ocena wskazań oraz przeciwwskazań",
    price: `${companyConfig.firstVisitPrice} zł`,
  },
  {
    service: "Konsultacja kontrolna",
    detail: "Omówienie dalszego postępowania podczas kolejnej wizyty",
    price: `${companyConfig.followUpVisitPrice} zł`,
  },
];

export function PriceTable() {
  return (
    <div className="price-table">
      <div className="price-table__header">
        <div>
          <p className="price-table__eyebrow">Konsultacje stacjonarne</p>
          <h3 className="display-heading text-2xl font-semibold text-navy-950 md:text-3xl">
            Jasny zakres wizyty
          </h3>
        </div>
        <span className="price-table__stamp">Cennik</span>
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
        Opłata dotyczy konsultacji lekarskiej. O dalszym postępowaniu, w tym o
        ewentualnym wystawieniu recepty, decyduje lekarz po osobistym badaniu
        pacjenta.
      </p>
    </div>
  );
}
