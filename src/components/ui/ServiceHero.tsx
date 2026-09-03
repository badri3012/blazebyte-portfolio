import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MagneticButton from './MagneticButton';
import ProjectButton from './ProjectButton';

interface ServiceHeroProps {
  headlineLine1: string;
  headlineLine2: string;
  description: string;
}

export default function ServiceHero({ headlineLine1, headlineLine2, description }: ServiceHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement[]>([]);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Setup mask clip paths
      wordsRef.current.forEach(word => {
        if (word) gsap.set(word.querySelectorAll('.char'), { yPercent: 100 });
      });
      gsap.set(descRef.current, { opacity: 0, y: 20 });
      gsap.set(ctaRef.current, { opacity: 0, y: 20 });

      const tl = gsap.timeline({ delay: 0.2 });

      wordsRef.current.forEach((word, index) => {
        if (!word) return;
        const chars = word.querySelectorAll('.char');
        tl.to(chars, {
          yPercent: 0,
          duration: 1,
          stagger: 0.03,
          ease: "power4.out"
        }, index === 0 ? 0 : `-=0.8`);
      });

      tl.to(descRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.5")
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.8");
    });

    return () => mm.revert();
  }, []);

  const addToWords = (el: HTMLDivElement | null) => {
    if (el && !wordsRef.current.includes(el)) {
      wordsRef.current.push(el);
    }
  };

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block">{char === ' ' ? '\u00A0' : char}</span>
    ));
  };

  return (
    <header ref={containerRef} className="relative w-full pt-48 pb-24 px-4 md:px-16 lg:px-32 bg-background text-primary overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-start">
        
        <h1 className="text-[clamp(3rem,8vw,8rem)] leading-[0.95] font-display font-black tracking-tighter">
          <div ref={addToWords} className="overflow-hidden inline-block pb-2">
            {splitText(headlineLine1)}
          </div>
          <br />
          <div ref={addToWords} className="overflow-hidden inline-block pb-2 text-accent">
            {splitText(headlineLine2)}
          </div>
        </h1>

        <div className="mt-12 flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-end w-full border-t border-surface pt-12">
          <p ref={descRef} className="text-lg md:text-2xl font-display font-light text-secondary max-w-2xl leading-relaxed">
            {description}
          </p>
          
          <div ref={ctaRef} className="mt-4 md:mt-0 flex-shrink-0">
             <MagneticButton>
               <ProjectButton />
             </MagneticButton>
          </div>
        </div>
        
      </div>
    </header>
  );
}
