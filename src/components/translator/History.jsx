import { Clock, Trash2, ChevronRight } from 'lucide-react';

function timeAgo(isoString) {
  const diff = Math.floor((Date.now() - new Date(isoString)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function History({ logs, handleLoadLog, handleClearLogs }) {
  if (!logs || logs.length === 0) {
    return (
      <div
        className="mt-16 text-center py-12 border border-dashed border-white/10 rounded"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <Clock size={24} className="mx-auto mb-3 text-white/15" />
        <p className="font-mono text-xs text-white/20 tracking-widest">
          NO TRANSMISSIONS LOGGED
        </p>
        <p className="font-mono text-[10px] text-white/10 mt-1">
          Encode a message to begin your mission record.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-16" data-aos="fade-up" data-aos-delay="200">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-px h-5 bg-green-500" />
          <h2 className="font-mono text-sm font-bold tracking-[0.2em] text-white/70 uppercase">
            Transmission Logs
          </h2>
          <span className="font-mono text-[10px] text-green-500/70 border border-green-900/60 px-1.5 py-0.5 rounded">
            {logs.length}/5
          </span>
        </div>
        <button
          onClick={handleClearLogs}
          className="flex items-center gap-1.5 font-mono text-[10px] text-red-600/50 hover:text-red-400 tracking-widest transition-colors"
        >
          <Trash2 size={11} />
          WIPE LOGS
        </button>
      </div>

      {/* Log Entries */}
      <div className="flex flex-col gap-2">
        {logs.map((log, i) => (
          <button
            key={log.id}
            onClick={() => handleLoadLog(log)}
            className="group w-full text-left flex items-center gap-4 p-4 bg-[#0a0a0a] border border-white/5 hover:border-green-800/60 rounded transition-all hover:bg-green-950/10"
            data-aos="fade-up"
            data-aos-delay={i * 50}
          >
            {/* Index */}
            <span className="font-mono text-[10px] text-white/20 w-4 shrink-0">
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="font-mono text-xs text-white/70 truncate group-hover:text-green-300 transition-colors">
                {log.plain}
              </p>
              <p className="font-mono text-[10px] text-white/25 truncate mt-0.5 tracking-wider">
                {log.morse}
              </p>
            </div>

            {/* Time + Arrow */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="font-mono text-[9px] text-white/20">
                {timeAgo(log.timestamp)}
              </span>
              <ChevronRight
                size={12}
                className="text-white/20 group-hover:text-green-500 transition-colors"
              />
            </div>
          </button>
        ))}
      </div>

      <p className="font-mono text-[9px] text-white/15 text-center mt-4 tracking-widest">
        CLICK ANY LOG TO RELOAD INTO TRANSLATOR — STORED LOCALLY, NEVER TRANSMITTED
      </p>
    </div>
  );
}
