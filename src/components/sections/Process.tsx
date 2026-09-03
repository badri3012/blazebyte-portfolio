import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitText from '../ui/SplitText';

const steps = [
  { num: "01", title: "DISCOVER" },
  { num: "02", title: "STRATEGIZE" },
  { num: "03", title: "DESIGN" },
  { num: "04", title: "BUILD" },
  { num: "05", title: "LAUNCH" },
  { num: "06", title: "GROW" }
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current || !stepsRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 50%',
          end: 'bottom 50%',
          scrub: 1,
        }
      });

      const stepElements = stepsRef.current!.querySelectorAll('.process-step');
      stepElements.forEach((step) => {
        gsap.fromTo(step, 
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            scrollTrigger: {
              trigger: step,
              start: 'top 70%',
              end: 'top 50%',
              scrub: 1,
            }
          }
        );
      });
    });
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen py-32 bg-transparent flex flex-col items-center mt-20">
      <div className="text-center mb-24 z-10">
        <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-widest mb-4">
          <SplitText text="06 — PROVE" />
        </h2>
      </div>

      <div className="relative w-full max-w-4xl mx-auto flex">
        {/* Progress Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-primary/10">
          <div ref={lineRef} className="absolute top-0 left-0 w-full bg-accent origin-top h-full scale-y-0 shadow-[0_0_10px_#3b82f6]"></div>
        </div>

        <div ref={stepsRef} className="w-full flex flex-col gap-32 py-12 z-10 pl-24 md:pl-0">
          {steps.map((step, i) => (
            <div key={i} className={`process-step w-full flex ${i % 2 === 0 ? 'md:justify-end md:pr-12' : 'md:justify-start md:pl-12'}`}>
              <div className="relative md:w-1/2 flex items-center gap-6 group" data-magnetic="true">
                <div className="text-accent font-display font-black text-3xl opacity-50 group-hover:opacity-100 transition-opacity">{step.num}</div>
                <div className="text-3xl md:text-5xl font-display font-bold text-primary group-hover:translate-x-4 transition-transform duration-500 tracking-widest">{step.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
