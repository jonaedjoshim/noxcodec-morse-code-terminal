import { Link } from "react-router-dom";
import { Radio, Github, ArrowUp } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };

  return (
    <footer className="border-t border-green-900/20 bg-[#050505] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link
              to="/"
              className="flex items-center gap-2 group rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-400"
            >
              <Radio
                size={15}
                className="text-green-500 group-hover:text-green-300 transition-colors"
                aria-hidden="true"
              />

              <span className="font-mono text-xs font-bold text-green-500 tracking-widest">
                NOX·CODEC
              </span>
            </Link>

            <p className="font-mono text-[10px] text-white/30 text-center md:text-left">
              Morse Code Intelligence Terminal
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex items-center gap-5"
          >
            <Link
              to="/"
              className="font-mono text-[10px] text-white/40 hover:text-green-400 tracking-widest transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-400 rounded"
            >
              HOME
            </Link>

            <Link
              to="/translator"
              className="font-mono text-[10px] text-white/40 hover:text-green-400 tracking-widest transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-400 rounded"
            >
              TRANSLATOR
            </Link>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="flex items-center gap-1 font-mono text-[10px] text-white/40 hover:text-green-400 tracking-widest transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-400 rounded"
            >
              <ArrowUp size={12} aria-hidden="true" />
              TOP
            </button>
          </nav>
        </div>

        <div className="h-px bg-white/5 my-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-white/25 tracking-wider text-center">
            © {year} NOXCODEC. ALL RIGHTS RESERVED.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="font-mono text-[9px] text-white/25 tracking-wider">
              CLIENT-SIDE PROCESSING
            </span>

            <span className="w-1 h-1 rounded-full bg-green-900" />

            <span className="font-mono text-[9px] text-white/25 tracking-wider">
              NO ACCOUNT REQUIRED
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse motion-reduce:animate-none" />

            <span className="font-mono text-[10px] text-green-700 tracking-widest">
              TERMINAL READY
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
