import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectButton from '../ui/ProjectButton';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Line drawing effect
      gsap.set(pathRef.current, { strokeDasharray: 1000, strokeDashoffset: 1000 });
      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "center center",
          scrub: 1
        }
      });

      // Text entrance
      const words = textRef.current?.querySelectorAll('.clip-text');
      if (words) {
        gsap.set(words, { clipPath: "inset(100% 0 0 0)", y: 40 });
        gsap.to(words, {
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          }
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-40 flex flex-col items-center justify-center bg-[#111111] overflow-hidden text-center z-10 border-t border-white/5">
      {/* Background SVG Signal Path */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" preserveAspectRatio="none">
         <path 
           ref={pathRef}
           d="M 0,0 C 200,300 800,100 1200,500 L 2000,500" 
           stroke="#FF5A14" 
           strokeWidth="2" 
           fill="none" 
         />
      </svg>
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-4 mb-8">
          <span className="w-1.5 h-1.5 bg-[#FF5A14] animate-pulse" />
          <span className="text-[#FAF9F6]/60 text-[10px] tracking-[0.3em] font-mono font-bold uppercase">System Ready</span>
        </div>
        
        <h2 ref={textRef} className="text-[12vw] md:text-[8vw] font-display font-black uppercase tracking-tighter mb-16 text-[#FAF9F6] leading-[0.9] flex flex-col">
          <span className="clip-text pb-2">LET'S BUILD</span>
          <span className="clip-text pb-2 text-[#FAF9F6]/30">WHAT'S NEXT.</span>
        </h2>
        
        <ProjectButton />
      </div>
    </section>
  );
}
