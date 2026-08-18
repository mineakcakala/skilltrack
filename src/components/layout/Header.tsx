import { Menu, Plus } from "lucide-react";
import { Button } from "../ui/Button";

interface HeaderProps {
  title: string;
  description: string;
  onOpenMobileMenu: () => void;
  onAddSkill: () => void;
}

export function Header({ title, description, onOpenMobileMenu, onAddSkill }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label="Menüyü aç"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:hidden"
          >
            <Menu size={20} />
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold text-slate-900 sm:text-xl">{title}</h1>
            <p className="hidden truncate text-sm text-slate-500 sm:block">{description}</p>
          </div>
        </div>

        <Button onClick={onAddSkill} icon={<Plus size={17} />} className="flex-shrink-0">
          <span className="hidden sm:inline">Yeni Beceri Ekle</span>
          <span className="sm:hidden">Ekle</span>
        </Button>
      </div>
    </header>
  );
}
