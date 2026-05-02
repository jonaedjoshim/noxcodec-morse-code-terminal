import { CheckCircle, AlertCircle } from 'lucide-react';

export default function Toast({ toast }) {
  if (!toast) return null;

  const isError = toast.type === 'error';

  return (
    <div className="toast toast-top toast-center z-[100]">
      <div
        className={`flex items-center gap-2 px-4 py-3 rounded border font-mono text-xs tracking-wider shadow-lg
          ${isError
            ? 'bg-red-950/90 border-red-700/60 text-red-300'
            : 'bg-green-950/90 border-green-700/60 text-green-300'
          }`}
      >
        {isError ? (
          <AlertCircle size={14} className="text-red-400 shrink-0" />
        ) : (
          <CheckCircle size={14} className="text-green-400 shrink-0" />
        )}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
