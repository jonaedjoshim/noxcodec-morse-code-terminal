import morseData from "../../data/morseData.json";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const numbers = "0123456789".split("");

function ReferenceGroup({ title, characters, onSelect }) {
  return (
    <div>
      <h3 className="font-mono text-[10px] tracking-widest text-white/30 mb-3">
        {title}
      </h3>

      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-13 gap-2">
        {characters.map((char) => (
          <button
            key={char}
            type="button"
            onClick={() => onSelect(char)}
            title={`Insert ${char}: ${morseData[char]}`}
            aria-label={`Insert ${char}, Morse code ${morseData[char]}`}
            className="group flex flex-col items-center justify-center gap-1 min-h-14 p-2 bg-[#0a0a0a] border border-white/10 rounded hover:border-green-600/70 hover:bg-green-950/30 active:scale-95 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-400"
          >
            <span className="font-mono text-sm font-bold text-white/70 group-hover:text-green-300 transition-colors">
              {char}
            </span>

            <span className="font-mono text-[10px] text-green-500/70 tracking-wider">
              {morseData[char]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function MorseReference({ onSelect, mode }) {
  return (
    <section
      className="mt-16"
      data-aos="fade-up"
      data-aos-delay="100"
      aria-labelledby="morse-reference-title"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-px h-5 bg-green-500" />

        <h2
          id="morse-reference-title"
          className="font-mono text-sm font-bold tracking-[0.2em] text-white/70 uppercase"
        >
          Interactive Morse Reference
        </h2>
      </div>

      <p className="font-mono text-xs text-white/30 leading-relaxed mb-6">
        Select any character to insert it into the active translator input.
        {mode === "morseToText"
          ? " Morse signals will be inserted automatically."
          : " Characters will be encoded into Morse automatically."}
      </p>

      <div className="space-y-7">
        <ReferenceGroup
          title="[ A–Z ] ALPHABET"
          characters={alphabet}
          onSelect={onSelect}
        />

        <ReferenceGroup
          title="[ 0–9 ] NUMBERS"
          characters={numbers}
          onSelect={onSelect}
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => onSelect(" ")}
          className="flex items-center gap-3 px-4 py-2.5 bg-[#0a0a0a] border border-white/10 rounded hover:border-green-600/70 hover:bg-green-950/30 transition-all group focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-400"
        >
          <span className="font-mono text-xs text-white/70 group-hover:text-green-300">
            SPACE
          </span>

          <span className="font-mono text-xs text-green-500">/</span>
        </button>

        <span className="font-mono text-[10px] text-white/20">
          / = WORD SEPARATOR
        </span>
      </div>

      <p className="font-mono text-[10px] text-green-500/40 tracking-widest mt-6">
        SELECT A SIGNAL TO INSERT INTO TERMINAL
      </p>
    </section>
  );
}
