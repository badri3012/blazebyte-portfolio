import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLocation } from 'react-router-dom';
import { useBoot } from '../../contexts/BootContext';
import { PaperPlane } from './PaperPlane';

export default function Loader() {
  const { setBootState, isFirstVisit } = useBoot();
  const { pathname } = useLocation();
  const isHomepage = pathname === '/';
  
  // Decide whether to do full 4-second sequence or fast 1.5s sequence
  const isFullBoot = isFirstVisit && isHomepage;

  const containerRef = useRef<HTMLDivElement>(null);
  const orbitSystemRef = useRef<HTMLDivElement>(null);
  
  const ring1Ref = useRef<SVGCircleElement>(null);
  const ring2Ref = useRef<SVGCircleElement>(null);
  const ring3Ref = useRef<SVGCircleElement>(null);
  
  const planeRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const logoTextRef = useRef<HTMLSpanElement>(null);
  
  const gridRef = useRef<HTMLDivElement>(null);
  
  const textLinesRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setBootState('COMPLETE');
      return;
    }

    const ctx = gsap.context(() => {
      const masterTl = gsap.timeline({
        onUpdate: function() {
          setProgress(Math.round(this.progress() * 100));
        },
        onComplete: () => {
          setBootState('HANDOFF');
          
          // Phase 07 — HERO TRANSITION
          // Instead of a simple fade, we zoom the orbital system into the camera and fade the background
          gsap.to(containerRef.current, {
            backgroundColor: 'transparent',
            duration: 1.2,
            ease: "power2.inOut"
          });
          
          gsap.to(orbitSystemRef.current, {
            scale: 8,
            opacity: 0,
            duration: 1.2,
            ease: "power3.in",
            onComplete: () => setBootState('COMPLETE')
          });
        }
      });

      // Initial States
      gsap.set([ring1Ref.current, ring2Ref.current, ring3Ref.current], { 
        strokeDasharray: 800, 
        strokeDashoffset: 800,
        rotation: -90,
        transformOrigin: "50% 50%"
      });
      gsap.set(planeRef.current, { opacity: 0, x: 0, y: -120, z: 0 }); // Top of orbit
      gsap.set(logoRef.current, { opacity: 0 });
      gsap.set(logoTextRef.current, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(textLinesRef.current, { opacity: 0, y: 10 });
      gsap.set(gridRef.current, { opacity: 0, scale: 1.1 });
      
      // The 3D Orbital system container tilt
      gsap.set(orbitSystemRef.current, { rotateX: 65, rotateZ: -20, transformStyle: "preserve-3d" });
      
      // The logo must counter-rotate to stand flat to camera
      gsap.set(logoRef.current, { rotateX: -65, rotateZ: 20, y: 20 });
      // The plane must also counter-rotate so it doesn't look flat on the floor
      gsap.set(planeRef.current, { rotateX: -65, rotateZ: 20, rotateY: 90 });

      if (isFullBoot) {
        masterTl
          // PHASE 01 — DARK ENVIRONMENT (Grid fades in)
          .to(gridRef.current, { opacity: 0.15, scale: 1, duration: 2, ease: "power1.out" }, 0)
          
          // PHASE 02 & 03 — SIGNAL & ORBIT CONSTRUCTION
          .to(textLinesRef.current[0], { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.2)
          .to(ring1Ref.current, { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" }, 0.2)
          .to(ring2Ref.current, { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut" }, 0.3)
          .to(ring3Ref.current, { strokeDashoffset: 0, duration: 2.5, ease: "power2.inOut" }, 0.4)
          
          // PHASE 04 — PAPER PLANE ENTRY & ORBIT
          .to(planeRef.current, { opacity: 1, duration: 0.4 }, 0.5)
          
        // Animate the plane around the 3D circle (radius 130)
        // We do this by animating a proxy object's angle
        const orbitProxy = { angle: -Math.PI / 2 };
        masterTl.to(orbitProxy, {
          angle: Math.PI * 1.5, // 1 full rotation (360 deg)
          duration: 2.5,
          ease: "power2.inOut",
          onUpdate: () => {
            if (!planeRef.current) return;
            const radius = 130;
            const x = Math.cos(orbitProxy.angle) * radius;
            const y = Math.sin(orbitProxy.angle) * radius;
            
            // To make the plane face the direction of travel, we adjust its rotateY
            // Since it's counter-rotated, we calculate the tangent angle
            const tangent = orbitProxy.angle + Math.PI; // Face forward
            const rotateY = (tangent * 180) / Math.PI;
            
            // We use translateZ to pop it above the rings slightly, and map it to physical z-index
            const z = Math.sin(orbitProxy.angle) * 30; // Z oscillates from -30 to +30
            const zIndex = z > 0 ? 20 : 0; // Force it in front of logo (z-index 10) when z>0
            
            gsap.set(planeRef.current, { 
              x: x, 
              y: y,
              z: z + 10,
              rotateX: -65,
              rotateZ: 20,
              rotateY: rotateY,
              zIndex: zIndex
            });
          }
        }, 0.5)

        // PHASE 05 — BLAZEBYTE ASSEMBLY
        masterTl
          .to(textLinesRef.current[0], { opacity: 0.3, duration: 0.3 }, 1.5)
          .to(textLinesRef.current[1], { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 1.6)
          .to(logoRef.current, { opacity: 1, duration: 0.1 }, 1.8)
          .to(logoTextRef.current, { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power3.inOut" }, 1.8)

        // PHASE 06 — SYSTEM ACTIVATION
        masterTl
          .to(textLinesRef.current[1], { opacity: 0.3, duration: 0.3 }, 2.8)
          .to(textLinesRef.current[2], { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 2.9)
          
          // Brief hold
          .to({}, { duration: 0.5 });
          
      } else {
        // Fast boot (fallback for internal navigation)
        masterTl
          .to(logoRef.current, { opacity: 1 }, 0)
          .to(logoTextRef.current, { clipPath: "inset(0 0% 0 0)", duration: 0.5 }, 0)
          .to(textLinesRef.current[2], { opacity: 1, y: 0, duration: 0.4 }, 0.4);
      }
      
    }, containerRef);

    return () => ctx.revert();
  }, [isFullBoot, setBootState]);

  const formattedProgress = progress.toString().padStart(3, '0');

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#111111] flex flex-col items-center justify-center overflow-hidden pointer-events-none"
      style={{ perspective: '1200px' }}
    >
      {/* PHASE 01: Faint Technical Grid */}
      <div 
        ref={gridRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Dimensional Orbital System */}
      <div 
        ref={orbitSystemRef} 
        className="relative flex items-center justify-center w-[340px] h-[340px]"
      >
        {/* Ring 1 - Background Orbit (Deep) */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 340 340" style={{ transform: 'translateZ(-40px)' }}>
          <circle ref={ring1Ref} cx="170" cy="170" r="160" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        </svg>
        
        {/* Ring 2 - Mid Structure */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 340 340" style={{ transform: 'translateZ(-10px)' }}>
          <circle ref={ring2Ref} cx="170" cy="170" r="130" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        </svg>
        
        {/* Ring 3 - Foreground Highlight (Orange) */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 340 340" style={{ transform: 'translateZ(10px)' }}>
          <circle 
            ref={ring3Ref}
            cx="170" cy="170" r="130" 
            fill="none" 
            stroke="#FF5A14" 
            strokeWidth="1.5" 
            strokeLinecap="round"
            strokeOpacity="0.8"
          />
        </svg>

        {/* Center Logo */}
        <div ref={logoRef} className="absolute flex flex-col items-center justify-center text-[#FAF9F6] z-10" style={{ transformStyle: 'preserve-3d' }}>
           <span ref={logoTextRef} className="font-display font-black tracking-[0.2em] text-2xl leading-none" style={{ transform: 'translateZ(0px)' }}>
             BLAZEBYTE<span className="text-[#FF5A14]">.</span>
           </span>
           <span className="text-[8px] tracking-[0.4em] font-mono text-[#FAF9F6]/30 mt-4 uppercase" style={{ transform: 'translateZ(0px)' }}>Studio System</span>
        </div>

        {/* The Paper Plane (Pseudo-3D layered SVG) */}
        <div ref={planeRef} className="absolute top-[170px] left-[170px] w-0 h-0 flex justify-center items-center">
          <div className="w-8 h-8 -ml-4 -mt-4">
             <PaperPlane className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* Text Sequence */}
      <div className="absolute bottom-16 left-0 w-full flex flex-col items-center justify-center gap-2" style={{ transform: 'translateZ(50px)' }}>
        <div className="font-mono text-[10px] tracking-widest uppercase">
          <div ref={el => { textLinesRef.current[0] = el; }} className="text-[#FAF9F6]/40 mb-1.5">01 — SIGNAL DETECTED</div>
          <div ref={el => { textLinesRef.current[1] = el; }} className="text-[#FAF9F6]/40 mb-1.5">02 — SYSTEM INITIALIZING</div>
          <div ref={el => { textLinesRef.current[2] = el; }} className="text-[#FF5A14] font-bold">03 — BLAZEBYTE READY <span className="ml-2 opacity-50 text-[#FAF9F6]">[{formattedProgress}%]</span></div>
        </div>
      </div>
      
    </div>
  );
}
