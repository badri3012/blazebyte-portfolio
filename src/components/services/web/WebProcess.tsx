import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WebProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  // SVG Elements
  const ideaDotRef = useRef<SVGCircleElement>(null);
  const structureLinesRef = useRef<SVGPathElement>(null);
  const wireframeBoxesRef = useRef<SVGRectElement[]>([]);
  const designFillsRef = useRef<SVGRectElement[]>([]);
  const devCodeRef = useRef<SVGTextElement[]>([]);
  const launchShineRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=500%',
          scrub: 1,
          pin: true,
        }
      });

      const stages = textRef.current?.querySelectorAll('.process-stage') || [];
      
      // Reset
      gsap.set(stages, { opacity: 0, y: 20 });
      gsap.set(ideaDotRef.current, { scale: 0, opacity: 0 });
      gsap.set(structureLinesRef.current, { strokeDasharray: 1000, strokeDashoffset: 1000, opacity: 0 });
      gsap.set(wireframeBoxesRef.current, { strokeDasharray: 500, strokeDashoffset: 500, opacity: 0 });
      gsap.set(designFillsRef.current, { opacity: 0 });
      gsap.set(devCodeRef.current, { opacity: 0, x: -10 });
      gsap.set(launchShineRef.current, { x: "-100%", opacity: 0 });

      // 1. IDEA
      tl.to(stages[0], { opacity: 1, y: 0, duration: 0.5 })
        .to(ideaDotRef.current, { scale: 1, opacity: 1, duration: 0.5 }, "<")
        .to(ideaDotRef.current, { scale: 1.5, repeat: 1, yoyo: true, duration: 0.5 });

      // 2. STRUCTURE
      tl.to(stages[0], { opacity: 0, y: -20, duration: 0.5 })
        .to(stages[1], { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
        .to(ideaDotRef.current, { scale: 0, opacity: 0, duration: 0.5 }, "<")
        .to(structureLinesRef.current, { strokeDashoffset: 0, opacity: 1, duration: 1 }, "<");

      // 3. WIREFRAME
      tl.to(stages[1], { opacity: 0, y: -20, duration: 0.5, delay: 0.5 })
        .to(stages[2], { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
        .to(wireframeBoxesRef.current, { strokeDashoffset: 0, opacity: 1, duration: 1, stagger: 0.2 }, "<");

      // 4. DESIGN
      tl.to(stages[2], { opacity: 0, y: -20, duration: 0.5, delay: 0.5 })
        .to(stages[3], { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
        .to(designFillsRef.current, { opacity: 1, duration: 1, stagger: 0.2 }, "<");

      // 5. DEVELOPMENT
      tl.to(stages[3], { opacity: 0, y: -20, duration: 0.5, delay: 0.5 })
        .to(stages[4], { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
        .to(devCodeRef.current, { opacity: 1, x: 0, duration: 1, stagger: 0.1 }, "<");

      // 6. LAUNCH
      tl.to(stages[4], { opacity: 0, y: -20, duration: 0.5, delay: 0.5 })
        .to(stages[5], { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
        .to(wireframeBoxesRef.current, { strokeWidth: 0, duration: 0.5 }, "<")
        .to(launchShineRef.current, { opacity: 0.5, duration: 0.1 }, "<")
        .to(launchShineRef.current, { x: "100%", duration: 1 }, "<")
        .to('.svg-container', { scale: 1.05, duration: 1 }, "<");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const addToWireframes = (el: SVGRectElement | null) => { if (el && !wireframeBoxesRef.current.includes(el)) wireframeBoxesRef.current.push(el); };
  const addToDesigns = (el: SVGRectElement | null) => { if (el && !designFillsRef.current.includes(el)) designFillsRef.current.push(el); };
  const addToDev = (el: SVGTextElement | null) => { if (el && !devCodeRef.current.includes(el)) devCodeRef.current.push(el); };

  const texts = [
    { num: "01", title: "IDEA", desc: "The conceptual seed of the digital product." },
    { num: "02", title: "STRUCTURE", desc: "Mapping the architectural logic and layout." },
    { num: "03", title: "WIREFRAME", desc: "Translating structure into interface components." },
    { num: "04", title: "DESIGN", desc: "Applying visual hierarchy and brand systems." },
    { num: "05", title: "DEVELOPMENT", desc: "Engineering the platform into reality." },
    { num: "06", title: "LAUNCH", desc: "Deploying a scalable, high-performance system." }
  ];

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-surface flex items-center justify-center overflow-hidden border-t border-background">
      
      {/* Dynamic SVG Animation Area */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none svg-container">
        <svg viewBox="0 0 800 600" className="w-full h-full max-w-4xl" preserveAspectRatio="xMidYMid meet">
          
          {/* 1. Idea Dot */}
          <circle ref={ideaDotRef} cx="400" cy="300" r="10" fill="#ff5a00" className="origin-center" />
          
          {/* 2. Structure Lines */}
          <path ref={structureLinesRef} d="M 400 100 L 400 500 M 100 300 L 700 300 M 250 100 L 250 500 M 550 100 L 550 500 M 100 150 L 700 150 M 100 450 L 700 450" stroke="#a1a1aa" strokeWidth="1" fill="none" opacity="0.3" />
          
          {/* 3 & 4. Wireframes & Design Fills */}
          <g>
            {/* Header */}
            <rect ref={addToDesigns} x="120" y="120" width="560" height="40" fill="#FAF9F6" />
            <rect ref={addToWireframes} x="120" y="120" width="560" height="40" fill="none" stroke="#111111" strokeWidth="2" />
            {/* Hero Block */}
            <rect ref={addToDesigns} x="120" y="180" width="560" height="150" fill="#FAF9F6" />
            <rect ref={addToWireframes} x="120" y="180" width="560" height="150" fill="none" stroke="#111111" strokeWidth="2" />
            {/* Feature Cards */}
            <rect ref={addToDesigns} x="120" y="350" width="170" height="120" fill="#FAF9F6" />
            <rect ref={addToWireframes} x="120" y="350" width="170" height="120" fill="none" stroke="#111111" strokeWidth="2" />
            
            <rect ref={addToDesigns} x="315" y="350" width="170" height="120" fill="#FAF9F6" />
            <rect ref={addToWireframes} x="315" y="350" width="170" height="120" fill="none" stroke="#111111" strokeWidth="2" />
            
            <rect ref={addToDesigns} x="510" y="350" width="170" height="120" fill="#FAF9F6" />
            <rect ref={addToWireframes} x="510" y="350" width="170" height="120" fill="none" stroke="#111111" strokeWidth="2" />
          </g>

          {/* 5. Development Code / Content injection */}
          <g fontFamily="JetBrains Mono" fontSize="12" fill="#52525B">
            <text ref={addToDev} x="140" y="145">{'<Nav />'}</text>
            <text ref={addToDev} x="140" y="220" fontSize="24" fill="#111111" fontWeight="bold">Digital System</text>
            <text ref={addToDev} x="140" y="245">{'const App = () => { return <Layout /> }'}</text>
            <text ref={addToDev} x="140" y="375" fontSize="10">{'// Feature 1'}</text>
            <text ref={addToDev} x="335" y="375" fontSize="10">{'// Feature 2'}</text>
            <text ref={addToDev} x="530" y="375" fontSize="10">{'// Feature 3'}</text>
          </g>

          {/* 6. Launch Shine Effect */}
          <g clipPath="url(#layout-clip)">
            <clipPath id="layout-clip">
              <rect x="120" y="120" width="560" height="350" />
            </clipPath>
            <rect ref={launchShineRef} x="120" y="120" width="200" height="350" fill="url(#shine-grad)" transform="skewX(-20)" />
          </g>
          
          <defs>
            <linearGradient id="shine-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Typography Overlay */}
      <div ref={textRef} className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-16 lg:px-32 flex flex-col items-start pointer-events-none">
        {texts.map((stage, index) => (
          <div key={index} className="absolute top-1/2 -translate-y-1/2 process-stage bg-surface/80 backdrop-blur-sm p-8 rounded-xl border border-background shadow-2xl">
            <h2 className="text-accent text-xs tracking-[0.3em] font-mono mb-4">{stage.num} / {stage.title}</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-primary mb-2">{stage.title}</h3>
            <p className="text-secondary text-sm md:text-base tracking-widest max-w-sm">{stage.desc}</p>
          </div>
        ))}
      </div>

    </section>
  );
}
