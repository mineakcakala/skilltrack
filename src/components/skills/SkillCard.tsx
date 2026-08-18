import { Pencil, Trash2 } from "lucide-react";
import type { Skill } from "../../interfaces/Skill";
import { calculateProgress, formatDate } from "../../utils/helpers";
import { Badge, PriorityBadge, StatusBadge } from "../ui/Badge";
import { ProgressBar } from "../ui/ProgressBar";

interface SkillCardProps {
  skill: Skill;
  onEdit: (skill: Skill) => void;
  onDelete: (skill: Skill) => void;
}

export function SkillCard({ skill, onEdit, onDelete }: SkillCardProps) {
  const progress = calculateProgress(skill.completedHours, skill.targetHours);

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-slate-900">{skill.name}</h3>
          <div className="mt-1.5">
            <Badge tone="brand">{skill.category}</Badge>
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(skill)}
            aria-label={`${skill.name} becerisini düzenle`}
            title="Düzenle"
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-brand-50 hover:text-brand-600"
          >
            <Pencil size={16} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(skill)}
            aria-label={`${skill.name} becerisini sil`}
            title="Sil"
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {skill.description && (
        <p className="mt-3 line-clamp-2 text-sm text-slate-500">{skill.description}</p>
      )}

      <div className="mt-4">
        <ProgressBar percentage={progress} showLabel />
        <p className="mt-2 text-xs text-slate-500">
          {skill.completedHours} / {skill.targetHours} saat
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={skill.status} />
          <PriorityBadge priority={skill.priority} />
        </div>
        <span className="text-xs text-slate-400">{formatDate(skill.startDate)}</span>
      </div>
    </div>
  );
}
