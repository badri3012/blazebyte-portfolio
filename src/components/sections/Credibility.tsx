import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Credibility() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Entrance animation for tags
      const tags = gsap.utils.toArray('.ecosystem-tag');
      gsap.fromTo(tags, 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.05, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%"
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#111111] py-32 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-white/5">
      <div className="max-w-[1400px] mx-auto flex flex-col items-center z-10 relative">
        <div className="flex items-center gap-4 mb-8">
          <span className="w-1.5 h-1.5 bg-[#FF5A14]" />
          <h2 className="text-[#FAF9F6]/60 text-[10px] tracking-[0.3em] font-mono font-bold uppercase">Digital Ecosystem</h2>
        </div>
        
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight text-[#FAF9F6] text-center mb-24 max-w-4xl leading-tight">
          BUILT FOR AMBITIOUS <span className="text-[#FAF9F6]/30">BUSINESSES.</span>
        </h3>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          
          {/* Client Work */}
          <div className="flex flex-col items-start border-l border-white/10 pl-8">
            <h4 className="text-[#FAF9F6] font-mono text-[10px] tracking-[0.2em] uppercase mb-8 font-bold">Client Work</h4>
            <div className="flex flex-wrap gap-4">
              {['STARTUPS', 'LOCAL BUSINESSES', 'E-COMMERCE', 'HOSPITALITY', 'SERVICE BUSINESSES', 'CREATIVE BRANDS', 'DIGITAL PRODUCTS'].map(tag => (
                <span key={tag} className="ecosystem-tag px-4 py-2 border border-white/10 rounded-full text-xs font-mono tracking-widest text-[#FAF9F6]/70 uppercase bg-[rgba(255,255,255,0.02)] backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Technology Ecosystem */}
          <div className="flex flex-col items-start border-l border-[#FF5A14]/20 pl-8">
            <h4 className="text-[#FF5A14] font-mono text-[10px] tracking-[0.2em] uppercase mb-8 font-bold">Platform / Technology</h4>
            <div className="flex flex-wrap gap-4">
              {['WEB', 'SEO', 'AUTOMATION', 'ANALYTICS', 'AI SYSTEMS', 'PAYMENT SYSTEMS', 'CLOUD INFRASTRUCTURE'].map(tag => (
                <span key={tag} className="ecosystem-tag px-4 py-2 border border-[#FF5A14]/20 rounded-full text-xs font-mono tracking-widest text-[#FAF9F6] uppercase bg-[#FF5A14]/5 backdrop-blur-sm shadow-[0_0_15px_rgba(255,90,20,0.1)]">
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
