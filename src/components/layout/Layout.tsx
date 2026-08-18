import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Modal } from "../ui/Modal";
import { SkillForm } from "../skills/SkillForm";
import { useSkillsContext } from "../../context/SkillsContext";
import { useToast } from "../../context/ToastContext";
import type { Skill, SkillFormValues } from "../../interfaces/Skill";

const PAGE_META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Genel Bakış",
    description: "Öğrenme hedeflerinin güncel durumunu takip et.",
  },
  "/skills": {
    title: "Becerilerim",
    description: "Tüm becerilerini görüntüle, düzenle ve yönet.",
  },
  "/about": {
    title: "Hakkında",
    description: "SkillTrack hakkında bilgi al.",
  },
};

export function Layout() {
  const location = useLocation();
  const { addSkill, updateSkill } = useSkillsContext();
  const { showToast } = useToast();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFormOpen, setFormOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const meta = PAGE_META[location.pathname] ?? PAGE_META["/"];

  function openAddForm() {
    setEditingSkill(null);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingSkill(null);
  }

  function handleSubmit(values: SkillFormValues) {
    if (editingSkill) {
      updateSkill(editingSkill.id, values);
      showToast("Beceri güncellendi.");
    } else {
      addSkill(values);
      showToast("Beceri başarıyla eklendi.");
    }
    closeForm();
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar isMobileOpen={isMobileMenuOpen} onCloseMobile={() => setMobileMenuOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          title={meta.title}
          description={meta.description}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onAddSkill={openAddForm}
        />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet
            context={{
              onEditSkill: (skill: Skill) => {
                setEditingSkill(skill);
                setFormOpen(true);
              },
              onAddSkill: openAddForm,
            }}
          />
        </main>
      </div>

      <Modal
        isOpen={isFormOpen}
        onClose={closeForm}
        title={editingSkill ? "Beceriyi Düzenle" : "Yeni Beceri Ekle"}
        description={
          editingSkill
            ? "Beceri bilgilerini güncelle."
            : "Öğrenmek istediğin yeni bir beceri ekle."
        }
        maxWidth="lg"
      >
        <SkillForm skill={editingSkill} onSubmit={handleSubmit} onCancel={closeForm} />
      </Modal>
    </div>
  );
}
