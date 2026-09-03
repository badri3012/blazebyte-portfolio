import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function WebHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<SVGGElement>(null);
  const diagramLines = useRef<(SVGElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Text reveals
      const texts = document.querySelectorAll('.hero-mask-text');
      tl.fromTo(texts, 
        { clipPath: 'inset(100% 0 0 0)' }, 
        { clipPath: 'inset(0% 0 0 0)', duration: 1.2, stagger: 0.1, ease: "power4.out" }
      );

      // Interface Diagram Drawing
      tl.fromTo(diagramLines.current,
        { strokeDasharray: 500, strokeDashoffset: 500 },
        { strokeDashoffset: 0, duration: 1.5, stagger: 0.1, ease: "power2.inOut" },
        "-=0.8"
      );

      // Parallax effect on scroll
      gsap.to(diagramRef.current, {
        y: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[90vh] bg-background flex flex-col md:flex-row items-center px-4 md:px-16 lg:px-32 pt-24 overflow-hidden border-t border-surface">
      
      <div className="relative z-10 w-full md:w-1/2">
        <h1 className="flex flex-col">
          <span className="text-accent text-xs md:text-sm tracking-[0.3em] font-mono mb-6 uppercase overflow-hidden">
             <span className="block hero-mask-text">Service / Web Development</span>
          </span>
          <span className="text-5xl md:text-8xl font-display font-bold tracking-tight text-primary uppercase leading-[0.9] overflow-hidden">
             <span className="block hero-mask-text">Digital</span>
          </span>
          <span className="text-5xl md:text-8xl font-display font-light tracking-tight text-secondary uppercase leading-[0.9] overflow-hidden">
             <span className="block hero-mask-text">Architecture.</span>
          </span>
        </h1>
        <div className="overflow-hidden mt-8">
           <p className="hero-mask-text text-secondary text-lg md:text-xl font-sans max-w-lg leading-relaxed">
             Premium websites and digital products designed around business goals, usability, performance, and scalable technical foundations.
           </p>
        </div>
      </div>

      <div className="relative z-0 w-full md:w-1/2 h-[500px] mt-16 md:mt-0">
        <svg className="w-full h-full" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet">
           <g ref={diagramRef} opacity="0.8">
              {/* Browser / Interface wireframe */}
              <rect ref={el => { diagramLines.current[0] = el; }} x="50" y="100" width="400" height="300" fill="none" stroke="#111111" strokeWidth="2" />
              <line ref={el => { diagramLines.current[1] = el; }} x1="50" y1="140" x2="450" y2="140" stroke="#111111" strokeWidth="2" />
              <rect ref={el => { diagramLines.current[2] = el; }} x="70" y="115" width="40" height="10" rx="5" fill="none" stroke="#111111" strokeWidth="1" />
              <rect ref={el => { diagramLines.current[3] = el; }} x="120" y="115" width="40" height="10" rx="5" fill="none" stroke="#111111" strokeWidth="1" />
              
              {/* Hero Image Block */}
              <rect ref={el => { diagramLines.current[4] = el; }} x="70" y="160" width="360" height="120" fill="none" stroke="#52525B" strokeWidth="1" strokeDasharray="4 4" />
              <line ref={el => { diagramLines.current[5] = el; }} x1="70" y1="160" x2="430" y2="280" stroke="#52525B" strokeWidth="1" strokeDasharray="4 4" />
              <line ref={el => { diagramLines.current[6] = el; }} x1="430" y1="160" x2="70" y2="280" stroke="#52525B" strokeWidth="1" strokeDasharray="4 4" />
              
              {/* Content Grid */}
              <rect ref={el => { diagramLines.current[7] = el; }} x="70" y="300" width="110" height="80" fill="none" stroke="#111111" strokeWidth="1" />
              <rect ref={el => { diagramLines.current[8] = el; }} x="195" y="300" width="110" height="80" fill="none" stroke="#111111" strokeWidth="1" />
              <rect ref={el => { diagramLines.current[9] = el; }} x="320" y="300" width="110" height="80" fill="none" stroke="#111111" strokeWidth="1" />
              
              {/* Blaze Orange Signal Path crossing the UI */}
              <path ref={el => { diagramLines.current[10] = el; }} d="M0,220 C150,220 250,340 500,340" fill="none" stroke="#ff5a00" strokeWidth="2" />
           </g>
        </svg>
      </div>

    </section>
  );
}
