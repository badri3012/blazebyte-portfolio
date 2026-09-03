import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Build() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgGridRef = useRef<SVGSVGElement>(null);
  const wireframesRef = useRef<SVGRectElement[]>([]);
  const textContentRef = useRef<HTMLDivElement>(null);
  const signalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=250%',
          scrub: 1,
          pin: true,
        }
      });

      // Reset states
      gsap.set(signalRef.current, { scale: 0, opacity: 0 });
      gsap.set(svgGridRef.current, { opacity: 0 });
      gsap.set(wireframesRef.current, { strokeDasharray: "0 1000", opacity: 0 });
      const stages = textContentRef.current?.querySelectorAll('.stage-text') || [];
      gsap.set(stages, { opacity: 0, y: 20 });

      // 1. SIGNAL ENTERS (Continuing visual language from Hero)
      tl.to(signalRef.current, { scale: 1, opacity: 1, duration: 0.5 })
        .to(signalRef.current, { y: 100, duration: 0.8, ease: "power2.inOut" })
        .to(signalRef.current, { scale: 0, opacity: 0, duration: 0.3 });

      // 2. GRID / STRUCTURE APPEARS (Signal activates grid)
      tl.to(svgGridRef.current, { opacity: 1, duration: 0.5 }, "-=0.2")
        .to(stages[0], { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");

      // 3. WIREFRAME DRAWS
      tl.to(stages[0], { opacity: 0, y: -20, duration: 0.5, delay: 0.5 })
        .to(stages[1], { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
        .to(wireframesRef.current, { 
          strokeDasharray: "1000 0", 
          opacity: 1, 
          duration: 1.5, 
          stagger: 0.2, 
          ease: "power2.inOut" 
        }, "<");

      // 4. DIGITAL EXPERIENCE (Layout assembly)
      tl.to(stages[1], { opacity: 0, y: -20, duration: 0.5, delay: 0.5 })
        .to(stages[2], { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
        .to(wireframesRef.current, { 
          fill: "rgba(240, 238, 233, 1)", // Surface Light
          strokeWidth: 2,
          duration: 1
        }, "<");

      // 5. FRAGMENTATION (Transition to Grow)
      tl.to(stages[2], { opacity: 0, y: -20, duration: 0.5, delay: 0.5 })
        .to(wireframesRef.current, {
           scale: 0.1,
           transformOrigin: "center center",
           opacity: 0,
           duration: 1,
           stagger: 0.1,
           ease: "power3.in"
        }, "-=0.2")
        .to(svgGridRef.current, { opacity: 0, duration: 1 }, "<");
    });

    return () => mm.revert();
  }, []);

  const addWireframe = (el: SVGRectElement | null) => {
    if (el && !wireframesRef.current.includes(el)) {
      wireframesRef.current.push(el);
    }
  };

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-background flex flex-col items-center justify-center overflow-hidden z-10 border-t border-surface">
      
      {/* 1. The Signal */}
      <div className="absolute top-0 flex flex-col items-center z-30">
         <div ref={signalRef} className="w-2 h-2 mt-32 rounded-full bg-accent shadow-[0_0_15px_rgba(255,90,0,0.8)]" />
      </div>

      {/* 2. Architectural Grid */}
      <svg ref={svgGridRef} className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="build-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#52525B" strokeWidth="0.5" strokeOpacity="0.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#build-grid)" />
        
        {/* 3. Wireframes */}
        <g className="origin-center" transform="translate(50%, 50%)">
           {/* Center block */}
           <rect ref={addWireframe} x="-150" y="-100" width="300" height="200" fill="none" stroke="#111111" strokeWidth="1" rx="4" />
           {/* Side blocks */}
           <rect ref={addWireframe} x="-350" y="-80" width="160" height="160" fill="none" stroke="#111111" strokeWidth="1" rx="4" />
           <rect ref={addWireframe} x="190" y="-80" width="160" height="160" fill="none" stroke="#111111" strokeWidth="1" rx="4" />
        </g>
      </svg>

      {/* 4. Text Content Assembly */}
      <div ref={textContentRef} className="relative z-20 flex flex-col items-center text-center px-4 pointer-events-none w-full">
         
         <div className="absolute top-1/2 -translate-y-1/2 w-full stage-text">
            <h2 className="text-accent text-xs tracking-[0.3em] font-mono mb-4">01 / STRUCTURE</h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-primary">BUILD</h3>
            <p className="text-lg text-secondary mt-2 max-w-md mx-auto">We engineer architectural foundations.</p>
         </div>

         <div className="absolute top-1/2 -translate-y-1/2 w-full stage-text">
            <h2 className="text-accent text-xs tracking-[0.3em] font-mono mb-4">02 / INTERFACE</h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-primary">EXPERIENCE</h3>
            <p className="text-lg text-secondary mt-2 max-w-md mx-auto">Structure becomes interaction.</p>
         </div>

         <div className="absolute top-1/2 -translate-y-1/2 w-full stage-text">
            <h2 className="text-accent text-xs tracking-[0.3em] font-mono mb-4">03 / PRODUCT</h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-primary">SYSTEM</h3>
            <p className="text-lg text-secondary mt-2 max-w-md mx-auto">Design that performs at scale.</p>
         </div>

      </div>

    </section>
  );
}
