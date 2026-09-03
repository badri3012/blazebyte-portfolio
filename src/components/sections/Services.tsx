import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import { Link } from 'react-router-dom';

const services = [
  { name: "01 WEB DEVELOPMENT", path: "/services/web-development" },
  { name: "02 DIGITAL MARKETING", path: "/services/digital-marketing" },
  { name: "03 TECHNICAL SEO", path: "/services/seo" },
  { name: "04 AI AUTOMATION", path: "/services/ai-automation" }
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      textRefs.current.forEach((text, i) => {
        if (!text) return;
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: `${(i / services.length) * 100}% top`,
            end: `${((i + 1) / services.length) * 100}% top`,
            scrub: true
          }
        });

        tl.fromTo(text, 
          { scale: 0.5, opacity: 0, filter: 'blur(10px)', pointerEvents: 'none' },
          { scale: 1, opacity: 1, filter: 'blur(0px)', pointerEvents: 'auto', duration: 0.4, ease: "power1.out" }
        ).to(text,
          { scale: 3, opacity: 0, filter: 'blur(20px)', pointerEvents: 'none', duration: 0.6, ease: "power1.in" }
        );
      });
    });
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="services-section" ref={containerRef} className="relative w-full h-[400vh]">
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
        {services.map((service, i) => (
          <Link 
            key={i}
            to={service.path}
            ref={(el) => { textRefs.current[i] = el; }}
            className="absolute text-4xl md:text-7xl font-display font-black uppercase tracking-widest text-center px-4 mix-blend-difference drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] text-primary hover:text-accent transition-colors duration-300 z-10"
            style={{ opacity: 0, pointerEvents: 'none' }}
          >
            {service.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
