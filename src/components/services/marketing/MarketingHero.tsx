import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MarketingHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const signalsRef = useRef<SVGCircleElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Masked clip-path reveal
      gsap.fromTo('.hero-text', 
        { clipPath: 'inset(100% 0 0 0)' }, 
        { clipPath: 'inset(0% 0 0 0)', duration: 1.2, stagger: 0.1, ease: "power4.out" }
      );

      // Signals moving horizontally based on scroll
      gsap.to(signalsRef.current, {
        x: '200vw',
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });
      
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const addSignal = (el: SVGCircleElement | null) => { if (el && !signalsRef.current.includes(el)) signalsRef.current.push(el); };

  return (
    <section ref={containerRef} className="relative w-full min-h-[90vh] bg-background flex flex-col justify-center px-4 md:px-16 lg:px-32 pt-24 overflow-hidden border-t border-surface">
      
      {/* Background Signal Flow */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        {/* Horizontal tracking lines */}
        <line x1="0" y1="20%" x2="100%" y2="20%" stroke="#52525B" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="5 5" />
        <line x1="0" y1="40%" x2="100%" y2="40%" stroke="#52525B" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="5 5" />
        <line x1="0" y1="60%" x2="100%" y2="60%" stroke="#52525B" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="5 5" />
        <line x1="0" y1="80%" x2="100%" y2="80%" stroke="#52525B" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="5 5" />

        {/* Signals */}
        <circle ref={addSignal} cx="-50" cy="20%" r="4" fill="#ff5a00" opacity="0.8" />
        <circle ref={addSignal} cx="-250" cy="40%" r="6" fill="#ff5a00" opacity="0.6" />
        <circle ref={addSignal} cx="-100" cy="60%" r="3" fill="#ff5a00" opacity="0.9" />
        <circle ref={addSignal} cx="-350" cy="80%" r="5" fill="#ff5a00" opacity="0.5" />
      </svg>

      <div className="relative z-10 max-w-5xl">
        <h1 className="flex flex-col overflow-hidden">
          <span className="hero-text block text-accent text-xs md:text-sm tracking-[0.3em] font-mono mb-6 uppercase">Service / Digital Marketing</span>
          <span className="hero-text block text-5xl md:text-8xl font-display font-bold tracking-tight text-primary uppercase leading-[0.9]">Digital</span>
          <span className="hero-text block text-5xl md:text-8xl font-display font-light tracking-tight text-secondary uppercase leading-[0.9]">Momentum.</span>
        </h1>
        <div className="overflow-hidden mt-8">
           <p className="hero-text block text-secondary text-lg md:text-xl font-sans max-w-2xl leading-relaxed">
             Search visibility and conversion architecture engineered to create sustainable business momentum. We turn attention into structural business growth.
           </p>
        </div>
      </div>

    </section>
  );
}
