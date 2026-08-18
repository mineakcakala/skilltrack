import type { Skill } from "../../interfaces/Skill";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";

interface DeleteConfirmModalProps {
  skill: Skill | null;
  onCancel: () => void;
  onConfirm: (skill: Skill) => void;
}

export function DeleteConfirmModal({ skill, onCancel, onConfirm }: DeleteConfirmModalProps) {
  return (
    <Modal isOpen={Boolean(skill)} onClose={onCancel} title="Beceriyi Sil" maxWidth="sm">
      {skill && (
        <div>
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-slate-900">{skill.name}</span> becerisini silmek
            istediğinize emin misiniz? Bu işlem geri alınamaz.
          </p>
          <div className="mt-6 flex items-center justify-end gap-3">
            <Button variant="secondary" onClick={onCancel}>
              İptal
            </Button>
            <Button variant="danger" onClick={() => onConfirm(skill)}>
              Evet, Sil
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
