import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link, Navigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import NexusVisuals from '../components/work/NexusVisuals';
import AetherVisuals from '../components/work/AetherVisuals';
import OmniVisuals from '../components/work/OmniVisuals';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetail() {
  const { projectId } = useParams();
  const narrativeRef = useRef<HTMLDivElement>(null);
  
  // Find project
  const project = projects.find(p => p.slug === projectId);
  
  if (!project) {
    return <Navigate to="/work" replace />;
  }

  const currentIndex = projects.findIndex(p => p.slug === projectId);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  // Determine Visual Component and Theme based on slug
  let VisualComponent = null;
  let bgClass = "bg-background text-primary";
  let themeColorClass = "text-primary";
  let labelClass = "text-accent";
  let borderClass = "border-surface";

  if (project.slug === 'nexus-core') {
    VisualComponent = <NexusVisuals />;
    // Nexus starts light, but visuals transition background to dark. The wrapper needs to handle this gracefully.
  } else if (project.slug === 'aether-dynamics') {
    VisualComponent = <AetherVisuals />;
  } else if (project.slug === 'omni-intelligence') {
    VisualComponent = <OmniVisuals />;
    bgClass = "bg-primary text-background";
    themeColorClass = "text-background";
    borderClass = "border-surface-dark";
  }

  // Narrative scroll animations
  useEffect(() => {
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px)", () => {
      const contentBlocks = document.querySelectorAll('.project-content-block');
      contentBlocks.forEach((block) => {
        gsap.fromTo(block,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 1,
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
  }, [projectId]);

  return (
    <>
      <Helmet>
        <title>{project.name} | BlazeByte Studio</title>
        <meta name="description" content={project.overview} />
        <link rel="canonical" href={`https://blazebytestudio.com/work/${project.slug}`} />
      </Helmet>

      <main className={`w-full min-h-screen ${bgClass} transition-colors duration-500`}>
        
        {/* HERO / PROJECT OVERVIEW */}
        <header className="px-4 md:px-16 lg:px-32 max-w-7xl mx-auto pt-48 pb-32">
          <div className="flex flex-col gap-4">
             <div className={`flex items-center gap-4 text-xs font-mono tracking-widest ${labelClass}`}>
                <Link to="/work" className="hover:opacity-70 transition-opacity">WORK</Link>
                <span>/</span>
                <span>{project.type}</span>
                <span>/</span>
                <span>{project.id}</span>
             </div>
             
             <h1 className={`text-6xl md:text-[10vw] leading-[0.9] font-display font-bold tracking-tighter mt-4 ${themeColorClass} uppercase`}>
                {project.name}
             </h1>
          </div>

          <div className={`mt-16 flex flex-col lg:flex-row gap-16 lg:gap-32 pt-12 border-t ${borderClass}`}>
             <div className="w-full lg:w-1/3 flex flex-col gap-8 text-sm font-mono tracking-widest opacity-70">
                <div>
                   <div className="mb-2">INDUSTRY</div>
                   <div className={`font-bold font-sans tracking-wide text-base ${themeColorClass}`}>{project.industry}</div>
                </div>
                <div>
                   <div className="mb-2">CAPABILITY</div>
                   <div className={`font-bold font-sans tracking-wide text-base ${themeColorClass}`}>{project.category}</div>
                </div>
                <div>
                   <div className="mb-2">SERVICES</div>
                   <div className="flex flex-col gap-1 mt-2">
                     {project.services.map(service => (
                       <span key={service} className="text-xs">— {service}</span>
                     ))}
                   </div>
                </div>
             </div>
             
             <div className="w-full lg:w-2/3">
                <h2 className={`text-2xl md:text-5xl font-display font-light leading-snug ${themeColorClass} opacity-90`}>
                  {project.overview}
                </h2>
             </div>
          </div>
        </header>

        {/* DYNAMIC VISUAL COMPONENT */}
        {VisualComponent && (
          <div className="w-full border-y border-surface/20">
            {VisualComponent}
          </div>
        )}

        {/* NARRATIVE SECTIONS */}
        <article ref={narrativeRef} className="px-4 md:px-16 lg:px-32 max-w-5xl mx-auto flex flex-col gap-32 py-32">
          
          <section className="flex flex-col md:flex-row gap-8 md:gap-24 narrative-section">
             <div className="w-full md:w-1/4">
                <h3 className={`text-xs font-mono tracking-widest sticky top-32 ${labelClass} uppercase`}>The Challenge</h3>
             </div>
             <div className={`w-full md:w-3/4 text-xl md:text-3xl font-display font-light leading-relaxed ${themeColorClass} opacity-80`}>
                {project.challenge}
             </div>
          </section>

          <section className="flex flex-col md:flex-row gap-8 md:gap-24 narrative-section">
             <div className="w-full md:w-1/4">
                <h3 className={`text-xs font-mono tracking-widest sticky top-32 ${labelClass} uppercase`}>The Strategy</h3>
             </div>
             <div className={`w-full md:w-3/4 text-xl md:text-3xl font-display font-light leading-relaxed ${themeColorClass} opacity-90`}>
                {project.strategy}
             </div>
          </section>

          <section className="flex flex-col md:flex-row gap-8 md:gap-24 narrative-section">
             <div className="w-full md:w-1/4">
                <h3 className={`text-xs font-mono tracking-widest sticky top-32 ${labelClass} uppercase`}>The Execution</h3>
             </div>
             <div className={`w-full md:w-3/4 text-lg md:text-2xl font-sans leading-relaxed ${themeColorClass} opacity-80`}>
                {project.execution}
             </div>
          </section>
          
          <section className="flex flex-col md:flex-row gap-8 md:gap-24 narrative-section border-t border-surface/20 pt-16">
             <div className="w-full md:w-1/4">
                <h3 className={`text-xs font-mono tracking-widest sticky top-32 ${labelClass} uppercase`}>
                   Intended Outcome
                </h3>
             </div>
             <div className="w-full md:w-3/4">
                <h4 className={`text-2xl md:text-5xl font-display font-bold mb-8 leading-tight ${themeColorClass}`}>
                  {project.intended_outcome}
                </h4>
                <div className="inline-block border border-accent/50 text-accent px-3 py-1 text-[10px] rounded-full font-mono tracking-wider">
                  NOTE: THIS IS A {project.type}
                </div>
             </div>
          </section>

          {/* PROJECT DETAILS (Technologies) */}
          <section className="pt-16 border-t border-surface/20">
             <h3 className="text-xs font-mono tracking-widest opacity-50 mb-8 uppercase">Technology Stack</h3>
             <div className="flex flex-wrap gap-4">
                {project.technologies.map(tech => (
                  <span key={tech} className={`px-4 py-2 border border-surface/30 rounded-full text-xs font-mono tracking-widest ${themeColorClass}`}>
                    {tech}
                  </span>
                ))}
             </div>
          </section>

        </article>

        {/* NEXT PROJECT CTA */}
        <section className={`px-4 md:px-16 lg:px-32 max-w-7xl mx-auto border-t ${borderClass} pt-32 pb-32 text-center`}>
           <h4 className="text-xs font-mono tracking-widest opacity-50 mb-8 uppercase">Next Project</h4>
           <Link to={`/work/${nextProject.slug}`} className="group inline-flex flex-col items-center">
              <h2 className={`text-5xl md:text-8xl font-display font-bold tracking-tight ${themeColorClass} group-hover:text-accent transition-colors duration-500 uppercase`}>
                {nextProject.name}
              </h2>
              <div className={`mt-8 flex items-center gap-4 text-xs font-bold tracking-widest font-mono ${themeColorClass} group-hover:translate-x-2 transition-transform duration-300`}>
                VIEW CASE STUDY →
              </div>
           </Link>
        </section>

      </main>
    </>
  );
}
