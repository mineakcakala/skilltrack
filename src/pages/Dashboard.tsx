import { CheckCircle2, Clock, ListChecks, Loader } from "lucide-react";
import { useSkillsContext } from "../context/SkillsContext";
import { StatCard } from "../components/dashboard/StatCard";
import { ProgressOverview } from "../components/dashboard/ProgressOverview";
import { RecentSkills } from "../components/dashboard/RecentSkills";
import { calculateProgress } from "../utils/helpers";

export function Dashboard() {
  const { skills } = useSkillsContext();

  const totalSkills = skills.length;
  const inProgressCount = skills.filter((skill) => skill.status === "Devam Ediyor").length;
  const completedCount = skills.filter((skill) => skill.status === "Tamamlandı").length;
  const totalCompletedHours = skills.reduce((sum, skill) => sum + skill.completedHours, 0);
  const totalTargetHours = skills.reduce((sum, skill) => sum + skill.targetHours, 0);
  const overallProgress = calculateProgress(totalCompletedHours, totalTargetHours);

  const recentSkills = [...skills]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Toplam Beceri"
          value={String(totalSkills)}
          helperText="Sistemde kayıtlı beceri"
          icon={<ListChecks size={18} />}
          tone="brand"
        />
        <StatCard
          label="Devam Eden"
          value={String(inProgressCount)}
          helperText="Aktif olarak çalışılıyor"
          icon={<Loader size={18} />}
          tone="warning"
        />
        <StatCard
          label="Tamamlanan"
          value={String(completedCount)}
          helperText="Hedefe ulaşıldı"
          icon={<CheckCircle2 size={18} />}
          tone="success"
        />
        <StatCard
          label="Toplam Çalışma"
          value={`${totalCompletedHours} saat`}
          helperText="Tüm becerilerde harcanan süre"
          icon={<Clock size={18} />}
          tone="brand"
        />
      </div>

      <ProgressOverview
        percentage={overallProgress}
        totalCompletedHours={totalCompletedHours}
        totalTargetHours={totalTargetHours}
      />

      <RecentSkills skills={recentSkills} />
    </div>
  );
}
