import { PlusCircle, SearchX, Sparkles } from "lucide-react";
import type { Skill } from "../../interfaces/Skill";
import { SkillCard } from "./SkillCard";
import { EmptyState } from "../ui/EmptyState";
import { Button } from "../ui/Button";

interface SkillListProps {
  skills: Skill[];
  hasAnySkills: boolean;
  onEdit: (skill: Skill) => void;
  onDelete: (skill: Skill) => void;
  onAddSkill: () => void;
  onClearFilters: () => void;
}

export function SkillList({
  skills,
  hasAnySkills,
  onEdit,
  onDelete,
  onAddSkill,
  onClearFilters,
}: SkillListProps) {
  if (!hasAnySkills) {
    return (
      <EmptyState
        icon={<Sparkles size={24} />}
        title="Henüz beceri eklenmedi"
        description="İlk becerini ekleyerek öğrenme yolculuğuna başla."
        action={
          <Button onClick={onAddSkill} icon={<PlusCircle size={17} />}>
            Yeni Beceri Ekle
          </Button>
        }
      />
    );
  }

  if (skills.length === 0) {
    return (
      <EmptyState
        icon={<SearchX size={24} />}
        title="Sonuç bulunamadı"
        description="Arama veya filtre kriterlerini değiştirmeyi deneyin."
        action={
          <Button variant="secondary" onClick={onClearFilters}>
            Filtreleri Temizle
          </Button>
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {skills.map((skill) => (
        <SkillCard key={skill.id} skill={skill} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
