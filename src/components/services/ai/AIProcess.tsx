import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AIProcess() {
  const containerRef = useRef<HTMLElement>(null);
  const visualColRef = useRef<HTMLDivElement>(null);
  const contentColRef = useRef<HTMLDivElement>(null);
  
  // Animation refs
  const envRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<SVGSVGElement>(null);
  const pathLinesRef = useRef<SVGPathElement[]>([]);
  const nodesRef = useRef<HTMLDivElement[]>([]);
  const signalRef = useRef<SVGCircleElement>(null);
  
  const titleLinesRef = useRef<HTMLHeadingElement[]>([]);
  const labelRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      // 1. Entrance animation (ScrollTrigger - NO PINNING)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      });

      // Reset Visual States
      gsap.set(envRef.current, { opacity: 0, scale: 0.98, y: 30 });
      gsap.set(gridRef.current, { opacity: 0 });
      gsap.set(pathLinesRef.current, { strokeDasharray: 800, strokeDashoffset: 800 });
      gsap.set(nodesRef.current, { opacity: 0, y: 15, scale: 0.98 });
      gsap.set(signalRef.current, { opacity: 0, cy: 40 });
      
      // Reset Text States
      gsap.set(labelRef.current, { opacity: 0 });
      gsap.set(titleLinesRef.current, { clipPath: 'inset(100% 0 0 0)', y: 30 });
      gsap.set(descRef.current, { opacity: 0, y: 20 });

      // SEQUENCE
      // A. Text Reveal
      tl.to(labelRef.current, { opacity: 1, duration: 0.6 })
        .to(titleLinesRef.current, { 
          clipPath: 'inset(0% 0 0 0)', 
          y: 0, 
          duration: 1, 
          stagger: 0.15, 
          ease: "power4.out" 
        }, "-=0.4")
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");

      // B. Visual Container Reveal
      tl.to(envRef.current, { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out" }, 0.2)
        .to(gridRef.current, { opacity: 0.15, duration: 1 }, "-=0.6")
        
      // C. Paths Draw
        .to(pathLinesRef.current, { 
          strokeDashoffset: 0, 
          duration: 1.5, 
          stagger: 0.1, 
          ease: "power2.inOut" 
        }, "-=0.4")
        
      // D. Nodes Reveal Sequentially
        .to(nodesRef.current, { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: "back.out(1.5)" 
        }, "-=1.2");

      // E. Signal Travels (AI -> Intent -> Review -> Decision -> Action)
      const signalTl = gsap.timeline();
      signalTl.to(signalRef.current, { opacity: 1, duration: 0.2 })
              .to(signalRef.current, { cy: 202, duration: 0.6, ease: "power2.inOut" }) // to Intent
              .to(signalRef.current, { cy: 322, duration: 0.6, ease: "power2.inOut" }) // to Review
              .to(signalRef.current, { cy: 442, duration: 0.6, ease: "power2.inOut" }) // to Decision
              .to(signalRef.current, { cy: 520, duration: 0.6, ease: "power2.inOut" }) // to Action Exit
              .to(signalRef.current, { opacity: 0, duration: 0.3 });

      tl.add(signalTl, "-=0.5");

      // Ambient Loop for the signal after initial sequence
      tl.call(() => {
        gsap.to(signalRef.current, {
          cy: 520,
          opacity: 1,
          duration: 3,
          ease: "power1.inOut",
          repeat: -1,
          repeatDelay: 2,
          onRepeat: () => { gsap.set(signalRef.current, { cy: 40 }); }
        });
      });

      // 2. Subtle Independent Parallax (Desktop Only, No Pinning)
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.to(visualColRef.current, {
          y: -40,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
        
        gsap.to(contentColRef.current, {
          y: -20,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addPath = (el: SVGPathElement | null) => { if (el && !pathLinesRef.current.includes(el)) pathLinesRef.current.push(el); };
  const addNode = (el: HTMLDivElement | null) => { if (el && !nodesRef.current.includes(el)) nodesRef.current.push(el); };
  const addTitleLine = (el: HTMLHeadingElement | null) => { if (el && !titleLinesRef.current.includes(el)) titleLinesRef.current.push(el); };

  const workflowNodes = [
    { title: "AI CLASSIFICATION", sub: "ANALYSE & UNDERSTAND", top: 38 },
    { title: "INTENT DETECTION", sub: "PROCESS THE REQUEST", top: 158 },
    { title: "AGENT REVIEW", sub: "HUMAN VALIDATION", top: 278 },
    { title: "DECISION", sub: "EXECUTE THE ACTION", top: 398 },
  ];

  return (
    <section ref={containerRef} className="relative w-full bg-transparent py-24 md:py-32 overflow-hidden border-t border-[#111111]/10">
       <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 flex flex-col-reverse lg:flex-row items-center lg:items-start gap-16 lg:gap-24 relative z-10">
          
          {/* =========================================
              LEFT: AI WORKFLOW VISUAL (50%)
          ========================================= */}
          <div ref={visualColRef} className="w-full lg:w-1/2 relative min-h-[600px] flex-shrink-0 flex items-center justify-center pt-10 pb-16 lg:py-0">
            
            {/* Native Environment Reveal Container (No background box) */}
            <div ref={envRef} className="absolute inset-0 w-full h-full flex items-center justify-center">
              
              {/* Ambient Glows adapted for light background */}
              <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#FF5A00] opacity-[0.05] blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-[#111111] opacity-[0.03] blur-[80px] rounded-full pointer-events-none" />

              {/* Technical Grid (Light mode) - Bound to the column, not full bleed to avoid spilling */}
              <svg ref={gridRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-50" xmlns="http://www.w3.org/2000/svg">
                <pattern id="ai-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#111111" strokeWidth="0.5" strokeOpacity="0.06" />
                  <circle cx="40" cy="40" r="1" fill="#111111" fillOpacity="0.1" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#ai-grid)" />
              </svg>

              {/* Strictly Controlled Layout Box for Composition */}
              {/* This acts as the "Invisible boundary for layout" */}
              <div className="relative w-full max-w-[340px] h-[560px] mx-auto z-10">
                
                {/* SVG Connections & Signal */}
                {/* Fixed viewBox matches the layout box exactly */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 340 560" xmlns="http://www.w3.org/2000/svg">
                  {/* Background Track (Vertical) */}
                  <path d="M 40,40 L 40,520" stroke="#111111" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.15" />
                  
                  {/* Main Active Vertical Line */}
                  <path ref={addPath} d="M 40,40 L 40,520" stroke="#FF5A00" strokeWidth="1.5" fill="none" opacity="0.8" />
                  
                  {/* Branch Lines to Nodes (Centers of nodes at Y = 82, 202, 322, 442) */}
                  <path ref={addPath} d="M 40,82 L 70,82" stroke="#FF5A00" strokeWidth="1.5" fill="none" opacity="0.8" />
                  <path ref={addPath} d="M 40,202 L 70,202" stroke="#FF5A00" strokeWidth="1.5" fill="none" opacity="0.8" />
                  <path ref={addPath} d="M 40,322 L 70,322" stroke="#FF5A00" strokeWidth="1.5" fill="none" opacity="0.8" />
                  <path ref={addPath} d="M 40,442 L 70,442" stroke="#FF5A00" strokeWidth="1.5" fill="none" opacity="0.8" />
                  
                  {/* Exit Line indicating ACTION */}
                  <path ref={addPath} d="M 40,520 L 70,520" stroke="#111111" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.3" />
                  <text x="80" y="523" fill="#111111" fillOpacity="0.5" fontSize="10" fontFamily="monospace" letterSpacing="0.1em">ACTION / EXIT</text>

                  {/* Signal Dot */}
                  <circle ref={signalRef} cx="40" cy="40" r="4" fill="#FF5A00" filter="drop-shadow(0 0 8px rgba(255,90,0,0.6))" />
                </svg>

                {/* HTML Premium Glass Nodes (Light Theme) */}
                {workflowNodes.map((node, i) => (
                  <div 
                    key={i} 
                    ref={addNode} 
                    className="absolute left-[70px] right-0 z-20 flex flex-col justify-center px-6 py-5 rounded-lg"
                    style={{ 
                      top: `${node.top}px`,
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(17, 17, 17, 0.08)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.02)'
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A00]" />
                      <span className="font-mono text-[9px] tracking-[0.2em] text-[#111111]/50 uppercase font-bold">{node.sub}</span>
                    </div>
                    <h4 className="font-display font-bold tracking-tight text-[#111111] text-lg">{node.title}</h4>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* =========================================
              RIGHT: EDITORIAL CONTENT (50%)
          ========================================= */}
          <div ref={contentColRef} className="w-full lg:w-1/2 flex flex-col justify-center lg:pt-12">
            
            {/* Section Label */}
            <div ref={labelRef} className="flex items-center gap-4 mb-8">
              <span className="w-1.5 h-1.5 bg-[#FF5A00]" />
              <h2 className="text-[#111111] text-[10px] tracking-[0.3em] font-mono font-bold uppercase">
                03 — Intelligent Automation
              </h2>
            </div>
            
            {/* Main Headline with Premium Masking */}
            <div className="flex flex-col gap-2 mb-8">
              <div className="overflow-hidden">
                <h3 ref={addTitleLine} className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-[-0.04em] text-[#111111] uppercase leading-[0.9]">
                  FROM INPUT
                </h3>
              </div>
              <div className="overflow-hidden mt-1">
                <h3 ref={addTitleLine} className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-[-0.04em] text-[#111111]/20 uppercase leading-[0.9]">
                  TO INTELLIGENCE.
                </h3>
              </div>
            </div>

            {/* Description */}
            <p ref={descRef} className="text-[#111111]/70 font-sans text-base md:text-lg max-w-md leading-relaxed">
              We architect digital systems that do the heavy lifting for you. 
              By routing inputs through intelligent logic pipelines, we transform 
              raw data into validated decisions and automated actions—scaling your operations seamlessly.
            </p>

          </div>

       </div>
    </section>
  );
}
