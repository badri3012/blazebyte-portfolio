import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SEOHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<SVGCircleElement[]>([]);
  const linesRef = useRef<SVGPathElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Masked clip-path reveal
      gsap.fromTo('.hero-text', 
        { clipPath: 'inset(100% 0 0 0)' }, 
        { clipPath: 'inset(0% 0 0 0)', duration: 1.2, stagger: 0.1, ease: "power4.out" }
      );
      
      // Node network floating animation
      gsap.to(nodesRef.current, {
        y: 'random(-15, 15)',
        x: 'random(-15, 15)',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 2,
          from: "random"
        }
      });

      // Parallax fade
      gsap.to('.svg-network', {
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

  const addNode = (el: SVGCircleElement | null) => { if (el && !nodesRef.current.includes(el)) nodesRef.current.push(el); };
  const addLine = (el: SVGPathElement | null) => { if (el && !linesRef.current.includes(el)) linesRef.current.push(el); };

  return (
    <section ref={containerRef} className="relative w-full min-h-[90vh] bg-surface flex flex-col justify-center px-4 md:px-16 lg:px-32 pt-24 overflow-hidden border-t border-background">
      
      {/* Background Node Network */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 svg-network" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(60%, 40%) scale(1.5)">
          {/* Edges */}
          <path ref={addLine} d="M 0 0 L -100 -50" stroke="#52525B" strokeWidth="1" />
          <path ref={addLine} d="M 0 0 L 100 -50" stroke="#52525B" strokeWidth="1" />
          <path ref={addLine} d="M 0 0 L 0 100" stroke="#52525B" strokeWidth="1" />
          <path ref={addLine} d="M -100 -50 L -150 -20" stroke="#52525B" strokeWidth="1" />
          <path ref={addLine} d="M 100 -50 L 150 0" stroke="#52525B" strokeWidth="1" />
          <path ref={addLine} d="M 0 100 L -50 150" stroke="#52525B" strokeWidth="1" />
          <path ref={addLine} d="M 0 100 L 50 160" stroke="#52525B" strokeWidth="1" />

          {/* Nodes */}
          <circle ref={addNode} cx="0" cy="0" r="5" fill="#111111" />
          <circle ref={addNode} cx="-100" cy="-50" r="4" fill="#111111" />
          <circle ref={addNode} cx="100" cy="-50" r="4" fill="#111111" />
          <circle ref={addNode} cx="0" cy="100" r="4" fill="#111111" />
          <circle ref={addNode} cx="-150" cy="-20" r="3" fill="#111111" />
          <circle ref={addNode} cx="150" cy="0" r="3" fill="#111111" />
          <circle ref={addNode} cx="-50" cy="150" r="3" fill="#111111" />
          <circle ref={addNode} cx="50" cy="160" r="3" fill="#111111" />
        </g>
      </svg>

      <div className="relative z-10 max-w-5xl">
        <h1 className="flex flex-col overflow-hidden">
          <span className="hero-text block text-accent text-xs md:text-sm tracking-[0.3em] font-mono mb-6 uppercase">Service / SEO</span>
          <span className="hero-text block text-5xl md:text-8xl font-display font-bold tracking-tight text-primary uppercase leading-[0.9]">Search</span>
          <span className="hero-text block text-5xl md:text-8xl font-display font-light tracking-tight text-secondary uppercase leading-[0.9]">Architecture.</span>
        </h1>
        <div className="overflow-hidden mt-8">
           <p className="hero-text block text-secondary text-lg md:text-xl font-sans max-w-2xl leading-relaxed">
             Technical SEO is not about keywords; it is about data structure. We engineer site architecture that search engines can crawl, understand, and confidently rank.
           </p>
        </div>
      </div>

    </section>
  );
}
