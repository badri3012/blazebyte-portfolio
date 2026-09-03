import { Helmet } from 'react-helmet-async';
import SEOHero from '../../components/services/seo/SEOHero';
import SEOProcess from '../../components/services/seo/SEOProcess';

export default function Seo() {
  const capabilities = [
    { title: "TECHNICAL SEO", description: "Ensuring perfect crawlability, indexability, site architecture, metadata, canonicals, and strict structured data (JSON-LD)." },
    { title: "ON-PAGE SEO", description: "Mapping search intent to heading hierarchies, internal linking structures, and metadata optimization." },
    { title: "LOCAL SEO", description: "Managing Google Business Profiles, location-focused content, and business information consistency to dominate local environments." },
    { title: "PERFORMANCE SEO", description: "Core Web Vitals awareness, image optimization, script deferral, and layout stability to satisfy engine speed metrics." },
    { title: "CONTENT ARCHITECTURE", description: "Designing topic clusters, mapping search intent, and organizing information architecture to establish topical authority." }
  ];

  const standards = [
    'Semantic HTML5', 
    'JSON-LD Structured Data', 
    'Core Web Vitals', 
    'Zero Keyword Stuffing', 
    'Accessible DOM', 
    'Indexability First'
  ];

  return (
    <>
      <Helmet>
        <title>Technical SEO & Discoverability | BlazeByte Studio</title>
        <meta name="description" content="Search visibility built on strong technical foundations and intelligent content architecture. We optimize for discoverability without keyword stuffing." />
        <link rel="canonical" href="https://blazebytestudio.com/services/seo" />
      </Helmet>

      {/* Light Editorial Theme */}
      <main className="w-full min-h-screen bg-background text-primary">
        
        {/* 01. SERVICE HERO */}
        <SEOHero />

        {/* 02. BUSINESS PROBLEM */}
        <section className="py-32 px-4 md:px-16 lg:px-32 max-w-7xl mx-auto border-t border-surface bg-surface text-primary">
           <h2 className="text-accent text-sm tracking-[0.3em] font-mono mb-8 uppercase">The Business Problem</h2>
           <div className="text-xl md:text-4xl font-display font-light text-secondary max-w-5xl leading-relaxed">
             A beautiful website is useless if search engines cannot <span className="text-primary font-bold">understand its structure</span>. Poor crawlability, missing metadata, and thin content architecture render your business <span className="text-primary font-bold">invisible to active demand</span>.
           </div>
        </section>

        {/* 03 & 05. WHAT WE BUILD & HOW THE SYSTEM WORKS */}
        <SEOProcess />

        {/* 04. CAPABILITIES */}
        <section className="py-32 px-4 md:px-16 lg:px-32 bg-surface border-t border-background relative z-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-accent text-sm tracking-[0.3em] font-mono mb-6 uppercase">Capability Architecture</h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-primary mb-24">TECHNICAL + CONTENT.</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
              {capabilities.map((cap, i) => (
                <div key={i} className="flex flex-col border-t border-background pt-8 hover:border-accent transition-colors duration-500 group">
                  <h4 className="text-xl font-display font-bold tracking-widest text-primary mb-4 group-hover:text-accent transition-colors">{cap.title}</h4>
                  <p className="text-secondary text-sm leading-relaxed">{cap.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 06. TECHNOLOGY / PROCESS */}
        <section className="py-32 px-4 md:px-16 lg:px-32 bg-background border-t border-surface text-center relative z-10">
           <h2 className="text-accent text-sm tracking-[0.3em] font-mono mb-12 uppercase">Technical Standards</h2>
           <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-4xl mx-auto mb-16">
              {standards.map(standard => (
                <div key={standard} className="px-6 py-3 bg-surface border border-surface rounded-full text-sm md:text-base font-mono tracking-widest text-primary hover:border-accent transition-colors cursor-default">
                  {standard}
                </div>
              ))}
           </div>
           <h2 className="text-lg md:text-xl font-sans font-light text-secondary max-w-3xl mx-auto italic">
             Note: We do not guarantee #1 rankings or arbitrary traffic metrics. Search engines are dynamic systems. We guarantee technically flawless foundations and strict adherence to established optimization principles.
           </h2>
        </section>


      </main>
    </>
  );
}
