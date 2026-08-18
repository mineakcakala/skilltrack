import type { Skill, SkillFilters, SkillFormValues, SkillStatus } from "../interfaces/Skill";

/** Basit className birleştirici; koşullu Tailwind sınıflarını temiz tutar. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Yeni bir benzersiz kimlik üretir. */
export function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `skill-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Tamamlanma yüzdesini güvenli şekilde hesaplar.
 * targetHours <= 0 ise veya sonuç negatifse 0, 100'ü aşarsa 100 döner.
 */
export function calculateProgress(completedHours: number, targetHours: number): number {
  if (!targetHours || targetHours <= 0) return 0;
  const percentage = (completedHours / targetHours) * 100;
  if (Number.isNaN(percentage) || percentage < 0) return 0;
  return Math.min(100, Math.round(percentage));
}

/** completedHours, targetHours değerine ulaştıysa durumu otomatik "Tamamlandı" yapar. */
export function resolveStatus(
  completedHours: number,
  targetHours: number,
  selectedStatus: SkillStatus,
): SkillStatus {
  if (targetHours > 0 && completedHours >= targetHours) {
    return "Tamamlandı";
  }
  return selectedStatus;
}

const TURKISH_MONTHS = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

/** ISO tarih dizesini "18 Ağustos 2026" biçiminde gösterir. */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "-";
  return `${date.getDate()} ${TURKISH_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

/** Bugünün tarihini input[type=date] için uygun ISO (YYYY-MM-DD) biçiminde döner. */
export function todayISODate(): string {
  return new Date().toISOString().slice(0, 10);
}

export function filterAndSortSkills(skills: Skill[], filters: SkillFilters): Skill[] {
  const query = filters.search.trim().toLocaleLowerCase("tr-TR");

  const filtered = skills.filter((skill) => {
    const matchesQuery =
      query.length === 0 ||
      skill.name.toLocaleLowerCase("tr-TR").includes(query) ||
      skill.description.toLocaleLowerCase("tr-TR").includes(query);

    const matchesCategory = filters.category === "Tümü" || skill.category === filters.category;
    const matchesStatus = filters.status === "Tümü" || skill.status === filters.status;
    const matchesPriority = filters.priority === "Tümü" || skill.priority === filters.priority;

    return matchesQuery && matchesCategory && matchesStatus && matchesPriority;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (filters.sort) {
      case "en-eski":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "ilerleme-yuksek":
        return (
          calculateProgress(b.completedHours, b.targetHours) -
          calculateProgress(a.completedHours, a.targetHours)
        );
      case "ilerleme-dusuk":
        return (
          calculateProgress(a.completedHours, a.targetHours) -
          calculateProgress(b.completedHours, b.targetHours)
        );
      case "isim-az":
        return a.name.localeCompare(b.name, "tr-TR");
      case "en-yeni":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return sorted;
}

export interface FormValidationErrors {
  name?: string;
  category?: string;
  targetHours?: string;
  completedHours?: string;
  priority?: string;
  status?: string;
  startDate?: string;
}

export function validateSkillForm(values: SkillFormValues): FormValidationErrors {
  const errors: FormValidationErrors = {};

  if (!values.name.trim()) {
    errors.name = "Beceri adı zorunludur.";
  } else if (values.name.trim().length < 2) {
    errors.name = "Beceri adı en az 2 karakter olmalıdır.";
  }

  if (!values.category) {
    errors.category = "Kategori seçimi zorunludur.";
  }

  const targetHours = Number(values.targetHours);
  if (values.targetHours.trim() === "" || Number.isNaN(targetHours)) {
    errors.targetHours = "Hedef süre zorunludur.";
  } else if (targetHours < 1) {
    errors.targetHours = "Hedef süre 1 saat veya daha fazla olmalıdır.";
  }

  const completedHours = Number(values.completedHours);
  if (values.completedHours.trim() === "" || Number.isNaN(completedHours)) {
    errors.completedHours = "Tamamlanan süre zorunludur.";
  } else if (completedHours < 0) {
    errors.completedHours = "Tamamlanan süre negatif olamaz.";
  }

  if (!values.priority) {
    errors.priority = "Öncelik seçimi zorunludur.";
  }

  if (!values.status) {
    errors.status = "Durum seçimi zorunludur.";
  }

  if (!values.startDate) {
    errors.startDate = "Başlangıç tarihi zorunludur.";
  }

  return errors;
}
