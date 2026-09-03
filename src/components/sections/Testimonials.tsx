import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    rating: "★★★★★",
    header: "4.8 / 5 CLIENT EXPERIENCE",
    quote: "BlazeByte helped us transform a disconnected digital presence into a clearer and more structured growth system.",
    author: "Rajaguru",
    role: "Founder — Aether Labs",
    speed: 0.8,
    yOffset: 20
  },
  {
    rating: "★★★★★",
    header: "DIGITAL TRANSFORMATION",
    quote: "The process was structured, fast, and surprisingly detailed. The final experience felt significantly more premium than what we originally imagined.",
    author: "Arjun Kumar",
    role: "Founder — Nexus Commerce",
    speed: 1.2,
    yOffset: -30
  },
  {
    rating: "★★★★★",
    header: "SYSTEM ARCHITECTURE",
    quote: "They didn't just build a website. They helped us rethink how our digital system should actually work.",
    author: "Karthik Raman",
    role: "Director — Orbit Digital",
    speed: 0.9,
    yOffset: 40
  },
  {
    rating: "★★★★★",
    header: "GROWTH & SCALE",
    quote: "A rare combination of high-end design aesthetics and deep technical execution. The system they built scales flawlessly.",
    author: "Sachin Prakash",
    role: "Co-Founder — Vantage Systems",
    speed: 1.1,
    yOffset: -10
  }
];

export default function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileCheck = window.matchMedia('(max-width: 768px)');
    setIsMobile(mobileCheck.matches);
    
    // Listen for resize changes to properly update isMobile
    const handleResize = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mobileCheck.addEventListener('change', handleResize);
    
    if (!containerRef.current || mobileCheck.matches) return;
    
    const ctx = gsap.context(() => {
      // Floating scroll parallax - only on desktop
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const speed = testimonials[i].speed;
        
        gsap.to(card, {
          y: () => -100 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }, containerRef);
    
    return () => {
      ctx.revert();
      mobileCheck.removeEventListener('change', handleResize);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current || isMobile) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    gsap.to(cardsRef.current, {
      rotateY: x * 10,
      rotateX: -y * 10,
      duration: 1,
      ease: "power2.out",
      transformPerspective: 1000,
      transformOrigin: "center center"
    });
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    gsap.to(cardsRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 1,
      ease: "power2.out"
    });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full py-32 bg-[#111111] overflow-hidden flex flex-col items-center border-t border-white/5"
    >
      <div className="text-center mb-24 z-10">
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="w-1.5 h-1.5 bg-[#FF5A14] rounded-full" />
          <span className="text-[#FAF9F6]/60 text-[10px] tracking-[0.3em] font-mono font-bold uppercase">Client Signals</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-black uppercase text-[#FAF9F6]">
          Verified <span className="text-[#FAF9F6]/30">Impact.</span>
        </h2>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 z-10 perspective-[2000px]">
        {testimonials.map((t, i) => (
          <div 
            key={i}
            ref={el => { cardsRef.current[i] = el; }}
            className="p-8 md:p-12 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.12)] backdrop-blur-sm shadow-[0_30px_60px_rgba(0,0,0,0.4)] flex flex-col justify-between transition-colors duration-500 hover:bg-[rgba(255,255,255,0.06)]"
            style={{ transform: isMobile ? 'none' : `translateY(${t.yOffset}px)` }}
          >
            <div>
              <div className="flex justify-between items-start mb-8">
                <span className="text-[#FF5A14] text-sm tracking-widest">{t.rating}</span>
                <span className="text-[10px] tracking-widest font-mono text-[#FAF9F6]/40 uppercase">{t.header}</span>
              </div>
              <p className="text-lg md:text-xl text-[#FAF9F6]/90 leading-relaxed font-medium mb-12">
                "{t.quote}"
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[#FAF9F6] font-bold text-sm tracking-wide uppercase">{t.author}</span>
              <span className="text-[#FF5A14] font-mono text-[10px] tracking-widest uppercase">{t.role}</span>

            </div>
          </div>
        ))}
      </div>
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF5A14] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}
