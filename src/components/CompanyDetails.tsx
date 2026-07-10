import { companyConfig } from "@/config/companyConfig";

const details = [
  ["Nazwa", companyConfig.companyName],
  ["Forma prawna", companyConfig.legalForm],
  ["Siedziba", companyConfig.registeredOfficeAddress],
  ["Gabinet", companyConfig.medicalOfficeAddress],
  ["NIP", companyConfig.nip],
  ["REGON", companyConfig.regon],
  ["REGON zakładu leczniczego", companyConfig.medicalRegon],
  ["Numer RPWDL", companyConfig.rpwdlNumber],
];

export function CompanyDetails() {
  return (
    <dl className="grid gap-4 rounded-lg border border-slate-200 bg-white p-6 sm:grid-cols-2">
      {details.map(([label, value]) => (
        <div key={label}>
          <dt className="text-xs font-semibold uppercase text-slate-500">
            {label}
          </dt>
          <dd className="mt-1 text-sm leading-6 text-navy-950">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
