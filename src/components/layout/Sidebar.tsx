import { NavLink } from "react-router-dom";
import { Compass, ListChecks, Info, Target, X } from "lucide-react";
import { NAV_ITEMS } from "../../utils/constants";
import { cn } from "../../utils/helpers";

const ICONS = {
  "/": Compass,
  "/skills": ListChecks,
  "/about": Info,
} as const;

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
          <Target size={18} />
        </div>
        <div>
          <p className="text-sm font-semibold leading-tight text-slate-900">SkillTrack</p>
          <p className="text-xs leading-tight text-slate-400">Öğrenme Takibi</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map((item) => {
          const Icon = ICONS[item.path];
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                )
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="px-6 py-5 text-xs text-slate-400">
        <p>SkillTrack v1.0</p>
        <p>Verileriniz yalnızca bu tarayıcıda saklanır.</p>
      </div>
    </div>
  );
}

export function Sidebar({ isMobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      <aside className="hidden w-64 flex-shrink-0 border-r border-slate-200 bg-white md:flex">
        <SidebarContent />
      </aside>

      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-slate-900/50"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <div className="relative flex h-full w-72 flex-col bg-white shadow-xl animate-in">
            <button
              type="button"
              onClick={onCloseMobile}
              aria-label="Menüyü kapat"
              className="absolute right-3 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
            >
              <X size={20} />
            </button>
            <SidebarContent onNavigate={onCloseMobile} />
          </div>
        </div>
      )}
    </>
  );
}
