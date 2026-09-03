import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ServiceEcosystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  
  // Dynamic Copy Refs
  const copyWebRef = useRef<HTMLDivElement>(null);
  const copyGrowthRef = useRef<HTMLDivElement>(null);
  const copyAutoRef = useRef<HTMLDivElement>(null);

  // === SVG STAGE REFS ===
  // 1. WEB ARCHITECTURE
  const webNodes = useRef<(SVGRectElement | null)[]>([]);
  const webLines = useRef<(SVGLineElement | null)[]>([]);
  const webMask = useRef<SVGRectElement>(null);
  const webOutline = useRef<SVGRectElement>(null);

  // 2. GROWTH PATHS
  const growthPaths = useRef<(SVGPathElement | null)[]>([]);
  
  // 3. AUTOMATION LOGIC
  const autoNodes = useRef<(SVGGElement | null)[]>([]);
  const autoPaths = useRef<(SVGPathElement | null)[]>([]);

  // THE SIGNAL
  const signal = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([copyGrowthRef.current, copyAutoRef.current], { opacity: 0 });
        return;
      }

      // --- INITIAL STATES ---
      gsap.set(copyWebRef.current, { opacity: 0, clipPath: 'inset(100% 0 0 0)' });
      gsap.set(webLines.current, { strokeDasharray: 800, strokeDashoffset: 800 });
      gsap.set(webNodes.current, { scaleY: 0, transformOrigin: "bottom" });
      gsap.set([webMask.current, webOutline.current], { scaleX: 0, transformOrigin: "left" });
      
      gsap.set(growthPaths.current, { strokeDasharray: 1500, strokeDashoffset: 1500 });
      
      gsap.set(autoNodes.current, { opacity: 0, x: -60, scale: 0.95 });
      gsap.set(autoPaths.current, { strokeDasharray: 500, strokeDashoffset: 500 });
      
      gsap.set(signal.current, { cx: 100, cy: 300, scale: 0, opacity: 0 });

      // Master Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: pinRef.current,
          anticipatePin: 1
        }
      });

      // ==========================================
      // STAGE 1: WEB (Structure Assembly)
      // ==========================================
      tl.to(signal.current, { scale: 1, opacity: 1, duration: 0.2, ease: "back.out(2)" })
        .to(webLines.current, { strokeDashoffset: 0, duration: 1.2, stagger: 0.15, ease: "power2.inOut" })
        .to(signal.current, { cx: 500, duration: 1.2, ease: "power2.inOut" }, "<")
        .to(webOutline.current, { scaleX: 1, duration: 1, ease: "power3.inOut" }, "-=0.6")
        .to(webMask.current, { scaleX: 1, duration: 1, ease: "power3.inOut" }, "-=0.8")
        .to(webNodes.current, { scaleY: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=0.5")
        // Animate WEB copy in
        .to(copyWebRef.current, { opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 0.8, ease: "power3.out" }, "-=0.5")
        // Pause at Web
        .to({}, { duration: 1 });

      // ==========================================
      // TRANSITION: WEB -> GROWTH (Physical Break Apart)
      // ==========================================
      tl.to(copyWebRef.current, { opacity: 0, clipPath: 'inset(0 0 100% 0)', duration: 0.6, ease: "power3.in" })
        .fromTo(copyGrowthRef.current, { clipPath: 'inset(100% 0 0 0)', opacity: 1 }, { clipPath: 'inset(0% 0 0 0)', duration: 0.6, ease: "power3.out" }, "<")
        
        // Rigid structures collapse
        .to(webNodes.current, { scaleY: 0, duration: 0.6, ease: "power2.in" })
        .to([webMask.current, webOutline.current], { scaleX: 0, duration: 0.6, ease: "power2.in" }, "<")
        .to(webLines.current, { strokeDashoffset: -800, duration: 0.8, ease: "power3.in" }, "-=0.3")
        
        // Flowing paths draw smoothly
        .to(growthPaths.current, { strokeDashoffset: 0, duration: 1.8, stagger: 0.2, ease: "power2.out" }, "-=0.5")
        
        // Signal travels along flowing paths
        .to(signal.current, { cx: 400, cy: 150, duration: 0.8, ease: "power1.inOut" }, "-=1.2")
        .to(signal.current, { cx: 900, cy: 350, duration: 1.2, ease: "power2.inOut" }, "-=0.4")
        
        // Pause at Growth
        .to({}, { duration: 1 });

      // ==========================================
      // TRANSITION: GROWTH -> AUTOMATION (Logic Pipeline)
      // ==========================================
      tl.to(copyGrowthRef.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.6, ease: "power3.in" })
        .fromTo(copyAutoRef.current, { clipPath: 'inset(100% 0 0 0)', opacity: 1 }, { clipPath: 'inset(0% 0 0 0)', duration: 0.6, ease: "power3.out" }, "<")
        
        // Growth paths retract
        .to(growthPaths.current, { strokeDashoffset: -1500, duration: 1.2, ease: "power3.inOut" })
        
        // Logic Nodes snap into place with cinematic ease
        .to(autoNodes.current, { opacity: 1, x: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)" }, "-=0.5")
        // Logic connecting paths draw
        .to(autoPaths.current, { strokeDashoffset: 0, duration: 0.8, stagger: 0.15, ease: "none" }, "-=0.5")
        
        // Signal flows strictly through logic gates
        .to(signal.current, { cx: 160, cy: 300, duration: 0.4, ease: "power1.inOut" }, "-=1")
        .to(signal.current, { cx: 410, cy: 300, duration: 0.5, ease: "none" })
        .to(signal.current, { cx: 660, cy: 300, duration: 0.5, ease: "none" })
        .to(signal.current, { cx: 910, cy: 300, duration: 0.5, ease: "none" })
        
        // Final Action Node Activation (pulse)
        .to(autoNodes.current[3], { scale: 1.05, transformOrigin: 'center', duration: 0.4, ease: "back.out(3)" })
        
        // Hold final state
        .to({}, { duration: 1.5 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="bg-transparent text-[#111111] relative w-full h-[250vh] overflow-hidden"
    >
      <div 
        ref={pinRef} 
        className="relative w-full h-[100svh] overflow-hidden flex flex-col justify-center items-center"
      >
        
        {/* =========================================
            CENTRAL DIGITAL ENGINE (SVG CANVAS)
        ========================================= */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none mt-[-5%] md:mt-[-10%]">
           <svg 
             className="w-[1200px] h-[600px] max-w-[150%] max-h-[70vh] md:max-w-[90vw] md:max-h-[80vh]" 
             viewBox="0 0 1200 600" 
             preserveAspectRatio="xMidYMid meet"
           >
              {/* Premium Background Grid */}
              <pattern id="ecosystem-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#111111" strokeWidth="0.5" strokeOpacity="0.06"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#ecosystem-grid)" />
              <text x="40" y="40" className="font-mono text-[9px] fill-[#111111]/40 tracking-widest font-bold">SYS.STATUS: ACTIVE</text>
              <text x="1160" y="40" className="font-mono text-[9px] fill-[#111111]/40 tracking-widest font-bold text-right">SIGNAL / 001</text>
              
              {/* STAGE 1: WEB (Rigid Architecture) */}
              <g>
                <line ref={el => { webLines.current[0] = el; }} x1="200" y1="100" x2="200" y2="500" stroke="#111111" strokeWidth="1" strokeOpacity="0.15" />
                <line ref={el => { webLines.current[1] = el; }} x1="500" y1="100" x2="500" y2="500" stroke="#111111" strokeWidth="1" strokeOpacity="0.15" />
                <line ref={el => { webLines.current[2] = el; }} x1="800" y1="100" x2="800" y2="500" stroke="#111111" strokeWidth="1" strokeOpacity="0.15" />
                
                <line ref={el => { webLines.current[3] = el; }} x1="100" y1="300" x2="1100" y2="300" stroke="#111111" strokeWidth="2" strokeOpacity="0.3" />
                
                {/* Interface panels */}
                <rect ref={webOutline} x="250" y="150" width="200" height="100" fill="none" stroke="#111111" strokeWidth="2" strokeOpacity="0.3" rx="4" />
                <rect ref={webMask} x="250" y="150" width="200" height="100" fill="#FFFFFF" stroke="none" rx="4" className="shadow-lg drop-shadow-sm" />
                
                <rect ref={el => { webNodes.current[0] = el; }} x="270" y="170" width="100" height="8" fill="#111111" rx="2" />
                <rect ref={el => { webNodes.current[1] = el; }} x="270" y="190" width="160" height="8" fill="#111111" fillOpacity="0.1" rx="2" />
                
                <rect ref={el => { webNodes.current[2] = el; }} x="550" y="350" width="200" height="120" fill="#FFFFFF" stroke="#111111" strokeWidth="1" strokeOpacity="0.15" rx="4" className="shadow-lg" />
                <rect ref={el => { webNodes.current[3] = el; }} x="570" y="370" width="40" height="40" fill="#111111" fillOpacity="0.05" rx="4" />
                <rect ref={el => { webNodes.current[4] = el; }} x="620" y="370" width="100" height="8" fill="#111111" rx="2" />
              </g>

              {/* STAGE 2: GROWTH (Flowing Directional Paths) */}
              <g>
                 <path ref={el => { growthPaths.current[0] = el; }} d="M200,300 C400,300 400,150 700,150 C900,150 1000,350 1100,350" fill="none" stroke="#FF5A00" strokeWidth="3" strokeLinecap="round" />
                 <path ref={el => { growthPaths.current[1] = el; }} d="M200,350 C350,350 350,200 650,200 C950,200 950,450 1100,450" fill="none" stroke="#111111" strokeWidth="1" strokeDasharray="6 6" strokeOpacity="0.2" strokeLinecap="round" />
                 <path ref={el => { growthPaths.current[2] = el; }} d="M300,500 C500,500 500,250 800,250 C1000,250 1000,400 1100,400" fill="none" stroke="#111111" strokeWidth="2" strokeOpacity="0.15" strokeLinecap="round" />
              </g>

              {/* STAGE 3: AUTOMATION (Logic Pipeline) */}
              <g>
                 {/* Connecting Paths */}
                 <path ref={el => { autoPaths.current[0] = el; }} d="M260,300 L360,300" fill="none" stroke="#111111" strokeWidth="2" strokeOpacity="0.2" />
                 <path ref={el => { autoPaths.current[1] = el; }} d="M510,300 L610,300" fill="none" stroke="#111111" strokeWidth="2" strokeOpacity="0.2" />
                 <path ref={el => { autoPaths.current[2] = el; }} d="M760,300 L860,300" fill="none" stroke="#111111" strokeWidth="2" strokeOpacity="0.2" />
                 
                 {/* Branching Path */}
                 <path ref={el => { autoPaths.current[3] = el; }} d="M685,330 L685,420 L860,420" fill="none" stroke="#111111" strokeWidth="2" strokeDasharray="4 4" strokeOpacity="0.15" />

                 {/* Nodes */}
                 <g ref={el => { autoNodes.current[0] = el; }}>
                   <rect x="110" y="270" width="150" height="60" rx="6" fill="#FFFFFF" stroke="#111111" strokeWidth="1" strokeOpacity="0.1" className="shadow-md" />
                   <text x="185" y="304" className="font-mono text-[10px] fill-[#111111] font-bold tracking-[0.2em] text-anchor-middle" textAnchor="middle">INPUT</text>
                 </g>
                 
                 <g ref={el => { autoNodes.current[1] = el; }}>
                   <rect x="360" y="270" width="150" height="60" rx="6" fill="#FFFFFF" stroke="#111111" strokeWidth="1" strokeOpacity="0.1" className="shadow-md" />
                   <text x="435" y="304" className="font-mono text-[10px] fill-[#111111] font-bold tracking-[0.2em] text-anchor-middle" textAnchor="middle">INTELLIGENCE</text>
                 </g>

                 <g ref={el => { autoNodes.current[2] = el; }}>
                   <rect x="610" y="270" width="150" height="60" rx="6" fill="#FFFFFF" stroke="#111111" strokeWidth="1" strokeOpacity="0.1" className="shadow-md" />
                   <text x="685" y="304" className="font-mono text-[10px] fill-[#111111] font-bold tracking-[0.2em] text-anchor-middle" textAnchor="middle">DECISION</text>
                 </g>

                 <g ref={el => { autoNodes.current[3] = el; }}>
                   <rect x="860" y="270" width="150" height="60" rx="6" fill="#111111" stroke="none" className="shadow-[0_10px_30px_rgba(17,17,17,0.3)]" />
                   <text x="935" y="304" className="font-mono text-[10px] fill-[#FAF9F6] font-bold tracking-[0.2em] text-anchor-middle" textAnchor="middle">ACTION</text>
                 </g>

                 {/* Branch Node */}
                 <g ref={el => { autoNodes.current[4] = el; }}>
                   <rect x="860" y="390" width="150" height="60" rx="6" fill="none" stroke="#111111" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.3" />
                   <text x="935" y="424" className="font-mono text-[9px] fill-[#111111]/50 font-bold tracking-[0.1em] text-anchor-middle" textAnchor="middle">HUMAN REVIEW</text>
                 </g>
              </g>

              {/* SIGNAL */}
              <circle ref={signal} cx="100" cy="300" r="6" fill="#FF5A00" filter="drop-shadow(0 0 10px rgba(255,90,0,0.8))" />
           </svg>
        </div>

        {/* =========================================
            DYNAMIC STATE COPY (BOTTOM ANCHOR)
        ========================================= */}
        <div className="absolute bottom-12 md:bottom-24 left-6 md:left-12 lg:left-24 z-20 w-[90vw] md:w-[500px]">
          <div className="relative w-full h-32 md:h-32">
            
            <div ref={copyWebRef} className="absolute inset-0">
               <h4 className="text-[2rem] md:text-5xl font-display font-black tracking-[-0.04em] text-[#111111] mb-3 md:mb-4 uppercase">Web</h4>
               <p className="text-[#111111]/70 font-sans text-base md:text-lg leading-relaxed">
                 Digital experiences built with structural precision. We engineer fast, scalable, and beautifully optimized foundations.
               </p>
            </div>
            
            <div ref={copyGrowthRef} className="absolute inset-0 opacity-0">
               <h4 className="text-[2rem] md:text-5xl font-display font-black tracking-[-0.04em] text-[#111111] mb-3 md:mb-4 uppercase">Growth</h4>
               <p className="text-[#111111]/70 font-sans text-base md:text-lg leading-relaxed">
                 Turn attention into momentum. Our growth ecosystems are engineered to drive action and physical measurable outcomes.
               </p>
            </div>
            
            <div ref={copyAutoRef} className="absolute inset-0 opacity-0">
               <h4 className="text-[2rem] md:text-5xl font-display font-black tracking-[-0.04em] text-[#111111] mb-3 md:mb-4 uppercase">Automation</h4>
               <p className="text-[#111111]/70 font-sans text-base md:text-lg leading-relaxed">
                 Intelligent logic pathways designed to keep operations moving forward. Remove friction, scale seamlessly.
               </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
