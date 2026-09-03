import { Helmet } from 'react-helmet-async';
import AIHero from '../../components/services/ai/AIHero';
import AIProcess from '../../components/services/ai/AIProcess';

export default function AIAutomation() {
  const capabilities = [
    { title: "BUSINESS LOGIC AUTOMATION", description: "Mapping complex operational rules into autonomous scripts that execute flawlessly without human intervention." },
    { title: "API INTEGRATION", description: "Connecting disparate software systems (CRM, ERP, Marketing, Financial) into a unified, communicative ecosystem." },
    { title: "AI WORKFLOWS", description: "Injecting LLMs and machine learning into data pipelines to analyze, route, and respond to unstructured information." },
    { title: "CUSTOM DASHBOARDS", description: "Building secure, real-time command centers that allow human operators to monitor autonomous system health." },
    { title: "DATA ENGINEERING", description: "Structuring automated ETL pipelines to move, clean, and warehouse critical business data." },
    { title: "PROCESS AUDITING", description: "Analyzing current manual workflows to identify high-ROI automation targets." }
  ];

  const standards = [
    'Idempotent Execution', 
    'Secure Error Handling', 
    'Encrypted Data Flow', 
    'Human-in-the-Loop Safeguards', 
    'Scalable Infrastructure', 
    'Comprehensive Logging'
  ];

  return (
    <>
      <Helmet>
        <title>AI & Business Automation | BlazeByte Studio</title>
        <meta name="description" content="Eliminate repetitive logic. We engineer autonomous business workflows that scale decision-making and operational velocity." />
        <link rel="canonical" href="https://blazebytestudio.com/services/ai-automation" />
      </Helmet>

      {/* Pure Dark Theme */}
      <main className="w-full min-h-screen bg-primary text-background">
        
        {/* 01. SERVICE HERO */}
        <AIHero />

        {/* 02. BUSINESS PROBLEM */}
        <section className="py-32 px-4 md:px-16 lg:px-32 max-w-7xl mx-auto border-t border-surface-dark bg-primary text-background">
           <h2 className="text-accent text-sm tracking-[0.3em] font-mono mb-8 uppercase">The Business Problem</h2>
           <div className="text-xl md:text-4xl font-display font-light text-secondary max-w-5xl leading-relaxed">
             Manual data entry and repetitive decision-making <span className="text-background font-bold">destroy operational velocity</span>. When humans act as API bridges between disconnected software, businesses experience <span className="text-background font-bold">critical bottlenecks</span>, expensive errors, and an inability to scale.
           </div>
        </section>

        {/* 03 & 05. WHAT WE BUILD & HOW THE SYSTEM WORKS */}
        <AIProcess />

        {/* 04. CAPABILITIES */}
        <section className="py-32 px-4 md:px-16 lg:px-32 bg-surface-dark border-t border-background-dark relative z-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-accent text-sm tracking-[0.3em] font-mono mb-6 uppercase">System Capabilities</h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-background mb-24">AUTONOMOUS ARCHITECTURE.</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
              {capabilities.map((cap, i) => (
                <div key={i} className="flex flex-col border-t border-text-secondary/20 pt-8 hover:border-accent transition-colors duration-500 group">
                  <h4 className="text-xl font-display font-bold tracking-widest text-background mb-4 group-hover:text-accent transition-colors">{cap.title}</h4>
                  <p className="text-secondary text-sm leading-relaxed">{cap.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 06. TECHNOLOGY / PROCESS */}
        <section className="py-32 px-4 md:px-16 lg:px-32 bg-primary border-t border-surface-dark text-center relative z-10">
           <h2 className="text-accent text-sm tracking-[0.3em] font-mono mb-12 uppercase">Engineering Standards</h2>
           <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
              {standards.map(standard => (
                <div key={standard} className="px-6 py-3 bg-surface-dark border border-text-secondary/30 rounded-full text-sm md:text-base font-mono tracking-widest text-secondary hover:text-background hover:border-accent transition-colors cursor-default">
                  {standard}
                </div>
              ))}
           </div>
        </section>

      </main>
    </>
  );
}
