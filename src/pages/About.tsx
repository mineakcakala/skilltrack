import { CheckCircle2 } from "lucide-react";

const TECHNOLOGIES = ["React", "TypeScript", "Tailwind CSS", "Vite", "LocalStorage"];

const FEATURES = [
  "Beceri oluşturma",
  "Beceri düzenleme",
  "Beceri silme",
  "İlerleme takibi",
  "Arama",
  "Filtreleme",
  "LocalStorage ile veri saklama",
];

export function About() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
        <h2 className="text-xl font-semibold text-slate-900">SkillTrack</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          SkillTrack, kullanıcıların öğrenmek istedikleri becerileri planlamalarını ve
          gelişimlerini takip etmelerini sağlayan kişisel öğrenme takip uygulamasıdır.
        </p>

        <div className="mt-6">
          <p className="mb-3 text-sm font-medium text-slate-700">Kullanılan Teknolojiler</p>
          <div className="flex flex-wrap gap-2">
            {TECHNOLOGIES.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
        <p className="mb-4 text-sm font-medium text-slate-700">Özellikler</p>
        <ul className="space-y-2.5">
          {FEATURES.map((feature) => (
            <li key={feature} className="flex items-center gap-2.5 text-sm text-slate-600">
              <CheckCircle2 size={16} className="flex-shrink-0 text-emerald-500" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
