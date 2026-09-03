import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { articles } from '../data/articles';
import NotFound from './NotFound';

export default function ArticleDetail() {
  const { slug } = useParams();
  const [readingProgress, setReadingProgress] = useState(0);
  
  const article = articles.find(a => a.slug === slug);
  
  useEffect(() => {
    if (!article) return;
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - windowHeight;
      const progress = maxScroll > 0 ? (scrollPosition / maxScroll) * 100 : 0;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article]);

  // Premium NotFound fallback if the article doesn't exist
  if (!article) {
    return <NotFound />;
  }

  const currentIndex = articles.findIndex(a => a.slug === slug);
  const nextArticle = articles.length > 1 ? articles[(currentIndex + 1) % articles.length] : null;

  // Generate Schema.org structured data only because the article genuinely exists
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "image": article.coverImage || "https://blazebytestudio.com/default-og.jpg",
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "BlazeByte Studio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://blazebytestudio.com/logo.png"
      }
    },
    "datePublished": article.publishedAt,
    "dateModified": article.updatedAt || article.publishedAt
  };

  return (
    <>
      <Helmet>
        <title>{article.title} | BlazeByte Insights</title>
        <meta name="description" content={article.description} />
        <link rel="canonical" href={`https://blazebytestudio.com/insights/${article.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      {/* Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-accent z-50 transition-all duration-75 ease-out" 
        style={{ width: `${readingProgress}%` }}
      />

      <main className="w-full min-h-screen bg-background text-primary pt-32 pb-32">
        <article className="max-w-[700px] mx-auto px-4 sm:px-6">
          
          <header className="mb-16">
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono tracking-widest text-secondary mb-8 uppercase">
               <Link to="/insights" className="hover:text-primary transition-colors">INSIGHTS</Link>
               <span>/</span>
               <span className="text-accent">{article.category}</span>
               <span>/</span>
               <span>{article.publishedAt}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight mb-8 text-primary">
              {article.title}
            </h1>
            
            <div className="flex items-center gap-4 text-xs font-mono text-secondary border-t border-surface pt-8 uppercase">
               <span>BY {article.author}</span>
               <span>•</span>
               <span>{article.readingTime} READ</span>
            </div>
          </header>

          {article.coverImage && (
            <figure className="w-full mb-16 rounded-lg overflow-hidden border border-surface shadow-2xl relative">
              <img src={article.coverImage} alt={article.title} className="w-full h-auto object-cover aspect-[21/9]" loading="eager" />
            </figure>
          )}

          {/* Semantic HTML Content rendering block */}
          {/* We ensure a comfortable reading width (max-w-[700px] on parent) and optimal line height */}
          <div className="prose prose-lg prose-slate max-w-none font-sans text-secondary leading-[1.8] tracking-normal mb-32
                          prose-headings:font-display prose-headings:font-bold prose-headings:text-primary prose-headings:tracking-tight
                          prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                          prose-strong:text-primary
                          prose-blockquote:border-l-accent prose-blockquote:text-primary prose-blockquote:font-display prose-blockquote:font-light prose-blockquote:text-2xl
                          prose-img:rounded-lg prose-img:border prose-img:border-surface prose-img:shadow-xl">
             <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>

          <footer className="mt-32 pt-16 border-t border-surface flex flex-col md:flex-row gap-16 justify-between">
             
             {/* Related Context */}
             <div className="flex flex-col gap-12 w-full md:w-1/2">
                {article.relatedServices && article.relatedServices.length > 0 && (
                  <div>
                    <h3 className="text-xs font-mono tracking-[0.2em] text-secondary mb-4 uppercase">Related Services</h3>
                    <div className="flex flex-col gap-3">
                      {article.relatedServices.map((service, i) => (
                        <Link key={i} to={service.path} className="text-xl font-display font-bold text-primary hover:text-accent transition-colors">
                          {service.label} →
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
                {article.relatedProjects && article.relatedProjects.length > 0 && (
                  <div>
                    <h3 className="text-xs font-mono tracking-[0.2em] text-secondary mb-4 uppercase">Related Work</h3>
                    <div className="flex flex-col gap-3">
                      {article.relatedProjects.map((project, i) => (
                        <Link key={i} to={project.path} className="text-xl font-display font-bold text-primary hover:text-accent transition-colors">
                          {project.label} →
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
             </div>

             {/* Next Article */}
             {nextArticle && (
               <div className="w-full md:w-1/2 flex flex-col items-start md:items-end text-left md:text-right">
                  <h3 className="text-xs font-mono tracking-[0.2em] text-secondary mb-4 uppercase">Next Insight</h3>
                  <Link to={`/insights/${nextArticle.slug}`} className="group flex flex-col gap-4">
                    <h4 className="text-2xl md:text-3xl font-display font-bold text-primary group-hover:text-accent transition-colors leading-tight">
                      {nextArticle.title}
                    </h4>
                    <span className="text-sm font-mono text-secondary group-hover:translate-x-2 transition-transform">READ ARTICLE →</span>
                  </Link>
               </div>
             )}
             
          </footer>

        </article>
      </main>
    </>
  );
}
