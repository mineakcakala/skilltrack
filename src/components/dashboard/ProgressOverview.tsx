import { ProgressBar } from "../ui/ProgressBar";

interface ProgressOverviewProps {
  percentage: number;
  totalCompletedHours: number;
  totalTargetHours: number;
}

export function ProgressOverview({
  percentage,
  totalCompletedHours,
  totalTargetHours,
}: ProgressOverviewProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Genel Öğrenme İlerlemesi</h2>
          <p className="mt-1 text-sm text-slate-500">
            Tüm becerilerin toplam hedef süresine göre ilerleme durumu.
          </p>
        </div>
        <p className="text-2xl font-semibold text-brand-600">%{percentage}</p>
      </div>

      <div className="mt-5">
        <ProgressBar percentage={percentage} />
      </div>

      <p className="mt-3 text-xs text-slate-400">
        {totalCompletedHours} / {totalTargetHours} saat tamamlandı
      </p>
    </div>
  );
}
