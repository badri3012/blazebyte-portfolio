import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SelectedWork() {
  const containerRef = useRef<HTMLElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Gentle reveal for text content
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );

      // Subtle mockup entrance and very light parallax
      gsap.fromTo(mockupRef.current,
        { opacity: 0, y: 50, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mockupRef.current,
            start: "top 85%",
          }
        }
      );

      gsap.to(mockupRef.current, {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: mockupRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // CTA reveal
      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
          }
        }
      );

      // Reveal coming next rows
      gsap.fromTo('.coming-next-row',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.coming-next-container',
            start: "top 85%",
          }
        }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#FAF9F6] py-32 md:py-48 px-6 md:px-16 lg:px-24 border-t border-[#111111]/10 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Section Header */}
        <div className="mb-24 md:mb-32">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-1.5 h-1.5 bg-[#FF5A00]" />
            <h2 className="text-[#111111] text-[10px] tracking-[0.3em] font-mono font-bold uppercase">02 — Selected Work</h2>
          </div>
          <h3 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-[-0.04em] text-[#111111] leading-[0.9]">
            SELECTED WORK
          </h3>
          <p className="text-xl md:text-2xl text-[#111111]/60 font-medium mt-6 max-w-2xl">
            Digital experiences built for modern businesses.
          </p>
        </div>

        {/* Featured Project */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-40">
          
          {/* Project Details (Left on desktop) */}
          <div ref={textRef} className="w-full lg:w-1/3 flex flex-col justify-center order-2 lg:order-1">
            <div className="mb-8">
              <p className="text-[#111111]/40 font-mono text-xs tracking-[0.2em] font-bold uppercase mb-4">Featured Concept · 01</p>
              <h4 className="text-4xl md:text-5xl font-display font-black tracking-[-0.02em] text-[#111111] uppercase mb-4">
                Blaze Byte Restaurant
              </h4>
              <p className="text-sm font-mono text-[#FF5A00] tracking-widest uppercase font-bold">
                Premium Restaurant Website Experience
              </p>
            </div>
            
            <p className="text-lg text-[#111111]/70 leading-relaxed mb-10 max-w-md">
              A premium digital restaurant experience created to demonstrate how modern web design, interactive experiences, and strong visual identity can elevate a business online.
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              {['Web Design', 'UI/UX', 'Responsive Design', 'Interactive Experience'].map((tag) => (
                <span key={tag} className="px-4 py-2 border border-[#111111]/10 rounded-full text-xs font-mono tracking-widest text-[#111111]/60 uppercase bg-white">
                  {tag}
                </span>
              ))}
            </div>

            <a 
              ref={ctaRef}
              href="https://blazebyte-restaurent.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-4 bg-[#111111] text-[#FAF9F6] px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-[#FF5A00] transition-colors duration-300 w-fit"
            >
              Explore Live Project
              <svg className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Browser Mockup (Right on desktop) */}
          <div ref={mockupRef} className="w-full lg:w-2/3 order-1 lg:order-2">
            <div className="relative w-full rounded-xl md:rounded-2xl bg-[#111111] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden border border-[#111111]/10">
              
              {/* macOS Browser Header */}
              <div className="h-10 md:h-12 bg-[#1C1C1E] border-b border-white/5 flex items-center px-4">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27C93F]"></div>
                </div>
                <div className="mx-auto bg-black/20 rounded-md px-24 py-1 hidden md:block">
                  <span className="text-[10px] text-white/40 font-mono tracking-widest">blazebyte-restaurent.vercel.app</span>
                </div>
              </div>
              
              {/* Iframe Content Container */}
              <div className="relative w-full aspect-[4/3] md:aspect-[16/10] bg-[#0A0A0A] overflow-hidden pointer-events-none group">
                <iframe 
                  src="https://blazebyte-restaurent.vercel.app/"
                  title="Blaze Byte Restaurant"
                  className="absolute inset-0 w-full h-full border-0 transform origin-top"
                  sandbox="allow-scripts allow-same-origin"
                />
                <div className="absolute inset-0 bg-black/5" /> {/* Very subtle overlay to blend */}
              </div>
            </div>
          </div>
          
        </div>

        {/* Coming Next Area */}
        <div className="coming-next-container max-w-4xl border-t border-[#111111]/10 pt-16 mt-24">
          <div className="flex justify-start mb-12">
            <span className="font-mono text-[9px] tracking-[0.3em] text-[#111111]/40 uppercase font-bold">Coming Next</span>
          </div>
          
          <div className="flex flex-col">
            <div className="coming-next-row group flex items-center justify-between py-8 border-b border-[#111111]/5 hover:border-[#111111]/20 transition-colors duration-300">
              <h5 className="text-2xl md:text-3xl font-display font-black text-[#111111]/30 group-hover:text-[#111111]/60 transition-colors duration-300 uppercase">Project 02</h5>
              <span className="font-mono text-[10px] tracking-widest text-[#111111]/30 uppercase">Coming Soon</span>
            </div>
            <div className="coming-next-row group flex items-center justify-between py-8 border-b border-[#111111]/5 hover:border-[#111111]/20 transition-colors duration-300">
              <h5 className="text-2xl md:text-3xl font-display font-black text-[#111111]/30 group-hover:text-[#111111]/60 transition-colors duration-300 uppercase">Project 03</h5>
              <span className="font-mono text-[10px] tracking-widest text-[#111111]/30 uppercase">Coming Soon</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
