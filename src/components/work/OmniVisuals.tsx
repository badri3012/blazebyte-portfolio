import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function OmniVisuals() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Elements
  const signalRef = useRef<SVGCircleElement>(null);
  const gatesRef = useRef<SVGRectElement[]>([]);
  const routingLinesRef = useRef<SVGPathElement[]>([]);
  const processingNodesRef = useRef<SVGRectElement[]>([]);
  
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
      gsap.set(signalRef.current, { scale: 0, opacity: 0, x: -100 });
      gsap.set(gatesRef.current, { opacity: 0.1 });
      gsap.set(routingLinesRef.current, { strokeDasharray: 500, strokeDashoffset: 500, opacity: 0 });
      gsap.set(processingNodesRef.current, { scaleX: 0, transformOrigin: 'left', opacity: 0 });

      // 1. ABSTRACT SYSTEM (Signal entry)
      tl.to(signalRef.current, { scale: 1, opacity: 1, duration: 0.5 })
        .to(signalRef.current, { x: 0, duration: 1, ease: 'power1.inOut' });

      // 2. STRUCTURE (Logic Gates Activate)
      tl.to(gatesRef.current, { opacity: 0.8, stroke: '#f4f4f5', duration: 1, stagger: 0.2, ease: 'power2.inOut' })
        .to(routingLinesRef.current, { strokeDashoffset: 0, opacity: 0.5, duration: 1.5, stagger: 0.1 }, "<");

      // 3. INTERFACE (Processing Execution)
      tl.to(processingNodesRef.current, { scaleX: 1, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' });

      // 4. FULL SYSTEM (Data resolution & Blaze Orange active states)
      tl.to(signalRef.current, { opacity: 0, duration: 0.2 })
        .to(gatesRef.current[2], { fill: '#ff5a00', filter: 'drop-shadow(0 0 10px rgba(255,90,0,0.8))', duration: 0.5 })
        .to(routingLinesRef.current.slice(4), { stroke: '#ff5a00', opacity: 1, duration: 0.5 }, "<")
        .to(processingNodesRef.current[1], { fill: '#ff5a00', filter: 'drop-shadow(0 0 10px rgba(255,90,0,0.8))', duration: 0.5 }, "+=0.2");
    });

    return () => mm.revert();
  }, []);

  const addGate = (el: SVGRectElement | null) => { if (el && !gatesRef.current.includes(el)) gatesRef.current.push(el); };
  const addLine = (el: SVGPathElement | null) => { if (el && !routingLinesRef.current.includes(el)) routingLinesRef.current.push(el); };
  const addNode = (el: SVGRectElement | null) => { if (el && !processingNodesRef.current.includes(el)) processingNodesRef.current.push(el); };

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-primary flex flex-col items-center justify-center overflow-hidden border-t border-surface-dark">
      
      {/* Narrative Label */}
      <div className="absolute top-32 left-4 md:left-16 lg:left-32 z-20">
         <h3 className="text-sm font-mono tracking-widest text-background uppercase">AI Routing Pipeline Visualization</h3>
      </div>

      {/* SVG Canvas */}
      <div className="relative z-10 w-full max-w-5xl px-4 flex items-center justify-center">
        <svg viewBox="0 0 1000 600" className="w-full h-full border border-surface-dark rounded-2xl bg-surface-dark shadow-2xl">
          
          <g transform="translate(100, 300)">
            
            {/* INBOUND SIGNAL */}
            <circle ref={signalRef} cx="0" cy="0" r="12" fill="#ff5a00" filter="drop-shadow(0 0 8px rgba(255,90,0,1))" />
            <path ref={addLine} d="M 12 0 L 150 0" stroke="#52525B" strokeWidth="2" fill="none" />

            {/* GATE 1: Parsing */}
            <rect ref={addGate} x="150" y="-40" width="80" height="80" rx="8" fill="#111111" stroke="#52525B" strokeWidth="2" />
            <text x="190" y="5" fill="#a1a1aa" fontSize="10" fontFamily="monospace" textAnchor="middle">PARSE</text>
            
            <path ref={addLine} d="M 230 -20 L 300 -100" stroke="#52525B" strokeWidth="2" fill="none" />
            <path ref={addLine} d="M 230 0 L 300 0" stroke="#52525B" strokeWidth="2" fill="none" />
            <path ref={addLine} d="M 230 20 L 300 100" stroke="#52525B" strokeWidth="2" fill="none" />

            {/* GATE 2, 3, 4: Classification */}
            <rect ref={addGate} x="300" y="-120" width="100" height="40" rx="4" fill="#111111" stroke="#52525B" strokeWidth="2" />
            <text x="350" y="-95" fill="#a1a1aa" fontSize="10" fontFamily="monospace" textAnchor="middle">BILLING</text>
            
            <rect ref={addGate} x="300" y="-20" width="100" height="40" rx="4" fill="#111111" stroke="#52525B" strokeWidth="2" />
            <text x="350" y="5" fill="#a1a1aa" fontSize="10" fontFamily="monospace" textAnchor="middle">SUPPORT</text>
            
            <rect ref={addGate} x="300" y="80" width="100" height="40" rx="4" fill="#111111" stroke="#52525B" strokeWidth="2" />
            <text x="350" y="105" fill="#a1a1aa" fontSize="10" fontFamily="monospace" textAnchor="middle">SALES</text>

            {/* Support Execution Path (The one that lights up) */}
            <path ref={addLine} d="M 400 0 L 550 0" stroke="#52525B" strokeWidth="2" fill="none" />
            <path ref={addLine} d="M 550 0 C 600 0, 600 -100, 650 -100" stroke="#52525B" strokeWidth="2" fill="none" />
            <path ref={addLine} d="M 550 0 C 600 0, 600 100, 650 100" stroke="#52525B" strokeWidth="2" fill="none" />

            {/* Processing Execution Nodes */}
            <rect ref={addNode} x="650" y="-120" width="150" height="40" rx="4" fill="#52525B" />
            <text x="725" y="-95" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle">DRAFT_RESPONSE</text>

            <rect ref={addNode} x="650" y="80" width="150" height="40" rx="4" fill="#52525B" />
            <text x="725" y="105" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle">NOTIFY_SLACK</text>
          </g>

        </svg>
      </div>

    </section>
  );
}
