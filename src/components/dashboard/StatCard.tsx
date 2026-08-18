import type { ReactNode } from "react";
import { cn } from "../../utils/helpers";

interface StatCardProps {
  label: string;
  value: string;
  helperText?: string;
  icon: ReactNode;
  tone?: "brand" | "success" | "warning";
}

const TONE_CLASSES: Record<NonNullable<StatCardProps["tone"]>, string> = {
  brand: "bg-brand-50 text-brand-600",
  success: "bg-emerald-50 text-emerald-600",
  warning: "bg-amber-50 text-amber-600",
};

export function StatCard({ label, value, helperText, icon, tone = "brand" }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl", TONE_CLASSES[tone])}>
          {icon}
        </div>
      </div>
      <p className="mt-3 text-2xl font-semibold text-slate-900">{value}</p>
      {helperText && <p className="mt-1 text-xs text-slate-400">{helperText}</p>}
    </div>
  );
}
