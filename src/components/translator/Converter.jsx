import { Copy, ArrowLeftRight, Trash2, Link2, Zap } from 'lucide-react';

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
  return (
    <div className="w-full" data-aos="fade-up" data-aos-delay="100">
      {/* Mode indicator */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <span
          className={`font-mono text-xs tracking-widest transition-colors ${mode === 'textToMorse' ? 'text-green-400' : 'text-white/30'
            }`}
        >
          PLAINTEXT
        </span>
        <button
          onClick={handleSwapMode}
          className="flex items-center justify-center w-8 h-8 rounded border border-green-800/60 bg-green-950/30 hover:bg-green-900/40 hover:border-green-600 transition-all group"
          title="Swap direction"
        >
          <ArrowLeftRight
            size={14}
            className="text-green-500 group-hover:text-green-300 transition-colors"
          />
        </button>
        <span
          className={`font-mono text-xs tracking-widest transition-colors ${mode === 'morseToText' ? 'text-green-400' : 'text-white/30'
            }`}
        >
          MORSE
        </span>
      </div>

      {/* Two panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Plain Text Panel */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
              {mode === 'textToMorse' ? '[ INPUT ] Plain Text' : '[ OUTPUT ] Plain Text'}
            </label>
            <button
              onClick={() => handleCopy(plainText, 'Plain text')}
              className="flex items-center gap-1 font-mono text-[10px] text-white/30 hover:text-green-400 transition-colors"
            >
              <Copy size={11} />
              COPY
            </button>
          </div>
          <textarea
            value={plainText}
            onChange={(e) =>
              mode === 'textToMorse'
                ? handlePlainChange(e.target.value)
                : null
            }
            readOnly={mode === 'morseToText'}
            placeholder={
              mode === 'textToMorse'
                ? 'Type your message here, Agent...'
                : 'Decoded output appears here...'
            }
            rows={8}
            className={`w-full bg-[#0a0a0a] border rounded p-4 font-mono text-sm text-green-300 placeholder-white/15 resize-none outline-none transition-all leading-relaxed
              ${mode === 'textToMorse'
                ? 'border-green-800/60 focus:border-green-600 focus:shadow-[0_0_20px_rgba(74,222,128,0.07)]'
                : 'border-white/10 text-white/50 cursor-not-allowed'
              }`}
          />
          <div className="flex justify-between items-center">
            <span className="font-mono text-[10px] text-white/20">
              {plainText.length} CHARS
            </span>
          </div>
        </div>

        {/* Morse Panel */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
              {mode === 'morseToText' ? '[ INPUT ] Morse Code' : '[ OUTPUT ] Morse Code'}
            </label>
            <button
              onClick={() => handleCopy(morseText, 'Morse code')}
              className="flex items-center gap-1 font-mono text-[10px] text-white/30 hover:text-green-400 transition-colors"
            >
              <Copy size={11} />
              COPY
            </button>
          </div>
          <textarea
            value={morseText}
            onChange={(e) =>
              mode === 'morseToText'
                ? handleMorseChange(e.target.value)
                : null
            }
            readOnly={mode === 'textToMorse'}
            placeholder={
              mode === 'morseToText'
                ? 'Enter dots, dashes, and / for spaces...'
                : 'Morse output transmits here...'
            }
            rows={8}
            className={`w-full bg-[#0a0a0a] border rounded p-4 font-mono text-sm placeholder-white/15 resize-none outline-none transition-all leading-relaxed tracking-widest
              ${mode === 'morseToText'
                ? 'border-green-800/60 focus:border-green-600 focus:shadow-[0_0_20px_rgba(74,222,128,0.07)] text-green-300'
                : 'border-white/10 text-green-500/70 cursor-not-allowed'
              }`}
          />
          <div className="flex justify-between items-center">
            <span className="font-mono text-[10px] text-white/20">
              {morseText.split(' ').filter(Boolean).length} TOKENS
            </span>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
        <button
          onClick={handleGenerateLink}
          className="flex items-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-400 text-black font-mono text-xs font-bold tracking-widest rounded transition-all hover:shadow-[0_0_20px_rgba(74,222,128,0.3)] active:scale-95"
        >
          <Link2 size={13} />
          GENERATE SECRET LINK
        </button>
        <button
          onClick={() => handleCopy(`${plainText}\n\n${morseText}`, 'Full transmission')}
          className="flex items-center gap-2 px-4 py-2.5 border border-green-800/60 hover:border-green-600 text-green-400 font-mono text-xs tracking-widest rounded transition-all hover:bg-green-950/30 active:scale-95"
        >
          <Zap size={13} />
          COPY FULL TRANSMISSION
        </button>
        <button
          onClick={handleClear}
          className="flex items-center gap-2 px-4 py-2.5 border border-red-900/40 hover:border-red-700 text-red-500/60 hover:text-red-400 font-mono text-xs tracking-widest rounded transition-all hover:bg-red-950/20 active:scale-95"
        >
          <Trash2 size={13} />
          CLEAR
        </button>
      </div>
    </div>
  );
}
