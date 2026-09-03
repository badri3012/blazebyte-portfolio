import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { cn } from '../../utils/cn';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export default function SplitText({ text, className, delay = 0, stagger = 0.03 }: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const chars = containerRef.current.querySelectorAll('.char');
    
    gsap.fromTo(chars, 
      { yPercent: 130, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        stagger: stagger,
        ease: 'power4.out',
        delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%',
        }
      }
    );
  }, [delay]);

  return (
    <div ref={containerRef} className={cn("inline-block overflow-hidden pb-2", className)}>
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.25em] whitespace-nowrap">
          {word.split('').map((char, charIndex) => (
            <span 
              key={charIndex} 
              className="char inline-block translate-y-[130%]"
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}
