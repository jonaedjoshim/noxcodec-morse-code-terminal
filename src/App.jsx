import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { SpeedInsights } from '@vercel/speed-insights/react';

import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import TranslatorPage from './pages/TranslatorPage';

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 40,
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-[#050505]">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/translator" element={<TranslatorPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <SpeedInsights />
    </BrowserRouter>
  );
}
