import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Pages
import Home from './pages/Home';
import Work from './pages/Work';
import ProjectDetail from './pages/ProjectDetail';
import WebDevelopment from './pages/services/WebDevelopment';
import DigitalMarketing from './pages/services/DigitalMarketing';
import Seo from './pages/services/Seo';
import AiAutomation from './pages/services/AiAutomation';
import About from './pages/About';
import Insights from './pages/Insights';
import ArticleDetail from './pages/ArticleDetail';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// UI
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import CustomCursor from './components/ui/CustomCursor';
import Loader from './components/ui/Loader';
import TransitionProvider from './components/ui/TransitionProvider';

// Context
import { BootProvider, useBoot } from './contexts/BootContext';

gsap.registerPlugin(ScrollTrigger);

import { trackEvent } from './lib/analytics';

function RouteThemeManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
    trackEvent('PAGE_VIEW', { path: pathname });

    // Handle global theme
    if (pathname === '/') {
      document.documentElement.classList.remove('theme-dark');
    } else {
      document.documentElement.classList.add('theme-dark');
    }
  }, [pathname, hash]);

  return null;
}

function SmoothScrollManager() {
  const { bootState } = useBoot();

  useEffect(() => {
    // Only initialize smooth scroll after boot sequence
    if (bootState !== 'COMPLETE' && bootState !== 'HANDOFF') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [bootState]);

  return null;
}

function AppContent() {
  const { bootState } = useBoot();

  return (
    <>
      <CustomCursor />
      <SmoothScrollManager />
      
      {/* Loader always mounts initially if not COMPLETE, handles its own unmount internally when COMPLETE */}
      {bootState !== 'COMPLETE' && <Loader />}
      
      <div 
        className="w-full min-h-screen relative"
        style={{ 
          // Lock scrolling and pointer events on the main page while booting
          height: bootState !== 'COMPLETE' ? '100vh' : 'auto',
          overflow: bootState !== 'COMPLETE' ? 'hidden' : 'visible',
          pointerEvents: bootState !== 'COMPLETE' ? 'none' : 'auto'
        }}
      >
        <RouteThemeManager />
        <Navbar />
        <main className="relative z-10 w-full overflow-hidden bg-background text-primary min-h-screen">
          <TransitionProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/work/:projectId" element={<ProjectDetail />} />
              <Route path="/services/web-development" element={<WebDevelopment />} />
              <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
              <Route path="/services/seo" element={<Seo />} />
              <Route path="/services/ai-automation" element={<AiAutomation />} />
              <Route path="/about" element={<About />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/insights/:slug" element={<ArticleDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TransitionProvider>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BootProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </BootProvider>
    </HelmetProvider>
  );
}
