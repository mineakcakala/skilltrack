export type SkillCategory =
  | "Yazılım"
  | "Tasarım"
  | "Dil"
  | "Kariyer"
  | "Kişisel Gelişim"
  | "Diğer";

export type SkillPriority = "Düşük" | "Orta" | "Yüksek";

export type SkillStatus = "Başlanmadı" | "Devam Ediyor" | "Tamamlandı";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  targetHours: number;
  completedHours: number;
  priority: SkillPriority;
  status: SkillStatus;
  startDate: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Form alanları kullanıcı girişi sırasında string olarak tutulur.
 * Sayısal alanlar gönderim anında number tipine dönüştürülür.
 */
export interface SkillFormValues {
  name: string;
  category: SkillCategory | "";
  description: string;
  targetHours: string;
  completedHours: string;
  priority: SkillPriority | "";
  status: SkillStatus | "";
  startDate: string;
}

export type SortOption =
  | "en-yeni"
  | "en-eski"
  | "ilerleme-yuksek"
  | "ilerleme-dusuk"
  | "isim-az";

export interface SkillFilters {
  search: string;
  category: SkillCategory | "Tümü";
  status: SkillStatus | "Tümü";
  priority: SkillPriority | "Tümü";
  sort: SortOption;
}
