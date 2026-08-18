import { useEffect, useState } from "react";
import type { Skill, SkillFormValues } from "../interfaces/Skill";
import { generateId, resolveStatus } from "../utils/helpers";
import { loadInitialSkills, writeSkills } from "../utils/storage";

function toSkillPayload(values: SkillFormValues) {
  const targetHours = Number(values.targetHours);
  const completedHours = Number(values.completedHours);

  return {
    name: values.name.trim(),
    category: values.category as Skill["category"],
    description: values.description.trim(),
    targetHours,
    completedHours,
    priority: values.priority as Skill["priority"],
    status: resolveStatus(completedHours, targetHours, values.status as Skill["status"]),
    startDate: values.startDate,
  };
}

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>(() => loadInitialSkills());

  useEffect(() => {
    writeSkills(skills);
  }, [skills]);

  function addSkill(values: SkillFormValues): void {
    const now = new Date().toISOString();
    const newSkill: Skill = {
      id: generateId(),
      createdAt: now,
      updatedAt: now,
      ...toSkillPayload(values),
    };
    setSkills((prev) => [newSkill, ...prev]);
  }

  function updateSkill(id: string, values: SkillFormValues): void {
    setSkills((prev) =>
      prev.map((skill) =>
        skill.id === id
          ? {
              ...skill,
              ...toSkillPayload(values),
              updatedAt: new Date().toISOString(),
            }
          : skill,
      ),
    );
  }

  function deleteSkill(id: string): void {
    setSkills((prev) => prev.filter((skill) => skill.id !== id));
  }

  return { skills, addSkill, updateSkill, deleteSkill };
}
