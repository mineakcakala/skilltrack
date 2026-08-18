import { cn } from "../../utils/helpers";

interface ProgressBarProps {
  percentage: number;
  size?: "sm" | "md";
  showLabel?: boolean;
}

export function ProgressBar({ percentage, size = "md", showLabel = false }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percentage));

  const barColor =
    clamped >= 100 ? "bg-emerald-500" : clamped >= 50 ? "bg-brand-500" : "bg-amber-500";

  return (
    <div className="w-full">
      {showLabel && (
        <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-slate-500">
          <span>İlerleme</span>
          <span className="text-slate-700">%{clamped}</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn(
          "w-full overflow-hidden rounded-full bg-slate-100",
          size === "sm" ? "h-1.5" : "h-2",
        )}
      >
        <div
          className={cn("h-full rounded-full transition-all duration-500 ease-out", barColor)}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
