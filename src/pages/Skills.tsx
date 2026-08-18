import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { Skill, SkillFilters as SkillFiltersType } from "../interfaces/Skill";
import { useSkillsContext } from "../context/SkillsContext";
import { useToast } from "../context/ToastContext";
import { SkillFilters } from "../components/skills/SkillFilters";
import { SkillList } from "../components/skills/SkillList";
import { DeleteConfirmModal } from "../components/skills/DeleteConfirmModal";
import { filterAndSortSkills } from "../utils/helpers";

interface LayoutOutletContext {
  onEditSkill: (skill: Skill) => void;
  onAddSkill: () => void;
}

const DEFAULT_FILTERS: SkillFiltersType = {
  search: "",
  category: "Tümü",
  status: "Tümü",
  priority: "Tümü",
  sort: "en-yeni",
};

export function Skills() {
  const { skills, deleteSkill } = useSkillsContext();
  const { showToast } = useToast();
  const { onEditSkill, onAddSkill } = useOutletContext<LayoutOutletContext>();

  const [filters, setFilters] = useState<SkillFiltersType>(DEFAULT_FILTERS);
  const [skillPendingDelete, setSkillPendingDelete] = useState<Skill | null>(null);

  const filteredSkills = useMemo(() => filterAndSortSkills(skills, filters), [skills, filters]);

  function handleConfirmDelete(skill: Skill) {
    deleteSkill(skill.id);
    setSkillPendingDelete(null);
    showToast("Beceri silindi.");
  }

  return (
    <div className="space-y-5">
      <SkillFilters filters={filters} onChange={setFilters} />

      <SkillList
        skills={filteredSkills}
        hasAnySkills={skills.length > 0}
        onEdit={onEditSkill}
        onDelete={setSkillPendingDelete}
        onAddSkill={onAddSkill}
        onClearFilters={() => setFilters(DEFAULT_FILTERS)}
      />

      <DeleteConfirmModal
        skill={skillPendingDelete}
        onCancel={() => setSkillPendingDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
