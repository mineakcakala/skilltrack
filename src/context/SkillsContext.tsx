import { createContext, useContext, type ReactNode } from "react";
import { useSkills } from "../hooks/useSkills";

type SkillsContextValue = ReturnType<typeof useSkills>;

const SkillsContext = createContext<SkillsContextValue | null>(null);

export function SkillsProvider({ children }: { children: ReactNode }) {
  const value = useSkills();
  return <SkillsContext.Provider value={value}>{children}</SkillsContext.Provider>;
}

export function useSkillsContext(): SkillsContextValue {
  const context = useContext(SkillsContext);
  if (!context) {
    throw new Error("useSkillsContext, SkillsProvider içerisinde kullanılmalıdır.");
  }
  return context;
}
