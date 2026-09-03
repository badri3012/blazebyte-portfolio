import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AetherVisuals() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Elements
  const nodesRef = useRef<SVGCircleElement[]>([]);
  const connectionsRef = useRef<SVGPathElement[]>([]);
  const schemaLinesRef = useRef<SVGTextElement[]>([]);
  
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
      gsap.set(nodesRef.current, { scale: 0, opacity: 0 });
      gsap.set(connectionsRef.current, { strokeDasharray: 500, strokeDashoffset: 500, opacity: 0 });
      gsap.set(schemaLinesRef.current, { opacity: 0, x: -20 });

      // 1. ABSTRACT SYSTEM (Nodes appear)
      tl.to(nodesRef.current, { scale: 1, opacity: 1, duration: 1, stagger: 0.1, ease: 'back.out(1.5)' });

      // 2. STRUCTURE (Connections draw)
      tl.to(connectionsRef.current, { strokeDashoffset: 0, opacity: 0.4, duration: 1.5, stagger: 0.05, ease: 'power2.inOut' });

      // 3. INTERFACE (Schema lines appear)
      tl.to(schemaLinesRef.current, { opacity: 1, x: 0, duration: 1, stagger: 0.1, ease: 'power1.out' });

      // 4. FULL SYSTEM (Pulse indexing)
      tl.to(nodesRef.current, { fill: '#ff5a00', filter: 'drop-shadow(0 0 8px rgba(255,90,0,0.5))', duration: 1, stagger: 0.1 })
        .to(connectionsRef.current, { stroke: '#ff5a00', opacity: 0.8, duration: 1 }, "<");
    });

    return () => mm.revert();
  }, []);

  const addNode = (el: SVGCircleElement | null) => { if (el && !nodesRef.current.includes(el)) nodesRef.current.push(el); };
  const addConnection = (el: SVGPathElement | null) => { if (el && !connectionsRef.current.includes(el)) connectionsRef.current.push(el); };
  const addSchema = (el: SVGTextElement | null) => { if (el && !schemaLinesRef.current.includes(el)) schemaLinesRef.current.push(el); };

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-background flex flex-col items-center justify-center overflow-hidden border-t border-surface">
      
      {/* Narrative Label */}
      <div className="absolute top-32 left-4 md:left-16 lg:left-32 z-20">
         <h3 className="text-sm font-mono tracking-widest text-secondary uppercase">Headless SEO Architecture</h3>
      </div>

      {/* SVG Canvas */}
      <div className="relative z-10 w-full max-w-5xl px-4 flex items-center justify-center">
        <svg viewBox="0 0 1000 600" className="w-full h-full border border-surface rounded-2xl bg-surface shadow-2xl">
          
          <g transform="translate(100, 100)">
            {/* Connections */}
            <path ref={addConnection} d="M 0 200 L 200 100" stroke="#a1a1aa" strokeWidth="2" fill="none" />
            <path ref={addConnection} d="M 0 200 L 200 300" stroke="#a1a1aa" strokeWidth="2" fill="none" />
            <path ref={addConnection} d="M 200 100 L 400 50" stroke="#a1a1aa" strokeWidth="2" fill="none" />
            <path ref={addConnection} d="M 200 100 L 400 150" stroke="#a1a1aa" strokeWidth="2" fill="none" />
            <path ref={addConnection} d="M 200 300 L 400 250" stroke="#a1a1aa" strokeWidth="2" fill="none" />
            <path ref={addConnection} d="M 200 300 L 400 350" stroke="#a1a1aa" strokeWidth="2" fill="none" />

            <path ref={addConnection} d="M 400 50 L 600 20" stroke="#a1a1aa" strokeWidth="2" fill="none" />
            <path ref={addConnection} d="M 400 50 L 600 80" stroke="#a1a1aa" strokeWidth="2" fill="none" />
            <path ref={addConnection} d="M 400 150 L 600 120" stroke="#a1a1aa" strokeWidth="2" fill="none" />
            <path ref={addConnection} d="M 400 150 L 600 180" stroke="#a1a1aa" strokeWidth="2" fill="none" />
            
            {/* Nodes */}
            <circle ref={addNode} cx="0" cy="200" r="16" fill="#111111" />
            <circle ref={addNode} cx="200" cy="100" r="12" fill="#111111" />
            <circle ref={addNode} cx="200" cy="300" r="12" fill="#111111" />
            
            <circle ref={addNode} cx="400" cy="50" r="8" fill="#52525B" />
            <circle ref={addNode} cx="400" cy="150" r="8" fill="#52525B" />
            <circle ref={addNode} cx="400" cy="250" r="8" fill="#52525B" />
            <circle ref={addNode} cx="400" cy="350" r="8" fill="#52525B" />

            <circle ref={addNode} cx="600" cy="20" r="6" fill="#a1a1aa" />
            <circle ref={addNode} cx="600" cy="80" r="6" fill="#a1a1aa" />
            <circle ref={addNode} cx="600" cy="120" r="6" fill="#a1a1aa" />
            <circle ref={addNode} cx="600" cy="180" r="6" fill="#a1a1aa" />
          </g>

          {/* Schema JSON-LD Display Panel */}
          <g transform="translate(650, 50)" fontFamily="monospace" fontSize="12" fill="#52525B">
            <rect x="0" y="0" width="300" height="500" rx="8" fill="#FAF9F6" stroke="#a1a1aa" strokeWidth="1" strokeOpacity="0.3" />
            <text ref={addSchema} x="20" y="40" fill="#111111" fontWeight="bold">{"<script type=\"application/ld+json\">"}</text>
            <text ref={addSchema} x="20" y="70">{"{"}</text>
            <text ref={addSchema} x="40" y="90">{"\"@context\": \"https://schema.org\","}</text>
            <text ref={addSchema} x="40" y="110">{"\"@type\": \"SoftwareApplication\","}</text>
            <text ref={addSchema} x="40" y="130">{"\"name\": \"Aether Dynamics\","}</text>
            <text ref={addSchema} x="40" y="150">{"\"operatingSystem\": \"Cloud\","}</text>
            <text ref={addSchema} x="40" y="170">{"\"applicationCategory\": \"BusinessApplication\","}</text>
            <text ref={addSchema} x="40" y="190">{"\"offers\": {"}</text>
            <text ref={addSchema} x="60" y="210">{"\"@type\": \"Offer\","}</text>
            <text ref={addSchema} x="60" y="230">{"\"price\": \"0.00\","}</text>
            <text ref={addSchema} x="60" y="250">{"\"priceCurrency\": \"USD\""}</text>
            <text ref={addSchema} x="40" y="270">{"}"}</text>
            <text ref={addSchema} x="20" y="290">{"}"}</text>
            <text ref={addSchema} x="20" y="320" fill="#111111" fontWeight="bold">{"</script>"}</text>
            
            <text ref={addSchema} x="20" y="400" fill="#ff5a00" fontWeight="bold">{"// LIGHTHOUSE SCORE"}</text>
            <text ref={addSchema} x="20" y="430">{"Performance:  100"}</text>
            <text ref={addSchema} x="20" y="450">{"Accessibility: 100"}</text>
            <text ref={addSchema} x="20" y="470">{"SEO:           100"}</text>
          </g>
        </svg>
      </div>

    </section>
  );
}
