import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function SEOProcess() {
  const containerRef = useRef<HTMLElement>(null);
  const contentColRef = useRef<HTMLDivElement>(null);
  const visualColRef = useRef<HTMLDivElement>(null);
  
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
      // Entrance animation (ScrollTrigger - NO PINNING)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      });

      // Reset States
      gsap.set(envRef.current, { opacity: 0, scale: 0.98 });
      gsap.set(gridRef.current, { opacity: 0 });
      gsap.set(pathLinesRef.current, { strokeDasharray: 800, strokeDashoffset: 800 });
      gsap.set(nodesRef.current, { opacity: 0, y: 10, scale: 0.95 });
      gsap.set(signalRef.current, { opacity: 0 });
      
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
      tl.to(envRef.current, { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }, 0.2)
        .to(gridRef.current, { opacity: 0.15, duration: 1 }, "-=0.6")
        
      // C. Paths Draw
        .to(pathLinesRef.current, { 
          strokeDashoffset: 0, 
          duration: 2, 
          stagger: 0.15, 
          ease: "power2.inOut" 
        }, "-=0.4")
        
      // D. Nodes Reveal Sequentially
        .to(nodesRef.current, { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.15, 
          ease: "back.out(1.5)" 
        }, "-=1.5");

      // E. Signal Travels (Discovery -> Structure -> Content -> Performance -> Authority)
      const signalTl = gsap.timeline();
      
      // Node positions relative to viewBox (600x520)
      signalTl.to(signalRef.current, { opacity: 1, duration: 0.2 })
              .set(signalRef.current, { cx: 80, cy: 120 })
              .to(signalRef.current, { cx: 200, cy: 220, duration: 0.5, ease: "power1.inOut" })
              .to(signalRef.current, { cx: 320, cy: 120, duration: 0.5, ease: "power1.inOut" })
              .to(signalRef.current, { cx: 440, cy: 220, duration: 0.5, ease: "power1.inOut" })
              .to(signalRef.current, { cx: 560, cy: 320, duration: 0.5, ease: "power1.inOut" })
              .to(signalRef.current, { opacity: 0, duration: 0.3 });

      tl.add(signalTl, "-=0.8");

      // Ambient Loop for the signal
      tl.call(() => {
        gsap.to(signalRef.current, {
          motionPath: {
            path: [
              { x: 80, y: 120 },
              { x: 200, y: 220 },
              { x: 320, y: 120 },
              { x: 440, y: 220 },
              { x: 560, y: 320 }
            ]
          },
          opacity: 1,
          duration: 4,
          ease: "linear",
          repeat: -1,
          repeatDelay: 3,
          onRepeat: () => {
            gsap.set(signalRef.current, { opacity: 0 });
            gsap.to(signalRef.current, { opacity: 1, duration: 0.3 });
          }
        });
      });

      // Subtle Independent Parallax (Desktop Only, No Pinning)
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.to(contentColRef.current, {
          y: -20,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
        
        gsap.to(visualColRef.current, {
          y: -35,
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

  return (
    <section ref={containerRef} className="relative w-full bg-[#FAF9F6] py-24 md:py-32 overflow-hidden border-t border-[#111111]/10">
       <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16 relative z-10">
          
          {/* =========================================
              LEFT: CONTENT (42%)
          ========================================= */}
          <div ref={contentColRef} className="w-full lg:w-[42%] flex flex-col justify-center lg:pt-8 z-20">
            
            {/* Section Label */}
            <div ref={labelRef} className="flex items-center gap-4 mb-8">
              <span className="w-1.5 h-1.5 bg-[#FF5A00]" />
              <h2 className="text-[#111111] text-[10px] tracking-[0.3em] font-mono font-bold uppercase">
                02 — SEO Infrastructure
              </h2>
            </div>
            
            {/* Main Headline */}
            <div className="flex flex-col gap-1 mb-8">
              <div className="overflow-hidden">
                <h3 ref={addTitleLine} className="text-4xl md:text-5xl xl:text-6xl font-display font-black tracking-[-0.03em] text-[#111111] leading-[0.95]">
                  BUILD SEARCH
                </h3>
              </div>
              <div className="overflow-hidden">
                <h3 ref={addTitleLine} className="text-4xl md:text-5xl xl:text-6xl font-display font-black tracking-[-0.03em] text-[#111111] leading-[0.95]">
                  ARCHITECTURE
                </h3>
              </div>
              <div className="overflow-hidden">
                <h3 ref={addTitleLine} className="text-4xl md:text-5xl xl:text-6xl font-display font-black tracking-[-0.03em] text-[#111111]/30 leading-[0.95]">
                  THAT PERFORMS.
                </h3>
              </div>
            </div>

            {/* Description */}
            <p ref={descRef} className="text-[#111111]/70 font-sans text-base lg:text-lg max-w-[400px] leading-relaxed">
              We engineer the technical foundation, content structure and performance systems 
              that help businesses become discoverable, competitive and scalable.
            </p>

          </div>

          {/* =========================================
              RIGHT: SEO VISUAL SYSTEM (58%)
          ========================================= */}
          <div ref={visualColRef} className="w-full lg:w-[58%] relative aspect-square lg:aspect-[1.15/1] rounded-xl overflow-hidden bg-[#0B0C0E] border border-[#111111]/5 shadow-2xl flex-shrink-0">
            
            <div ref={envRef} className="absolute inset-0 w-full h-full">
              
              {/* Subtle ambient light */}
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F5F5F2] opacity-[0.015] blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FF5A00] opacity-[0.02] blur-[100px] rounded-full pointer-events-none" />

              {/* Technical Grid */}
              <svg ref={gridRef} className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <pattern id="seo-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#F5F5F2" strokeWidth="0.5" strokeOpacity="0.1" />
                  <circle cx="60" cy="60" r="1" fill="#F5F5F2" fillOpacity="0.2" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#seo-grid)" />
              </svg>

              {/* Internal SVG Workflow Container (600x520 coordinates) */}
              <div className="absolute inset-0 w-full h-full pointer-events-none p-8 md:p-12">
                <div className="relative w-full h-full max-w-[600px] max-h-[520px] mx-auto">
                  
                  {/* Lines and Signals */}
                  <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 600 520" preserveAspectRatio="none">
                    {/* Base faint lines */}
                    <path d="M 80 120 L 200 220 L 320 120 L 440 220 L 560 320" stroke="#F5F5F2" strokeWidth="1" opacity="0.05" fill="none" />
                    
                    {/* Active flowing paths */}
                    <path ref={addPath} d="M 80 120 L 200 220" stroke="#F5F5F2" strokeWidth="1.5" opacity="0.2" fill="none" />
                    <path ref={addPath} d="M 200 220 L 320 120" stroke="#F5F5F2" strokeWidth="1.5" opacity="0.2" fill="none" />
                    <path ref={addPath} d="M 320 120 L 440 220" stroke="#F5F5F2" strokeWidth="1.5" opacity="0.2" fill="none" />
                    <path ref={addPath} d="M 440 220 L 560 320" stroke="#FF5A00" strokeWidth="1.5" opacity="0.6" fill="none" />

                    {/* Secondary branch paths (subtle infrastructure lines) */}
                    <path ref={addPath} d="M 80 120 L 80 200" stroke="#F5F5F2" strokeWidth="1" strokeDasharray="2 4" opacity="0.1" fill="none" />
                    <path ref={addPath} d="M 200 220 L 200 300" stroke="#F5F5F2" strokeWidth="1" strokeDasharray="2 4" opacity="0.1" fill="none" />
                    <path ref={addPath} d="M 320 120 L 320 200" stroke="#F5F5F2" strokeWidth="1" strokeDasharray="2 4" opacity="0.1" fill="none" />
                    
                    {/* Signal */}
                    <circle ref={signalRef} cx="80" cy="120" r="4" fill="#FF5A00" filter="drop-shadow(0 0 6px rgba(255,90,0,0.8))" />
                  </svg>

                  {/* HTML Nodes (Absolute positioned by percentage) */}
                  
                  {/* DISCOVERY */}
                  <div ref={addNode} className="absolute flex flex-col items-start" style={{ left: '13%', top: '23%', transform: 'translate(-50%, -50%)' }}>
                     <div className="w-2 h-2 rounded-full bg-[#F5F5F2] opacity-80 mb-2" />
                     <h4 className="text-[#F5F5F2] font-mono text-[10px] tracking-widest uppercase">DISCOVERY</h4>
                     <p className="text-[#9CA3AF] font-sans text-[9px] mt-0.5">Crawling</p>
                  </div>

                  {/* STRUCTURE */}
                  <div ref={addNode} className="absolute flex flex-col items-start" style={{ left: '33.3%', top: '42.3%', transform: 'translate(-50%, -50%)' }}>
                     <div className="w-2 h-2 rounded-full bg-[#F5F5F2] opacity-80 mb-2" />
                     <h4 className="text-[#F5F5F2] font-mono text-[10px] tracking-widest uppercase">STRUCTURE</h4>
                     <p className="text-[#9CA3AF] font-sans text-[9px] mt-0.5">Architecture</p>
                  </div>

                  {/* CONTENT */}
                  <div ref={addNode} className="absolute flex flex-col items-start" style={{ left: '53.3%', top: '23%', transform: 'translate(-50%, -50%)' }}>
                     <div className="w-2 h-2 rounded-full bg-[#F5F5F2] opacity-80 mb-2" />
                     <h4 className="text-[#F5F5F2] font-mono text-[10px] tracking-widest uppercase">CONTENT</h4>
                     <p className="text-[#9CA3AF] font-sans text-[9px] mt-0.5">Semantic</p>
                  </div>

                  {/* PERFORMANCE */}
                  <div ref={addNode} className="absolute flex flex-col items-start" style={{ left: '73.3%', top: '42.3%', transform: 'translate(-50%, -50%)' }}>
                     <div className="w-2 h-2 rounded-full bg-[#F5F5F2] opacity-80 mb-2" />
                     <h4 className="text-[#F5F5F2] font-mono text-[10px] tracking-widest uppercase">PERFORMANCE</h4>
                     <p className="text-[#9CA3AF] font-sans text-[9px] mt-0.5">Core Web Vitals</p>
                  </div>

                  {/* AUTHORITY */}
                  <div ref={addNode} className="absolute flex flex-col items-start" style={{ left: '93.3%', top: '61.5%', transform: 'translate(-50%, -50%)' }}>
                     <div className="w-2 h-2 rounded-full bg-[#FF5A00] opacity-90 mb-2" />
                     <h4 className="text-[#FF5A00] font-mono text-[10px] tracking-widest uppercase">AUTHORITY</h4>
                     <p className="text-[#9CA3AF] font-sans text-[9px] mt-0.5">Visibility</p>
                  </div>

                </div>
              </div>

            </div>
          </div>

       </div>
    </section>
  );
}
