import type { Skill, SkillCategory, SkillPriority, SkillStatus, SortOption } from "../interfaces/Skill";

export const STORAGE_KEY = "skilltrack_skills";
export const STORAGE_INITIALIZED_KEY = "skilltrack_initialized";

export const CATEGORIES: SkillCategory[] = [
  "Yazılım",
  "Tasarım",
  "Dil",
  "Kariyer",
  "Kişisel Gelişim",
  "Diğer",
];

export const PRIORITIES: SkillPriority[] = ["Düşük", "Orta", "Yüksek"];

export const STATUSES: SkillStatus[] = ["Başlanmadı", "Devam Ediyor", "Tamamlandı"];

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "en-yeni", label: "En Yeni" },
  { value: "en-eski", label: "En Eski" },
  { value: "ilerleme-yuksek", label: "İlerleme: Yüksekten Düşüğe" },
  { value: "ilerleme-dusuk", label: "İlerleme: Düşükten Yükseğe" },
  { value: "isim-az", label: "İsim: A-Z" },
];

export const NAV_ITEMS = [
  { path: "/", label: "Genel Bakış" },
  { path: "/skills", label: "Becerilerim" },
  { path: "/about", label: "Hakkında" },
] as const;

/**
 * İlk açılışta LocalStorage boşsa gösterilecek örnek beceriler.
 * Tarihler sabit tutulur, böylece derleme zamanına bağlı kaymalar oluşmaz.
 */
export const DEMO_SKILLS: Skill[] = [
  {
    id: "demo-1",
    name: "React",
    category: "Yazılım",
    description: "Component tabanlı arayüz geliştirme ve modern React ekosistemini öğrenmek.",
    targetHours: 60,
    completedHours: 38,
    priority: "Yüksek",
    status: "Devam Ediyor",
    startDate: "2026-05-01",
    createdAt: "2026-05-01T09:00:00.000Z",
    updatedAt: "2026-07-20T09:00:00.000Z",
  },
  {
    id: "demo-2",
    name: "İngilizce B2",
    category: "Dil",
    description: "İş hayatında akıcı iletişim kurabilecek seviyede İngilizce geliştirmek.",
    targetHours: 100,
    completedHours: 72,
    priority: "Orta",
    status: "Devam Ediyor",
    startDate: "2026-02-15",
    createdAt: "2026-02-15T09:00:00.000Z",
    updatedAt: "2026-08-01T09:00:00.000Z",
  },
  {
    id: "demo-3",
    name: "Git & GitHub",
    category: "Yazılım",
    description: "Versiyon kontrolü, branch yönetimi ve takım halinde çalışma pratikleri.",
    targetHours: 25,
    completedHours: 25,
    priority: "Orta",
    status: "Tamamlandı",
    startDate: "2026-03-10",
    createdAt: "2026-03-10T09:00:00.000Z",
    updatedAt: "2026-04-02T09:00:00.000Z",
  },
  {
    id: "demo-4",
    name: "UI/UX Temelleri",
    category: "Tasarım",
    description: "Kullanıcı deneyimi prensipleri, wireframe ve prototipleme temelleri.",
    targetHours: 40,
    completedHours: 8,
    priority: "Düşük",
    status: "Başlanmadı",
    startDate: "2026-08-05",
    createdAt: "2026-08-05T09:00:00.000Z",
    updatedAt: "2026-08-05T09:00:00.000Z",
  },
];

export const TOAST_DURATION_MS = 3200;
