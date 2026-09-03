import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Capability {
  title: string;
  description: string;
}

interface ServiceCapabilitiesProps {
  label: string;
  headline: string;
  capabilities: Capability[];
}

export default function ServiceCapabilities({ label, headline, capabilities }: ServiceCapabilitiesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      rowsRef.current.forEach((row) => {
        if (!row) return;
        gsap.fromTo(row, 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
            }
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  const addToRows = (el: HTMLDivElement | null) => {
    if (el && !rowsRef.current.includes(el)) {
      rowsRef.current.push(el);
    }
  };

  return (
    <section ref={containerRef} className="w-full py-24 px-4 md:px-16 lg:px-32 bg-surface text-primary border-t border-background">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32">
        
        <div className="w-full lg:w-1/3">
           <h2 className="text-accent text-sm tracking-[0.3em] font-mono mb-6">{label}</h2>
           <h3 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-primary leading-tight">
             {headline}
           </h3>
        </div>

        <div className="w-full lg:w-2/3 flex flex-col">
          {capabilities.map((cap, index) => (
            <div 
              key={index} 
              ref={addToRows}
              className="group flex flex-col md:flex-row gap-4 md:gap-16 py-8 border-b border-secondary/20 hover:border-accent/50 transition-colors duration-500"
            >
               <div className="text-xs font-mono tracking-widest text-secondary group-hover:text-accent transition-colors shrink-0 pt-2">
                 {(index + 1).toString().padStart(2, '0')}
               </div>
               <div className="flex flex-col gap-2 w-full">
                  <h4 className="text-xl md:text-2xl font-display font-bold text-primary">{cap.title}</h4>
                  <p className="text-sm md:text-base font-sans text-secondary leading-relaxed max-w-lg">
                    {cap.description}
                  </p>
               </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
