import { useState, type FormEvent } from "react";
import type { Skill, SkillFormValues } from "../../interfaces/Skill";
import { CATEGORIES, PRIORITIES, STATUSES } from "../../utils/constants";
import { cn, todayISODate, validateSkillForm, type FormValidationErrors } from "../../utils/helpers";
import { Button } from "../ui/Button";

interface SkillFormProps {
  skill: Skill | null;
  onSubmit: (values: SkillFormValues) => void;
  onCancel: () => void;
}

const EMPTY_VALUES: SkillFormValues = {
  name: "",
  category: "",
  description: "",
  targetHours: "",
  completedHours: "0",
  priority: "",
  status: "Başlanmadı",
  startDate: todayISODate(),
};

function skillToFormValues(skill: Skill): SkillFormValues {
  return {
    name: skill.name,
    category: skill.category,
    description: skill.description,
    targetHours: String(skill.targetHours),
    completedHours: String(skill.completedHours),
    priority: skill.priority,
    status: skill.status,
    startDate: skill.startDate,
  };
}

const inputClasses =
  "w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/40";

function fieldBorder(hasError: boolean) {
  return hasError ? "border-rose-300 focus:border-rose-400" : "border-slate-200 focus:border-brand-400";
}

export function SkillForm({ skill, onSubmit, onCancel }: SkillFormProps) {
  const [values, setValues] = useState<SkillFormValues>(
    skill ? skillToFormValues(skill) : EMPTY_VALUES,
  );
  const [errors, setErrors] = useState<FormValidationErrors>({});

  function updateField<K extends keyof SkillFormValues>(key: K, value: SkillFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const validationErrors = validateSkillForm(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">
          Beceri adı
        </label>
        <input
          id="name"
          type="text"
          value={values.name}
          onChange={(event) => updateField("name", event.target.value)}
          placeholder="Örn. React"
          className={cn(inputClasses, fieldBorder(Boolean(errors.name)))}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1.5 text-xs text-rose-600">
            {errors.name}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-slate-700">
            Kategori
          </label>
          <select
            id="category"
            value={values.category}
            onChange={(event) => updateField("category", event.target.value as SkillFormValues["category"])}
            className={cn(inputClasses, fieldBorder(Boolean(errors.category)), "bg-white")}
            aria-invalid={Boolean(errors.category)}
          >
            <option value="">Kategori seç</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && <p className="mt-1.5 text-xs text-rose-600">{errors.category}</p>}
        </div>

        <div>
          <label htmlFor="startDate" className="mb-1.5 block text-sm font-medium text-slate-700">
            Başlangıç tarihi
          </label>
          <input
            id="startDate"
            type="date"
            value={values.startDate}
            onChange={(event) => updateField("startDate", event.target.value)}
            className={cn(inputClasses, fieldBorder(Boolean(errors.startDate)))}
            aria-invalid={Boolean(errors.startDate)}
          />
          {errors.startDate && <p className="mt-1.5 text-xs text-rose-600">{errors.startDate}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-slate-700">
          Açıklama
        </label>
        <textarea
          id="description"
          value={values.description}
          onChange={(event) => updateField("description", event.target.value)}
          placeholder="Bu beceriyle ilgili kısa bir not ekle"
          rows={3}
          className={cn(inputClasses, fieldBorder(false), "resize-none")}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="targetHours" className="mb-1.5 block text-sm font-medium text-slate-700">
            Hedef çalışma süresi (saat)
          </label>
          <input
            id="targetHours"
            type="number"
            min={1}
            value={values.targetHours}
            onChange={(event) => updateField("targetHours", event.target.value)}
            placeholder="Örn. 60"
            className={cn(inputClasses, fieldBorder(Boolean(errors.targetHours)))}
            aria-invalid={Boolean(errors.targetHours)}
          />
          {errors.targetHours && <p className="mt-1.5 text-xs text-rose-600">{errors.targetHours}</p>}
        </div>

        <div>
          <label htmlFor="completedHours" className="mb-1.5 block text-sm font-medium text-slate-700">
            Tamamlanan süre (saat)
          </label>
          <input
            id="completedHours"
            type="number"
            min={0}
            value={values.completedHours}
            onChange={(event) => updateField("completedHours", event.target.value)}
            placeholder="Örn. 10"
            className={cn(inputClasses, fieldBorder(Boolean(errors.completedHours)))}
            aria-invalid={Boolean(errors.completedHours)}
          />
          {errors.completedHours && (
            <p className="mt-1.5 text-xs text-rose-600">{errors.completedHours}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="priority" className="mb-1.5 block text-sm font-medium text-slate-700">
            Öncelik
          </label>
          <select
            id="priority"
            value={values.priority}
            onChange={(event) => updateField("priority", event.target.value as SkillFormValues["priority"])}
            className={cn(inputClasses, fieldBorder(Boolean(errors.priority)), "bg-white")}
            aria-invalid={Boolean(errors.priority)}
          >
            <option value="">Öncelik seç</option>
            {PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
          {errors.priority && <p className="mt-1.5 text-xs text-rose-600">{errors.priority}</p>}
        </div>

        <div>
          <label htmlFor="status" className="mb-1.5 block text-sm font-medium text-slate-700">
            Durum
          </label>
          <select
            id="status"
            value={values.status}
            onChange={(event) => updateField("status", event.target.value as SkillFormValues["status"])}
            className={cn(inputClasses, fieldBorder(Boolean(errors.status)), "bg-white")}
            aria-invalid={Boolean(errors.status)}
          >
            <option value="">Durum seç</option>
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          {errors.status && <p className="mt-1.5 text-xs text-rose-600">{errors.status}</p>}
          <p className="mt-1.5 text-xs text-slate-400">
            Tamamlanan süre hedefe ulaştığında durum otomatik olarak "Tamamlandı" olur.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          İptal
        </Button>
        <Button type="submit">{skill ? "Değişiklikleri Kaydet" : "Kaydet"}</Button>
      </div>
    </form>
  );
}
