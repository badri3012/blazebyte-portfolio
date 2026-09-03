import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useNavigate } from 'react-router-dom';
import { PaperPlane } from './PaperPlane';
import { cn } from '../../utils/cn';

gsap.registerPlugin(MotionPathPlugin);

interface ProjectButtonProps {
  className?: string;
  theme?: 'dark' | 'light' | 'transparent-light';
}

export default function ProjectButton({ className, theme = 'dark' }: ProjectButtonProps) {
  const containerRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const orangeRectRef = useRef<HTMLDivElement>(null);
  const signalLineRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const trailPathRef = useRef<SVGPathElement>(null);
  const hiddenMotionPathRef = useRef<SVGPathElement>(null);
  
  const navigate = useNavigate();
  const [isLaunching, setIsLaunching] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile or prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobileDevice = window.innerWidth <= 768;
    setIsMobile(prefersReducedMotion || isMobileDevice);
    
    // Initial state for trail path
    gsap.set(trailPathRef.current, { strokeDasharray: 300, strokeDashoffset: 300, opacity: 0 });
  }, []);

  const handleMouseEnter = () => {
    if (isLaunching || isMobile || !containerRef.current) return;
    
    gsap.context(() => {
      // 1. Orange rect expands slightly
      gsap.to(orangeRectRef.current, { scaleX: 3, duration: 0.4, ease: "power2.out" });
      
      // 2. Text and arrow shift slightly right
      gsap.to([textRef.current, arrowRef.current], { x: 4, duration: 0.4, ease: "power2.out", stagger: 0.05 });
      
      // 3. Signal line travels left to right (no glow)
      gsap.fromTo(signalLineRef.current, 
        { x: '-100%', opacity: 0 }, 
        { x: '200%', opacity: 1, duration: 0.8, ease: "power1.inOut" }
      );
    }, containerRef);
  };

  const handleMouseLeave = () => {
    if (isLaunching || isMobile || !containerRef.current) return;
    
    gsap.context(() => {
      gsap.to(orangeRectRef.current, { scaleX: 1, duration: 0.4, ease: "power2.out" });
      gsap.to([textRef.current, arrowRef.current], { x: 0, duration: 0.4, ease: "power2.out" });
    }, containerRef);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLaunching) return;
    setIsLaunching(true);

    if (isMobile) {
      // Simplified Mobile / Reduced Motion Sequence
      gsap.to(containerRef.current, { scale: 0.96, duration: 0.2, yoyo: true, repeat: 1 });
      setTimeout(() => {
        navigate('/contact');
        setIsLaunching(false);
      }, 400);
      return;
    }

    // Cinematic 3-Stage Launch Sequence (Desktop)
    gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          navigate('/contact');
          // Reset after navigation
          setTimeout(() => {
            setIsLaunching(false);
            gsap.set([orangeRectRef.current, textRef.current, arrowRef.current, planeRef.current, trailPathRef.current], { clearProps: "all" });
            gsap.set(trailPathRef.current, { strokeDasharray: 300, strokeDashoffset: 300, opacity: 0 });
            gsap.set(containerRef.current, { scale: 1 });
          }, 300);
        }
      });

      // STAGE 1: System Activation
      tl.to(containerRef.current, { 
        scale: 0.98, 
        duration: 0.2, 
        ease: "power2.out" 
      }, 0);

      // Rapid signal sweep across the button
      tl.fromTo(signalLineRef.current, 
        { x: '-100%', opacity: 1 }, 
        { x: '100%', duration: 0.4, ease: "power4.inOut" }
      , 0);

      // Text slides and fades subtly
      tl.to([textRef.current, arrowRef.current], { 
        x: 10, 
        opacity: 0, 
        duration: 0.3, 
        ease: "power2.in" 
      }, 0.1);

      // STAGE 2: Paper Plane Launch
      tl.set(planeRef.current, { opacity: 1 }, 0.2);
      tl.set(trailPathRef.current, { opacity: 1 }, 0.2);
      
      // Aerodynamic curve using MotionPath
      tl.to(planeRef.current, {
        motionPath: {
          path: hiddenMotionPathRef.current as SVGPathElement,
          align: hiddenMotionPathRef.current as SVGPathElement,
          alignOrigin: [0.5, 0.5],
          autoRotate: true
        },
        scale: 1.2,
        duration: 0.6,
        ease: "power3.in"
      }, 0.2);

      // Trail follows the curve
      tl.to(trailPathRef.current, {
        strokeDashoffset: 0,
        duration: 0.6,
        ease: "power3.in"
      }, 0.2);

      // Fade plane and trail at the very end
      tl.to([planeRef.current, trailPathRef.current], {
        opacity: 0,
        duration: 0.1,
        ease: "power2.in"
      }, 0.7);

    }, containerRef);
  };

  const isDark = theme === 'dark';
  const isTransparentLight = theme === 'transparent-light';
  
  return (
    <button 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={cn(
        "group relative overflow-visible flex items-center gap-4 px-7 py-3.5 border rounded-sm transition-colors duration-300 transform-gpu",
        isDark 
          ? "bg-[#111111] text-[#FAF9F6] border-[#111111]/20 hover:border-[#111111]/40" 
          : isTransparentLight
            ? "bg-transparent text-[#FAF9F6] border-[rgba(255,255,255,0.15)] hover:border-[rgba(255,255,255,0.3)]"
            : "bg-transparent text-[#111111] border-[rgba(17,17,17,0.15)] hover:border-[rgba(17,17,17,0.3)]",
        className
      )}
    >
      {/* Flight Path SVG (overflow visible to let plane fly out) */}
      <svg className="absolute top-1/2 left-1/2 w-[300px] h-[300px] pointer-events-none z-[100] overflow-visible" style={{ transform: 'translate(-50%, -50%)' }}>
        <path ref={hiddenMotionPathRef} d="M100,150 C180,150 220,90 280,30" fill="none" stroke="transparent" />
        <path ref={trailPathRef} d="M100,150 C180,150 220,90 280,30" fill="none" stroke="#FF5A00" strokeWidth="1" />
        
        {/* Plane positioned on the SVG coordinate system initially so MotionPath can take over */}
        <foreignObject x="0" y="0" width="100%" height="100%" className="overflow-visible pointer-events-none">
           <div ref={planeRef} className="absolute opacity-0 pointer-events-none origin-center text-[#FF5A00] drop-shadow-sm">
             <PaperPlane className="w-4 h-4" />
           </div>
        </foreignObject>
      </svg>

      {/* Subtle sweeping signal line */}
      <div 
        ref={signalLineRef}
        className="absolute top-0 bottom-0 left-0 w-[1px] bg-[#FF5A00] opacity-0 pointer-events-none z-0"
      />
      
      {/* Orange launch rectangle */}
      <div 
        ref={orangeRectRef} 
        className="w-2 h-2 bg-[#FF5A00] origin-left relative z-10 flex items-center justify-center pointer-events-none" 
      />

      <span ref={textRef} className="relative z-10 font-mono text-[10px] tracking-[0.2em] font-bold pointer-events-none uppercase">
        START A PROJECT
      </span>
      
      <span ref={arrowRef} className="relative z-10 font-mono text-sm pointer-events-none transition-transform duration-300">
        →
      </span>
    </button>
  );
}
