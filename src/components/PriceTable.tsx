import { companyConfig } from "@/config/companyConfig";

const priceRows = [
  {
    service: "Konsultacja lekarska - pierwsza wizyta",
    price: `${companyConfig.firstVisitPrice} zł`,
  },
  {
    service: "Konsultacja kontrolna",
    price: `${companyConfig.followUpVisitPrice} zł`,
  },
];

export function PriceTable() {
  return (
    <div className="price-table overflow-hidden rounded-lg border border-white/80 bg-white shadow-[0_28px_80px_rgba(15,39,72,0.12)]">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">Neutralny cennik konsultacji</caption>
        <thead className="bg-navy-950 text-white">
          <tr>
            <th className="px-6 py-5 text-xs font-semibold uppercase tracking-[0.18em]" scope="col">
              Usługa
            </th>
            <th
              className="px-6 py-5 text-right text-xs font-semibold uppercase tracking-[0.18em]"
              scope="col"
            >
              Cena
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {priceRows.map((row, index) => (
            <tr className="transition hover:bg-medical-green-soft/45" key={row.service}>
              <th className="px-6 py-6 text-left" scope="row">
                <span className="mb-2 block text-xs font-semibold text-medical-green">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <span className="text-lg font-semibold text-navy-950">
                  {row.service}
                </span>
              </th>
              <td className="px-6 py-6 text-right text-2xl font-semibold text-navy-950">
                {row.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-slate-200 bg-slate-50 px-6 py-5 text-sm leading-6 text-slate-700">
        Podane kwoty obejmują wizytę lekarską. O sposobie dalszego
        postępowania, w tym o ewentualnym wystawieniu recepty, decyduje lekarz
        po osobistym badaniu pacjenta.
      </p>
    </div>
  );
}
