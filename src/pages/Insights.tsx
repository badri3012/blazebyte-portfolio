import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';

export default function Insights() {
  const isDevelopment = articles.length === 0;

  return (
    <>
      <Helmet>
        <title>Insights & Intellectual Authority | BlazeByte Studio</title>
        <meta name="description" content="BlazeByte Intelligence: Ideas, systems, strategy, and technical thinking currently being developed into useful publications." />
        <link rel="canonical" href="https://blazebytestudio.com/insights" />
      </Helmet>

      <main className="w-full min-h-screen bg-background text-primary pt-32 flex flex-col">
        
        {isDevelopment ? (
          <div className="flex-grow flex flex-col justify-center px-4 md:px-16 lg:px-32 max-w-7xl mx-auto w-full py-32">
            <h1 className="text-sm font-mono tracking-[0.3em] text-accent mb-8 uppercase">BlazeByte Intelligence</h1>
            <h2 className="text-5xl md:text-8xl lg:text-[7vw] font-display font-bold tracking-tighter leading-[0.9] mb-12 uppercase text-primary">
              Insights in <br />
              <span className="font-light text-secondary">Development.</span>
            </h2>
            
            <p className="text-xl md:text-3xl font-display font-light text-secondary max-w-3xl leading-relaxed mb-24">
              Ideas, systems, strategy, and technical thinking currently being developed into highly rigorous publications. We do not publish generic content just to fill a page.
            </p>

            <div className="flex flex-col gap-8 w-full max-w-4xl border-t border-surface pt-16">
              <h3 className="text-xs font-mono tracking-[0.2em] text-secondary uppercase mb-4">Editorial Focus Areas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
                {[
                  { topic: "WEB SYSTEMS", desc: "Architecture, component design, and performance." },
                  { topic: "SEO", desc: "Headless discoverability and technical rendering." },
                  { topic: "DIGITAL GROWTH", desc: "Conversion optimization and market capture." },
                  { topic: "AI AUTOMATION", desc: "LLM integration and workflow intelligence." },
                  { topic: "BUSINESS TECHNOLOGY", desc: "Aligning software with operational reality." }
                ].map((area, i) => (
                  <div key={i} className="flex flex-col gap-2 group cursor-default">
                    <h4 className="text-xl font-display font-bold tracking-tight group-hover:text-accent transition-colors">{area.topic}</h4>
                    <p className="text-sm font-sans text-secondary">{area.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-32">
               <Link to="/work" className="text-xs font-mono tracking-[0.2em] text-primary hover:text-accent transition-colors">
                 VIEW OUR DIGITAL ARCHIVE →
               </Link>
            </div>
          </div>
        ) : (
          <div className="flex-grow max-w-7xl mx-auto px-4 md:px-16 lg:px-32 w-full pb-32">
            <header className="mb-24">
              <h1 className="text-sm font-mono tracking-[0.3em] text-accent mb-4 uppercase">BlazeByte Intelligence</h1>
              <h2 className="text-5xl md:text-8xl lg:text-[7vw] font-display font-bold tracking-tighter leading-[0.9] text-primary uppercase">
                Curated <span className="font-light text-secondary">Thinking.</span>
              </h2>
            </header>

            <div className="flex flex-col border-t border-surface">
              {articles.map((article) => (
                <Link 
                  to={`/insights/${article.slug}`} 
                  key={article.id}
                  className="group relative border-b border-surface py-8 md:py-16 cursor-pointer block hover:bg-surface/30 transition-colors duration-500"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between z-10 relative">
                    
                    <div className="flex flex-col gap-6 w-full md:w-3/4 pr-0 md:pr-16">
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono tracking-widest text-secondary uppercase">
                         <span className="text-accent">{article.category}</span>
                         <span>{article.publishedAt}</span>
                         <span>{article.readingTime} READ</span>
                      </div>
                      <h3 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-primary group-hover:translate-x-2 transition-transform duration-500 ease-out">
                        {article.title}
                      </h3>
                      <p className="text-lg font-sans text-secondary max-w-2xl leading-relaxed">
                        {article.description}
                      </p>
                    </div>

                    <div className="mt-8 md:mt-0 flex items-center justify-start md:justify-end w-full md:w-1/4">
                       <span className="text-xs font-mono tracking-[0.2em] text-primary opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 md:-translate-x-4 group-hover:translate-x-0">
                         READ ARTICLE →
                       </span>
                    </div>
                    
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
