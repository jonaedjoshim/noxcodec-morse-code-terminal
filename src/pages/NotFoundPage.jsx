import { Link } from "react-router-dom";
import { AlertTriangle, ArrowLeft, Terminal, Radio } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-[#050505] px-4 pt-20 pb-12">
      <div className="w-full max-w-xl text-center">
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="w-8 h-px bg-red-900/70" />

          <AlertTriangle
            size={15}
            className="text-red-500"
            aria-hidden="true"
          />

          <span className="font-mono text-[10px] text-red-500 tracking-[0.3em]">
            SIGNAL LOST
          </span>

          <span className="w-8 h-px bg-red-900/70" />
        </div>

        <div className="relative mb-6">
          <h1 className="font-mono text-8xl sm:text-9xl font-black text-green-500/90 tracking-tighter">
            404
          </h1>

          <div className="absolute inset-0 blur-3xl bg-green-500/5 -z-10" />
        </div>

        <h2 className="font-mono text-xl sm:text-2xl font-bold text-white/80 tracking-wider mb-4">
          TRANSMISSION NOT FOUND
        </h2>

        <p className="font-mono text-xs sm:text-sm text-white/35 leading-relaxed max-w-md mx-auto mb-8">
          The requested transmission could not be located. The signal may have
          been lost, or the destination does not exist.
        </p>

        <div className="bg-[#0a0a0a] border border-green-900/30 rounded p-5 mb-8 text-left">
          <div className="flex items-center gap-2 mb-4">
            <Terminal size={14} className="text-green-500" aria-hidden="true" />

            <span className="font-mono text-[10px] text-green-500 tracking-widest">
              SYSTEM DIAGNOSTICS
            </span>
          </div>

          <div className="space-y-2 font-mono text-[11px]">
            <p className="text-white/40">
              <span className="text-green-500">$</span> locate transmission
            </p>

            <p className="text-red-400/70">[ERROR] Destination not found</p>

            <p className="text-white/40">
              <span className="text-green-500">$</span> restore connection
            </p>

            <p className="text-green-400/70">[READY] Return to main terminal</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-mono text-xs font-bold tracking-widest rounded transition-all active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            RETURN HOME
          </Link>

          <Link
            to="/translator"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-green-800/60 text-green-400 hover:bg-green-950/30 font-mono text-xs tracking-widest rounded transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-400"
          >
            <Radio size={14} aria-hidden="true" />
            OPEN TRANSLATOR
          </Link>
        </div>

        <p className="font-mono text-[10px] text-green-900 tracking-[0.3em] mt-10">
          ....- ----- ....-
        </p>
      </div>
    </div>
  );
}
