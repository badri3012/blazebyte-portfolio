import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Grow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fragmentsRef = useRef<SVGRectElement[]>([]);
  const signalPathsRef = useRef<SVGPathElement[]>([]);
  const typographyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%',
          scrub: 1,
          pin: true,
        }
      });

      // Reset
      gsap.set(fragmentsRef.current, { scale: 0, opacity: 0 });
      gsap.set(signalPathsRef.current, { strokeDasharray: 1000, strokeDashoffset: 1000, opacity: 0 });
      const textNodes = typographyRef.current?.querySelectorAll('.flow-text') || [];
      gsap.set(textNodes, { y: 30, opacity: 0, filter: 'blur(5px)' });

      // 1. Fragments (from Build) drop in
      tl.to(fragmentsRef.current, {
        scale: 1,
        opacity: 0.1,
        y: (i) => Math.sin(i) * 50,
        x: (i) => Math.cos(i) * 50,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out"
      })
      // 2. Fragments morph into directional signals (Paths draw)
      .to(fragmentsRef.current, { scale: 0, opacity: 0, duration: 0.5 }, "+=0.2")
      .to(signalPathsRef.current, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.inOut"
      }, "<")
      
      // 3. Typography sequence driven by the signals
      .to(textNodes[0], { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.5 }, "-=1")
      .to(textNodes[0], { y: -30, opacity: 0, filter: 'blur(5px)', duration: 0.5, delay: 0.5 })
      
      .to(textNodes[1], { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.5 }, "-=0.2")
      .to(textNodes[1], { y: -30, opacity: 0, filter: 'blur(5px)', duration: 0.5, delay: 0.5 })

      // Final Momentum Text
      .to(textNodes[2], { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.5 }, "-=0.2")
      
      // 4. Signals flow out into Automate
      .to(signalPathsRef.current, {
        strokeDashoffset: -1000,
        duration: 1.5,
        ease: "power3.in"
      }, "+=0.5")
      .to(textNodes[2], { y: -100, opacity: 0, duration: 1 }, "<");
    });

    return () => mm.revert();
  }, []);

  const addFragment = (el: SVGRectElement | null) => {
    if (el && !fragmentsRef.current.includes(el)) {
      fragmentsRef.current.push(el);
    }
  };

  const addPath = (el: SVGPathElement | null) => {
    if (el && !signalPathsRef.current.includes(el)) {
      signalPathsRef.current.push(el);
    }
  };

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-surface flex flex-col items-center justify-center overflow-hidden z-10 border-t border-surface">
      
      {/* 1. Fragment & Signal SVG Canvas */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        
        {/* Fragments from Build (Conceptual) */}
        <g className="origin-center" transform="translate(50vw, 30vh)">
          {Array.from({ length: 12 }).map((_, i) => (
             <rect key={i} ref={addFragment} x="-10" y="-10" width="20" height="20" fill="none" stroke="#111111" strokeWidth="1" />
          ))}
        </g>

        {/* Directional Signal Flow */}
        <g stroke="#ff5a00" fill="none" strokeWidth="2" strokeLinecap="round" className="origin-center" transform="translate(0, 0)">
          {/* Main central artery */}
          <path ref={addPath} d="M 50vw 10vh C 50vw 50vh, 20vw 50vh, 20vw 90vh" />
          <path ref={addPath} d="M 50vw 10vh C 50vw 60vh, 80vw 40vh, 80vw 90vh" />
          <path ref={addPath} d="M 50vw 10vh L 50vw 90vh" />
          <path ref={addPath} d="M 40vw 30vh C 10vw 50vh, 90vw 70vh, 50vw 100vh" opacity="0.3" strokeWidth="1" />
        </g>
      </svg>

      {/* Typography Composition */}
      <div ref={typographyRef} className="relative z-20 flex flex-col items-center text-center px-4 pointer-events-none w-full">
         
         <div className="absolute top-1/2 -translate-y-1/2 w-full flow-text">
            <h2 className="text-accent text-xs tracking-[0.3em] font-mono mb-4">04 / SIGNAL</h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-primary">ATTENTION</h3>
            <p className="text-lg text-secondary mt-2 max-w-md mx-auto">Isolate the signal from the noise.</p>
         </div>

         <div className="absolute top-1/2 -translate-y-1/2 w-full flow-text">
            <h2 className="text-accent text-xs tracking-[0.3em] font-mono mb-4">05 / DIRECTION</h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-primary">ENGAGEMENT</h3>
            <p className="text-lg text-secondary mt-2 max-w-md mx-auto">Guide the audience with intent.</p>
         </div>

         <div className="absolute top-1/2 -translate-y-1/2 w-full flow-text bg-surface/80 backdrop-blur-sm p-12 rounded-3xl border border-background/50 shadow-2xl">
            <h3 className="text-4xl md:text-7xl font-display font-bold tracking-tight text-primary">VISIBILITY</h3>
            <h3 className="text-4xl md:text-7xl font-display font-light tracking-tight text-secondary mt-2 mb-12">IS ONLY THE BEGINNING.</h3>
            
            <h3 className="text-4xl md:text-7xl font-display font-bold tracking-tight text-accent">MOMENTUM</h3>
            <h3 className="text-4xl md:text-7xl font-display font-light tracking-tight text-primary mt-2">IS THE OUTCOME.</h3>
         </div>

      </div>

    </section>
  );
}
