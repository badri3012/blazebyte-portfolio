import { Helmet } from 'react-helmet-async';
import MarketingHero from '../../components/services/marketing/MarketingHero';
import MarketingProcess from '../../components/services/marketing/MarketingProcess';

export default function DigitalMarketing() {
  const capabilities = [
    { title: "DIGITAL STRATEGY", description: "Mapping the complete digital ecosystem to identify the most efficient paths to revenue." },
    { title: "CONTENT ARCHITECTURE", description: "Creating valuable, intent-driven content that attracts, educates, and converts." },
    { title: "SEARCH MARKETING", description: "Capturing active demand when your audience is looking for solutions." },
    { title: "SOCIAL MEDIA", description: "Building community, authority, and top-of-funnel awareness where your audience spends time." },
    { title: "LOCAL PRESENCE", description: "Dominating local search environments and map packs for regional dominance." },
    { title: "CONVERSION OPTIMIZATION", description: "Removing friction from the user journey to maximize the value of existing traffic." }
  ];

  const standards = [
    'Data-Driven Decision Making', 
    'Attribution Modeling', 
    'Ethical SEO Practices', 
    'Performance Monitoring', 
    'Conversion Tracking', 
    'Audience Segmentation'
  ];

  return (
    <>
      <Helmet>
        <title>Digital Marketing & Strategy | BlazeByte Studio</title>
        <meta name="description" content="Turn digital attention into business momentum. We treat digital marketing as a connected growth system rather than disconnected tactics." />
        <link rel="canonical" href="https://blazebytestudio.com/services/digital-marketing" />
      </Helmet>

      {/* Light Editorial Theme */}
      <main className="w-full min-h-screen bg-background text-primary">
        
        {/* 01. SERVICE HERO */}
        <MarketingHero />

        {/* 02. BUSINESS PROBLEM */}
        <section className="py-32 px-4 md:px-16 lg:px-32 max-w-7xl mx-auto border-t border-surface bg-surface text-primary">
           <h2 className="text-accent text-sm tracking-[0.3em] font-mono mb-8 uppercase">The Business Problem</h2>
           <div className="text-xl md:text-4xl font-display font-light text-secondary max-w-5xl leading-relaxed">
             Disconnected marketing tactics create <span className="text-primary font-bold">wasted spend</span>. Driving traffic to a poorly converting digital asset, or creating content without structural search visibility, results in <span className="text-primary font-bold">stagnant growth</span> and invisible ROI.
           </div>
        </section>

        {/* 03 & 05. WHAT WE BUILD & HOW THE SYSTEM WORKS */}
        <MarketingProcess />

        {/* 04. CAPABILITIES */}
        <section className="py-32 px-4 md:px-16 lg:px-32 bg-surface border-t border-background relative z-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-accent text-sm tracking-[0.3em] font-mono mb-6 uppercase">Core Capabilities</h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-primary mb-24">INTEGRATED GROWTH TACTICS.</h3>
            
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
           <h2 className="text-accent text-sm tracking-[0.3em] font-mono mb-12 uppercase">Strategic Standards</h2>
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
