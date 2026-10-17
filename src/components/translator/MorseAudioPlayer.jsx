import { useEffect, useRef } from "react";
import { Play, Square, Volume2, Radio, Gauge, Activity } from "lucide-react";

import { useMorseAudio } from "../../hooks/useMorseAudio";

export default function MorseAudioPlayer({ morseText }) {
  const { isPlaying, isSignalActive, speed, error, play, stop, changeSpeed } =
    useMorseAudio();

  const previousMorseRef = useRef(morseText);
  const hasSignal = Boolean(morseText?.trim());

  useEffect(() => {
    if (previousMorseRef.current !== morseText) {
      previousMorseRef.current = morseText;
      stop();
    }
  }, [morseText, stop]);

  return (
    <section className="mt-12" aria-labelledby="audio-player-title">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-px h-5 bg-green-500" />

        <h2
          id="audio-player-title"
          className="font-mono text-sm font-bold tracking-[0.2em] text-white/70 uppercase"
        >
          Signal Transmission
        </h2>
      </div>

      <div className="relative overflow-hidden bg-[#0a0a0a] border border-green-900/30 rounded-lg">
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#4ade80 1px, transparent 1px), linear-gradient(90deg, #4ade80 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
            <div className="flex items-center gap-2">
              <Radio size={15} className="text-green-500" aria-hidden="true" />

              <span className="font-mono text-[10px] text-green-500 tracking-widest">
                MORSE AUDIO TERMINAL
              </span>
            </div>

            <div
              className="flex items-center gap-2"
              role="status"
              aria-live="polite"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isPlaying
                    ? "bg-green-400 animate-pulse motion-reduce:animate-none"
                    : "bg-white/20"
                }`}
              />

              <span
                className={`font-mono text-[10px] tracking-widest ${
                  isPlaying ? "text-green-400" : "text-white/30"
                }`}
              >
                {isPlaying ? "TRANSMITTING" : "STANDBY"}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-6">
            <div
              className={`relative flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full border transition-all duration-75 ${
                isSignalActive
                  ? "border-green-400 bg-green-500/20 shadow-[0_0_60px_rgba(74,222,128,0.3)]"
                  : "border-green-900/40 bg-green-950/10"
              }`}
            >
              <div
                className={`absolute inset-3 rounded-full border transition-colors duration-75 ${
                  isSignalActive ? "border-green-400/60" : "border-green-900/30"
                }`}
              />

              <div
                className={`w-12 h-12 rounded-full transition-all duration-75 ${
                  isSignalActive
                    ? "bg-green-400 shadow-[0_0_35px_12px_rgba(74,222,128,0.6)]"
                    : "bg-green-950 border border-green-800/40"
                }`}
                role="img"
                aria-label={
                  isSignalActive
                    ? "Morse signal active"
                    : "Morse signal inactive"
                }
              />
            </div>

            <div className="mt-7 flex items-center gap-2">
              <Activity
                size={13}
                className={isPlaying ? "text-green-400" : "text-white/20"}
                aria-hidden="true"
              />

              <span className="font-mono text-[10px] tracking-[0.2em] text-white/30">
                {isPlaying ? "SIGNAL IN PROGRESS" : "AWAITING TRANSMISSION"}
              </span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="w-full sm:w-auto">
                <div className="flex items-center gap-2 mb-3">
                  <Gauge
                    size={14}
                    className="text-green-500/60"
                    aria-hidden="true"
                  />

                  <label
                    htmlFor="morse-speed"
                    className="font-mono text-[10px] tracking-widest text-white/40"
                  >
                    TRANSMISSION SPEED
                  </label>
                </div>

                <div className="flex items-center gap-4">
                  <input
                    id="morse-speed"
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={speed}
                    onChange={(event) => changeSpeed(event.target.value)}
                    className="w-full sm:w-36 accent-green-500 cursor-pointer"
                  />

                  <span className="font-mono text-xs text-green-400 min-w-[65px]">
                    {speed} WPM
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {isPlaying ? (
                  <button
                    type="button"
                    onClick={stop}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold tracking-widest rounded transition-all active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
                  >
                    <Square size={13} fill="currentColor" aria-hidden="true" />
                    STOP
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => play(morseText)}
                    disabled={!hasSignal}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-mono text-xs font-bold tracking-widest rounded transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
                  >
                    <Play size={14} fill="currentColor" aria-hidden="true" />
                    PLAY MORSE
                  </button>
                )}
              </div>
            </div>

            {error && (
              <p role="alert" className="mt-4 font-mono text-xs text-red-400">
                [ ERROR ] {error}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2">
              <Volume2 size={12} className="text-white/20" aria-hidden="true" />

              <span className="font-mono text-[9px] text-white/20">
                600 HZ SIGNAL FREQUENCY
              </span>
            </div>

            <span className="font-mono text-[9px] text-green-700 tracking-widest">
              NOX AUDIO ENGINE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
