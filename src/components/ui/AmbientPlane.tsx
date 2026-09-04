import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { PaperPlane } from './PaperPlane';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function AmbientPlane() {
  const containerRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    if (prefersReducedMotion || isMobile) return;
    if (!containerRef.current || !planeRef.current || !trailRef.current) return;

    const ctx = gsap.context(() => {
      
      // Hide initially
      gsap.set(planeRef.current, { opacity: 0, scale: 0 });
      gsap.set(trailRef.current, { opacity: 0, strokeDasharray: 2000, strokeDashoffset: 2000 });

      // Helper function to create a flight sequence
      const createFlight = (triggerSelector: string, pathPoints: any[], startMarker: string) => {
        const triggerEl = document.querySelector(triggerSelector);
        if (!triggerEl) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerEl,
            start: startMarker,
            once: true
          }
        });

        // Calculate dynamic path based on screen size
        const w = window.innerWidth;
        const h = window.innerHeight;
        
        // Map relative points (0-1) to screen pixels
        const mappedPath = pathPoints.map(p => ({
          x: p.x * w,
          y: p.y * h
        }));

        // Build the SVG path data for the trail
        let d = `M ${mappedPath[0].x} ${mappedPath[0].y}`;
        // Simple cubic bezier estimation or just straight curves for the SVG trail
        // Since we want a curved trail, we'll draw a bezier through the points
        if (mappedPath.length === 3) {
          d = `M ${mappedPath[0].x} ${mappedPath[0].y} Q ${mappedPath[1].x} ${mappedPath[1].y} ${mappedPath[2].x} ${mappedPath[2].y}`;
        } else if (mappedPath.length === 4) {
          d = `M ${mappedPath[0].x} ${mappedPath[0].y} C ${mappedPath[1].x} ${mappedPath[1].y}, ${mappedPath[2].x} ${mappedPath[2].y}, ${mappedPath[3].x} ${mappedPath[3].y}`;
        }

        // Add this specific path to a temporary timeline to animate
        tl.call(() => {
          if(trailRef.current) trailRef.current.setAttribute('d', d);
        })
        .set(planeRef.current, { x: mappedPath[0].x, y: mappedPath[0].y })
        .to(planeRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" })
        .to(trailRef.current, { opacity: 0.35, duration: 0.2 }, "<")
        .to(trailRef.current, { strokeDashoffset: 0, duration: 2.5, ease: "power2.inOut" }, "-=0.2")
        .to(planeRef.current, {
          motionPath: {
            path: mappedPath,
            type: "cubic",
            autoRotate: true,
            useRadians: false
          },
          duration: 2.5,
          ease: "power2.inOut"
        }, "<")
        .to(planeRef.current, { opacity: 0, scale: 0.8, duration: 0.6, ease: "power2.in" }, "-=0.6")
        .to(trailRef.current, { opacity: 0, duration: 0.8 }, "-=0.6");
      };

      // 1. HERO ORBIT
      // (Triggered near top)
      createFlight(
        '#hero',  
        [
          {x: -0.1, y: 0.2},
          {x: 0.3, y: 0.8},
          {x: 0.7, y: 0.2},
          {x: 1.1, y: 0.5}
        ],
        "top 20%"
      );

      // 2. VAULT TRANSITION
      createFlight(
        '#work',  
        [
          {x: 1.1, y: 0.3},
          {x: 0.7, y: 0.7},
          {x: 0.2, y: 0.4},
          {x: -0.1, y: 0.8}
        ],
        "top 60%"
      );

      // 3. FINAL CTA LAUNCH
      createFlight(
        '#cta-section', 
        [
          {x: 0.5, y: 1.1},
          {x: 0.6, y: 0.7},
          {x: 0.5, y: 0.5},
          {x: 0.5, y: -0.1}
        ],
        "top 80%"
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[40] overflow-hidden">
      <svg className="absolute inset-0 w-full h-full">
        <path 
          ref={trailRef}
          fill="none" 
          stroke="#FF5A14" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 2px rgba(255,90,20,0.3))' }}
        />
      </svg>
      <div 
        ref={planeRef}
        className="absolute top-0 left-0 text-[#FF5A14] w-5 h-5 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_4px_rgba(255,90,20,0.4)]"
      >
        <PaperPlane className="w-full h-full -rotate-90" />
      </div>
    </div>
  );
}
