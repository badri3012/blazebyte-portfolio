import { Helmet } from 'react-helmet-async';
import WebHero from '../../components/services/web/WebHero';
import WebProcess from '../../components/services/web/WebProcess';

export default function WebDevelopment() {
  const capabilities = [
    { title: "CORPORATE WEBSITES", description: "Authoritative digital hubs designed to communicate enterprise credibility and capture qualified B2B leads." },
    { title: "BUSINESS WEBSITES", description: "High-performance marketing sites built for speed, SEO discoverability, and local presence." },
    { title: "E-COMMERCE", description: "Scalable digital storefronts engineered for smooth checkout flows and conversion optimization." },
    { title: "WEB APPLICATIONS", description: "Complex bespoke software solutions running securely within the browser." },
    { title: "UI / UX DESIGN", description: "Interface systems designed specifically to reduce friction and guide user intent." },
    { title: "PERFORMANCE OPTIMIZATION", description: "Core Web Vitals auditing and structural refactoring to ensure lightning-fast load times." }
  ];

  const standards = [
    'Responsive Architecture', 
    'Performance-Conscious Development', 
    'Accessibility', 
    'SEO-Ready Foundations', 
    'Scalable Component Systems', 
    'Clean Information Architecture'
  ];

  return (
    <>
      <Helmet>
        <title>Web Development & UI Design | BlazeByte Studio</title>
        <meta name="description" content="Premium websites and digital products designed around business goals, usability, performance, and scalable technical foundations." />
        <link rel="canonical" href="https://blazebytestudio.com/services/web-development" />
      </Helmet>

      <main className="w-full min-h-screen bg-background text-primary">
        
        {/* 01. SERVICE HERO */}
        <WebHero />

        {/* 02. BUSINESS PROBLEM */}
        <section className="py-32 px-4 md:px-16 lg:px-32 max-w-7xl mx-auto border-t border-surface bg-surface">
           <h2 className="text-accent text-sm tracking-[0.3em] font-mono mb-8 uppercase">The Business Problem</h2>
           <div className="text-xl md:text-4xl font-display font-light text-secondary max-w-5xl leading-relaxed">
             An <span className="text-primary font-bold">outdated website</span> creates weak digital credibility. Poor mobile experiences, slow page loads, and difficult content management systems inevitably lead to <span className="text-primary font-bold">weak conversion journeys</span> and an inconsistent brand presentation.
           </div>
        </section>

        {/* 03 & 05. WHAT WE BUILD & HOW THE SYSTEM WORKS */}
        <WebProcess />

        {/* 04. CAPABILITIES */}
        <section className="py-32 px-4 md:px-16 lg:px-32 bg-surface border-t border-background">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-accent text-sm tracking-[0.3em] font-mono mb-6 uppercase">Core Capabilities</h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-primary mb-24">ENGINEERED TO PERFORM.</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
              {capabilities.map((cap, i) => (
                <div key={i} className="flex flex-col border-t border-background pt-8 hover:border-accent transition-colors duration-500">
                  <h4 className="text-xl font-display font-bold tracking-widest text-primary mb-4">{cap.title}</h4>
                  <p className="text-secondary text-sm leading-relaxed">{cap.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 06. TECHNOLOGY / PROCESS */}
        <section className="py-32 px-4 md:px-16 lg:px-32 bg-background border-t border-surface text-center">
           <h2 className="text-accent text-sm tracking-[0.3em] font-mono mb-12 uppercase">Technical Standards</h2>
           <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
              {standards.map(standard => (
                <div key={standard} className="px-6 py-3 bg-surface border border-surface rounded-full text-sm md:text-base font-mono tracking-widest text-primary hover:border-accent transition-colors cursor-default">
                  {standard}
                </div>
              ))}
           </div>
        </section>


      </main>
    </>
  );
}
