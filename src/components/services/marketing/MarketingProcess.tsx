import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MarketingProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const darkEnvironmentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  const particlesRef = useRef<SVGCircleElement[]>([]);
  const pathsRef = useRef<SVGPathElement[]>([]);
  const conversionNodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%',
          scrub: 1,
          pin: true,
        }
      });

      const stages = textRef.current?.querySelectorAll('.process-stage') || [];
      
      // Reset
      gsap.set(stages, { opacity: 0, y: 20 });
      gsap.set(darkEnvironmentRef.current, { clipPath: 'circle(0% at 50% 50%)' });
      gsap.set(particlesRef.current, { 
        x: () => (Math.random() - 0.5) * 800, 
        y: () => (Math.random() - 0.5) * 600,
        opacity: 0,
        scale: 0.5
      });
      gsap.set(pathsRef.current, { strokeDasharray: 500, strokeDashoffset: 500, opacity: 0 });
      gsap.set(conversionNodeRef.current, { scale: 0, opacity: 0 });

      // Environment Dark Reveal
      tl.to(darkEnvironmentRef.current, { clipPath: 'circle(150% at 50% 50%)', duration: 1, ease: "power2.inOut" });

      // 1. ATTENTION (Wide particle field)
      tl.to(stages[0], { opacity: 1, y: 0, duration: 0.5 }, "-=0.5")
        .to(particlesRef.current, { opacity: 0.3, scale: 1, duration: 1 }, "<");

      // 2. AUDIENCE (Grouped signals)
      tl.to(stages[0], { opacity: 0, y: -20, duration: 0.5, delay: 0.5 })
        .to(stages[1], { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
        .to(particlesRef.current, { 
          x: () => (Math.random() - 0.5) * 300, 
          y: () => (Math.random() - 0.5) * 200, 
          opacity: 0.6,
          fill: '#ff5a00',
          duration: 1, 
          ease: "power3.inOut" 
        }, "<");

      // 3. ENGAGEMENT (Interacting paths)
      tl.to(stages[1], { opacity: 0, y: -20, duration: 0.5, delay: 0.5 })
        .to(stages[2], { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
        .to(pathsRef.current, { strokeDashoffset: 0, opacity: 0.5, duration: 1, stagger: 0.1 }, "<")
        .to(particlesRef.current, { opacity: 0.1, duration: 1 }, "<");

      // 4. LEADS (Converging vectors)
      tl.to(stages[2], { opacity: 0, y: -20, duration: 0.5, delay: 0.5 })
        .to(stages[3], { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
        .to(pathsRef.current, { 
          strokeDashoffset: -500, 
          opacity: 0.1, 
          duration: 1, 
          ease: "power2.in" 
        }, "<");

      // 5. CONVERSION (Solid momentum)
      tl.to(stages[3], { opacity: 0, y: -20, duration: 0.5, delay: 0.5 })
        .to(stages[4], { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
        .to(conversionNodeRef.current, { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.5)" }, "<")
        .to(conversionNodeRef.current, { boxShadow: '0 0 30px rgba(255,90,0,0.5)', duration: 0.5 }, "+=0.2");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const addParticle = (el: SVGCircleElement | null) => { if (el && !particlesRef.current.includes(el)) particlesRef.current.push(el); };
  const addPath = (el: SVGPathElement | null) => { if (el && !pathsRef.current.includes(el)) pathsRef.current.push(el); };

  const texts = [
    { num: "01", title: "ATTENTION", desc: "A broad field of potential market signals." },
    { num: "02", title: "AUDIENCE", desc: "Grouping intent into targeted, qualified segments." },
    { num: "03", title: "ENGAGEMENT", desc: "Establishing interaction pathways with the brand." },
    { num: "04", title: "LEADS", desc: "Vectoring interest toward the conversion goal." },
    { num: "05", title: "CONVERSION", desc: "Solidifying momentum into business outcomes." }
  ];

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-transparent flex items-center justify-center overflow-hidden border-t border-surface">
      
      {/* Light Environment Mask Reveal */}
      <div ref={darkEnvironmentRef} className="absolute inset-0 w-full h-full bg-surface z-0" />

      {/* Dynamic SVG Animation Area */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <svg viewBox="0 0 800 600" className="w-full h-full max-w-4xl" preserveAspectRatio="xMidYMid meet">
          
          <g transform="translate(400, 300)">
            {/* Particles */}
            {Array.from({ length: 40 }).map((_, i) => (
               <circle key={i} ref={addParticle} r="3" fill="#111111" />
            ))}

            {/* Paths (Engagement vectors) */}
            <path ref={addPath} d="M -300 -200 C -100 -50, 100 -100, 300 0" stroke="#ff5a00" strokeWidth="2" fill="none" />
            <path ref={addPath} d="M -200 200 C 0 100, 50 150, 200 -50" stroke="#ff5a00" strokeWidth="2" fill="none" />
            <path ref={addPath} d="M -350 0 C -150 50, 0 -150, 250 100" stroke="#ff5a00" strokeWidth="2" fill="none" />
            <path ref={addPath} d="M 0 -250 C 50 -100, -100 100, 100 250" stroke="#ff5a00" strokeWidth="2" fill="none" />
          </g>

        </svg>

        {/* CSS Conversion Node (HTML overlay for glow effects) */}
        <div 
           ref={conversionNodeRef} 
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent rounded-lg flex items-center justify-center"
        >
           <span className="text-white font-mono tracking-widest text-xs font-bold">OUTCOME</span>
        </div>
      </div>

      {/* Typography Overlay */}
      <div ref={textRef} className="relative z-20 w-full max-w-7xl mx-auto px-4 md:px-16 lg:px-32 flex flex-col items-start pointer-events-none">
        {texts.map((stage, index) => (
          <div key={index} className="absolute top-1/2 -translate-y-1/2 process-stage bg-background/90 backdrop-blur-sm p-8 rounded-xl border border-surface shadow-2xl">
            <h2 className="text-accent text-xs tracking-[0.3em] font-mono mb-4">{stage.num} / {stage.title}</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-primary mb-2">{stage.title}</h3>
            <p className="text-secondary text-sm md:text-base tracking-widest max-w-sm">{stage.desc}</p>
          </div>
        ))}
      </div>

    </section>
  );
}
