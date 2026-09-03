import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="theme-dark w-full bg-background text-primary py-24 px-4 md:px-16 lg:px-32 border-t border-border relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16 md:gap-8 mb-24">
        
        {/* Brand Column */}
        <div className="flex flex-col w-full md:w-1/3 pr-0 md:pr-12">
          <Link to="/" className="text-3xl font-display font-bold tracking-widest text-primary hover:text-accent transition-colors mb-6 inline-block">
            BLAZEBYTE.
          </Link>
          <p className="text-sm font-sans text-secondary leading-relaxed max-w-sm">
            We are a Creative Technology Studio building digital systems, search visibility, and intelligent automation for modern business.
          </p>
        </div>

        {/* Navigation Columns */}
        <div className="flex flex-wrap md:flex-nowrap gap-12 md:gap-24 w-full md:w-2/3 justify-start md:justify-end">
          
          <div className="flex flex-col gap-6">
            <h3 className="text-xs font-mono tracking-[0.2em] text-muted uppercase mb-2">Services</h3>
            <Link to="/services/web-development" className="text-sm font-sans text-primary/80 hover:text-accent transition-colors">Web Development</Link>
            <Link to="/services/digital-marketing" className="text-sm font-sans text-primary/80 hover:text-accent transition-colors">Digital Marketing</Link>
            <Link to="/services/seo" className="text-sm font-sans text-primary/80 hover:text-accent transition-colors">Technical SEO</Link>
            <Link to="/services/ai-automation" className="text-sm font-sans text-primary/80 hover:text-accent transition-colors">AI Automation</Link>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-xs font-mono tracking-[0.2em] text-muted uppercase mb-2">Company</h3>
            <Link to="/about" className="text-sm font-sans text-primary/80 hover:text-accent transition-colors">About Us</Link>
            <Link to="/work" className="text-sm font-sans text-primary/80 hover:text-accent transition-colors">Work Archive</Link>
            <Link to="/insights" className="text-sm font-sans text-primary/80 hover:text-accent transition-colors">Insights</Link>
            <Link to="/contact" className="text-sm font-sans text-primary/80 hover:text-accent transition-colors">Start a Project</Link>
          </div>

        </div>
      </div>

      {/* Bottom Legal / CTA row */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center pt-8 border-t border-border gap-8">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-xs font-mono text-muted tracking-widest">
          <span>&copy; {currentYear} BlazeByte Studio.</span>
          <Link to="/" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
        
        <Link 
          to="/contact" 
          className="group relative overflow-hidden flex items-center justify-center border border-border bg-background px-8 py-4 text-xs font-bold font-mono tracking-widest text-primary transition-colors"
        >
          <div className="absolute inset-0 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
          <div className="absolute top-0 left-0 w-full h-[1px] bg-accent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out delay-100" />
          <span className="relative z-10 flex items-center gap-4 group-hover:text-background transition-colors duration-300">
             INITIATE PROJECT <span className="group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </Link>
      </div>
    </footer>
  );
}
