import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroScene() {
  const bgRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<SVGSVGElement>(null);
  const shapesRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Very slow, subtle background gradient pan
      gsap.to(bgRef.current, {
        backgroundPosition: '100% 100%',
        duration: 30,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Subtle rotation for abstract forms
      gsap.to(shapesRef.current, {
        rotation: 360,
        transformOrigin: "center center",
        duration: 120,
        repeat: -1,
        ease: 'linear'
      });
      
      // Mouse parallax for the grid (will be bound in Hero.tsx, but keeping basic animation here)
      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        gsap.to(gridRef.current, {
          x: x,
          y: y,
          duration: 1,
          ease: 'power2.out'
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      
      {/* Layer 1: Warm Premium Base & Layer 2: Gradient Fields */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-background opacity-100"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(240, 238, 233, 0.8) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255, 90, 0, 0.05) 0%, transparent 40%)',
          backgroundSize: '200% 200%'
        }}
      />

      {/* Layer 3 & 4: Architectural Lines and Grid */}
      <svg 
        ref={gridRef}
        className="absolute inset-0 w-full h-full opacity-[0.03]" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="architectural-grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#111111" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#architectural-grid)" />
        
        <g ref={shapesRef} className="origin-center mix-blend-multiply">
           {/* Abstract Geometric Forms */}
           <circle cx="20%" cy="30%" r="300" fill="none" stroke="#111111" strokeWidth="0.2" strokeDasharray="4 12" />
           <circle cx="80%" cy="70%" r="500" fill="none" stroke="#111111" strokeWidth="0.2" />
           <line x1="0" y1="20%" x2="100%" y2="20%" stroke="#111111" strokeWidth="0.2" />
           <line x1="80%" y1="0" x2="80%" y2="100%" stroke="#111111" strokeWidth="0.2" />
        </g>
      </svg>
      
    </div>
  );
}
