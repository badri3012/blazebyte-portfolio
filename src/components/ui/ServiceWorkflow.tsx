import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface WorkflowStep {
  title: string;
  description?: string;
}

interface ServiceWorkflowProps {
  label: string;
  headline: string;
  steps: WorkflowStep[];
}

export default function ServiceWorkflow({ label, headline, steps }: ServiceWorkflowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);
  const linesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Animate steps sequentially as they scroll into view
      stepsRef.current.forEach((step, index) => {
        if (!step) return;
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
          }
        });

        // The line grows first
        const line = linesRef.current[index];
        if (line) {
          gsap.set(line, { scaleY: 0, transformOrigin: "top center" });
          tl.to(line, { scaleY: 1, duration: 0.5, ease: "power2.out" });
        }

        // The step content reveals
        tl.fromTo(step.querySelector('.step-content'), 
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
          line ? "-=0.2" : 0
        );
      });
    });

    return () => mm.revert();
  }, []);

  const addToSteps = (el: HTMLDivElement | null) => {
    if (el && !stepsRef.current.includes(el)) stepsRef.current.push(el);
  };
  const addToLines = (el: HTMLDivElement | null) => {
    if (el && !linesRef.current.includes(el)) linesRef.current.push(el);
  };

  return (
    <section ref={containerRef} className="w-full py-24 px-4 md:px-16 lg:px-32 bg-background text-primary border-t border-surface">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-24 max-w-3xl">
           <h2 className="text-accent text-sm tracking-[0.3em] font-mono mb-6">{label}</h2>
           <h3 className="text-3xl md:text-5xl font-display font-light tracking-tight text-secondary">
             {headline}
           </h3>
        </div>

        <div className="flex flex-col items-start w-full max-w-2xl relative">
          {steps.map((step, index) => (
            <div key={index} ref={addToSteps} className="relative flex gap-8 w-full pb-16 last:pb-0">
               {/* Vertical Connecting Line */}
               {index < steps.length - 1 && (
                 <div ref={addToLines} className="absolute left-[3px] top-4 bottom-0 w-[1px] bg-accent/30 z-0" />
               )}
               
               {/* Timeline Dot */}
               <div className="relative mt-1.5 w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgba(255,90,0,0.5)] z-10 shrink-0" />
               
               {/* Content */}
               <div className="step-content flex flex-col gap-2">
                 <h4 className="text-xl md:text-3xl font-display font-bold tracking-widest text-primary">
                   {step.title}
                 </h4>
                 {step.description && (
                   <p className="text-sm md:text-base font-sans text-secondary leading-relaxed mt-2 max-w-md">
                     {step.description}
                   </p>
                 )}
               </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
