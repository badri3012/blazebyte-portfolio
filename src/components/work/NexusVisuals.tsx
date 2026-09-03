import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function NexusVisuals() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Dashboard Elements
  const uiGridRef = useRef<SVGRectElement>(null);
  const dataBarsRef = useRef<SVGRectElement[]>([]);
  const lineChartRef = useRef<SVGPathElement>(null);
  const dataNodesRef = useRef<SVGCircleElement[]>([]);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%',
          scrub: 1,
          pin: true,
        }
      });

      // Reset
      gsap.set(dataBarsRef.current, { scaleY: 0, transformOrigin: 'bottom' });
      gsap.set(lineChartRef.current, { strokeDasharray: 1000, strokeDashoffset: 1000 });
      gsap.set(dataNodesRef.current, { scale: 0, opacity: 0 });

      // 1. ABSTRACT SYSTEM (Grid + Background Darkens)
      tl.to(backgroundRef.current, { backgroundColor: '#111111', duration: 1 })
        .to('.nexus-text', { color: '#f4f4f5', duration: 1 }, "<")
        .to(uiGridRef.current, { stroke: '#52525B', strokeOpacity: 0.3, duration: 1 }, "<");

      // 2. STRUCTURE (Data bars emerge)
      tl.to(dataBarsRef.current, { scaleY: 1, duration: 1, stagger: 0.05, ease: 'power3.out' });

      // 3. INTERFACE (Line chart draws)
      tl.to(lineChartRef.current, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' });

      // 4. FULL SYSTEM (Nodes pulse, Orange accents)
      tl.to(dataNodesRef.current, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(2)' })
        .to(dataNodesRef.current, { filter: 'drop-shadow(0 0 10px rgba(255,90,0,0.8))', duration: 0.5 });
    });

    return () => mm.revert();
  }, []);

  const addBar = (el: SVGRectElement | null) => { if (el && !dataBarsRef.current.includes(el)) dataBarsRef.current.push(el); };
  const addNode = (el: SVGCircleElement | null) => { if (el && !dataNodesRef.current.includes(el)) dataNodesRef.current.push(el); };

  return (
    <section ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      
      {/* Dynamic Background Transition */}
      <div ref={backgroundRef} className="absolute inset-0 w-full h-full bg-background transition-colors duration-300 z-0" />

      {/* Narrative Label */}
      <div className="absolute top-32 left-4 md:left-16 lg:left-32 z-20">
         <h3 className="nexus-text text-sm font-mono tracking-widest text-primary uppercase">Financial Dashboard Rendering</h3>
      </div>

      {/* SVG Dashboard Canvas */}
      <div className="relative z-10 w-full max-w-5xl px-4 flex items-center justify-center">
        <svg viewBox="0 0 1000 600" className="w-full h-full border border-text-secondary/20 rounded-2xl bg-surface-dark/50 backdrop-blur-sm shadow-2xl">
          
          {/* Base Grid */}
          <rect ref={uiGridRef} x="0" y="0" width="1000" height="600" fill="none" stroke="#a1a1aa" strokeWidth="1" strokeOpacity="0.1" />
          <line x1="100" y1="0" x2="100" y2="600" stroke="#52525B" strokeWidth="0.5" strokeOpacity="0.2" />
          <line x1="0" y1="100" x2="1000" y2="100" stroke="#52525B" strokeWidth="0.5" strokeOpacity="0.2" />
          <line x1="0" y1="500" x2="1000" y2="500" stroke="#52525B" strokeWidth="0.5" strokeOpacity="0.2" />

          {/* UI Elements */}
          <rect x="20" y="20" width="150" height="30" rx="4" fill="#52525B" opacity="0.3" />
          <rect x="190" y="20" width="80" height="30" rx="4" fill="#52525B" opacity="0.3" />
          
          <rect x="850" y="20" width="130" height="30" rx="15" fill="#ff5a00" opacity="0.9" />

          <text x="30" y="40" fill="#f4f4f5" fontSize="12" fontFamily="monospace">NEXUS_CORE v2.4</text>
          <text x="880" y="40" fill="#ffffff" fontSize="12" fontFamily="monospace" fontWeight="bold">EXECUTE</text>

          {/* Data Bars */}
          <g transform="translate(150, 480)">
            {Array.from({ length: 30 }).map((_, i) => {
              const height = 50 + Math.random() * 200;
              return (
                <rect 
                  key={i} 
                  ref={addBar} 
                  x={i * 25} 
                  y={-height} 
                  width="15" 
                  height={height} 
                  fill="#52525B" 
                  opacity={0.4} 
                  rx="2"
                />
              );
            })}
          </g>

          {/* Line Chart */}
          <g transform="translate(150, 480)">
             <path 
               ref={lineChartRef}
               d="M 5 -100 C 50 -150, 100 -50, 200 -200 S 350 -100, 400 -300 S 550 -150, 600 -400 S 700 -200, 750 -450" 
               stroke="#ff5a00" 
               strokeWidth="4" 
               fill="none" 
               strokeLinecap="round"
             />
             
             {/* Data Nodes on Line Chart */}
             <circle ref={addNode} cx="5" cy="-100" r="6" fill="#ff5a00" />
             <circle ref={addNode} cx="200" cy="-200" r="6" fill="#ff5a00" />
             <circle ref={addNode} cx="400" cy="-300" r="6" fill="#ff5a00" />
             <circle ref={addNode} cx="600" cy="-400" r="6" fill="#ff5a00" />
             <circle ref={addNode} cx="750" cy="-450" r="8" fill="#ffffff" stroke="#ff5a00" strokeWidth="3" />
          </g>
          
          {/* Side Panel Metrics */}
          <rect x="800" y="150" width="150" height="80" rx="4" fill="#52525B" opacity="0.2" />
          <text x="815" y="180" fill="#a1a1aa" fontSize="10" fontFamily="monospace">TRANSACTION VOL</text>
          <text x="815" y="210" fill="#f4f4f5" fontSize="24" fontFamily="sans-serif" fontWeight="bold">94,302</text>

          <rect x="800" y="250" width="150" height="80" rx="4" fill="#52525B" opacity="0.2" />
          <text x="815" y="280" fill="#a1a1aa" fontSize="10" fontFamily="monospace">LATENCY (ms)</text>
          <text x="815" y="310" fill="#ff5a00" fontSize="24" fontFamily="sans-serif" fontWeight="bold">12.4</text>
        </svg>
      </div>

    </section>
  );
}
