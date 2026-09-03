import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitText from '../ui/SplitText';

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;
    
    gsap.to(textRef.current, {
      scale: 1,
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[80vh] flex items-center justify-center bg-transparent overflow-hidden py-32 mt-32">
       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet/5 to-transparent"></div>
       
       <div ref={textRef} className="relative z-10 flex flex-col items-center text-center opacity-30 scale-90">
         <h2 className="text-[8vw] md:text-[6vw] font-display font-black uppercase tracking-tighter leading-tight text-primary">
           <SplitText text="MAKE IT BOLD." delay={0.1} />
           <br />
           <SplitText text="MAKE IT SMART." delay={0.2} />
           <br />
           <SplitText text="MAKE IT MATTER." delay={0.3} />
         </h2>
       </div>
    </section>
  );
}
