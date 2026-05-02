import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import { Radio, Shield, Zap, Lock, Globe, ChevronRight } from 'lucide-react';

function RadarAnimation() {
  return (
    <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
      <style>{`
        @keyframes radar-sweep {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes radar-ping-1 {
          0%,100% { opacity: 0.15; }
          50%     { opacity: 0.4; }
        }
        @keyframes radar-ping-2 {
          0%,100% { opacity: 0.1; }
          50%     { opacity: 0.3; }
        }
        .radar-sweep { animation: radar-sweep 3s linear infinite; }
        .radar-ring-1 { animation: radar-ping-1 3s ease-in-out infinite; }
        .radar-ring-2 { animation: radar-ping-2 3s ease-in-out infinite 0.5s; }
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
        <div className="absolute bottom-1/2 left-1/2 -ml-px"
          style={{ width:'2px', height:'44%', background:'linear-gradient(to top, rgba(74,222,128,0.9), transparent)', borderRadius:'2px', transformOrigin:'bottom center' }} />
      </div>
      <div className="relative w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_2px_rgba(74,222,128,0.6)]" />
      <div className="absolute top-[28%] left-[62%] w-1.5 h-1.5 rounded-full bg-green-400/70 animate-pulse" />
      <div className="absolute top-[58%] left-[25%] w-1 h-1 rounded-full bg-green-400/50 animate-pulse" style={{animationDelay:'1.2s'}} />
    </div>
  );
}

const FEATURES = [
  { Icon: Zap,    title: 'Real-Time Encoding',  desc: 'Instantaneous bidirectional conversion between plaintext and Morse. Every keystroke transmits immediately.' },
  { Icon: Lock,   title: 'Secret Share Links',  desc: 'Encode any message into an obfuscated URL. Share the link; only those who know to look will see the message.' },
  { Icon: Globe,  title: 'Transmission Logs',   desc: 'Your last 5 transmissions are stored locally in your browser. Wipe on command. Leave no trace.' },
  { Icon: Shield, title: 'Zero Server Contact', desc: 'All encoding and decoding occurs client-side. Nothing ever leaves your device. No logs, no telemetry.' },
];

const HISTORY_ITEMS = [
  { year: '1836',  event: 'Samuel Morse patents the electromagnetic telegraph.' },
  { year: '1844',  event: '"What hath God wrought" — first long-distance Morse transmission.' },
  { year: '1912',  event: 'RMS Titanic operators broadcast SOS in Morse, reaching rescue vessels.' },
  { year: '1941',  event: 'WWII Allied forces use Morse to coordinate the D-Day landings.' },
  { year: '1999',  event: 'Maritime SOS via Morse officially retired — replaced by digital systems.' },
  { year: 'TODAY', event: 'Intelligence services & amateur operators still train in Morse for resilience.' },
];

export default function LandingPage() {
  useEffect(() => { AOS.refresh(); }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono pt-16">

      {/* Hero */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage:'linear-gradient(#4ade80 1px,transparent 1px),linear-gradient(90deg,#4ade80 1px,transparent 1px)', backgroundSize:'40px 40px' }} />

        <div data-aos="zoom-in" data-aos-duration="1000" className="mb-8">
          <RadarAnimation />
        </div>

        <div data-aos="fade-up" data-aos-delay="200">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-px bg-green-600" />
            <span className="text-[10px] text-green-500 tracking-[0.4em]">CLASSIFIED COMMUNICATION SYSTEM</span>
            <span className="w-8 h-px bg-green-600" />
          </div>
          <h1 className="text-center text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Nox<span className="text-green-400">Codec</span>
          </h1>
          <p className="text-center text-xs sm:text-sm text-white/40 tracking-[0.3em] mt-2">MORSE CODE INTELLIGENCE TERMINAL</p>
        </div>

        <p className="max-w-xl text-center text-sm text-white/40 leading-relaxed mt-6 px-4" data-aos="fade-up" data-aos-delay="350">
          Trusted by field operatives since 1836. Encode your transmissions, generate secret share links, and maintain zero digital footprint. All processing happens on-device.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-8" data-aos="fade-up" data-aos-delay="450">
          <Link to="/translator"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-bold text-xs tracking-widest rounded transition-all hover:shadow-[0_0_30px_rgba(74,222,128,0.35)] active:scale-95">
            <Radio size={14} /> BEGIN TRANSMISSION <ChevronRight size={14} />
          </Link>
          <a href="#how-it-works"
            className="flex items-center justify-center gap-2 px-6 py-3 border border-white/10 hover:border-green-800 text-white/50 hover:text-green-400 font-bold text-xs tracking-widest rounded transition-all">
            MISSION BRIEFING
          </a>
        </div>

        <div className="absolute bottom-8 left-0 right-0 flex justify-center" data-aos="fade-up" data-aos-delay="600">
          <p className="text-[11px] text-green-900 tracking-[0.5em] animate-pulse">.... . .-.. .-.. --- / .- --. . -. -</p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12" data-aos="fade-up">
            <p className="text-[10px] text-green-500 tracking-[0.4em] mb-2">OPERATIONAL CAPABILITIES</p>
            <h2 className="text-2xl font-black text-white/90">System Features</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map(({ Icon, title, desc }, i) => (
              <div key={title} className="flex gap-4 p-5 bg-[#0a0a0a] border border-white/5 hover:border-green-900/60 rounded transition-all group"
                data-aos="fade-up" data-aos-delay={i * 80}>
                <div className="w-8 h-8 shrink-0 flex items-center justify-center border border-green-900/60 rounded group-hover:border-green-700 transition-colors">
                  <Icon size={15} className="text-green-500" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white/80 tracking-widest mb-1">{title.toUpperCase()}</h3>
                  <p className="text-xs text-white/35 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12" data-aos="fade-up">
            <p className="text-[10px] text-green-500 tracking-[0.4em] mb-2">FIELD MANUAL</p>
            <h2 className="text-2xl font-black text-white/90">How To Operate</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { step:'01', title:'Enter Your Message',  body:'Type any plaintext in the left panel. Characters A–Z, 0–9, and common punctuation are supported.' },
              { step:'02', title:'Receive Morse Output', body:'Dots and dashes appear in real-time. Word boundaries are marked with a forward slash (/).' },
              { step:'03', title:'Transmit Securely',   body:'Copy the Morse, or generate a secret URL that anyone with the link can decode instantly.' },
            ].map((s, i) => (
              <div key={s.step} className="relative p-6 border border-white/5 rounded" data-aos="zoom-in" data-aos-delay={i * 100}>
                <span className="text-5xl font-black text-white/5 absolute top-4 right-4">{s.step}</span>
                <div className="w-6 h-px bg-green-500 mb-4" />
                <h3 className="text-xs font-bold text-white/70 tracking-widest mb-2">{s.title.toUpperCase()}</h3>
                <p className="text-xs text-white/35 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-20 px-4 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12" data-aos="fade-up">
            <p className="text-[10px] text-green-500 tracking-[0.4em] mb-2">DECLASSIFIED ARCHIVES</p>
            <h2 className="text-2xl font-black text-white/90">Morse in Secret Operations</h2>
            <p className="text-xs text-white/30 mt-3 leading-relaxed max-w-lg mx-auto">
              For nearly two centuries, dots and dashes have carried the most consequential messages in human history — from wartime commands to distress signals across the open ocean.
            </p>
          </div>
          <div className="relative pl-6 border-l border-green-900/40">
            {HISTORY_ITEMS.map((item, i) => (
              <div key={item.year} className="relative mb-6 last:mb-0" data-aos="fade-up" data-aos-delay={i * 60}>
                <span className="absolute -left-[25px] top-1 w-3 h-3 rounded-full border border-green-700 bg-[#050505] flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-green-500" />
                </span>
                <span className="text-[10px] text-green-500 tracking-widest">{item.year}</span>
                <p className="text-xs text-white/40 mt-0.5 leading-relaxed">{item.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 border-t border-white/5" data-aos="fade-up">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs text-green-500/60 tracking-[0.4em] mb-3">MISSION START</p>
          <h2 className="text-3xl font-black text-white/90 mb-4">Ready to Transmit?</h2>
          <p className="text-xs text-white/30 mb-6">The terminal is standing by. No account. No tracking. No record.</p>
          <Link to="/translator"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-500 hover:bg-green-400 text-black font-bold text-xs tracking-widest rounded transition-all hover:shadow-[0_0_40px_rgba(74,222,128,0.3)] active:scale-95">
            <Radio size={14} /> OPEN TERMINAL
          </Link>
        </div>
      </section>
    </div>
  );
}
