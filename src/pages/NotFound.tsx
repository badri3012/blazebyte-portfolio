import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | BlazeByte Studio</title>
        <meta name="description" content="The requested page could not be found in our digital architecture." />
      </Helmet>

      <main className="w-full min-h-screen bg-background text-primary flex flex-col items-center justify-center px-4 md:px-16 text-center">
        
        <h1 className="text-9xl md:text-[12rem] font-display font-black text-surface tracking-tighter absolute select-none z-0">
          404
        </h1>
        
        <div className="z-10 relative flex flex-col items-center mt-12">
          <h2 className="text-accent text-sm tracking-[0.3em] font-mono mb-6">INVALID ROUTE</h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold text-primary mb-8">SYSTEM NOT FOUND.</h3>
          
          <p className="text-secondary font-sans max-w-md mb-16 leading-relaxed">
            The architecture you are looking for has been moved, removed, or never existed. Please return to the primary navigation paths below.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/" className="text-xs font-mono tracking-widest text-secondary hover:text-accent transition-colors">HOME</Link>
            <Link to="/work" className="text-xs font-mono tracking-widest text-secondary hover:text-accent transition-colors">WORK</Link>
            <Link to="/services/web-development" className="text-xs font-mono tracking-widest text-secondary hover:text-accent transition-colors">SERVICES</Link>
            <Link to="/insights" className="text-xs font-mono tracking-widest text-secondary hover:text-accent transition-colors">INSIGHTS</Link>
            <Link to="/contact" className="text-xs font-mono tracking-widest text-primary font-bold hover:text-accent transition-colors">CONTACT</Link>
          </div>
        </div>

      </main>
    </>
  );
}
