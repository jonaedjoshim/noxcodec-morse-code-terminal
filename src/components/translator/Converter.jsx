import { ArrowLeftRight, Trash2, Link2, Zap } from "lucide-react";

import TranslatorPanel from "./TranslatorPanel";

export default function Converter({
  plainText,
  morseText,
  mode,
  handlePlainChange,
  handleMorseChange,
  handleSwapMode,
  handleCopy,
  handleClear,
  handleGenerateLink,
}) {
  const isTextToMorse = mode === "textToMorse";

  const plainPlaceholder = isTextToMorse
    ? "Type your message here, Agent..."
    : "Decoded output appears here...";

  const morsePlaceholder = isTextToMorse
    ? "Morse output transmits here..."
    : "Enter dots, dashes, and / for spaces...";

  const morseTokenCount = morseText
    .split(/\s+/)
    .filter((token) => token && token !== "/").length;

  return (
    <section
      className="w-full"
      data-aos="fade-up"
      data-aos-delay="100"
      aria-label="Morse code converter"
    >
      <div className="flex items-center justify-center gap-3 mb-6">
        <span
          className={`font-mono text-xs tracking-widest transition-colors ${
            isTextToMorse ? "text-green-400" : "text-white/30"
          }`}
        >
          PLAINTEXT
        </span>

        <button
          type="button"
          onClick={handleSwapMode}
          title="Swap translation direction"
          aria-label={`Switch to ${
            isTextToMorse ? "Morse to text" : "Text to Morse"
          } translation`}
          className="flex items-center justify-center w-8 h-8 rounded border border-green-800/60 bg-green-950/30 hover:bg-green-900/40 hover:border-green-600 transition-all group focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-400"
        >
          <ArrowLeftRight
            size={14}
            aria-hidden="true"
            className="text-green-500 group-hover:text-green-300 transition-colors"
          />
        </button>

        <span
          className={`font-mono text-xs tracking-widest transition-colors ${
            !isTextToMorse ? "text-green-400" : "text-white/30"
          }`}
        >
          MORSE
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TranslatorPanel
          id="plain-text"
          label="Plain Text"
          type="plain"
          value={plainText}
          onChange={handlePlainChange}
          onCopy={handleCopy}
          isEditable={isTextToMorse}
          placeholder={plainPlaceholder}
          count={plainText.length}
          countLabel="CHARS"
        />

        <TranslatorPanel
          id="morse-code"
          label="Morse Code"
          type="morse"
          value={morseText}
          onChange={handleMorseChange}
          onCopy={handleCopy}
          isEditable={!isTextToMorse}
          placeholder={morsePlaceholder}
          count={morseTokenCount}
          countLabel="TOKENS"
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
        <button
          type="button"
          onClick={handleGenerateLink}
          className="flex items-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-400 text-black font-mono text-xs font-bold tracking-widest rounded transition-all hover:shadow-[0_0_20px_rgba(74,222,128,0.3)] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
        >
          <Link2 size={13} aria-hidden="true" />
          GENERATE SECRET LINK
        </button>

        <button
          type="button"
          onClick={() =>
            handleCopy(`${plainText}\n\n${morseText}`, "Full transmission")
          }
          disabled={!plainText && !morseText}
          className="flex items-center gap-2 px-4 py-2.5 border border-green-800/60 hover:border-green-600 text-green-400 font-mono text-xs tracking-widest rounded transition-all hover:bg-green-950/30 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-400"
        >
          <Zap size={13} aria-hidden="true" />
          COPY FULL TRANSMISSION
        </button>

        <button
          type="button"
          onClick={handleClear}
          disabled={!plainText && !morseText}
          className="flex items-center gap-2 px-4 py-2.5 border border-red-900/40 hover:border-red-700 text-red-500/60 hover:text-red-400 font-mono text-xs tracking-widest rounded transition-all hover:bg-red-950/20 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-400"
        >
          <Trash2 size={13} aria-hidden="true" />
          CLEAR
        </button>
      </div>
    </section>
  );
}
