import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../../utils/cn';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: "01", title: "DISCOVER", desc: "Understand the business architecture and core requirements." },
  { num: "02", title: "STRATEGIZE", desc: "Define the digital direction and structural roadmap." },
  { num: "03", title: "DESIGN", desc: "Engineer the user experience and visual design system." },
  { num: "04", title: "BUILD", desc: "Develop the digital product with precision." },
  { num: "05", title: "GROW", desc: "Optimize visibility and implement conversion systems." },
  { num: "06", title: "AUTOMATE", desc: "Build scalable, intelligent operational workflows." }
];

export default function Method() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !pinRef.current) return;
    
    // Use gsap.context to strictly scope and cleanup all GSAP/ScrollTrigger instances
    // This perfectly prevents React 18 Strict Mode duplication and ghosting
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Headline Parallax Reveal
        gsap.fromTo(headlineRef.current, 
          { y: 50, opacity: 0 }, 
          { 
            y: 0, 
            opacity: 1, 
            duration: 1, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            }
          }
        );

        // Main Timeline for scrubbing the list while pinned
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=200%', // Pin for 2 viewport heights
            scrub: 1,
            pin: pinRef.current,
            anticipatePin: 1
          }
        });

        // We want the central line to draw from 0 to 100% over the scroll duration
        tl.fromTo(lineRef.current, { scaleY: 0 }, { scaleY: 1, ease: "none", duration: 1 }, 0);

        // Calculate when each step should trigger based on timeline progress
        const stepDuration = 1 / steps.length;

        itemsRef.current.forEach((item, i) => {
          if (!item) return;
          const number = item.querySelector('.step-number');
          const content = item.querySelector('.step-content');
          const dot = item.querySelector('.step-dot');

          gsap.set([number, content], { opacity: 0.2, x: i % 2 === 0 ? 30 : -30 });
          gsap.set(dot, { scale: 0, backgroundColor: '#111111' });

          const startTime = i * stepDuration;

          tl.to([number, content], { opacity: 1, x: 0, duration: 0.1, ease: "power2.out" }, startTime)
            .to(dot, { scale: 1, backgroundColor: '#FF5A00', duration: 0.1, ease: "back.out(2)" }, startTime);
        });
        
        // Exit Parallax for Handoff (Removed y: -100 on trigger to prevent bounding box duplication/glitches)
        gsap.to(pinRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "bottom top",
            end: "+=50%",
            scrub: true,
          }
        });
      });
    }, containerRef); // Scope context to container

    return () => ctx.revert(); // Guarantee absolute cleanup of all pins and triggers
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-transparent py-24 border-t border-[#111111]/10 overflow-hidden">
      
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div ref={pinRef} className="max-w-[1400px] mx-auto relative z-10 w-full min-h-screen flex flex-col items-center justify-center pt-16">
        
        <div ref={headlineRef} className="flex flex-col items-center text-center mb-16 md:mb-24 shrink-0">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-1.5 h-1.5 bg-[#FF5A00]" />
            <h2 className="text-[#111111] text-[10px] tracking-[0.3em] font-mono font-bold uppercase">03 — The Methodology</h2>
            <span className="w-1.5 h-1.5 bg-[#FF5A00]" />
          </div>
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-[-0.04em] text-[#111111] leading-[0.9]">
            HOW GREAT DIGITAL
          </h3>
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-[-0.04em] text-[#111111]/20 leading-[0.9] mt-2">
            SYSTEMS GET BUILT.
          </h3>
        </div>

        <div className="relative w-full max-w-4xl mx-auto flex-1 flex flex-col justify-center">
          
          {/* Central Structural Line */}
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 md:-translate-x-1/2 w-[1px] bg-[#111111]/10">
            <div ref={lineRef} className="w-full h-full bg-[#FF5A00] origin-top scale-y-0 shadow-[0_0_15px_rgba(255,90,0,0.5)]" />
          </div>

          <div className="flex flex-col gap-10 md:gap-16 justify-center">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={index} 
                  ref={(el) => { itemsRef.current[index] = el; }}
                  className={cn(
                    "relative flex flex-col md:flex-row items-start md:items-center w-full",
                    isEven ? "md:justify-start" : "md:justify-end"
                  )}
                >
                  
                  {/* The Timeline Node Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-[4px] md:-translate-x-[4.5px] top-6 md:top-1/2 md:-translate-y-1/2 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full step-dot z-20" />

                  {/* Content Container */}
                  <div className={cn(
                    "w-full md:w-[45%] pl-12 md:pl-0 flex flex-col",
                    isEven ? "md:items-end md:text-right md:pr-12" : "md:items-start md:text-left md:pl-12"
                  )}>
                    <div className="flex items-baseline gap-4 md:gap-6 step-number">
                      <span className="text-[#111111]/40 font-mono text-[10px] md:text-xs tracking-[0.2em] font-bold">{step.num}</span>
                      <h4 className="text-2xl md:text-4xl lg:text-5xl font-display font-black tracking-[-0.02em] text-[#111111] uppercase">{step.title}</h4>
                    </div>
                    <p className="text-[#111111]/60 text-sm md:text-base mt-2 max-w-xs step-content">
                      {step.desc}
                    </p>
                  </div>
                  
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
