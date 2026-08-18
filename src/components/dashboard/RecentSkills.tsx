import { Link } from "react-router-dom";
import type { Skill } from "../../interfaces/Skill";
import { calculateProgress } from "../../utils/helpers";
import { StatusBadge } from "../ui/Badge";
import { ProgressBar } from "../ui/ProgressBar";
import { EmptyState } from "../ui/EmptyState";
import { ListChecks } from "lucide-react";

interface RecentSkillsProps {
  skills: Skill[];
}

export function RecentSkills({ skills }: RecentSkillsProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900">Son Eklenen Beceriler</h2>
        <Link to="/skills" className="text-sm font-medium text-brand-600 hover:text-brand-700">
          Tümünü Gör
        </Link>
      </div>

      {skills.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            icon={<ListChecks size={22} />}
            title="Henüz beceri eklenmedi"
            description="İlk becerini ekleyerek öğrenme yolculuğuna başla."
          />
        </div>
      ) : (
        <ul className="mt-4 divide-y divide-slate-100">
          {skills.map((skill) => {
            const progress = calculateProgress(skill.completedHours, skill.targetHours);
            return (
              <li key={skill.id} className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium text-slate-900">{skill.name}</p>
                    <span className="hidden text-xs text-slate-400 sm:inline">· {skill.category}</span>
                  </div>
                  <div className="mt-2 max-w-xs">
                    <ProgressBar percentage={progress} size="sm" />
                  </div>
                </div>
                <div className="flex flex-shrink-0 items-center gap-3">
                  <span className="text-xs font-medium text-slate-500">%{progress}</span>
                  <StatusBadge status={skill.status} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
