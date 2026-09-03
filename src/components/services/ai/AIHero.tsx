import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AIHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const coreNodeRef = useRef<SVGCircleElement>(null);
  const orbitalNodesRef = useRef<SVGCircleElement[]>([]);
  const dataRingsRef = useRef<SVGCircleElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Masked clip-path reveal
      gsap.fromTo('.hero-text', 
        { clipPath: 'inset(100% 0 0 0)' }, 
        { clipPath: 'inset(0% 0 0 0)', duration: 1.2, stagger: 0.1, ease: "power4.out" }
      );
      
      // Core pulsing
      gsap.to(coreNodeRef.current, {
        scale: 1.1,
        opacity: 0.8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Data rings expanding
      gsap.to(dataRingsRef.current, {
        r: "+=20",
        opacity: 0,
        duration: 3,
        repeat: -1,
        stagger: 1.5,
        ease: "power2.out"
      });

      // Orbital nodes rotating
      gsap.to('.orbital-group', {
        rotation: 360,
        transformOrigin: "center center",
        duration: 20,
        repeat: -1,
        ease: "none"
      });

      // Parallax fade
      gsap.to('.svg-network', {
        y: 150,
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

  const addOrbital = (el: SVGCircleElement | null) => { if (el && !orbitalNodesRef.current.includes(el)) orbitalNodesRef.current.push(el); };
  const addRing = (el: SVGCircleElement | null) => { if (el && !dataRingsRef.current.includes(el)) dataRingsRef.current.push(el); };

  return (
    <section ref={containerRef} className="relative w-full min-h-[90vh] bg-surface-dark flex flex-col justify-center px-4 md:px-16 lg:px-32 pt-24 overflow-hidden border-t border-background-dark">
      
      {/* Background Intelligent System Core */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none svg-network" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(75%, 50%) scale(2)">
          
          {/* Pulsing rings */}
          <circle ref={addRing} cx="0" cy="0" r="20" fill="none" stroke="#ff5a00" strokeWidth="1" opacity="0.5" />
          <circle ref={addRing} cx="0" cy="0" r="20" fill="none" stroke="#ff5a00" strokeWidth="1" opacity="0.5" />

          <g className="orbital-group">
            <circle cx="0" cy="0" r="40" fill="none" stroke="#52525B" strokeWidth="0.5" strokeDasharray="2 4" />
            <circle ref={addOrbital} cx="0" cy="-40" r="2" fill="#f4f4f5" />
            <circle ref={addOrbital} cx="40" cy="0" r="2" fill="#f4f4f5" />
            <circle ref={addOrbital} cx="0" cy="40" r="2" fill="#f4f4f5" />
            <circle ref={addOrbital} cx="-40" cy="0" r="2" fill="#f4f4f5" />
          </g>

          <g className="orbital-group" style={{ transform: 'rotate(45deg)' }}>
            <circle cx="0" cy="0" r="70" fill="none" stroke="#52525B" strokeWidth="0.2" />
            <circle ref={addOrbital} cx="0" cy="-70" r="1.5" fill="#a1a1aa" />
            <circle ref={addOrbital} cx="70" cy="0" r="1.5" fill="#a1a1aa" />
            <circle ref={addOrbital} cx="-70" cy="0" r="1.5" fill="#a1a1aa" />
          </g>

          {/* Core Brain Node */}
          <circle ref={coreNodeRef} cx="0" cy="0" r="8" fill="#ff5a00" filter="drop-shadow(0 0 10px rgba(255,90,0,0.8))" />
        </g>
      </svg>

      <div className="relative z-10 max-w-5xl">
        <h1 className="flex flex-col overflow-hidden">
          <span className="hero-text block text-accent text-xs md:text-sm tracking-[0.3em] font-mono mb-6 uppercase">Service / AI Automation</span>
          <span className="hero-text block text-5xl md:text-8xl font-display font-bold tracking-tight text-background uppercase leading-[0.9]">Intelligent</span>
          <span className="hero-text block text-5xl md:text-8xl font-display font-light tracking-tight text-secondary uppercase leading-[0.9]">Systems.</span>
        </h1>
        <div className="overflow-hidden mt-8">
           <p className="hero-text block text-secondary text-lg md:text-xl font-sans max-w-2xl leading-relaxed">
             Eliminate manual workflows and repetitive logic. We engineer autonomous business processes that scale operational velocity without human bottlenecks.
           </p>
        </div>
      </div>

    </section>
  );
}
