import type { Skill } from "../interfaces/Skill";
import { DEMO_SKILLS, STORAGE_INITIALIZED_KEY, STORAGE_KEY } from "./constants";

/** Gelen verinin geçerli bir Skill dizisi olup olmadığını denetler. */
function isValidSkillArray(data: unknown): data is Skill[] {
  if (!Array.isArray(data)) return false;
  return data.every(
    (item) =>
      typeof item === "object" &&
      item !== null &&
      typeof (item as Skill).id === "string" &&
      typeof (item as Skill).name === "string" &&
      typeof (item as Skill).targetHours === "number" &&
      typeof (item as Skill).completedHours === "number",
  );
}

/** LocalStorage'dan beceri listesini güvenli şekilde okur. Bozuk veri uygulamayı çökertmez. */
export function readSkills(): Skill[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return isValidSkillArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Beceri listesini LocalStorage'a yazar. Depolama kotası dolarsa sessizce başarısız olur. */
export function writeSkills(skills: Skill[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(skills));
  } catch {
    // LocalStorage yazılamıyorsa (örn. gizli sekme kota sınırı) uygulama çalışmaya devam eder.
  }
}

/**
 * Uygulama ilk kez açıldığında (LocalStorage hiç kullanılmamışsa) örnek verileri yükler.
 * Kullanıcı daha sonra tüm becerilerini silse dahi demo veriler tekrar yüklenmez.
 */
export function loadInitialSkills(): Skill[] {
  try {
    const alreadyInitialized = window.localStorage.getItem(STORAGE_INITIALIZED_KEY);
    if (alreadyInitialized) {
      return readSkills();
    }

    const existing = readSkills();
    if (existing.length > 0) {
      window.localStorage.setItem(STORAGE_INITIALIZED_KEY, "true");
      return existing;
    }

    writeSkills(DEMO_SKILLS);
    window.localStorage.setItem(STORAGE_INITIALIZED_KEY, "true");
    return DEMO_SKILLS;
  } catch {
    return DEMO_SKILLS;
  }
}
