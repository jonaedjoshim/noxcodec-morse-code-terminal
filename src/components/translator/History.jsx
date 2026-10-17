import { useCallback, useState } from "react";

import {
  Clock3,
  Trash2,
  ChevronRight,
  Search,
  X,
  Database,
} from "lucide-react";

import { useDialogFocus } from "../../hooks/useDialogFocus";

const MAX_LOGS = 5;

function formatTime(timestamp) {
  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }

  const seconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));

  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

  return date.toLocaleDateString();
}

function EmptyHistory({ isSearching, onClearSearch }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-white/10 rounded bg-[#0a0a0a]/50">
      {isSearching ? (
        <Search size={24} className="text-white/20 mb-4" aria-hidden="true" />
      ) : (
        <Database size={24} className="text-white/20 mb-4" aria-hidden="true" />
      )}

      <p className="font-mono text-xs text-white/40 tracking-widest text-center">
        {isSearching ? "NO MATCHING TRANSMISSIONS" : "NO TRANSMISSIONS LOGGED"}
      </p>

      <p className="font-mono text-[10px] text-white/20 mt-2 text-center leading-relaxed">
        {isSearching
          ? "Try searching with a different message."
          : "Encode or decode a message to begin your mission record."}
      </p>

      {isSearching && (
        <button
          type="button"
          onClick={onClearSearch}
          className="mt-5 px-4 py-2 border border-green-800/60 text-green-400 font-mono text-[10px] tracking-widest rounded hover:bg-green-950/30 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-400"
        >
          CLEAR SEARCH
        </button>
      )}
    </div>
  );
}

function HistoryItem({ log, index, onLoad }) {
  const date = new Date(log.timestamp);
  const validDate = !Number.isNaN(date.getTime());

  return (
    <li>
      <button
        type="button"
        onClick={() => onLoad(log)}
        aria-label={`Restore transmission: ${log.plain}`}
        className="group w-full min-w-0 flex items-center gap-3 sm:gap-4 p-3 sm:p-4 text-left bg-[#0a0a0a] border border-white/5 hover:border-green-800/60 rounded transition-all hover:bg-green-950/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-400"
      >
        <span className="font-mono text-[10px] text-white/20 shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex-1 min-w-0">
          <p className="font-mono text-xs text-white/70 truncate group-hover:text-green-300 transition-colors">
            {log.plain}
          </p>

          <p className="font-mono text-[10px] text-green-500/40 truncate mt-1 tracking-wider">
            {log.morse}
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <span
            className="font-mono text-[9px] text-white/25 whitespace-nowrap"
            title={validDate ? date.toLocaleString() : "Unknown time"}
          >
            {formatTime(log.timestamp)}
          </span>

          <ChevronRight
            size={14}
            className="text-white/20 group-hover:text-green-400 transition-colors"
            aria-hidden="true"
          />
        </div>
      </button>
    </li>
  );
}

export default function History({ logs, handleLoadLog, handleClearLogs }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const closeConfirmation = useCallback(() => {
    setShowConfirmation(false);
  }, []);

  const dialogRef = useDialogFocus(showConfirmation, closeConfirmation);

  const safeLogs = Array.isArray(logs)
    ? logs.filter(
        (log) =>
          log && typeof log.plain === "string" && typeof log.morse === "string",
      )
    : [];

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredLogs = safeLogs.filter(
    (log) =>
      log.plain.toLowerCase().includes(normalizedQuery) ||
      log.morse.toLowerCase().includes(normalizedQuery),
  );

  const hasLogs = safeLogs.length > 0;
  const isSearching = normalizedQuery.length > 0;

  const handleConfirmClear = () => {
    handleClearLogs();
    setShowConfirmation(false);
    setSearchQuery("");
  };

  return (
    <section
      className="mt-16"
      data-aos="fade-up"
      data-aos-delay="200"
      aria-labelledby="history-title"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-px h-5 bg-green-500" />

          <h2
            id="history-title"
            className="font-mono text-sm font-bold tracking-[0.2em] text-white/70 uppercase"
          >
            Transmission Logs
          </h2>

          <span className="font-mono text-[10px] text-green-500/70 border border-green-900/60 px-2 py-1 rounded">
            {safeLogs.length}/{MAX_LOGS}
          </span>
        </div>

        {hasLogs && (
          <button
            type="button"
            onClick={() => setShowConfirmation(true)}
            className="flex items-center gap-2 font-mono text-[10px] text-red-500/60 hover:text-red-400 tracking-widest transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-400 rounded"
          >
            <Trash2 size={13} aria-hidden="true" />
            WIPE LOGS
          </button>
        )}
      </div>

      {hasLogs && (
        <div className="relative mb-5">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500/40 pointer-events-none"
            aria-hidden="true"
          />

          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search transmissions..."
            aria-label="Search transmission history"
            className="w-full bg-[#0a0a0a] border border-white/10 rounded py-3 pl-10 pr-10 font-mono text-xs text-green-300 placeholder-white/20 outline-none focus:border-green-700 transition-colors"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-green-400 transition-colors"
            >
              <X size={14} aria-hidden="true" />
            </button>
          )}
        </div>
      )}

      {filteredLogs.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {filteredLogs.map((log, index) => (
            <HistoryItem
              key={log.id}
              log={log}
              index={index}
              onLoad={handleLoadLog}
            />
          ))}
        </ul>
      ) : (
        <EmptyHistory
          isSearching={isSearching && hasLogs}
          onClearSearch={() => setSearchQuery("")}
        />
      )}

      {hasLogs && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-5">
          <div className="flex items-center gap-2">
            <Clock3 size={12} className="text-green-700" aria-hidden="true" />

            <p className="font-mono text-[9px] text-white/20 tracking-wider">
              STORED LOCALLY IN YOUR BROWSER
            </p>
          </div>

          <p className="font-mono text-[9px] text-white/20 tracking-wider">
            {filteredLogs.length} TRANSMISSION
            {filteredLogs.length !== 1 ? "S" : ""} FOUND
          </p>
        </div>
      )}

      {showConfirmation && (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="clear-history-title"
          aria-describedby="clear-history-description"
        >
          <div className="w-full max-w-md bg-[#0a0a0a] border border-red-900/50 rounded p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-9 h-9 border border-red-900/50 bg-red-950/30 rounded">
                <Trash2 size={17} className="text-red-400" aria-hidden="true" />
              </div>

              <div>
                <p className="font-mono text-[10px] text-red-500 tracking-widest mb-1">
                  SYSTEM WARNING
                </p>

                <h3
                  id="clear-history-title"
                  className="font-mono text-sm font-bold text-white/80"
                >
                  Wipe Transmission Logs?
                </h3>
              </div>
            </div>

            <p
              id="clear-history-description"
              className="font-mono text-xs text-white/40 leading-relaxed mb-6"
            >
              This will permanently remove all saved transmissions from this
              browser. This action cannot be undone.
            </p>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
              <button
                type="button"
                onClick={closeConfirmation}
                className="px-4 py-2.5 border border-white/10 text-white/50 hover:text-white/80 hover:border-white/30 font-mono text-xs tracking-widest rounded transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-400"
              >
                CANCEL
              </button>

              <button
                type="button"
                onClick={handleConfirmClear}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold tracking-widest rounded transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-400"
              >
                <Trash2 size={13} aria-hidden="true" />
                WIPE ALL LOGS
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
