import { useEffect } from "react";
import AOS from "aos";

import { useMorse } from "../hooks/useMorse";
import { readMessageFromURL } from "../utils/morseUtils";

import Converter from "../components/translator/Converter";
import MorseAudioPlayer from "../components/translator/MorseAudioPlayer";
import MorseReference from "../components/translator/MorseReference";
import History from "../components/translator/History";
import Toast from "../components/ui/Toast";

export default function TranslatorPage() {
  const urlMessage = readMessageFromURL();
  const morse = useMorse(urlMessage || "");

  useEffect(() => {
    AOS.refresh();

    if (urlMessage) {
      morse.showToast("Shared transmission loaded!");

      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono pt-20 pb-12">
      <Toast toast={morse.toast} onClose={morse.dismissToast} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-10" data-aos="fade-down">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-4 h-px bg-green-500" />

            <span className="text-[10px] text-green-500 tracking-[0.4em]">
              ACTIVE TERMINAL
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white/90 tracking-tight">
            Morse Translator
          </h1>

          <p className="text-xs text-white/30 mt-2 max-w-xl leading-relaxed">
            Encode plaintext to Morse or decode incoming signals. Use{" "}
            <span className="text-green-500">·</span> dots and{" "}
            <span className="text-green-500">—</span> dashes separated by
            spaces. Words are delimited by{" "}
            <span className="text-green-500">/</span>.
          </p>
        </div>

        <Converter
          plainText={morse.plainText}
          morseText={morse.morseText}
          mode={morse.mode}
          handlePlainChange={morse.handlePlainChange}
          handleMorseChange={morse.handleMorseChange}
          handleSwapMode={morse.handleSwapMode}
          handleCopy={morse.handleCopy}
          handleClear={morse.handleClear}
          handleGenerateLink={morse.handleGenerateLink}
        />

        <MorseAudioPlayer morseText={morse.morseText} />

        <MorseReference
          mode={morse.mode}
          onSelect={morse.handleReferenceSelect}
        />

        <History
          logs={morse.logs}
          handleLoadLog={morse.handleLoadLog}
          handleClearLogs={morse.handleClearLogs}
        />
      </div>
    </div>
  );
}
