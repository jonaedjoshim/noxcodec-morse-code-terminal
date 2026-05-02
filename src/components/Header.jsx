import { Link, useLocation } from 'react-router-dom';
import { Radio, Shield } from 'lucide-react';

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-green-900/40 bg-[#050505]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Radio
              size={20}
              className="text-green-400 group-hover:text-green-300 transition-colors"
            />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-400 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-400" />
          </div>
          <span className="font-mono text-sm font-bold tracking-[0.2em] text-green-400 group-hover:text-green-300 transition-colors">
            NOX<span className="text-white/40">·</span>CODEC
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className={`font-mono text-xs tracking-widest transition-colors ${
              pathname === '/'
                ? 'text-green-400'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            HOME
          </Link>
          <Link
            to="/translator"
            className={`font-mono text-xs tracking-widest transition-colors ${
              pathname === '/translator'
                ? 'text-green-400'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            TRANSLATOR
          </Link>
          <div className="flex items-center gap-1.5 border border-green-900/60 rounded px-2.5 py-1">
            <Shield size={11} className="text-green-500" />
            <span className="font-mono text-[10px] text-green-500 tracking-widest">
              SECURE
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
}
