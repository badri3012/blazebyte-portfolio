import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectButton from '../components/ui/ProjectButton';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px)", () => {
      // 1. Hero Typographic Masking
      const heroLines = document.querySelectorAll('.hero-mask-text');
      gsap.fromTo(heroLines, 
        { clipPath: 'inset(100% 0 0 0)' }, 
        { clipPath: 'inset(0% 0 0 0)', duration: 1, stagger: 0.1, ease: 'power4.out' }
      );

      // 2. The Problem Transformation (Structural Line Draw)
      const problemSteps = document.querySelectorAll('.problem-step');
      gsap.fromTo(problemSteps,
        { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' },
        { 
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', 
          stagger: 0.3,
          duration: 1,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: '.problem-section',
            start: 'top 60%',
            end: 'top 20%',
            scrub: true
          }
        }
      );
      
      // 3. Editorial reveals for text blocks
      const textBlocks = document.querySelectorAll('.reveal-text');
      textBlocks.forEach(block => {
        gsap.fromTo(block, 
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>About Us & Engineering Philosophy | BlazeByte Studio</title>
        <meta name="description" content="We are a Creative Technology Studio. We engineer systems for modern business across web, SEO, digital growth, and AI automation." />
        <link rel="canonical" href="https://blazebytestudio.com/about" />
      </Helmet>

      <main className="w-full min-h-screen bg-background text-primary">
        
        {/* 01 — OPENING STATEMENT */}
        <header className="px-4 md:px-16 lg:px-32 max-w-7xl mx-auto pt-48 pb-32">
          <h1 className="text-sm font-mono tracking-[0.3em] text-accent mb-8 uppercase overflow-hidden">
            <span className="block hero-mask-text">CREATIVE TECHNOLOGY STUDIO</span>
          </h1>
          
          <div className="text-4xl md:text-7xl lg:text-[6vw] font-display font-light leading-[1.1] tracking-tight mb-16 uppercase">
            <div className="overflow-hidden"><span className="block hero-mask-text">We engineer systems</span></div>
            <div className="overflow-hidden"><span className="block hero-mask-text font-bold">for modern business.</span></div>
          </div>
          
          <div className="flex flex-wrap gap-4 md:gap-8 overflow-hidden">
            {['WEB', 'DIGITAL GROWTH', 'SEO', 'AI AUTOMATION'].map((discipline, i) => (
              <span key={i} className="hero-mask-text text-xs md:text-sm font-mono tracking-widest text-secondary border border-surface px-4 py-2 rounded-full">
                {discipline}
              </span>
            ))}
          </div>
        </header>

        {/* 02 — THE PROBLEM WITH DIGITAL PROJECTS */}
        <section className="problem-section py-32 px-4 md:px-16 lg:px-32 max-w-7xl mx-auto border-t border-surface">
           <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
              <div className="w-full lg:w-1/3">
                 <h2 className="text-accent text-xs tracking-[0.3em] font-mono mb-6 uppercase">The Digital Disconnect</h2>
              </div>
              <div className="w-full lg:w-2/3 flex flex-col gap-12">
                 <h3 className="reveal-text text-3xl md:text-5xl font-display font-light leading-tight">
                   Most digital projects fail because they begin with visuals and technology <span className="font-bold">before understanding the business problem.</span>
                 </h3>
                 
                 <div className="flex flex-col md:flex-row gap-4 md:gap-8 font-mono text-xs tracking-widest text-secondary">
                    <div className="problem-step flex flex-col gap-2">
                       <span className="text-accent">01. PROBLEM</span>
                       <span>Identify friction.</span>
                    </div>
                    <div className="problem-step hidden md:block text-surface-light">→</div>
                    <div className="problem-step flex flex-col gap-2">
                       <span className="text-primary">02. UNDERSTANDING</span>
                       <span>Map the architecture.</span>
                    </div>
                    <div className="problem-step hidden md:block text-surface-light">→</div>
                    <div className="problem-step flex flex-col gap-2">
                       <span className="text-primary">03. SYSTEM</span>
                       <span>Design the solution.</span>
                    </div>
                    <div className="problem-step hidden md:block text-surface-light">→</div>
                    <div className="problem-step flex flex-col gap-2">
                       <span className="text-primary">04. EXECUTION</span>
                       <span>Build and scale.</span>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* 03 — HOW BLAZEBYTE THINKS */}
        <section className="py-32 px-4 md:px-16 lg:px-32 bg-surface border-t border-background">
           <div className="max-w-7xl mx-auto">
              <h2 className="text-accent text-xs tracking-[0.3em] font-mono mb-16 uppercase">How We Think</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
                 {[
                   { step: "DISCOVER", text: "We audit current operations, search viability, and technical debt." },
                   { step: "STRATEGIZE", text: "We align digital objectives with measurable business outcomes." },
                   { step: "DESIGN", text: "We map user journeys, interfaces, and underlying system logic." },
                   { step: "BUILD", text: "We engineer performant, accessible, and scalable architectures." },
                   { step: "OPTIMIZE", text: "We refine visibility, conversion velocity, and infrastructure health." },
                   { step: "AUTOMATE", text: "We identify repetitive friction and build intelligent routing systems." }
                 ].map((item, i) => (
                   <div key={i} className="reveal-text flex flex-col gap-4 border-t border-background pt-6">
                      <h3 className="text-xl font-display font-bold tracking-widest">{item.step}</h3>
                      <p className="text-sm font-sans text-secondary leading-relaxed">{item.text}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* 04 — ENGINEERING STANDARDS */}
        <section className="py-32 px-4 md:px-16 lg:px-32 max-w-7xl mx-auto border-t border-surface">
           <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
              <div className="w-full lg:w-1/3">
                 <h2 className="text-accent text-xs tracking-[0.3em] font-mono mb-6 uppercase">Engineering Standards</h2>
                 <p className="text-sm font-sans text-secondary max-w-xs leading-relaxed">
                   A beautiful interface is irrelevant if the underlying architecture fails. We enforce strict technical discipline across every deployment.
                 </p>
              </div>
              
              <div className="w-full lg:w-2/3 flex flex-col">
                 {[
                   { title: "PERFORMANCE", why: "Slow systems kill conversion.", how: "We prioritize edge-rendering, strict asset optimization, and minimal main-thread blocking." },
                   { title: "ACCESSIBILITY", why: "Digital exclusion is a business failure.", how: "We enforce WCAG compliance, semantic HTML, and rigorous keyboard navigation testing." },
                   { title: "SEO", why: "Invisible systems generate zero ROI.", how: "We implement dynamic JSON-LD schemas, canonical routing, and optimal crawl budgets." },
                   { title: "SCALABILITY", why: "Systems must survive growth.", how: "We architect modular, decoupled pipelines that scale independently." },
                   { title: "SECURITY", why: "Data integrity is non-negotiable.", how: "We employ strict validation, secure headers, and idempotent API logic." },
                   { title: "MAINTAINABILITY", why: "Technical debt compounds rapidly.", how: "We enforce TypeScript strictness, automated linting, and comprehensive component documentation." }
                 ].map((standard, i) => (
                   <div key={i} className="reveal-text group border-b border-surface py-8 last:border-0 hover:border-accent transition-colors duration-500">
                      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16">
                         <h3 className="w-full md:w-1/3 text-lg font-mono tracking-widest font-bold group-hover:text-accent transition-colors">
                           {standard.title}
                         </h3>
                         <div className="w-full md:w-2/3 flex flex-col gap-2 text-sm">
                            <p className="font-sans text-secondary"><strong className="text-primary font-bold">Why it matters:</strong> {standard.why}</p>
                            <p className="font-sans text-secondary"><strong className="text-primary font-bold">How we apply it:</strong> {standard.how}</p>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* 05 — HOW WE ENGAGE */}
        <section className="py-32 px-4 md:px-16 lg:px-32 bg-surface border-t border-background">
           <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
              <h2 className="text-accent text-xs tracking-[0.3em] font-mono mb-16 uppercase">The Client Journey</h2>
              
              <div className="flex flex-col md:flex-row flex-wrap justify-center gap-8 w-full max-w-5xl">
                 {[
                   "DISCOVERY", "SCOPE", "STRATEGY", "BUILD", "TEST", "LAUNCH", "OPTIMIZE"
                 ].map((step, i) => (
                   <div key={i} className="reveal-text flex items-center gap-4">
                      <span className="text-sm font-mono tracking-widest">{step}</span>
                      {i < 6 && <span className="hidden md:block text-accent">→</span>}
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* 06 — CREDIBILITY PRINCIPLE (Deep Graphite) */}
        <section className="py-48 px-4 md:px-16 lg:px-32 bg-primary text-background border-t border-background">
           <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
              <h2 className="reveal-text text-3xl md:text-6xl font-display font-light leading-tight mb-12 max-w-4xl">
                 WE DO NOT RELY ON <span className="font-bold">FABRICATED LOGOS, FAKE METRICS, OR GUARANTEED OUTCOMES.</span>
              </h2>
              
              <p className="reveal-text text-lg md:text-xl font-sans text-secondary max-w-2xl leading-relaxed mb-16">
                 We demonstrate capability through transparent process, technical discipline, and the quality of our execution. We are engineers, not illusionists.
              </p>
              
              <div className="flex gap-6 z-10 w-full sm:w-auto mt-8 sm:mt-0">
                 <Link to="/work" className="px-8 py-4 bg-primary text-background font-bold font-mono text-xs tracking-widest hover:bg-accent hover:text-primary transition-colors duration-300 flex items-center justify-center">
                    VIEW ARCHIVE
                 </Link>
                 <ProjectButton theme="light" />
               </div>
           </div>
        </section>

      </main>
    </>
  );
}
