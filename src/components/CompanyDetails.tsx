import {
  displayCompanyData,
  isPublicDataVerified,
} from "@/config/companyConfig";

export function CompanyDetails() {
  const data = displayCompanyData;
  const isDemoData = Boolean(data && !isPublicDataVerified);

  if (!data) {
    return (
      <p className="rounded-lg border border-slate-200 bg-white p-6 text-sm leading-6 text-slate-600">
        Dane podmiotu leczniczego zostaną opublikowane przed rozpoczęciem
        przyjmowania pacjentów.
      </p>
    );
  }

  const details = [
    ["Nazwa", data.companyName],
    ["Forma prawna", data.legalForm],
    ["Siedziba", data.registeredOfficeAddress],
    ["Gabinet", data.medicalOfficeAddress],
    ["Telefon", data.phone],
    ["E-mail", data.email],
    ["NIP", data.nip],
    ["REGON", data.regon],
    ["REGON zakładu leczniczego", data.medicalRegon],
    ["Numer RPWDL", data.rpwdlNumber],
  ];

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      {isDemoData ? (
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.12em] text-medical-green">
          Dane demonstracyjne
        </p>
      ) : null}
      <dl className="grid gap-4 sm:grid-cols-2">
        {details.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs font-semibold uppercase text-slate-500">{label}</dt>
            <dd className="mt-1 text-sm leading-6 text-navy-950">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
