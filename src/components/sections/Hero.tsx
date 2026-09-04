import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MagneticButton from '../ui/MagneticButton';
import ProjectButton from '../ui/ProjectButton';
import { useBoot } from '../../contexts/BootContext';

export default function Hero() {
  const { bootState } = useBoot();
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Background Refs
  const bgGridRef = useRef<SVGSVGElement>(null);
  const bgSignalLineRef = useRef<SVGPathElement>(null);
  const bgSignalDotRef = useRef<SVGCircleElement>(null);
  
  // Typography Refs
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineMasks = useRef<(HTMLSpanElement | null)[]>([]);
  const momentumRef = useRef<HTMLSpanElement>(null);
  const momentumSweepRef = useRef<HTMLSpanElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Laptop Refs
  const laptopWrapperRef = useRef<HTMLDivElement>(null);
  const laptopInnerRef = useRef<HTMLDivElement>(null);
  const screenReflectionRef = useRef<HTMLDivElement>(null);
  
  // Dashboard Refs
  const dashWebLines = useRef<(SVGLineElement | null)[]>([]);
  const dashWebSignal = useRef<SVGCircleElement>(null);
  const dashGrowthPath = useRef<SVGPathElement>(null);
  const dashGrowthSignal = useRef<SVGCircleElement>(null);
  const dashAutoPaths = useRef<(SVGPathElement | null)[]>([]);
  const dashAutoNodes = useRef<(SVGCircleElement | null)[]>([]);
  const modulesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Only start the Hero animation when BootContext says HANDOFF or COMPLETE
    if (bootState !== 'HANDOFF' && bootState !== 'COMPLETE') return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // --- INITIAL STATES ---
        // Grid starts visible but subtle (matches Loader's final state)
        gsap.set(bgGridRef.current, { opacity: 0.1 }); 
        gsap.set(bgSignalLineRef.current, { strokeDasharray: 1000, strokeDashoffset: 1000 });
        gsap.set(bgSignalDotRef.current, { opacity: 0, scale: 0 });
        gsap.set(labelRef.current, { clipPath: 'inset(0 100% 0 0)' });
        gsap.set(headlineMasks.current, { clipPath: 'inset(100% 0 0 0)' });
        gsap.set(momentumSweepRef.current, { clipPath: 'inset(0 100% 0 0)' });
        gsap.set([copyRef.current, ctaRef.current, statusRef.current], { opacity: 0, y: 20 });
        
        // Laptop initial 3D transform
        gsap.set(laptopWrapperRef.current, { 
          opacity: 0, 
          x: 100, 
          y: 20,
          z: -150, 
          rotateY: -15, 
          rotateX: 10,
          rotateZ: 2
        });

        // Layered modules initial state (Z-depth)
        gsap.set(modulesRef.current, { z: -20, opacity: 0 });

        // Dashboard internal states
        gsap.set(dashWebLines.current, { scaleX: 0, transformOrigin: "left" });
        gsap.set(dashGrowthPath.current, { strokeDasharray: 300, strokeDashoffset: 300 });
        gsap.set(dashAutoNodes.current, { opacity: 0.2, scale: 0.8, transformOrigin: "center" });
        gsap.set(dashAutoPaths.current, { strokeDasharray: 100, strokeDashoffset: 100 });

        // --- MASTER TIMELINE ---
        const tl = gsap.timeline();

        // 1. Grid intensifies slightly, Signal dot activates (matching Loader's signal arrival)
        tl.to(bgSignalDotRef.current, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)" }, 0.2)
        
        // 2. Technical Label draws out
        .to(labelRef.current, { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: "power3.inOut" }, 0.4)
        
        // 3. Headline staggered clip-path reveal (Cinematic masking)
        .to(headlineMasks.current, { 
          clipPath: 'inset(0% 0 0 0)', 
          duration: 1.4, 
          stagger: 0.25, 
          ease: "power4.out" 
        }, 0.6)

        // 4. Orange Sweep on MOMENTUM
        .to(momentumSweepRef.current, {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.2,
          ease: "power3.inOut"
        }, 1.2)

        // 5. Copy, CTA, Status fade up
        .to([copyRef.current, ctaRef.current, statusRef.current], { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          stagger: 0.15, 
          ease: "power3.out" 
        }, 1.0)

        // 6. Signal travels to laptop
        .to(bgSignalLineRef.current, {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: "power2.inOut"
        }, 0.5)

        // 7. Laptop Cinematic Entry
        .to(laptopWrapperRef.current, {
          opacity: 1,
          x: 0,
          y: 0,
          z: 0,
          rotateY: 0,
          rotateX: 0,
          rotateZ: 0,
          duration: 2.2,
          ease: "power3.out"
        }, 0.6)
        
        // 8. Dashboard layers pull forward in 3D space
        .to(modulesRef.current, {
          z: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.15,
          ease: "power3.out"
        }, 1.4);

        // --- AMBIENT DASHBOARD ANIMATIONS (Looping) ---
        
        // WEB: Lines drawing and signal travelling
        const webTl = gsap.timeline({ repeat: 2, delay: 6, repeatDelay: 4 });
        webTl.to(dashWebLines.current, { scaleX: 1, duration: 1.2, stagger: 0.15, ease: "power2.inOut" })
             .to(dashWebSignal.current, { x: 120, duration: 1.8, ease: "power1.inOut" }, "-=1")
             .to(dashWebLines.current, { scaleX: 0, duration: 1, stagger: 0.1, ease: "power2.inOut", transformOrigin: "right" }, "+=0.8")
             .set(dashWebLines.current, { transformOrigin: "left" })
             .set(dashWebSignal.current, { x: 0 });

        // GROWTH: Chart line growing
        const growthTl = gsap.timeline({ repeat: 2, delay: 6, repeatDelay: 4 });
        if (dashGrowthPath.current) {
          growthTl.to(dashGrowthPath.current, { strokeDashoffset: 0, duration: 3, ease: "power2.inOut" })
                  .to(dashGrowthSignal.current, { motionPath: { path: dashGrowthPath.current, align: dashGrowthPath.current, alignOrigin: [0.5, 0.5] }, duration: 3, ease: "power2.inOut" }, "<")
                  .to(dashGrowthPath.current, { opacity: 0, duration: 0.8 }, "+=1.5")
                  .set(dashGrowthPath.current, { strokeDashoffset: 300, opacity: 1 });
        }

        // AUTOMATION: Sequential activation
        const autoTl = gsap.timeline({ repeat: 2, delay: 6, repeatDelay: 4 });
        autoTl.to(dashAutoNodes.current[0], { opacity: 1, scale: 1.2, fill: "#FF5A00", duration: 0.4 })
              .to(dashAutoPaths.current[0], { strokeDashoffset: 0, duration: 0.5, ease: "none" })
              .to(dashAutoNodes.current[1], { opacity: 1, scale: 1.2, fill: "#FF5A00", duration: 0.4 })
              .to(dashAutoPaths.current[1], { strokeDashoffset: 0, duration: 0.5, ease: "none" })
              .to(dashAutoNodes.current[2], { opacity: 1, scale: 1.2, fill: "#FF5A00", duration: 0.4 })
              .to(dashAutoPaths.current[2], { strokeDashoffset: 0, duration: 0.5, ease: "none" })
              .to(dashAutoNodes.current[3], { opacity: 1, scale: 1.5, fill: "#FF5A00", duration: 0.4 })
              .to([dashAutoNodes.current, dashAutoPaths.current], { opacity: 0.2, duration: 0.8 }, "+=1.5")
              .set(dashAutoNodes.current, { fill: "#111111", scale: 0.8 })
              .set(dashAutoPaths.current, { strokeDashoffset: 100 });

        // Background signal dot: static after entrance (no infinite loop)

        // --- PREMIUM 3D MOUSE PARALLAX (Desktop) ---
        const xTo = gsap.quickTo(laptopInnerRef.current, "rotateY", { duration: 0.8, ease: "power3.out" });
        const yTo = gsap.quickTo(laptopInnerRef.current, "rotateX", { duration: 0.8, ease: "power3.out" });
        const shadowTo = gsap.quickTo('.laptop-shadow', "x", { duration: 0.8, ease: "power3.out" });
        const glareTo = gsap.quickTo(screenReflectionRef.current, "x", { duration: 0.5, ease: "power2.out" });

        const handleMouseMove = (e: MouseEvent) => {
          const { innerWidth, innerHeight } = window;
          const xPos = (e.clientX / innerWidth - 0.5);
          const yPos = (e.clientY / innerHeight - 0.5);
          
          const x = xPos * 8; // ±4deg max
          const y = yPos * -6; // ±3deg max
          
          xTo(x);
          yTo(y);
          shadowTo(x * -8);
          glareTo(xPos * 150); // Move glare opposite to rotation
        };

        if (window.innerWidth > 1024) {
          window.addEventListener("mousemove", handleMouseMove);
        }

        // --- EXIT PARALLAX HANDOFF ---
        gsap.to(containerRef.current, {
          y: -80,
          opacity: 0.4,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });

        return () => window.removeEventListener("mousemove", handleMouseMove);
      }, containerRef);
      return () => ctx.revert();
    });
  }, [bootState]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-[100svh] bg-transparent overflow-hidden flex flex-col justify-center isolate z-1 pt-24 pb-16 md:pt-32 md:pb-24 perspective-[2000px]"
    >
      {/* Cinematic Background Architecture */}
      <svg ref={bgGridRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bg-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF5A00" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#FAF9F6" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg-glow)" />
        
        {/* Precision Grid */}
        <pattern id="premium-grid" width="120" height="120" patternUnits="userSpaceOnUse">
          <path d="M 120 0 L 0 0 0 120" fill="none" stroke="#111111" strokeWidth="0.5" strokeOpacity="0.08"/>
          <circle cx="120" cy="120" r="1.5" fill="#111111" fillOpacity="0.15"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#premium-grid)" />
        
        {/* Signal Path */}
        <path ref={bgSignalLineRef} d="M -100 300 C 100 300, 250 500, 600 500 S 900 200, 1400 200" fill="none" stroke="#111111" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.1"/>
        <circle ref={bgSignalDotRef} cx="0" cy="0" r="4" fill="#FF5A00" style={{ filter: 'drop-shadow(0 0 8px rgba(255,90,0,0.6))' }} />
      </svg>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-12">
          
          {/* LEFT: EDITORIAL TYPOGRAPHY */}
          <div className="w-full lg:w-5/12 xl:w-1/2 flex flex-col items-start mt-8 lg:mt-0 order-2 lg:order-1 relative z-20">
            
            <div ref={labelRef} className="flex items-center gap-4 mb-8 lg:mb-10 overflow-hidden">
              <span className="w-1.5 h-1.5 bg-[#111111]" />
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.3em] text-[#111111] uppercase font-bold">
                01 — DIGITAL ENGINE
              </span>
            </div>
            
            <h1 className="flex flex-col gap-1 md:gap-2 mb-8">
              <span className="overflow-hidden block">
                <span ref={el => { headlineMasks.current[0] = el; }} className="block text-[13vw] md:text-7xl lg:text-7xl xl:text-[6.5rem] font-display font-black tracking-[-0.04em] uppercase leading-[0.9] text-[#111111]">
                  WE BUILD
                </span>
              </span>
              <span className="overflow-hidden block">
                <span ref={el => { headlineMasks.current[1] = el; }} className="block text-[13vw] md:text-7xl lg:text-7xl xl:text-[6.5rem] font-display font-black tracking-[-0.04em] uppercase leading-[0.9] text-[#111111]">
                  DIGITAL
                </span>
              </span>
              <span className="overflow-hidden block relative">
                {/* Base layer */}
                <span ref={momentumRef} className="block text-[13vw] md:text-7xl lg:text-7xl xl:text-[6.5rem] font-display font-black tracking-[-0.04em] uppercase leading-[0.9] text-[#111111]/5">
                  MOMENTUM.
                </span>
                {/* Highlight layer */}
                <span ref={momentumSweepRef} className="absolute inset-0 block text-[13vw] md:text-7xl lg:text-7xl xl:text-[6.5rem] font-display font-black tracking-[-0.04em] uppercase leading-[0.9] text-[#FF5A00]" aria-hidden="true">
                  MOMENTUM.
                </span>
              </span>
            </h1>
            
            <p ref={copyRef} className="font-sans text-[#111111]/70 text-base lg:text-[1.1rem] max-w-lg mb-12 leading-relaxed">
              BlazeByte Studio designs premium digital experiences, growth systems, and intelligent automation built to move ambitious businesses forward.
            </p>

            <div ref={ctaRef} className="mb-12 inline-block">
              <MagneticButton>
                <ProjectButton />
              </MagneticButton>
            </div>

            <div ref={statusRef} className="flex items-center gap-3 bg-white/50 backdrop-blur-sm px-4 py-2 border border-[#111111]/5 rounded-full">
              <span className="w-2 h-2 bg-[#FF5A00] rounded-full shadow-[0_0_4px_rgba(255,90,0,0.4)]" />
              <span className="font-mono text-[9px] tracking-widest text-[#111111]/60 uppercase font-bold">
                SYSTEM STATUS — ACTIVE
              </span>
            </div>

          </div>

          {/* RIGHT: CINEMATIC 3D LAPTOP ENVIRONMENT */}
          <div className="w-full lg:w-7/12 xl:w-1/2 flex justify-center lg:justify-end relative perspective-[2500px] order-1 lg:order-2 z-10 min-h-[400px] lg:min-h-[600px]">
            
            <div 
              ref={laptopWrapperRef} 
              className="relative w-full max-w-[900px] aspect-[16/10.5] preserve-3d"
            >
              <div 
                ref={laptopInnerRef} 
                className="absolute inset-0 w-full h-full flex flex-col justify-end items-center preserve-3d"
              >
                
                {/* 1. The Screen Lid (Chassis) */}
                <div className="relative w-full h-[88%] bg-[#0A0A0C] rounded-t-2xl md:rounded-t-[24px] border border-[#2A2A2E] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.05)_inset,0_20px_40px_rgba(0,0,0,0.3)_inset] overflow-hidden flex flex-col preserve-3d">
                   
                   {/* Hardware Camera Dot */}
                   <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#050505] shadow-[0_1px_0_rgba(255,255,255,0.1)_inset]" />
                   
                   {/* Dynamic Glare Reflection */}
                   <div 
                     ref={screenReflectionRef}
                     className="absolute inset-0 w-[200%] h-[200%] -top-[50%] -left-[50%] bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent transform rotate-45 pointer-events-none z-50 mix-blend-screen" 
                   />
                   
                   {/* 2. The Screen Display (Inner Environment) */}
                   <div className="flex-1 mt-4 md:mt-5 mb-1 mx-1.5 md:mx-2 bg-[#F5F5F2] rounded-sm shadow-[0_0_20px_rgba(0,0,0,0.8)_inset] overflow-hidden flex flex-col relative preserve-3d">
                      
                      {/* Dashboard Header */}
                      <div className="w-full h-10 border-b border-[#111111]/5 flex items-center justify-between px-5 bg-[#FFFFFF]/80 backdrop-blur-md z-30 shadow-sm translate-z-[1px]">
                         <span className="font-mono text-[8px] md:text-[9px] tracking-[0.25em] text-[#111111] font-bold">BLAZEBYTE DIGITAL ENGINE</span>
                         <div className="flex items-center gap-3">
                           <span className="font-mono text-[8px] text-[#111111]/50 tracking-[0.2em]">SYS.ACTIVE</span>
                           <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A00]" />
                         </div>
                      </div>

                      {/* Dashboard Body (3 Modules in 3D Space) */}
                      <div className="flex-1 p-3 md:p-5 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 bg-[#F5F5F2] relative preserve-3d">
                         
                         {/* Grid background on screen */}
                         <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                         {/* MODULE 01: WEB */}
                         <div ref={el => { modulesRef.current[0] = el; }} className="bg-[#FFFFFF] rounded-sm border border-[#111111]/5 p-4 flex flex-col relative overflow-hidden shadow-sm hover:shadow-md transition-shadow transform-style-flat z-[10]">
                            <span className="font-mono text-[8px] tracking-widest text-[#111111]/40 mb-1">MODULE 01</span>
                            <span className="font-display font-black text-sm text-[#111111] tracking-tight uppercase">WEB</span>
                            <span className="font-mono text-[8px] text-[#111111]/40 mb-6 uppercase">Digital Experiences</span>
                            <div className="flex-1 relative flex items-center justify-center min-h-[80px]">
                               <svg className="w-full h-full absolute inset-0 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                                  {/* Wireframe skeleton */}
                                  <rect x="5" y="10" width="90" height="20" rx="2" fill="none" stroke="#111111" strokeWidth="1" strokeOpacity="0.05" />
                                  <rect x="5" y="40" width="60" height="40" rx="2" fill="none" stroke="#111111" strokeWidth="1" strokeOpacity="0.05" />
                                  <rect x="70" y="40" width="25" height="40" rx="2" fill="none" stroke="#111111" strokeWidth="1" strokeOpacity="0.05" />
                                  
                                  {/* Animated structural lines */}
                                  <line ref={el => { dashWebLines.current[0] = el; }} x1="5" y1="20" x2="80" y2="20" stroke="#111111" strokeWidth="2" />
                                  <line ref={el => { dashWebLines.current[1] = el; }} x1="5" y1="50" x2="50" y2="50" stroke="#111111" strokeWidth="2" />
                                  <line ref={el => { dashWebLines.current[2] = el; }} x1="5" y1="70" x2="40" y2="70" stroke="#111111" strokeWidth="2" />
                                  
                                  <circle ref={dashWebSignal} cx="5" cy="50" r="3.5" fill="#FF5A00" />
                               </svg>
                            </div>
                         </div>

                         {/* MODULE 02: GROWTH */}
                         <div ref={el => { modulesRef.current[1] = el; }} className="bg-[#FFFFFF] rounded-sm border border-[#111111]/5 p-4 flex flex-col relative overflow-hidden shadow-sm hover:shadow-md transition-shadow transform-style-flat z-[10]">
                            <span className="font-mono text-[8px] tracking-widest text-[#111111]/40 mb-1">MODULE 02</span>
                            <span className="font-display font-black text-sm text-[#111111] tracking-tight uppercase">GROWTH</span>
                            <span className="font-mono text-[8px] text-[#111111]/40 mb-6 uppercase">Digital Momentum</span>
                            <div className="flex-1 relative flex items-end min-h-[80px]">
                               <svg className="w-full h-full absolute inset-0 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                                  <line x1="0" y1="25" x2="100" y2="25" stroke="#111111" strokeWidth="1" strokeOpacity="0.05" />
                                  <line x1="0" y1="50" x2="100" y2="50" stroke="#111111" strokeWidth="1" strokeOpacity="0.05" />
                                  <line x1="0" y1="75" x2="100" y2="75" stroke="#111111" strokeWidth="1" strokeOpacity="0.05" />
                                  
                                  {/* Premium Growth Curve */}
                                  <path ref={dashGrowthPath} d="M 0 90 C 20 85, 40 60, 60 40 S 80 15, 100 10" fill="none" stroke="#FF5A00" strokeWidth="2" strokeLinecap="round" />
                                  <circle ref={dashGrowthSignal} cx="0" cy="0" r="3" fill="#111111" />
                               </svg>
                            </div>
                         </div>

                         {/* MODULE 03: AUTOMATION */}
                         <div ref={el => { modulesRef.current[2] = el; }} className="bg-[#FFFFFF] rounded-sm border border-[#111111]/5 p-4 flex flex-col relative overflow-hidden shadow-sm hover:shadow-md transition-shadow transform-style-flat z-[10]">
                            <span className="font-mono text-[8px] tracking-widest text-[#111111]/40 mb-1">MODULE 03</span>
                            <span className="font-display font-black text-sm text-[#111111] tracking-tight uppercase">AUTOMATION</span>
                            <span className="font-mono text-[8px] text-[#111111]/40 mb-6 uppercase">Intelligent Systems</span>
                            <div className="flex-1 relative flex items-center justify-center min-h-[80px]">
                               <div className="absolute inset-0 flex flex-col justify-between font-mono text-[6px] font-bold tracking-widest text-[#111111]/30 py-1 pl-1">
                                  <span>ACTION</span>
                                  <span>DECISION</span>
                                  <span>INTELLIGENCE</span>
                                  <span>INPUT</span>
                               </div>
                               <svg className="w-full h-full absolute inset-0 pl-16 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                                  <path d="M 20 85 L 20 65" fill="none" stroke="#111111" strokeWidth="1" strokeOpacity="0.1"/>
                                  <path d="M 20 65 L 20 45" fill="none" stroke="#111111" strokeWidth="1" strokeOpacity="0.1"/>
                                  <path d="M 20 45 L 20 25" fill="none" stroke="#111111" strokeWidth="1" strokeOpacity="0.1"/>
                                  
                                  <path ref={el => { dashAutoPaths.current[0] = el; }} d="M 20 85 L 20 65" fill="none" stroke="#FF5A00" strokeWidth="2"/>
                                  <path ref={el => { dashAutoPaths.current[1] = el; }} d="M 20 65 L 20 45" fill="none" stroke="#FF5A00" strokeWidth="2"/>
                                  <path ref={el => { dashAutoPaths.current[2] = el; }} d="M 20 45 L 20 25" fill="none" stroke="#FF5A00" strokeWidth="2"/>

                                  <circle ref={el => { dashAutoNodes.current[0] = el; }} cx="20" cy="85" r="3.5" fill="#111111" />
                                  <circle ref={el => { dashAutoNodes.current[1] = el; }} cx="20" cy="65" r="3.5" fill="#111111" />
                                  <circle ref={el => { dashAutoNodes.current[2] = el; }} cx="20" cy="45" r="3.5" fill="#111111" />
                                  <circle ref={el => { dashAutoNodes.current[3] = el; }} cx="20" cy="25" r="5" fill="#111111" />
                               </svg>
                            </div>
                         </div>

                      </div>
                   </div>
                   
                   {/* Bezel Logo / Name */}
                   <div className="w-full h-4 mb-2 flex justify-center items-center">
                     <span className="font-display font-black text-[6px] tracking-[0.4em] text-white/20">BLAZEBYTE</span>
                   </div>
                </div>

                {/* 3. Laptop Base Deck (Keyboard Area) */}
                <div className="relative w-[116%] h-[3.5%] md:h-[4%] bg-gradient-to-b from-[#E4E4E7] to-[#A1A1AA] rounded-b-xl md:rounded-b-2xl shadow-[0_15px_30px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.8)_inset] flex justify-center items-start mt-[-2px] z-20">
                   {/* Trackpad Thumb Groove */}
                   <div className="absolute top-0 w-20 md:w-24 h-[4px] bg-[#111111]/10 rounded-b-sm shadow-[0_1px_0_rgba(255,255,255,0.5)]" />
                </div>
                
                {/* 4. Cinematic Floor Shadow */}
                <div className="laptop-shadow absolute -bottom-6 w-[85%] h-16 bg-[#111111]/15 blur-2xl rounded-[100%] z-0" />

              </div>
            </div>
          </div>

        </div>
      </div>
      
      <style>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .transform-style-flat {
          transform-style: flat;
        }
      `}</style>
    </section>
  );
}

