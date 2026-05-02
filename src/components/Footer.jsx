import { Radio } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-green-900/20 bg-[#050505] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Radio size={14} className="text-green-600" />
          <span className="font-mono text-[10px] text-white/20 tracking-widest">
            NOX CODEC SYSTEMS © {year}
          </span>
        </div>
        <div className="flex gap-6">
          {['CLASSIFIED', 'ENCRYPTED', 'OFFLINE-CAPABLE'].map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] tracking-widest text-white/15"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="font-mono text-[10px] text-green-700 tracking-widest">
            UPLINK ACTIVE
          </span>
        </div>
      </div>
    </footer>
  );
}
