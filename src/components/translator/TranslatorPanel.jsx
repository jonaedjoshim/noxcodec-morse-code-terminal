import { Copy } from "lucide-react";

export default function TranslatorPanel({
  id,
  label,
  type,
  value,
  onChange,
  onCopy,
  isEditable,
  placeholder,
  count,
  countLabel,
}) {
  return (
    <div className="flex flex-col gap-2 min-w-0">
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor={id}
          className="font-mono text-[10px] tracking-widest text-white/40 uppercase"
        >
          [{isEditable ? "INPUT" : "OUTPUT"}] {label}
        </label>

        <button
          type="button"
          onClick={() => onCopy(value, label)}
          disabled={!value}
          aria-label={`Copy ${label.toLowerCase()}`}
          className="flex items-center gap-1 font-mono text-[10px] text-white/30 hover:text-green-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-400 rounded"
        >
          <Copy size={11} aria-hidden="true" />
          COPY
        </button>
      </div>

      <textarea
        id={id}
        value={value}
        onChange={(event) => {
          if (isEditable) {
            onChange(event.target.value);
          }
        }}
        readOnly={!isEditable}
        placeholder={placeholder}
        spellCheck={false}
        autoComplete="off"
        autoCapitalize="off"
        aria-label={label}
        aria-readonly={!isEditable}
        className={`w-full h-56 sm:h-64 bg-[#0a0a0a] border rounded p-4 font-mono text-sm placeholder-white/15 resize-none overflow-y-auto outline-none transition-all leading-relaxed ${
          type === "morse" ? "tracking-widest" : ""
        } ${
          isEditable
            ? "border-green-800/60 text-green-300 focus:border-green-600 focus:shadow-[0_0_20px_rgba(74,222,128,0.07)]"
            : type === "morse"
              ? "border-white/10 text-green-500/70"
              : "border-white/10 text-white/50"
        }`}
      />

      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] text-white/20">
          {count} {countLabel}
        </span>

        <span
          className={`font-mono text-[9px] tracking-widest ${
            isEditable ? "text-green-500/50" : "text-white/20"
          }`}
        >
          {isEditable ? "EDITABLE" : "READ ONLY"}
        </span>
      </div>
    </div>
  );
}
