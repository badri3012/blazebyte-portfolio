import { useRef, useEffect } from 'react';
import { projects } from '../../data/projects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

gsap.registerPlugin(ScrollTrigger);

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// -----------------------------------------------------
// UI COMPONENTS FOR THE VISUAL SYSTEM
// -----------------------------------------------------
const SystemNode = ({ title, x, y, className }: { title: string, x: number, y: number, className?: string }) => (
  <div 
    className={cn(
      "absolute z-20 flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2",
      className
    )}
    style={{ left: `${(x/400)*100}%`, top: `${(y/600)*100}%` }}
  >
    <div className="bg-white/90 backdrop-blur-md border border-[#111111]/10 px-3 md:px-4 py-1.5 md:py-2 rounded-lg flex items-center gap-2 md:gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
       <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#FF5A00] animate-pulse" />
       <span className="font-mono text-[8px] md:text-[9px] font-bold tracking-widest text-[#111111] uppercase whitespace-nowrap">{title}</span>
    </div>
  </div>
);

const ExitNode = ({ x, y, className }: { x: number, y: number, className?: string }) => (
  <div 
    className={cn(
      "absolute z-20 flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2",
      className
    )}
    style={{ left: `${(x/400)*100}%`, top: `${(y/600)*100}%` }}
  >
    <div className="flex items-center gap-2 px-4 py-2 border border-[#111111]/5 rounded bg-[#111111]/[0.02]">
       <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A00] animate-pulse shadow-[0_0_8px_#FF5A00]" />
       <span className="font-mono text-[9px] font-bold tracking-widest text-[#111111]/60 uppercase">ACTION / EXIT</span>
    </div>
  </div>
);

// -----------------------------------------------------
// CORE DIGITAL ENVIRONMENT
// -----------------------------------------------------
const SystemEnvironment = ({ stage, envRef }: { stage: number, envRef?: React.RefObject<HTMLDivElement | null> }) => {
  // Mobile mode (stage > 0) uses hardcoded static tailwind classes for visibility.
  // Desktop mode (stage === 0) uses opacity-0/scale-95 and is controlled by GSAP.
  
  const isMobile = stage > 0;
  
  return (
    <div ref={envRef} className={cn(
      "relative w-full max-w-[400px] h-[500px] md:h-[600px] mx-auto z-10",
      isMobile ? "mobile-env" : "desktop-env"
    )}>
      
      {/* Background Grid */}
      <svg className={cn("absolute inset-0 w-full h-full pointer-events-none grid-svg", isMobile ? "opacity-30" : "opacity-0")} xmlns="http://www.w3.org/2000/svg">
         <pattern id={`vault-grid-${stage}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#111111" strokeWidth="0.5" strokeOpacity="0.06" />
            <circle cx="40" cy="40" r="1" fill="#111111" fillOpacity="0.1" />
         </pattern>
         <rect width="100%" height="100%" fill={`url(#vault-grid-${stage})`} />
      </svg>

      {/* SVG Canvas for Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
        
        {/* Foundation Track (Always faintly visible) */}
        <path d="M 200,20 L 200,560" stroke="#111111" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.1" />
        
        {/* Stage 1: Nexus Core Lines */}
        <path 
          className="path-stage-1" 
          d="M 200,20 L 200,200" 
          stroke="#FF5A00" strokeWidth="1.5" fill="none" opacity="0.8" 
          style={{ 
            strokeDasharray: 180, 
            strokeDashoffset: isMobile && stage >= 1 ? 0 : 180,
            transition: isMobile ? 'stroke-dashoffset 0.8s ease' : 'none'
          }} 
        />
        
        {/* Stage 2: Aether Dynamics Lines */}
        <path 
          className="path-stage-2" 
          d="M 200,200 L 80,200 L 80,260" 
          stroke="#FF5A00" strokeWidth="1.5" fill="none" opacity="0.8" 
          style={{ 
            strokeDasharray: 180, 
            strokeDashoffset: isMobile && stage >= 2 ? 0 : 180,
            transition: isMobile ? 'stroke-dashoffset 0.8s ease' : 'none'
          }} 
        />
        <path 
          className="path-stage-2" 
          d="M 200,200 L 320,200 L 320,260" 
          stroke="#FF5A00" strokeWidth="1.5" fill="none" opacity="0.8" 
          style={{ 
            strokeDasharray: 180, 
            strokeDashoffset: isMobile && stage >= 2 ? 0 : 180,
            transition: isMobile ? 'stroke-dashoffset 0.8s ease' : 'none'
          }} 
        />

        {/* Stage 3: Omni Intelligence Lines */}
        <path 
          className="path-stage-3" 
          d="M 200,200 L 200,540" 
          stroke="#FF5A00" strokeWidth="1.5" fill="none" opacity="0.8" 
          style={{ 
            strokeDasharray: 340, 
            strokeDashoffset: isMobile && stage >= 3 ? 0 : 340,
            transition: isMobile ? 'stroke-dashoffset 0.8s ease' : 'none'
          }} 
        />

        {/* Signal Dot */}
        <circle 
          className="signal-dot" 
          cx="200" cy={isMobile ? (stage === 1 ? 160 : stage === 2 ? 200 : stage === 3 ? 540 : 20) : 20} 
          r="4.5" 
          fill="#FF5A00" filter="drop-shadow(0 0 8px rgba(255,90,0,0.8))" 
          opacity={!isMobile || stage > 0 ? 1 : 0} 
          style={{ transition: isMobile ? 'cy 0.8s ease' : 'none' }}
        />
      </svg>

      {/* HTML Nodes */}
      {/* Stage 1 */}
      <SystemNode title="DATA INGESTION" x={200} y={60} className={cn("node-stage-1 transition-all duration-700", (!isMobile || stage < 1) && "opacity-0 scale-95")} />
      <SystemNode title="CORE ARCHITECTURE" x={200} y={160} className={cn("node-stage-1 transition-all duration-700", (!isMobile || stage < 1) && "opacity-0 scale-95")} />

      {/* Stage 2 */}
      <SystemNode title="TRAFFIC ROUTING" x={80} y={260} className={cn("node-stage-2 transition-all duration-700 delay-100", (!isMobile || stage < 2) && "opacity-0 scale-95")} />
      <SystemNode title="SEO METRICS" x={320} y={260} className={cn("node-stage-2 transition-all duration-700 delay-200", (!isMobile || stage < 2) && "opacity-0 scale-95")} />

      {/* Stage 3 */}
      <SystemNode title="LLM INFERENCE" x={200} y={360} className={cn("node-stage-3 transition-all duration-700 delay-100", (!isMobile || stage < 3) && "opacity-0 scale-95")} />
      <SystemNode title="DECISION LOGIC" x={200} y={460} className={cn("node-stage-3 transition-all duration-700 delay-200", (!isMobile || stage < 3) && "opacity-0 scale-95")} />
      <ExitNode x={200} y={540} className={cn("node-stage-3 transition-all duration-700 delay-300", (!isMobile || stage < 3) && "opacity-0")} />

    </div>
  );
};


// -----------------------------------------------------
// MAIN VAULT COMPONENT
// -----------------------------------------------------
export default function Vault() {
  const containerRef = useRef<HTMLElement>(null);
  const desktopEnvRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !desktopEnvRef.current) return;
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      // Desktop Animations
      mm.add("(min-width: 1024px)", () => {
        const rows = document.querySelectorAll('.vault-row');
        if (rows.length < 3) return;

        // Reset
        gsap.set('.signal-dot', { opacity: 0, cy: 20 });
        gsap.set('.grid-svg', { opacity: 0 });

        // Base scroll parameters for each row
        const scrollConfig = (trigger: Element) => ({
          trigger: trigger,
          start: "top 60%", // Starts evolving when the row reaches this point in the viewport
          end: "bottom 60%", // Finishes evolving when the row passes this point
          scrub: 0.5,
        });

        // -------------------------------------------------
        // STAGE 01: NEXUS CORE
        // -------------------------------------------------
        const tl1 = gsap.timeline({ scrollTrigger: scrollConfig(rows[0]) });
        tl1.to('.grid-svg', { opacity: 0.3, duration: 1 }, 0)
           .to('.signal-dot', { opacity: 1, duration: 0.2 }, 0)
           .to('.path-stage-1', { strokeDashoffset: 0, duration: 1 }, 0)
           .to('.signal-dot', { cy: 160, duration: 1 }, 0)
           .to('.node-stage-1', { opacity: 1, scale: 1, duration: 0.4, stagger: 0.15 }, 0.2);

        // -------------------------------------------------
        // STAGE 02: AETHER DYNAMICS
        // -------------------------------------------------
        const tl2 = gsap.timeline({ scrollTrigger: scrollConfig(rows[1]) });
        tl2.to('.path-stage-2', { strokeDashoffset: 0, duration: 1 }, 0)
           .to('.signal-dot', { cy: 200, duration: 0.5 }, 0) // Signal drops to junction
           .to('.node-stage-2', { opacity: 1, scale: 1, duration: 0.4, stagger: 0.15 }, 0.4);

        // -------------------------------------------------
        // STAGE 03: OMNI INTELLIGENCE
        // -------------------------------------------------
        const tl3 = gsap.timeline({ scrollTrigger: scrollConfig(rows[2]) });
        tl3.to('.path-stage-3', { strokeDashoffset: 0, duration: 1 }, 0)
           .to('.signal-dot', { cy: 540, duration: 1 }, 0) // Signal shoots to exit
           .to('.node-stage-3', { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1 }, 0.2)
           
           // Ambient life kicks in after completion
           .add(() => {
             gsap.to('.grid-svg', { 
               y: -10, 
               duration: 4, 
               yoyo: true, 
               repeat: -1, 
               ease: "sine.inOut" 
             });
             // Ambient pulse on signal
             gsap.to('.signal-dot', {
               scale: 1.2,
               opacity: 0.6,
               duration: 2,
               yoyo: true,
               repeat: -1,
               ease: "sine.inOut"
             });
           }, "+=0.2");
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-transparent py-32 border-t border-[#111111]/10 overflow-hidden cursor-default">
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24">
        
        {/* Section Header */}
        <div className="mb-24 md:mb-32">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-1.5 h-1.5 bg-[#FF5A00]" />
            <h2 className="text-[#111111] text-[10px] tracking-[0.3em] font-mono font-bold uppercase">02 — Selected Work</h2>
          </div>
          <h3 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-[-0.04em] text-[#111111] leading-[0.9]">
            THE BLAZEBYTE
          </h3>
          <h3 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-[-0.04em] text-[#111111]/10 leading-[0.9] mt-2">
            DIGITAL VAULT.
          </h3>
        </div>

        {/* Proper Layout Grid: 2 Columns on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative items-start">
          
          {/* Left Column: Project Rows (7 cols) */}
          <div className="lg:col-span-7 flex flex-col border-t border-[#111111]/10">
            {projects.map((project, idx) => (
              <div key={project.id} className="flex flex-col">
                <div className="vault-row group relative border-b border-[#111111]/10 py-10 md:py-16">
                  
                  {/* Row Content */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between z-10 relative">
                    <div className="flex items-center gap-6 md:gap-10 xl:gap-16">
                      <span className="text-[#111111]/40 font-mono tracking-widest text-sm font-bold group-hover:text-[#FF5A00] transition-colors duration-300">
                        {project.id}
                      </span>
                      <h4 className="text-3xl md:text-4xl xl:text-5xl font-display font-black tracking-[-0.02em] text-[#111111] uppercase">
                        {project.name}
                      </h4>
                    </div>

                    <div className="hidden md:flex flex-col items-end text-right">
                      <span className="text-[#111111] font-bold tracking-widest text-[11px] uppercase">{project.industry}</span>
                      <span className="text-[#111111]/50 text-[10px] font-mono tracking-widest mt-2 uppercase">{project.services.join(' / ')}</span>
                    </div>
                  </div>
                  
                  {/* Subtle hover line */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-[#FF5A00] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] z-20" />
                </div>
                
                {/* Mobile / Tablet Inline Visual (Hidden on Desktop) */}
                <div className="block lg:hidden w-full overflow-hidden mt-8 mb-16 border border-[#111111]/5 rounded-xl bg-gradient-to-b from-[#111111]/[0.02] to-transparent py-10">
                   <div className="flex justify-center mb-6">
                      <span className="font-mono text-[9px] tracking-widest text-[#111111]/40 uppercase">
                        {idx === 0 ? "System Foundation" : idx === 1 ? "System Evolution" : "Final Architecture"}
                      </span>
                   </div>
                   <SystemEnvironment stage={idx + 1} />
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Dedicated Visual Area (5 cols) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-32 w-full pt-12">
             <div className="flex justify-start mb-6">
                <span className="font-mono text-[9px] tracking-widest text-[#111111]/40 uppercase">
                  Live System Architecture
                </span>
             </div>
             {/* The Master Desktop Animated Environment */}
             <SystemEnvironment stage={0} envRef={desktopEnvRef} />
          </div>

        </div>

      </div>
    </section>
  );
}
