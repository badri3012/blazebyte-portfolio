import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { cn } from '../../utils/cn';
import { PaperPlane } from './PaperPlane';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  const [isMobile, setIsMobile] = useState(true);
  const [cursorState, setCursorState] = useState<'default' | 'button' | 'link' | 'large'>('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsMobile(!mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(!e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || prefersReducedMotion) return;

    // Zero-lag high performance tracking
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power3" });
    
    // 3D Banking
    const rotXTo = gsap.quickTo(cursorRef.current, "rotationX", { duration: 0.3, ease: "power2.out" });
    const rotYTo = gsap.quickTo(cursorRef.current, "rotationY", { duration: 0.3, ease: "power2.out" });
    const rotZTo = gsap.quickTo(cursorRef.current, "rotation", { duration: 0.3, ease: "power2.out" });

    let lastX = 0;
    let lastY = 0;
    
    const moveCursor = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      xTo(e.clientX);
      yTo(e.clientY);
      
      // Calculate velocity/direction for banking
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      
      // Map dx to rotateY (±10) and rotateZ (±15)
      // Map dy to rotateX (±8)
      const rotY = Math.max(-10, Math.min(10, dx * 0.4));
      const rotZ = Math.max(-15, Math.min(15, dx * 0.5));
      const rotX = Math.max(-8, Math.min(8, dy * 0.3));
      
      rotXTo(rotX);
      rotYTo(rotY);
      rotZTo(rotZ);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHoverElements = () => {
      const links = document.querySelectorAll('a');
      const buttons = document.querySelectorAll('button, [role="button"]');
      const largeVisuals = document.querySelectorAll('.project-card, .portal-headline, .ecosystem-tag');
      const inputs = document.querySelectorAll('input, textarea, [contenteditable="true"]');
      
      links.forEach(el => {
        el.addEventListener('mouseenter', () => setCursorState('link'));
        el.addEventListener('mouseleave', () => setCursorState('default'));
      });
      
      buttons.forEach(el => {
        el.addEventListener('mouseenter', () => setCursorState('button'));
        el.addEventListener('mouseleave', () => setCursorState('default'));
      });
      
      largeVisuals.forEach(el => {
        el.addEventListener('mouseenter', () => setCursorState('large'));
        el.addEventListener('mouseleave', () => setCursorState('default'));
      });

      inputs.forEach(el => {
        el.addEventListener('mouseenter', () => setIsVisible(false));
        el.addEventListener('mouseleave', () => setIsVisible(true));
      });
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    const timeout = setTimeout(handleHoverElements, 1000);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearTimeout(timeout);
    };
  }, [isMobile, isVisible]);

  if (isMobile) return null;

  return (
    <>
      <div 
        className={cn(
          "fixed top-0 left-0 pointer-events-none z-[99] transition-opacity duration-300 ease-out",
          !isVisible && "opacity-0"
        )}
        style={{ perspective: '800px' }} // CSS 3D perspective wrapper
      >
        <div
          ref={cursorRef} 
          className="transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center' }} 
        >
          <div className={cn(
            "relative flex items-center justify-center transition-all duration-300",
            cursorState === 'default' && "opacity-100 scale-100",
            cursorState === 'button' && "opacity-100 scale-110",
            cursorState === 'link' && "opacity-100 scale-110",
            cursorState === 'large' && "opacity-100 scale-125"
          )}>
            <PaperPlane className="w-5 h-5 -rotate-90" />
          </div>
        </div>
      </div>
    </>
  );
}
