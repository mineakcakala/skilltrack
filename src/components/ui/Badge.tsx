import type { ReactNode } from "react";
import type { SkillPriority, SkillStatus } from "../../interfaces/Skill";
import { cn } from "../../utils/helpers";

interface BadgeProps {
  children: ReactNode;
  tone?: "neutral" | "brand" | "success" | "warning" | "danger";
}

const TONE_CLASSES: Record<NonNullable<BadgeProps["tone"]>, string> = {
  neutral: "bg-slate-100 text-slate-600",
  brand: "bg-brand-50 text-brand-700",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-rose-50 text-rose-700",
};

export function Badge({ children, tone = "neutral" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        TONE_CLASSES[tone],
      )}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: SkillStatus }) {
  const tone = status === "Tamamlandı" ? "success" : status === "Devam Ediyor" ? "brand" : "neutral";
  return <Badge tone={tone}>{status}</Badge>;
}

export function PriorityBadge({ priority }: { priority: SkillPriority }) {
  const tone = priority === "Yüksek" ? "danger" : priority === "Orta" ? "warning" : "neutral";
  return <Badge tone={tone}>{priority}</Badge>;
}
