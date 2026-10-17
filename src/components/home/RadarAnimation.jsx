export default function RadarAnimation() {
  return (
    <div
      className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center"
      role="img"
      aria-label="Animated green radar scanner"
    >
      <style>{`
        @keyframes radar-sweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes radar-ping-1 {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.4; }
        }

        @keyframes radar-ping-2 {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }

        .radar-sweep {
          animation: radar-sweep 3s linear infinite;
        }

        .radar-ring-1 {
          animation: radar-ping-1 3s ease-in-out infinite;
        }

        .radar-ring-2 {
          animation: radar-ping-2 3s ease-in-out infinite 0.5s;
        }

        @media (prefers-reduced-motion: reduce) {
          .radar-sweep,
          .radar-ring-1,
          .radar-ring-2,
          .radar-blip {
            animation: none !important;
          }
        }
      `}</style>

      <div className="radar-ring-2 absolute inset-0 rounded-full border border-green-500/20" />

      <div className="radar-ring-1 absolute inset-[20%] rounded-full border border-green-500/40" />

      <div className="absolute inset-[40%] rounded-full border border-green-500/60" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-px bg-green-900/30" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-full w-px bg-green-900/30" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center radar-sweep">
        <div
          className="absolute bottom-1/2 left-1/2 -ml-px"
          style={{
            width: "2px",
            height: "44%",
            background:
              "linear-gradient(to top, rgba(74,222,128,0.9), transparent)",
            borderRadius: "2px",
            transformOrigin: "bottom center",
          }}
        />
      </div>

      <div className="relative w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_2px_rgba(74,222,128,0.6)]" />

      <div className="radar-blip absolute top-[28%] left-[62%] w-1.5 h-1.5 rounded-full bg-green-400/70 animate-pulse" />

      <div
        className="radar-blip absolute top-[58%] left-[25%] w-1 h-1 rounded-full bg-green-400/50 animate-pulse"
        style={{ animationDelay: "1.2s" }}
      />
    </div>
  );
}
