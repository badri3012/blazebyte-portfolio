import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectPortal() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    if (!section || !panel) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'top 25%',
          toggleActions: 'play none none reverse',
        }
      });

      // 1. Background grid fades in
      tl.fromTo('.portal-grid', { opacity: 0 }, { opacity: 0.025, duration: 1, ease: 'power2.out' });

      // 2. Signal dot activates
      tl.fromTo('.portal-signal', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' }, '-=0.6');

      // 3. Heading reveals
      tl.fromTo('.portal-headline', 
        { clipPath: 'inset(100% 0 0 0)' }, 
        { clipPath: 'inset(0% 0 0 0)', duration: 0.9, stagger: 0.12, ease: 'power4.out' }, 
        '-=0.3'
      );

      // 4. Subtitle fades up
      tl.fromTo('.portal-sub', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.4');

      // 5. Glass panel rises
      tl.fromTo(panel,
        { y: 40, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
        '-=0.3'
      );

      // 6. Form fields stagger
      tl.fromTo('.portal-field',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out' },
        '-=0.5'
      );

      // 7. CTA activates
      tl.fromTo('.portal-cta',
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.2'
      );

      // Desktop parallax on the glass panel
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const xTo = gsap.quickTo(panel, 'rotateY', { duration: 0.8, ease: 'power3' });
        const yTo = gsap.quickTo(panel, 'rotateX', { duration: 0.8, ease: 'power3' });

        const handleMove = (e: MouseEvent) => {
          const rect = panel.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const x = ((e.clientX - cx) / rect.width) * 3;   // ±1.5deg max
          const y = ((e.clientY - cy) / rect.height) * -2;  // ±1deg max
          xTo(x);
          yTo(y);
        };
        const handleLeave = () => { xTo(0); yTo(0); };

        panel.addEventListener('mousemove', handleMove);
        panel.addEventListener('mouseleave', handleLeave);

        return () => {
          panel.removeEventListener('mousemove', handleMove);
          panel.removeEventListener('mouseleave', handleLeave);
        };
      });

    }, section);

    return () => ctx.revert();
  }, []);

  const inputClass = [
    'w-full bg-transparent border-0 border-b border-b-[rgba(255,255,255,0.14)]',
    'py-3 text-[#F5F5F2] font-sans text-[15px] outline-none',
    'transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]',
    'placeholder:text-[#71717A]/70',
    'focus:border-b-[#FF5A00] focus:shadow-[0_4px_20px_rgba(255,90,0,0.08)]',
    'hover:bg-[rgba(255,255,255,0.015)]',
    'peer',
  ].join(' ');

  const selectClass = inputClass + ' appearance-none cursor-pointer';

  const labelClass = 'text-[10px] font-mono tracking-[0.25em] text-[#9CA3AF] uppercase transition-colors duration-300 peer-focus:text-[#F5F5F2]';

  return (
    <section
      ref={sectionRef}
      className="theme-dark relative w-full bg-transparent py-32 md:py-40 px-4 md:px-16 lg:px-32 overflow-hidden"
    >
      {/* ── Background Engineering Grid ── */}
      <svg 
        className="portal-grid absolute inset-0 w-full h-full pointer-events-none opacity-0" 
        style={{ animation: 'grid-drift 20s linear infinite' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="portal-grid-pat" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#F5F5F2" strokeWidth="0.35"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#portal-grid-pat)" />
      </svg>

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(255,90,0,0.05) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(245,245,242,0.02) 0%, transparent 70%)' }} />

          {/* Decorative system labels */}
      <div className="absolute top-12 left-6 md:left-16 font-mono text-[8px] tracking-[0.3em] text-[#71717A]/40 uppercase pointer-events-none select-none hidden md:block overflow-hidden">
        <div className="portal-status">SIGNAL APPROACHING</div>
      </div>
      <div className="absolute top-12 right-6 md:right-16 font-mono text-[8px] tracking-[0.3em] text-[#71717A]/40 uppercase pointer-events-none select-none hidden md:block overflow-hidden">
        <div className="portal-status-ready">SYS.STATUS: READY</div>
      </div>
      <div className="absolute bottom-12 left-6 md:left-16 font-mono text-[8px] tracking-[0.3em] text-[#71717A]/30 uppercase pointer-events-none select-none hidden md:block">
        BLAZEBYTE DIGITAL SYSTEM
      </div>

      {/* Keyframe */}
      <style>{`
        @keyframes portal-signal-travel {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        @keyframes grid-drift {
          0% { transform: translateY(0); }
          100% { transform: translateY(56px); }
        }
      `}</style>

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">

        {/* ── Headline ── */}
        <div className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="portal-signal w-2 h-2 rounded-full bg-[#FF5A00] animate-pulse" />
            <span className="portal-sub font-mono text-[9px] tracking-[0.3em] text-[#9CA3AF] uppercase font-bold">Project Intake</span>
          </div>
          <div className="overflow-hidden">
            <h2 className="portal-headline text-[10vw] md:text-7xl lg:text-[5.5rem] font-display font-bold tracking-tight text-[#F5F5F2] uppercase leading-[0.95]">
              YOUR NEXT DIGITAL MOVE
            </h2>
          </div>
          <div className="overflow-hidden mt-1">
            <h2 className="portal-headline text-[10vw] md:text-7xl lg:text-[5.5rem] font-display font-light tracking-tight text-[#9CA3AF] uppercase leading-[0.95]">
              STARTS HERE.
            </h2>
          </div>
          <p className="portal-sub mt-8 text-[#9CA3AF] font-sans text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Tell us what you're building. We'll help architect the digital system behind it.
          </p>
        </div>

        {/* ── Glass Form Panel ── */}
        <div
          ref={panelRef}
          className="w-full rounded-lg overflow-hidden relative"
          style={{
            background: 'linear-gradient(135deg, rgba(24,24,28,0.88), rgba(10,10,12,0.72))',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 20px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)',
            perspective: '1200px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Travelling signal line */}
          <div className="absolute top-0 left-0 w-full h-[1px] overflow-hidden pointer-events-none z-20">
            <div
              className="w-1/4 h-full"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,90,0,0.5), transparent)',
                animation: 'portal-signal-travel 8s cubic-bezier(0.45,0,0.55,1) infinite',
              }}
            />
          </div>

          {/* System indicator */}
          <div className="flex items-center justify-between px-6 md:px-12 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A00] animate-pulse" />
              <span className="font-mono text-[8px] tracking-[0.3em] text-[#9CA3AF] uppercase font-bold">INTAKE / 01</span>
            </div>
            <span className="font-mono text-[7px] tracking-[0.2em] text-[#71717A] uppercase hidden sm:block">SYSTEM READY</span>
          </div>

          {/* Form body */}
          <form 
            className="px-6 md:px-12 py-10 md:py-14 flex flex-col gap-10 relative" 
            onSubmit={(e) => {
              e.preventDefault();
              const btn = e.currentTarget.querySelector('.submit-btn-text');
              if (btn) btn.textContent = 'TRANSMISSION RECEIVED';
            }}
          >

            {/* Row 1: Name + Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
              <div className="portal-field flex flex-col gap-2 relative">
                <input type="text" className={inputClass} placeholder="John Doe" id="portal-name" />
                <label htmlFor="portal-name" className={labelClass}>Name</label>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FF5A00] scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
              <div className="portal-field flex flex-col gap-2 relative">
                <input type="text" className={inputClass} placeholder="Acme Corp" id="portal-company" />
                <label htmlFor="portal-company" className={labelClass}>Company</label>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FF5A00] scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </div>

            {/* Row 2: Industry + Website */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
              <div className="portal-field flex flex-col gap-2 relative">
                <input type="text" className={inputClass} placeholder="Technology" id="portal-industry" />
                <label htmlFor="portal-industry" className={labelClass}>Industry</label>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FF5A00] scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
              <div className="portal-field flex flex-col gap-2 relative">
                <input type="text" className={inputClass} placeholder="https://" id="portal-website" />
                <label htmlFor="portal-website" className={labelClass}>Website</label>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FF5A00] scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

            {/* Row 3: Service + Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
              <div className="portal-field flex flex-col gap-2 relative">
                <div className="relative">
                  <select className={selectClass} id="portal-service" defaultValue="">
                    <option value="" disabled>Select a service...</option>
                    <option value="web">Website Development</option>
                    <option value="ecom">E-Commerce</option>
                    <option value="marketing">Digital Marketing</option>
                    <option value="seo">SEO &amp; Growth</option>
                    <option value="ai">Automation &amp; AI</option>
                    <option value="full">Complete Digital System</option>
                  </select>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#71717A] text-[10px]">▾</span>
                </div>
                <label htmlFor="portal-service" className={labelClass}>Service Required</label>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FF5A00] scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
              <div className="portal-field flex flex-col gap-2 relative">
                <div className="relative">
                  <select className={selectClass} id="portal-budget" defaultValue="">
                    <option value="" disabled>Select budget...</option>
                    <option value="under-25k">Under ₹25,000</option>
                    <option value="25k-50k">₹25,000 – ₹50,000</option>
                    <option value="50k-1l">₹50,000 – ₹1,00,000</option>
                    <option value="1l-plus">₹1,00,000+</option>
                    <option value="discuss">Let's Discuss</option>
                  </select>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#71717A] text-[10px]">▾</span>
                </div>
                <label htmlFor="portal-budget" className={labelClass}>Budget Range</label>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FF5A00] scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </div>

            {/* Row 4: Project Details */}
            <div className="portal-field flex flex-col gap-2 relative">
              <textarea
                className={inputClass + ' min-h-[110px] resize-y'}
                placeholder="Describe your objectives, current challenges, and what you want to build..."
                id="portal-details"
              />
              <label htmlFor="portal-details" className={labelClass}>Project Details</label>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FF5A00] scale-x-0 peer-focus:scale-x-100 transition-transform duration-500 origin-left" />
            </div>

            {/* CTA */}
            <div className="portal-cta pt-4 mt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div
                className="rounded overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,90,0,0.10), rgba(255,90,0,0.03))',
                  border: '1px solid rgba(255,90,0,0.25)',
                }}
              >
                <button type="submit" className="w-full relative overflow-hidden group flex items-center justify-center py-5 font-bold tracking-[0.2em] text-[13px] text-[#FF5A00] transition-all duration-300">
                  <div className="absolute inset-0 bg-[#FF5A00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-[#FF5A00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out delay-100" />
                  <span className="submit-btn-text relative z-10 group-hover:text-[#050505] transition-colors duration-300 flex items-center gap-3">
                    START THE CONVERSATION <span className="group-hover:translate-x-1.5 transition-transform duration-300 text-[15px]">→</span>
                  </span>
                </button>
              </div>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
}
