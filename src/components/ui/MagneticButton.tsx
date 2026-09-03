import { useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  as?: 'button' | 'div';
}

export default function MagneticButton({ children, className, onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Subtle, highly constrained magnetic pull (engineered, not playful)
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const MotionComponent = motion.div; // We keep div as wrapper for the magnetic logic

  return (
    <MotionComponent
      ref={ref}
      onMouseMove={handleMouse}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
      className={cn(
        "relative flex items-center justify-center cursor-pointer group overflow-hidden border border-secondary/20",
        className
      )}
      data-cursor="cta"
    >
      {/* Directional Fill Background */}
      <div 
        className="absolute inset-0 bg-primary z-0 transition-transform duration-500 ease-[0.22,1,0.36,1]"
        style={{
          transformOrigin: isHovered ? 'left' : 'right',
          transform: isHovered ? 'scaleX(1)' : 'scaleX(0)'
        }}
      />
      
      {/* The Blaze Signal Sweep */}
      <div 
        className="absolute top-0 left-0 bottom-0 w-1 bg-accent z-0 transition-all duration-700 ease-[0.22,1,0.36,1]"
        style={{
          transform: isHovered ? 'translateX(100vw)' : 'translateX(-10px)',
          opacity: isHovered ? 1 : 0
        }}
      />

      {/* Content wrapper to invert text color based on background fill */}
      <div className="relative z-10 w-full h-full flex items-center justify-center transition-colors duration-300 group-hover:text-background font-mono tracking-widest text-xs font-bold uppercase">
        {children}
      </div>
    </MotionComponent>
  );
}
