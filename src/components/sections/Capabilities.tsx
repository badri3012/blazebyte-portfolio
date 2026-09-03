import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Capabilities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

  const categories = [
    {
      title: "WEB",
      items: ["React & Next.js", "Three.js / WebGL", "Headless CMS", "TypeScript", "Tailwind CSS", "Framer Motion"]
    },
    {
      title: "GROWTH",
      items: ["Technical SEO", "Content Architecture", "Conversion Optimization", "Performance Auditing", "Analytics Integration", "Schema Markup"]
    },
    {
      title: "AUTOMATION",
      items: ["Custom API Integration", "Workflow Automation", "CRM Architecture", "LLM Integration", "Data Pipelines", "Intelligent Routing"]
    }
  ];

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      
      gsap.fromTo(headlineRef.current, 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%"
          }
        }
      );

      columnRefs.current.forEach((col, i) => {
        if (!col) return;
        const items = col.querySelectorAll('.cap-item');
        
        gsap.fromTo(col, 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%"
            }
          }
        );

        gsap.fromTo(items, 
          { opacity: 0, x: -10 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.1,
            delay: i * 0.2 + 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%"
            }
          }
        );
      });
      
      // Exit Parallax for Handoff
      gsap.to(containerRef.current, {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "bottom top",
          end: "+=50%",
          scrub: true,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-transparent py-32 px-6 md:px-16 lg:px-24 border-t border-[#111111]/10">
      <div className="max-w-[1400px] mx-auto">
        
        <div ref={headlineRef} className="mb-24 md:w-2/3 lg:w-1/2">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-1.5 h-1.5 bg-[#FF5A00]" />
            <h2 className="text-[#111111] text-[10px] tracking-[0.3em] font-mono font-bold uppercase">04 — Technology Stack</h2>
          </div>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-display font-light tracking-[-0.02em] text-[#111111]/40 leading-tight">
            We use technology as <span className="font-black text-[#111111]">infrastructure</span>, not decoration.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 border-t border-[#111111]/10 pt-16 md:pt-24">
          {categories.map((cat, i) => (
            <div key={i} ref={(el) => { columnRefs.current[i] = el; }} className="flex flex-col">
              <h4 className="text-2xl font-display font-black tracking-[-0.02em] text-[#111111] mb-10">{cat.title}</h4>
              <div className="flex flex-col gap-5">
                {cat.items.map((item, j) => (
                  <div key={j} className="cap-item group flex items-center gap-4 cursor-default">
                    <span className="w-4 h-[1px] bg-[#111111]/20 group-hover:bg-[#FF5A00] group-hover:w-6 transition-all duration-300 ease-out" />
                    <span className="text-[#111111]/70 font-mono text-xs md:text-sm tracking-[0.1em] group-hover:text-[#111111] group-hover:translate-x-2 transition-all duration-300 ease-out">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
