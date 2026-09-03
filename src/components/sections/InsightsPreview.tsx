import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const insights = [
  {
    category: "WEB SYSTEMS",
    title: "BUILDING WEBSITES THAT\nACTUALLY CONVERT",
    desc: "Why modern websites should function as business systems instead of static digital brochures.",
    featured: true,
    num: "01"
  },
  {
    category: "SEARCH STRATEGY",
    title: "SEO IS NOT ABOUT\nKEYWORDS ANYMORE",
    desc: "How technical structure, content architecture, and user intent shape modern search visibility.",
    featured: false,
    num: "02"
  },
  {
    category: "GROWTH",
    title: "THE DIGITAL GROWTH\nSYSTEM",
    desc: "How websites, SEO, content, and conversion strategy work together to create measurable momentum.",
    featured: false,
    num: "03"
  },
  {
    category: "AI SYSTEMS",
    title: "WHERE AI AUTOMATION\nACTUALLY MAKES SENSE",
    desc: "A practical look at where intelligent automation can save time, improve workflows, and create business leverage.",
    featured: false,
    num: "04"
  }
];

export default function InsightsPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });

      tl.fromTo('.insight-header-reveal', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out", clearProps: "all" }
      );

      tl.fromTo('.insight-card',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out", clearProps: "all" },
        "-=0.6"
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#FAF9F6] py-32 md:py-48 px-4 md:px-16 lg:px-24 overflow-hidden border-t border-[#111111]/10">
      
      {/* Subtle Background Technical Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03] mix-blend-multiply" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="insights-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#111111" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#insights-grid)" />
      </svg>

      <div className="max-w-[1400px] mx-auto flex flex-col items-center relative z-10">
        
        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-8 insight-header-reveal">
          <span className="w-1.5 h-1.5 bg-[#FF5A00]" />
          <h2 className="text-[#111111]/60 text-[10px] tracking-[0.3em] font-mono font-bold uppercase">04 — INTELLIGENCE</h2>
        </div>
        
        {/* Heading */}
        <h3 className="insight-header-reveal text-4xl md:text-6xl lg:text-[5rem] font-display font-black tracking-[-0.04em] text-[#111111] max-w-4xl text-center mb-6 leading-[0.9] uppercase">
          THINKING BEYOND<br />THE BUILD.
        </h3>
        
        {/* Supporting Copy */}
        <p className="insight-header-reveal font-sans text-base md:text-lg text-[#111111]/70 max-w-2xl text-center mb-24 leading-relaxed">
          Practical insights on digital systems, growth strategy, search visibility, and intelligent automation.
        </p>
        
        {/* INSIGHTS GRID */}
        <div ref={gridRef} className="w-full flex flex-col lg:flex-row gap-6 mb-24">
          
          {/* Featured Insight (Left Column) */}
          <div className="w-full lg:w-1/2 flex flex-col">
             <Link to="/insights" className="insight-card group relative flex flex-col h-full bg-[#FFFFFF] border border-[#111111]/10 rounded-sm p-8 md:p-12 overflow-hidden transition-colors hover:border-[#111111]/20 shadow-[0_4px_24px_rgba(17,17,17,0.02)]">
                {/* Orange expanding line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#FF5A00] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                
                {/* Indicator */}
                <div className="flex items-center gap-3 mb-12">
                   <span className="w-2 h-2 rounded-full bg-[#FF5A00]" />
                   <span className="font-mono text-[9px] tracking-widest text-[#111111]/60 font-bold">● BLAZEBYTE INTELLIGENCE</span>
                </div>

                <div className="flex-1 flex flex-col justify-end">
                   <div className="flex justify-between items-end mb-6">
                      <span className="font-mono text-[10px] tracking-widest text-[#FF5A00] font-bold border border-[#FF5A00]/20 px-3 py-1 rounded-full">
                        {insights[0].category}
                      </span>
                      <span className="font-display font-light text-5xl text-[#111111]/10 group-hover:text-[#111111]/30 transition-colors duration-500">
                        {insights[0].num}
                      </span>
                   </div>
                   
                   <h4 className="font-display font-black text-3xl md:text-5xl text-[#111111] uppercase leading-[0.95] tracking-tight mb-6 group-hover:-translate-y-1 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]">
                     BUILDING WEBSITES THAT<br/>ACTUALLY CONVERT
                   </h4>
                   
                   <p className="font-sans text-[#111111]/70 text-sm md:text-base leading-relaxed max-w-md group-hover:-translate-y-0.5 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] delay-75">
                     {insights[0].desc}
                   </p>
                </div>
                
                {/* Arrow */}
                <div className="absolute bottom-8 md:bottom-12 right-8 md:right-12">
                   <span className="font-mono text-xl text-[#111111] group-hover:translate-x-2 transition-transform duration-300 block">→</span>
                </div>
             </Link>
          </div>

          {/* Standard Insights (Right Column Grid) */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
             {insights.slice(1).map((insight, i) => (
                <Link key={i} to="/insights" className={`insight-card group relative flex flex-col bg-[#FFFFFF] border border-[#111111]/10 rounded-sm p-6 md:p-8 overflow-hidden transition-colors hover:border-[#111111]/20 shadow-[0_4px_24px_rgba(17,17,17,0.02)] ${i === 2 ? 'md:col-span-2' : ''}`}>
                   {/* Orange expanding line */}
                   <div className="absolute top-0 left-0 w-full h-[2px] bg-[#FF5A00] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                   
                   <div className="flex justify-between items-start mb-12">
                      <span className="font-mono text-[9px] tracking-widest text-[#111111]/50 font-bold uppercase">
                        {insight.category}
                      </span>
                      <span className="font-display font-light text-3xl text-[#111111]/10 group-hover:text-[#111111]/30 transition-colors duration-500">
                        {insight.num}
                      </span>
                   </div>
                   
                   <div className="flex-1 flex flex-col justify-end">
                      <h4 className="font-display font-black text-xl md:text-2xl text-[#111111] uppercase leading-[1.0] tracking-tight mb-4 group-hover:translate-x-1 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]">
                        {insight.title}
                      </h4>
                      <p className="font-sans text-[#111111]/70 text-xs md:text-sm leading-relaxed mb-4 group-hover:translate-x-0.5 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] delay-75">
                        {insight.desc}
                      </p>
                   </div>
                   
                   {/* Arrow */}
                   <div className="mt-auto flex justify-end">
                      <span className="font-mono text-base text-[#111111] opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">→</span>
                   </div>
                </Link>
             ))}
          </div>
        </div>

        <div className="insight-header-reveal">
          <Link to="/insights">
            <MagneticButton className="px-8 py-4 border border-[#111111]/20 rounded-full text-[11px] font-bold tracking-[0.2em] text-[#111111] hover:bg-[#111111] hover:text-[#FAF9F6] transition-colors duration-300 flex items-center gap-3 group">
              EXPLORE BLAZEBYTE INTELLIGENCE <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </MagneticButton>
          </Link>
        </div>

      </div>
    </section>
  );
}
