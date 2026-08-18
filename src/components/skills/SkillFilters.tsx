import { Search } from "lucide-react";
import type { SkillFilters as SkillFiltersType } from "../../interfaces/Skill";
import { CATEGORIES, PRIORITIES, SORT_OPTIONS, STATUSES } from "../../utils/constants";

interface SkillFiltersProps {
  filters: SkillFiltersType;
  onChange: (filters: SkillFiltersType) => void;
}

const selectClasses =
  "rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/40";

export function SkillFilters({ filters, onChange }: SkillFiltersProps) {
  function update<K extends keyof SkillFiltersType>(key: K, value: SkillFiltersType[K]) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="relative flex-1 min-w-[200px]">
        <Search
          size={17}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          value={filters.search}
          onChange={(event) => update("search", event.target.value)}
          placeholder="Beceri ara..."
          aria-label="Beceri ara"
          className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
        />
      </div>

      <select
        value={filters.category}
        onChange={(event) => update("category", event.target.value as SkillFiltersType["category"])}
        aria-label="Kategoriye göre filtrele"
        className={selectClasses}
      >
        <option value="Tümü">Tüm Kategoriler</option>
        {CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        value={filters.status}
        onChange={(event) => update("status", event.target.value as SkillFiltersType["status"])}
        aria-label="Duruma göre filtrele"
        className={selectClasses}
      >
        <option value="Tümü">Tüm Durumlar</option>
        {STATUSES.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <select
        value={filters.priority}
        onChange={(event) => update("priority", event.target.value as SkillFiltersType["priority"])}
        aria-label="Önceliğe göre filtrele"
        className={selectClasses}
      >
        <option value="Tümü">Tüm Öncelikler</option>
        {PRIORITIES.map((priority) => (
          <option key={priority} value={priority}>
            {priority}
          </option>
        ))}
      </select>

      <select
        value={filters.sort}
        onChange={(event) => update("sort", event.target.value as SkillFiltersType["sort"])}
        aria-label="Sıralama seçimi"
        className={selectClasses}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
