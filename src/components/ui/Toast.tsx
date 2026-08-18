import { CheckCircle2, Info, X } from "lucide-react";
import { cn } from "../../utils/helpers";

export type ToastVariant = "success" | "info";

export interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastViewportProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export function ToastViewport({ toasts, onDismiss }: ToastViewportProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-[60] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2 sm:bottom-6 sm:right-6"
      role="status"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "flex items-start gap-3 rounded-xl border bg-white px-4 py-3 shadow-card-hover animate-in",
            toast.variant === "success" ? "border-emerald-100" : "border-brand-100",
          )}
        >
          <span
            className={cn(
              "mt-0.5 flex-shrink-0",
              toast.variant === "success" ? "text-emerald-500" : "text-brand-500",
            )}
          >
            {toast.variant === "success" ? <CheckCircle2 size={18} /> : <Info size={18} />}
          </span>
          <p className="flex-1 text-sm text-slate-700">{toast.message}</p>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            aria-label="Bildirimi kapat"
            className="flex-shrink-0 text-slate-400 transition-colors hover:text-slate-600"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
