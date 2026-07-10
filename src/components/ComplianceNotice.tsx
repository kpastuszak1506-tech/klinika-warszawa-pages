import { complianceText, shortComplianceText } from "@/lib/siteContent";

type ComplianceNoticeProps = {
  compact?: boolean;
  className?: string;
};

export function ComplianceNotice({
  compact = false,
  className = "",
}: ComplianceNoticeProps) {
  return (
    <aside
      className={[
        "rounded-lg border border-medical-green/15 bg-white/75 p-5 text-sm leading-6 text-navy-900 shadow-[0_14px_40px_rgba(15,39,72,0.06)] backdrop-blur",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="note"
    >
      <div className="flex gap-3">
        <span
          aria-hidden="true"
          className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-medical-green shadow-sm"
        >
          <svg
            className="size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 3 5 6v5c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10V6l-7-3Z" />
            <path d="m9 12 2 2 4-5" />
          </svg>
        </span>
        <p className="min-w-0">{compact ? shortComplianceText : complianceText}</p>
      </div>
    </aside>
  );
}
