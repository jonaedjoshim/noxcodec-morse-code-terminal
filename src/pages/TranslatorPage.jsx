import { useEffect } from 'react';
import AOS from 'aos';
import { useMorse } from '../hooks/useMorse';
import { readMessageFromURL } from '../utils/morseUtils';
import Converter from '../components/Converter';
import History from '../components/History';
import Toast from '../components/Toast';

const MORSE_GUIDE = [
  { char: 'A', code: '.-' },
  { char: 'B', code: '-...' },
  { char: 'C', code: '-.-.' },
  { char: 'D', code: '-..' },
  { char: 'E', code: '.' },
  { char: 'F', code: '..-.' },
  { char: 'G', code: '--.' },
  { char: 'H', code: '....' },
  { char: 'I', code: '..' },
  { char: 'J', code: '.---' },
  { char: 'K', code: '-.-' },
  { char: 'L', code: '.-..' },
  { char: 'M', code: '--' },
  { char: 'N', code: '-.' },
  { char: 'O', code: '---' },
  { char: 'P', code: '.--.' },
];

export default function TranslatorPage() {
  const urlMessage = readMessageFromURL();

  const morse = useMorse(urlMessage || '');

  useEffect(() => {
    AOS.refresh();
    if (urlMessage) {
      morse.showToast('Secret transmission decoded from link!');
      // Clean the URL without reload
      window.history.replaceState({}, '', window.location.pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono pt-20 pb-12">
      <Toast toast={morse.toast} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
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
            Encode plaintext to Morse or decode incoming signals. Use{' '}
            <span className="text-green-500">·</span> dots and{' '}
            <span className="text-green-500">—</span> dashes separated by spaces.
            Words are delimited by <span className="text-green-500">/</span>.
          </p>
        </div>

        {/* Converter */}
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

        {/* Quick Reference */}
        <div className="mt-16" data-aos="fade-up" data-aos-delay="100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-px h-5 bg-green-500" />
            <h2 className="font-mono text-sm font-bold tracking-[0.2em] text-white/70 uppercase">
              Quick Reference
            </h2>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-16 gap-1">
            {MORSE_GUIDE.map((item) => (
              <div
                key={item.char}
                className="flex flex-col items-center gap-1 p-2 bg-[#0a0a0a] border border-white/5 rounded hover:border-green-900/60 transition-colors"
              >
                <span className="text-xs font-bold text-white/70">{item.char}</span>
                <span className="text-[9px] text-green-500/70 tracking-wider">
                  {item.code}
                </span>
              </div>
            ))}
            <div className="flex flex-col items-center gap-1 p-2 bg-[#0a0a0a] border border-white/5 rounded hover:border-green-900/60 transition-colors">
              <span className="text-xs font-bold text-white/70">SPC</span>
              <span className="text-[9px] text-green-500/70 tracking-wider">/</span>
            </div>
          </div>
        </div>

        {/* Transmission Logs */}
        <History
          logs={morse.logs}
          handleLoadLog={morse.handleLoadLog}
          handleClearLogs={morse.handleClearLogs}
        />
      </div>
    </div>
  );
}
