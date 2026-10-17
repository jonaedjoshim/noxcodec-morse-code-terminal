import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";

import {
  Radio,
  Shield,
  Zap,
  Lock,
  Globe,
  ChevronRight,
  Volume2,
  BookOpen,
  ArrowRight,
  Terminal,
  Activity,
  Clock3,
} from "lucide-react";

import RadarAnimation from "../components/home/RadarAnimation";

const FEATURES = [
  {
    Icon: Zap,
    title: "Real-Time Translation",
    description:
      "Instantly encode plaintext into Morse code or decode incoming signals. Every change updates your translation.",
    tag: "CORE SYSTEM",
  },
  {
    Icon: Volume2,
    title: "Morse Audio Transmission",
    description:
      "Listen to Morse signals with accurate dot-and-dash timing. Adjust transmission speed and monitor the visual signal.",
    tag: "AUDIO ENGINE",
  },
  {
    Icon: BookOpen,
    title: "Interactive Morse Reference",
    description:
      "Explore the complete alphabet and numbers. Select characters to insert their signals directly into the translator.",
    tag: "FIELD GUIDE",
  },
  {
    Icon: Lock,
    title: "Shareable Transmissions",
    description:
      "Generate encoded share links that open directly in the translator. Messages are encoded, not encrypted.",
    tag: "LINK SYSTEM",
  },
  {
    Icon: Clock3,
    title: "Transmission History",
    description:
      "Keep your five latest transmissions in browser storage. Search, restore, or permanently clear your saved records.",
    tag: "LOCAL ARCHIVE",
  },
  {
    Icon: Shield,
    title: "Browser-Based Processing",
    description:
      "Morse conversion and audio generation run in your browser without requiring an account or translation server.",
    tag: "CLIENT SIDE",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Enter Your Message",
    description:
      "Type plaintext or switch to Morse input. Letters, numbers, and common punctuation are supported.",
  },
  {
    number: "02",
    title: "Translate Instantly",
    description:
      "Watch your message convert in real time. Use the interactive reference to build Morse signals manually.",
  },
  {
    number: "03",
    title: "Transmit Your Signal",
    description:
      "Play Morse audio, visualize signals, copy the result, or generate a shareable translation link.",
  },
];

const HISTORY_ITEMS = [
  {
    year: "1837",
    title: "The Telegraph Emerges",
    description:
      "Samuel Morse and his collaborators demonstrate an early electromagnetic telegraph system.",
  },
  {
    year: "1840",
    title: "Telegraph Patent",
    description:
      "Samuel Morse receives a United States patent for his electromagnetic telegraph system.",
  },
  {
    year: "1844",
    title: "A Historic Transmission",
    description:
      '"What hath God wrought" is transmitted between Washington, D.C., and Baltimore.',
  },
  {
    year: "1912",
    title: "The Titanic Disaster",
    description:
      "Titanic's wireless operators transmit distress calls, including SOS, helping nearby vessels respond.",
  },
  {
    year: "1944",
    title: "Wartime Communications",
    description:
      "Morse remains important in military radio communications during World War II, including the Normandy campaign.",
  },
  {
    year: "1999",
    title: "The Digital Transition",
    description:
      "The Global Maritime Distress and Safety System replaces mandatory Morse radiotelegraph watchkeeping for international maritime distress communications.",
  },
  {
    year: "TODAY",
    title: "Signals That Endure",
    description:
      "Amateur radio operators, enthusiasts, and educators continue using and teaching Morse code.",
  },
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="text-center mb-12" data-aos="fade-up">
      <div className="flex items-center justify-center gap-3 mb-3">
        <span className="w-6 h-px bg-green-700" />

        <span className="text-[10px] text-green-500 tracking-[0.3em] uppercase">
          {eyebrow}
        </span>

        <span className="w-6 h-px bg-green-700" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-white/90 tracking-tight">
        {title}
      </h2>

      {description && (
        <p className="text-xs sm:text-sm text-white/35 leading-relaxed max-w-xl mx-auto mt-4">
          {description}
        </p>
      )}
    </div>
  );
}

function FeatureCard({ feature, index }) {
  const { Icon, title, description, tag } = feature;

  return (
    <article
      className="group relative p-6 bg-[#0a0a0a] border border-white/5 hover:border-green-800/50 rounded-lg transition-all duration-300 hover:bg-green-950/10"
      data-aos="fade-up"
      data-aos-delay={index * 60}
    >
      <div className="flex items-start justify-between gap-3 mb-5">
        <div className="w-10 h-10 flex items-center justify-center border border-green-900/60 bg-green-950/20 rounded group-hover:border-green-600/60 transition-colors">
          <Icon
            size={19}
            className="text-green-500 group-hover:text-green-400 transition-colors"
            aria-hidden="true"
          />
        </div>

        <span className="font-mono text-[9px] text-green-700 tracking-widest">
          {tag}
        </span>
      </div>

      <h3 className="font-mono text-xs sm:text-sm font-bold text-white/80 tracking-wider mb-3">
        {title}
      </h3>

      <p className="font-mono text-xs text-white/35 leading-relaxed">
        {description}
      </p>

      <div className="absolute bottom-0 left-0 w-0 h-px bg-green-500/60 group-hover:w-full transition-all duration-500" />
    </article>
  );
}

function OperationStep({ step, index }) {
  return (
    <article
      className="relative p-6 bg-[#0a0a0a]/50 border border-white/5 rounded-lg overflow-hidden"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <span className="absolute top-3 right-4 font-mono text-6xl font-black text-white/[0.035] select-none">
        {step.number}
      </span>

      <div className="relative">
        <span className="font-mono text-xs text-green-500 tracking-widest">
          STEP_{step.number}
        </span>

        <div className="w-8 h-px bg-green-500 mt-4 mb-5" />

        <h3 className="font-mono text-sm font-bold text-white/80 mb-3">
          {step.title}
        </h3>

        <p className="font-mono text-xs text-white/35 leading-relaxed">
          {step.description}
        </p>
      </div>
    </article>
  );
}

function HistoryTimeline() {
  return (
    <div className="relative pl-7 border-l border-green-900/40">
      {HISTORY_ITEMS.map((item, index) => (
        <article
          key={item.year}
          className="relative pb-9 last:pb-0"
          data-aos="fade-up"
          data-aos-delay={Math.min(index * 60, 300)}
        >
          <span className="absolute -left-[34px] top-1 w-3 h-3 rounded-full border border-green-700 bg-[#050505] flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-green-500" />
          </span>

          <span className="font-mono text-[10px] text-green-500 tracking-widest">
            {item.year}
          </span>

          <h3 className="font-mono text-xs sm:text-sm font-bold text-white/70 mt-2 mb-2">
            {item.title}
          </h3>

          <p className="font-mono text-xs text-white/35 leading-relaxed max-w-xl">
            {item.description}
          </p>
        </article>
      ))}
    </div>
  );
}

export default function LandingPage() {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono pt-16">
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#4ade80 1px, transparent 1px), linear-gradient(90deg, #4ade80 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <div data-aos="zoom-in" data-aos-duration="1000" className="mb-8">
            <RadarAnimation />
          </div>

          <div data-aos="fade-up" data-aos-delay="150">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-5 sm:w-8 h-px bg-green-600" />

              <span className="text-[9px] sm:text-[10px] text-green-500 tracking-[0.2em] sm:tracking-[0.4em] text-center">
                MORSE COMMUNICATION TERMINAL
              </span>

              <span className="w-5 sm:w-8 h-px bg-green-600" />
            </div>

            <h1 className="text-center text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-white leading-tight">
              Nox<span className="text-green-400">Codec</span>
            </h1>

            <p className="text-center text-[10px] sm:text-sm text-white/40 tracking-[0.15em] sm:tracking-[0.3em] mt-3">
              MORSE CODE INTELLIGENCE TERMINAL
            </p>
          </div>

          <p
            className="max-w-xl text-center text-xs sm:text-sm text-white/40 leading-relaxed mt-7 px-2"
            data-aos="fade-up"
            data-aos-delay="250"
          >
            Decode the language of dots and dashes. Translate messages, generate
            Morse audio, visualize signals, and explore a communication system
            that shaped history.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-3 mt-8 w-full sm:w-auto"
            data-aos="fade-up"
            data-aos-delay="350"
          >
            <Link
              to="/translator"
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-green-500 hover:bg-green-400 text-black font-bold text-xs tracking-widest rounded transition-all hover:shadow-[0_0_30px_rgba(74,222,128,0.3)] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
            >
              <Terminal size={15} aria-hidden="true" />
              OPEN TERMINAL
              <ChevronRight size={15} aria-hidden="true" />
            </Link>

            <a
              href="#features"
              className="flex items-center justify-center gap-2 px-6 py-3.5 border border-white/10 hover:border-green-800 text-white/50 hover:text-green-400 font-bold text-xs tracking-widest rounded transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-400"
            >
              EXPLORE SYSTEM
              <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>

          <div
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-10"
            data-aos="fade-up"
            data-aos-delay="450"
          >
            <div className="flex items-center gap-2">
              <Activity
                size={12}
                className="text-green-500"
                aria-hidden="true"
              />

              <span className="text-[9px] text-white/30 tracking-widest">
                REAL-TIME
              </span>
            </div>

            <span className="hidden sm:block w-1 h-1 rounded-full bg-green-900" />

            <div className="flex items-center gap-2">
              <Volume2
                size={12}
                className="text-green-500"
                aria-hidden="true"
              />

              <span className="text-[9px] text-white/30 tracking-widest">
                AUDIO ENABLED
              </span>
            </div>

            <span className="hidden sm:block w-1 h-1 rounded-full bg-green-900" />

            <div className="flex items-center gap-2">
              <Globe size={12} className="text-green-500" aria-hidden="true" />

              <span className="text-[9px] text-white/30 tracking-widest">
                BROWSER BASED
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none">
          <p className="text-[10px] text-green-900 tracking-[0.3em] sm:tracking-[0.5em]">
            .... . .-.. .-.. --- / .- --. . -. -
          </p>
        </div>
      </section>

      <section
        id="features"
        className="py-20 sm:py-24 px-4 border-t border-white/5 scroll-mt-16"
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="OPERATIONAL CAPABILITIES"
            title="System Features"
            description="Everything you need to encode, decode, explore, and transmit Morse signals in one terminal."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                index={index}
              />
            ))}
          </div>

          <div className="flex justify-center mt-10" data-aos="fade-up">
            <Link
              to="/translator"
              className="inline-flex items-center gap-2 font-mono text-xs text-green-500 hover:text-green-300 tracking-widest transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-400 rounded"
            >
              ACCESS ALL FEATURES
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="py-20 sm:py-24 px-4 border-t border-white/5"
      >
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            eyebrow="FIELD MANUAL"
            title="How To Operate"
            description="Three simple steps to begin working with Morse code."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {STEPS.map((step, index) => (
              <OperationStep key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-4 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            eyebrow="DECLASSIFIED ARCHIVES"
            title="The History of Morse Code"
            description="From early telegraph experiments to modern amateur radio, Morse code has played an important role in global communication."
          />

          <HistoryTimeline />
        </div>
      </section>

      <section className="py-20 px-4 border-t border-white/5">
        <div
          className="max-w-3xl mx-auto text-center relative"
          data-aos="fade-up"
        >
          <div className="absolute inset-0 bg-green-500/[0.025] blur-3xl pointer-events-none" />

          <div className="relative border border-green-900/30 bg-[#0a0a0a] rounded-lg px-6 py-12 sm:px-12 sm:py-16">
            <div className="flex items-center justify-center gap-2 mb-5">
              <Radio size={15} className="text-green-500" aria-hidden="true" />

              <span className="text-[10px] text-green-500 tracking-[0.3em]">
                TERMINAL READY
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white/90 mb-4">
              Ready to Transmit?
            </h2>

            <p className="text-xs sm:text-sm text-white/35 leading-relaxed max-w-md mx-auto mb-8">
              Your Morse terminal is standing by. Start translating, explore the
              Morse alphabet, or listen to your first signal.
            </p>

            <Link
              to="/translator"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-green-500 hover:bg-green-400 text-black font-bold text-xs tracking-widest rounded transition-all hover:shadow-[0_0_30px_rgba(74,222,128,0.3)] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
            >
              <Radio size={14} aria-hidden="true" />
              BEGIN TRANSMISSION
              <ChevronRight size={14} aria-hidden="true" />
            </Link>

            <p className="text-[9px] text-white/20 tracking-widest mt-7">
              NO ACCOUNT REQUIRED · CLIENT-SIDE TRANSLATION
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
