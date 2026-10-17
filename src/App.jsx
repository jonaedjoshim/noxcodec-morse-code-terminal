import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import SEO from "./components/SEO";

import LandingPage from "./pages/LandingPage";
import TranslatorPage from "./pages/TranslatorPage";
import NotFoundPage from "./pages/NotFoundPage";

const pageMetadata = {
  "/": {
    title: "NoxCodec — Morse Code Intelligence Terminal",
    description:
      "Translate text into Morse code, explore Morse history, listen to Morse audio, and discover interactive signal tools with NoxCodec.",
  },

  "/translator": {
    title: "Morse Code Translator — NoxCodec",
    description:
      "Free online Morse code translator. Convert English to Morse and Morse to English, play audio signals, and share translations.",
  },
};

function AppContent() {
  const { pathname } = useLocation();

  const metadata = pageMetadata[pathname] || {
    title: "404 — Page Not Found | NoxCodec",
    description:
      "The requested page could not be found. Return to NoxCodec's Morse code terminal.",
  };

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 40,
      disable: () =>
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });

    const frame = window.requestAnimationFrame(() => {
      AOS.refreshHard();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-[#050505]">
      <SEO title={metadata.title} description={metadata.description} />

      <a
        href="#main-content"
        className="fixed top-2 left-2 z-[9999] -translate-y-20 focus:translate-y-0 bg-green-500 text-black px-4 py-2 rounded font-mono text-xs font-bold transition-transform"
      >
        SKIP TO CONTENT
      </a>

      <Header />

      <main id="main-content" className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/translator" element={<TranslatorPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
