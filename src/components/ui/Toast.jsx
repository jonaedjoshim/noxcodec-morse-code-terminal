import { CheckCircle2, AlertCircle, X } from "lucide-react";

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isError = toast.type === "error";

  return (
    <div
      className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-sm"
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
      aria-atomic="true"
    >
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded border shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-md animate-fade-in ${
          isError
            ? "bg-red-950/95 border-red-700/60 text-red-300"
            : "bg-green-950/95 border-green-700/60 text-green-300"
        }`}
      >
        {isError ? (
          <AlertCircle
            size={17}
            className="text-red-400 shrink-0"
            aria-hidden="true"
          />
        ) : (
          <CheckCircle2
            size={17}
            className="text-green-400 shrink-0"
            aria-hidden="true"
          />
        )}

        <div className="flex-1 min-w-0">
          <p className="font-mono text-[10px] font-bold tracking-widest mb-1">
            {isError ? "SYSTEM ERROR" : "OPERATION SUCCESSFUL"}
          </p>

          <p className="font-mono text-xs leading-relaxed break-words">
            {toast.message}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className="p-1 text-white/30 hover:text-white/80 transition-colors rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-400"
        >
          <X size={15} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
