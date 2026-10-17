import { NavLink } from "react-router-dom";
import { Radio, Terminal } from "lucide-react";

const navigation = [
  { label: "HOME", path: "/" },
  { label: "TRANSLATOR", path: "/translator" },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-green-900/40 bg-[#050505]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <NavLink
          to="/"
          aria-label="NoxCodec Home"
          className="flex items-center gap-2 group shrink-0 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-400"
        >
          <div className="relative">
            <Radio
              size={20}
              className="text-green-400 group-hover:text-green-300 transition-colors"
              aria-hidden="true"
            />

            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-400 animate-ping motion-reduce:animate-none" />

            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-400" />
          </div>

          <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] text-green-400 group-hover:text-green-300 transition-colors">
            NOX
            <span className="text-white/40">·</span>
            CODEC
          </span>
        </NavLink>

        <nav
          aria-label="Main navigation"
          className="flex items-center gap-3 sm:gap-6"
        >
          {navigation.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              end
              className={({ isActive }) =>
                `relative font-mono text-[10px] sm:text-xs tracking-wider sm:tracking-widest transition-colors rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-400 ${
                  isActive
                    ? "text-green-400"
                    : "text-white/40 hover:text-white/80"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {label}

                  {isActive && (
                    <span className="absolute -bottom-2 left-0 right-0 h-px bg-green-400" />
                  )}
                </>
              )}
            </NavLink>
          ))}

          <div className="hidden md:flex items-center gap-2 border border-green-900/50 bg-green-950/10 rounded px-3 py-1.5">
            <Terminal size={12} className="text-green-500" aria-hidden="true" />

            <span className="font-mono text-[10px] text-green-500 tracking-widest">
              SYSTEM ONLINE
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
}
