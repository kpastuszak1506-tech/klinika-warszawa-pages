import { processSteps } from "@/lib/siteContent";

export function ProcessSteps() {
  return (
    <ol className="divide-y divide-slate-200 border-y border-slate-200">
      {processSteps.map((step, index) => (
        <li
          className="grid gap-5 py-8 md:grid-cols-[120px_88px_1fr_auto] md:items-center"
          key={step.title}
        >
          <div className="display-heading text-5xl text-navy-950 md:text-6xl">
            {(index + 1).toString().padStart(2, "0")}
          </div>
          <div className="inline-flex size-14 items-center justify-center rounded-lg bg-medical-green-soft text-medical-green">
            <svg
              aria-hidden="true"
              className="size-7"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.7"
              viewBox="0 0 24 24"
            >
              {index === 0 ? (
                <>
                  <path d="M7 3v4" />
                  <path d="M17 3v4" />
                  <path d="M4 9h16" />
                  <rect height="17" rx="2" width="16" x="4" y="5" />
                </>
              ) : index === 1 ? (
                <>
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21a8 8 0 0 1 16 0" />
                </>
              ) : index === 2 ? (
                <>
                  <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7Z" />
                  <path d="M14 2v5h5" />
                  <path d="M9 15h6" />
                  <path d="M9 11h2" />
                </>
              ) : (
                <>
                  <path d="M20 6 9 17l-5-5" />
                </>
              )}
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-navy-950">{step.title}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              {step.description}
            </p>
          </div>
          <span aria-hidden="true" className="hidden text-2xl text-medical-green md:block">
            ↓
          </span>
        </li>
      ))}
    </ol>
  );
}
