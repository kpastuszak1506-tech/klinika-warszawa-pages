import type { ReactNode } from "react";

type RiskNoticeProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export function RiskNotice({
  title = "Ważna informacja",
  children,
  className = "",
}: RiskNoticeProps) {
  return (
    <aside
      className={[
        "rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="note"
    >
      <p className="font-semibold">{title}</p>
      <div className="mt-2">{children}</div>
    </aside>
  );
}
