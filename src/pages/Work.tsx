import { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';

export default function Work() {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [activeProject, setActiveProject] = useState<string | null>(null);

  // Desktop vs Mobile detection
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const filteredProjects = activeFilter === "ALL" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const filters = ["ALL", "WEB", "GROWTH", "AUTOMATION"];

  const handleInteraction = (id: string, isEnter: boolean) => {
    if (isMobile) {
      if (isEnter) {
        setActiveProject(activeProject === id ? null : id); // Toggle on tap
      }
      return;
    }
    // Desktop hover
    if (isEnter) {
      setActiveProject(id);
    } else {
      setActiveProject(null);
    }
  };

  return (
    <>
      <Helmet>
        <title>Work & Capabilities | BlazeByte Studio</title>
        <meta name="description" content="An archive of conceptual experiments and digital systems engineered by BlazeByte Studio." />
        <link rel="canonical" href="https://blazebytestudio.com/work" />
      </Helmet>

      <main className="min-h-screen bg-background text-primary pt-32 pb-32">
        <div className="max-w-7xl mx-auto px-4 md:px-16 lg:px-32">
          
          <header className="mb-24">
            <h1 className="text-sm font-mono tracking-[0.3em] text-accent mb-4 uppercase">The Digital Archive</h1>
            <h2 className="text-4xl md:text-7xl font-display font-light tracking-tight text-secondary">
              SYSTEMS & <span className="font-bold text-primary">CAPABILITIES.</span>
            </h2>
            <p className="mt-6 text-sm md:text-base font-sans tracking-wide text-secondary max-w-lg leading-relaxed">
              An archive of internal experiments, conceptual prototypes, and architectural models demonstrating our technical precision. 
              We engineer solutions; we do not just design them.
            </p>
          </header>

          {/* Sticky Filtering System */}
          <div className="sticky top-24 z-30 bg-background/90 backdrop-blur-md py-4 mb-16 border-b border-surface">
             <div className="flex flex-wrap gap-8">
               {filters.map(filter => (
                 <button
                   key={filter}
                   onClick={() => setActiveFilter(filter)}
                   className={`text-xs font-mono tracking-widest transition-colors duration-300 outline-none ${
                     activeFilter === filter 
                      ? 'text-accent font-bold' 
                      : 'text-secondary hover:text-primary'
                   }`}
                   aria-pressed={activeFilter === filter}
                 >
                   {filter}
                 </button>
               ))}
             </div>
          </div>

          {/* Project List */}
          <div className="flex flex-col border-t border-surface">
            {filteredProjects.map((project) => (
              <ProjectRow 
                key={project.id}
                project={project}
                isActive={activeProject === project.id}
                onInteract={(isEnter) => handleInteraction(project.id, isEnter)}
              />
            ))}
          </div>

        </div>
      </main>
    </>
  );
}

function ProjectRow({ project, isActive, onInteract }: { project: Project, isActive: boolean, onInteract: (enter: boolean) => void }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    
    const ctx = gsap.context(() => {
      // We use GSAP to animate height instead of CSS transition to avoid jumping/jitter
      if (isActive) {
        gsap.to(contentRef.current, { height: 'auto', duration: 0.5, ease: 'power3.out' });
        gsap.to(contentRef.current, { opacity: 1, duration: 0.3, delay: 0.2 });
        if (imageRef.current) {
          gsap.fromTo(imageRef.current, { scale: 1.1, clipPath: 'inset(0 100% 0 0)' }, { scale: 1, clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'power3.out', delay: 0.1 });
        }
      } else {
        gsap.to(contentRef.current, { opacity: 0, duration: 0.2 });
        gsap.to(contentRef.current, { height: 0, duration: 0.4, ease: 'power3.inOut', delay: 0.1 });
      }
    }, contentRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <div 
      className="group border-b border-surface"
      onMouseEnter={() => typeof window !== 'undefined' && window.innerWidth >= 768 && onInteract(true)}
      onMouseLeave={() => typeof window !== 'undefined' && window.innerWidth >= 768 && onInteract(false)}
    >
      {/* Top Level Metadata Row */}
      <div 
        className="py-8 flex flex-col md:flex-row md:items-center justify-between cursor-pointer"
        onClick={() => typeof window !== 'undefined' && window.innerWidth < 768 && onInteract(true)}
      >
        <div className="flex items-center gap-6 md:gap-12 w-full md:w-1/2">
          <span className={`font-mono tracking-widest text-sm transition-colors duration-300 ${isActive ? 'text-accent' : 'text-secondary'}`}>
            {project.id}
          </span>
          <h3 className={`text-3xl md:text-5xl font-display font-bold tracking-tight transition-transform duration-500 ease-out ${isActive ? 'translate-x-4 text-primary' : 'text-primary/70'}`}>
            {project.name}
          </h3>
        </div>

        <div className="mt-6 md:mt-0 flex items-center justify-between md:justify-end gap-8 w-full md:w-1/2 text-xs font-mono tracking-widest text-secondary">
          <div className="flex flex-col">
            <span className="mb-1 opacity-50">CATEGORY</span>
            <span className="text-primary">{project.category}</span>
          </div>
          <div className="flex flex-col">
            <span className="mb-1 opacity-50">STATUS</span>
            <span className="text-primary">{project.year}</span>
          </div>
          <div className="hidden lg:flex flex-col items-end">
            <span className="mb-1 opacity-50">TYPE</span>
            <span className="px-2 py-1 border border-text-secondary/20 rounded-full bg-surface">
              {project.type}
            </span>
          </div>
        </div>
      </div>

      {/* Expanded Content Area (Progressive Reveal) */}
      <div 
        ref={contentRef} 
        className="h-0 overflow-hidden opacity-0"
      >
        <div className="pb-12 pt-4 flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          <div className="w-full lg:w-1/3 flex flex-col justify-between gap-8">
            <div>
              <h4 className="text-xs font-mono tracking-widest text-secondary mb-4 opacity-50">SHORT DESCRIPTION</h4>
              <p className="text-sm md:text-base font-sans leading-relaxed text-primary">
                {project.overview}
              </p>
            </div>
            
            <div>
              <h4 className="text-xs font-mono tracking-widest text-secondary mb-4 opacity-50">SERVICES</h4>
              <ul className="flex flex-col gap-2 text-sm font-mono tracking-wide text-primary">
                {project.services.map(service => (
                  <li key={service}>— {service}</li>
                ))}
              </ul>
            </div>

            <Link 
              to={`/work/${project.slug}`}
              className="inline-flex items-center gap-4 px-6 py-4 bg-text-primary text-background-light font-bold text-xs tracking-widest hover:bg-accent transition-colors duration-300 w-max"
            >
              VIEW CASE STUDY →
            </Link>
          </div>

          <div className="w-full lg:w-2/3">
             <Link to={`/work/${project.slug}`} className="block overflow-hidden relative aspect-video bg-surface rounded-xl border border-background">
               <img 
                 ref={imageRef}
                 src={project.heroImage} 
                 alt={`${project.name} Preview`} 
                 className="w-full h-full object-cover origin-left"
               />
             </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
