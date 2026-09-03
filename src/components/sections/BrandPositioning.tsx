import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../ui/MagneticButton';
import ProjectButton from '../ui/ProjectButton';

gsap.registerPlugin(ScrollTrigger);

export default function BrandPositioning() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Layer Refs
  const gridRef = useRef<SVGSVGElement>(null);
  const signalRef = useRef<SVGCircleElement>(null);
  
  const nodeInputRef = useRef<SVGGElement>(null);
  const nodeIntelRef = useRef<SVGGElement>(null);
  const nodeDecideRef = useRef<SVGGElement>(null);
  const nodeActionRef = useRef<SVGGElement>(null);
  
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const path3Ref = useRef<SVGPathElement>(null);

  const headlineRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // 1. Initial Setups
      gsap.set(gridRef.current, { opacity: 0 });
      gsap.set(signalRef.current, { opacity: 0, scale: 0, cx: 50, cy: 50 });
      gsap.set([nodeInputRef.current, nodeIntelRef.current, nodeDecideRef.current, nodeActionRef.current], { opacity: 0, scale: 0.8, transformOrigin: "center" });
      gsap.set([path1Ref.current, path2Ref.current, path3Ref.current], { strokeDasharray: 200, strokeDashoffset: 200 });
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
        }
      });

      // Sequence as requested:
      // 1. Grid fades/draws in subtly.
      tl.to(gridRef.current, { opacity: 0.15, duration: 1, ease: "power2.inOut" })
      
      // 2. A thin Blaze Orange signal enters the system.
      .to(signalRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" })
      
      // 3. INPUT block activates.
      .to(nodeInputRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" })
      
      // 4. Signal travels to INTELLIGENCE.
      .to(path1Ref.current, { strokeDashoffset: 0, duration: 0.4, ease: "none" })
      .to(signalRef.current, { cx: 350, duration: 0.4, ease: "none" }, "<")
      .to(nodeIntelRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" })
      
      // 5. Signal travels to DECISION.
      .to(path2Ref.current, { strokeDashoffset: 0, duration: 0.4, ease: "none" })
      .to(signalRef.current, { cx: 650, duration: 0.4, ease: "none" }, "<")
      .to(nodeDecideRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" })
      
      // 6. Signal travels to ACTION.
      .to(path3Ref.current, { strokeDashoffset: 0, duration: 0.4, ease: "none" })
      .to(signalRef.current, { cx: 950, duration: 0.4, ease: "none" }, "<")
      .to(nodeActionRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" })

      // 7. The large headline reveals using clip-path masks.
      const texts = document.querySelectorAll('.bp-headline-mask');
      tl.fromTo(texts, 
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)', duration: 1.2, stagger: 0.15, ease: "power4.out" },
        "+=0.2" // slight pause after architecture
      )
      
      // 8. Supporting paragraph reveals.
      .fromTo(copyRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      
      // 9. CTA activates.
      .fromTo(ctaRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

      // Ambient Scroll Effects
      gsap.to(signalRef.current, {
        y: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
      
    });

    return () => mm.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-background text-primary px-4 md:px-16 lg:px-32 border-t border-surface flex flex-col items-center justify-center pt-32 pb-32 z-10"
    >
      
      {/* =========================================
          GRID BACKGROUND
      ========================================= */}
      <svg ref={gridRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none">
         <pattern id="arch-grid" width="60" height="60" patternUnits="userSpaceOnUse">
           <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#111111" strokeWidth="0.5" strokeDasharray="2 4" />
         </pattern>
         <rect width="100%" height="100%" fill="url(#arch-grid)" />
      </svg>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
        
        {/* =========================================
            LAYER 1: EDITORIAL HEADLINE
        ========================================= */}
        <div className="w-full text-center flex flex-col items-center z-20">
          <div className="flex items-center gap-4 mb-8 overflow-hidden">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="bp-headline-mask font-mono text-xs tracking-[0.3em] text-secondary uppercase block">
              BLAZEBYTE / DIGITAL STUDIO
            </span>
          </div>

          <h2 ref={headlineRef} className="flex flex-col items-center">
             <span className="overflow-hidden block w-full text-center">
               <span className="bp-headline-mask block text-[clamp(2.5rem,6vw,7rem)] font-display font-bold tracking-tight text-primary leading-[1.0] uppercase px-2">
                 DIGITAL SYSTEMS
               </span>
             </span>
             <span className="overflow-hidden block w-full text-center mt-2 md:mt-4">
               <span className="bp-headline-mask block text-[clamp(2.5rem,6vw,7rem)] font-display font-light tracking-tight text-secondary leading-[1.0] uppercase px-2">
                 FOR MODERN BUSINESS.
               </span>
             </span>
          </h2>
        </div>

        {/* =========================================
            LAYER 2: DIGITAL ARCHITECTURE (BELOW HEADLINE)
        ========================================= */}
        <div className="w-full h-[120px] md:h-[180px] my-12 md:my-16 relative flex justify-center items-center pointer-events-none z-10">
          <svg className="w-full max-w-[1000px] h-full overflow-visible" viewBox="0 0 1100 100" preserveAspectRatio="xMidYMid meet">
             
             {/* Connecting Paths */}
             <path ref={path1Ref} d="M 150 50 L 350 50" fill="none" stroke="#D8D5CE" strokeWidth="2" />
             <path ref={path2Ref} d="M 450 50 L 650 50" fill="none" stroke="#D8D5CE" strokeWidth="2" />
             <path ref={path3Ref} d="M 750 50 L 950 50" fill="none" stroke="#D8D5CE" strokeWidth="2" />

             {/* Nodes */}
             <g ref={nodeInputRef}>
               <rect x="50" y="30" width="100" height="40" rx="4" fill="#F0EEE9" stroke="#111111" strokeWidth="1" />
               <text x="100" y="54" className="font-mono text-[10px] md:text-xs fill-primary font-bold tracking-widest text-anchor-middle" textAnchor="middle">INPUT</text>
             </g>

             <g ref={nodeIntelRef}>
               <rect x="350" y="30" width="100" height="40" rx="4" fill="#F0EEE9" stroke="#111111" strokeWidth="1" />
               <text x="400" y="54" className="font-mono text-[10px] md:text-xs fill-primary font-bold tracking-widest text-anchor-middle" textAnchor="middle">INTELLIGENCE</text>
             </g>

             <g ref={nodeDecideRef}>
               <rect x="650" y="30" width="100" height="40" rx="4" fill="#F0EEE9" stroke="#111111" strokeWidth="1" />
               <text x="700" y="54" className="font-mono text-[10px] md:text-xs fill-primary font-bold tracking-widest text-anchor-middle" textAnchor="middle">DECISION</text>
             </g>

             <g ref={nodeActionRef}>
               <rect x="950" y="30" width="100" height="40" rx="4" fill="#111111" stroke="#111111" strokeWidth="1" />
               <text x="1000" y="54" className="font-mono text-[10px] md:text-xs fill-background font-bold tracking-widest text-anchor-middle" textAnchor="middle">ACTION</text>
             </g>

             {/* Moving Signal */}
             <circle ref={signalRef} cx="50" cy="50" r="6" fill="#ff5a00" filter="drop-shadow(0 0 8px rgba(255,90,0,0.8))" />
          </svg>
        </div>

        {/* =========================================
            LAYER 3: SUPPORTING CONTENT
        ========================================= */}
        <div className="w-full text-center flex flex-col items-center z-20">
          <p ref={copyRef} className="font-sans text-secondary text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-12 px-4">
            From digital experiences to growth systems and intelligent automation, we build connected systems designed to move businesses forward.
          </p>

          <div ref={ctaRef} className="flex justify-center">
            <MagneticButton>
              <ProjectButton />
            </MagneticButton>
          </div>
        </div>

      </div>
    </section>
  );
}
