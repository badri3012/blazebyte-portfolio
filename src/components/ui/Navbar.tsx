import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';
import ProjectButton from './ProjectButton';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Intersection Observer for homepage sections
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const sections = ['hero', 'work', 'services', 'about', 'insights'];
    
    const observer = new IntersectionObserver((entries) => {
      // Find intersecting elements. Since multiple can intersect, 
      // we usually rely on the one that is crossing the threshold (rootMargin handles this well)
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, {
      rootMargin: '-30% 0px -70% 0px', // triggers slightly above middle
      threshold: 0
    });

    // Small timeout ensures DOM elements are rendered
    const timeoutId = setTimeout(() => {
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [location.pathname]);

  const isActive = (hashOrPath: string) => {
    if (hashOrPath === '/') {
      return location.pathname === '/' && (activeSection === 'hero' || activeSection === '');
    }
    if (hashOrPath.startsWith('#')) {
      const section = hashOrPath.substring(1);
      if (location.pathname === '/') {
        return activeSection === section;
      }
      return location.pathname.startsWith(`/${section}`);
    }
    return false;
  };

  // Handle scroll detection for background blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle body scroll locking
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const isDarkPage = location.pathname !== '/';

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] px-6 md:px-12 flex items-center justify-between border-b",
          scrolled 
            ? (isDarkPage 
                ? "py-5 bg-[#111111]/80 backdrop-blur-xl border-[rgba(255,255,255,0.05)] shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
                : "py-5 bg-[#FAF9F6]/80 backdrop-blur-xl border-[rgba(17,17,17,0.08)] shadow-[0_4px_30px_rgba(0,0,0,0.02)]")
            : "py-8 bg-transparent border-transparent"
        )}
      >
        {/* Left: Premium Wordmark */}
        <div className="flex-1 z-[60] flex items-center">
          <Link to="/" className="group flex flex-col" aria-label="BlazeByte Studio Home" onClick={() => {
            if (location.pathname === '/' && !location.hash) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}>
            {/* Desktop Full Logo */}
            <span className={cn("hidden md:block font-display font-black tracking-[0.2em] text-[1.1rem] leading-none transition-colors duration-500", isActive('/') ? "text-[#FF5A00]" : (isDarkPage ? "text-[#FAF9F6] hover:text-[#FF5A00]" : "text-[#111111] hover:text-[#FF5A00]"))}>
              BLAZEBYTE<span className="text-[#FF5A00]">.</span>
            </span>
            {/* Mobile Monogram */}
            <span className={cn("md:hidden font-display font-black tracking-[0.1em] text-xl leading-none transition-colors", isActive('/') ? "text-[#FF5A00]" : (isDarkPage ? "text-[#FAF9F6]" : "text-[#111111]"))}>
              BB<span className="text-[#FF5A00]">.</span>
            </span>
          </Link>
        </div>

        <nav className={cn("hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-12 text-[11px] font-mono tracking-[0.2em]", isDarkPage ? "text-[#FAF9F6]/70" : "text-[#111111]/70")} aria-label="Main Navigation">
          <Link to="/#work" className={cn("relative group py-2 transition-colors duration-300", isActive('#work') ? "text-[#FF5A00]" : (isDarkPage ? "hover:text-[#FAF9F6]" : "hover:text-[#111111]"))}>
            WORK
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#FF5A00] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] origin-left" />
          </Link>
          
          <div className="relative group cursor-pointer py-2">
             <Link to="/#services" className={cn("transition-colors duration-300 flex items-center gap-2", isActive('#services') ? "text-[#FF5A00]" : (isDarkPage ? "hover:text-[#FAF9F6]" : "hover:text-[#111111]"))} tabIndex={0}>
               SERVICES
               <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#FF5A00] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] origin-left" />
             </Link>
             <div className="absolute top-[120%] left-1/2 -translate-x-1/2 mt-2 w-64 bg-[#FAF9F6] border border-[rgba(17,17,17,0.08)] shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-500 ease-out flex flex-col z-[60] overflow-hidden rounded-sm text-[#111111]">
                <Link to="/services/web-development" className="px-6 py-4 hover:bg-[rgba(17,17,17,0.03)] hover:text-[#111111] transition-colors border-l-2 border-transparent hover:border-[#FF5A00]">WEB ARCHITECTURE</Link>
                <Link to="/services/digital-marketing" className="px-6 py-4 border-t border-[rgba(17,17,17,0.05)] hover:bg-[rgba(17,17,17,0.03)] hover:text-[#111111] transition-colors border-l-2 border-transparent hover:border-[#FF5A00]">GROWTH SYSTEMS</Link>
                <Link to="/services/ai-automation" className="px-6 py-4 border-t border-[rgba(17,17,17,0.05)] hover:bg-[rgba(17,17,17,0.03)] hover:text-[#111111] transition-colors border-l-2 border-transparent hover:border-[#FF5A00]">AUTOMATION LOGIC</Link>
             </div>
          </div>

          <Link to="/#about" className={cn("relative group py-2 transition-colors duration-300", isActive('#about') ? "text-[#FF5A00]" : (isDarkPage ? "hover:text-[#FAF9F6]" : "hover:text-[#111111]"))}>
            ABOUT
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#FF5A00] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] origin-left" />
          </Link>
          <Link to="/#insights" className={cn("relative group py-2 transition-colors duration-300", isActive('#insights') ? "text-[#FF5A00]" : (isDarkPage ? "hover:text-[#FAF9F6]" : "hover:text-[#111111]"))}>
            INSIGHTS
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#FF5A00] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] origin-left" />
          </Link>
        </nav>

        {/* Right: CTA */}
        <div className="flex-1 flex justify-end items-center gap-6 z-[60]">
          <div className="hidden sm:block">
            <ProjectButton theme={isDarkPage ? 'transparent-light' : 'light'} />
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <span className={cn("block w-6 h-[1.5px] bg-[#111111] transition-transform duration-300", mobileMenuOpen ? "rotate-45 translate-y-[7.5px]" : "")} />
            <span className={cn("block w-6 h-[1.5px] bg-[#111111] transition-opacity duration-300", mobileMenuOpen ? "opacity-0" : "opacity-100")} />
            <span className={cn("block w-6 h-[1.5px] bg-[#111111] transition-transform duration-300", mobileMenuOpen ? "-rotate-45 -translate-y-[7.5px]" : "")} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        ref={mobileMenuRef}
        className={cn(
          "fixed inset-0 z-40 bg-[#FAF9F6] flex flex-col justify-center px-8 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col gap-8 text-4xl font-display font-bold tracking-tight text-[#111111]">
          <Link to="/" className={cn("transition-colors", isActive('/') ? "text-[#FF5A00]" : "hover:text-[#FF5A00]")} onClick={() => {
            if (location.pathname === '/' && !location.hash) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            setMobileMenuOpen(false);
          }}>Home</Link>
          <Link to="/#work" className={cn("transition-colors", isActive('#work') ? "text-[#FF5A00]" : "hover:text-[#FF5A00]")} onClick={() => setMobileMenuOpen(false)}>Work</Link>
          <Link to="/#services" className={cn("transition-colors", isActive('#services') ? "text-[#FF5A00]" : "hover:text-[#FF5A00]")} onClick={() => setMobileMenuOpen(false)}>Services</Link>
          <Link to="/#about" className={cn("transition-colors", isActive('#about') ? "text-[#FF5A00]" : "hover:text-[#FF5A00]")} onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link to="/#insights" className={cn("transition-colors", isActive('#insights') ? "text-[#FF5A00]" : "hover:text-[#FF5A00]")} onClick={() => setMobileMenuOpen(false)}>Insights</Link>
        </nav>
        
        <div className="mt-16 pt-8 border-t border-[rgba(17,17,17,0.1)]">
          <Link 
            to="/contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex items-center gap-2 text-sm font-mono tracking-[0.2em] font-bold text-[#FF5A00]"
          >
            START A PROJECT →
          </Link>
        </div>
      </div>
    </>
  );
}
