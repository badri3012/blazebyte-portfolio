import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitText from '../ui/SplitText';

const layers = [
  { num: "01", title: "STRATEGY" },
  { num: "02", title: "DESIGN" },
  { num: "03", title: "DEVELOPMENT" },
  { num: "04", title: "MARKETING" },
  { num: "05", title: "OPTIMIZATION" }
];

export default function Engine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !layersRef.current) return;
    
    const layerElements = layersRef.current.querySelectorAll('.engine-layer');
    
    gsap.set(layerElements, { 
      y: (i) => i * -40,
      scale: (i) => 1 - i * 0.05,
      opacity: (i) => 1 - i * 0.15,
      z: (i) => i * -50
    });

    gsap.to(layerElements, {
      y: (i) => i * 80,
      scale: 1,
      opacity: 1,
      z: 0,
      stagger: 0.1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=100%',
        scrub: 1,
        pin: true,
      }
    });

  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen flex flex-col md:flex-row items-center justify-center bg-transparent overflow-hidden perspective-[1000px]">
      <div className="absolute inset-0 bg-primary/50 backdrop-blur-md -z-10"></div>
      
      <div className="absolute left-8 top-1/4 z-10 md:w-1/3">
        <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-widest mb-4 text-white">
          <SplitText text="04 — ENGINEER" />
        </h2>
        <p className="mt-4 text-secondary text-lg font-light tracking-wide max-w-sm">
          The BlazeByte Engine. A layered approach to building digital experiences that dominate.
        </p>
      </div>

      <div ref={layersRef} className="relative w-full md:w-1/2 h-[60vh] flex items-center justify-center transform-style-3d">
        {layers.map((layer) => (
          <div 
            key={layer.num}
            className="engine-layer absolute w-full max-w-lg p-8 border border-white/10 bg-surface/40 backdrop-blur-xl rounded-xl flex items-center shadow-2xl shadow-black/50"
          >
            <span className="text-accent font-display font-black text-4xl mr-6 opacity-50">{layer.num}</span>
            <span className="text-white font-display font-bold tracking-widest text-2xl">{layer.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
