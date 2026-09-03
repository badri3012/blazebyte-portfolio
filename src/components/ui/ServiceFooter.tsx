import { Link } from 'react-router-dom';
import ProjectButton from './ProjectButton';

interface ServiceLink {
  label: string;
  path: string;
}

interface ServiceFooterProps {
  relatedServices: ServiceLink[];
  theme?: 'light' | 'dark';
}

export default function ServiceFooter({ relatedServices, theme = 'light' }: ServiceFooterProps) {
  const isDark = theme === 'dark';
  
  return (
    <footer className={`w-full py-32 px-4 md:px-16 lg:px-32 border-t ${isDark ? 'bg-surface-dark border-background-dark text-background' : 'bg-surface border-background text-primary'}`}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-16">
        
        <div className="flex flex-col w-full lg:w-1/2">
           <h2 className={`text-xs font-mono tracking-[0.3em] mb-8 ${isDark ? 'text-secondary' : 'text-secondary'}`}>RELATED EXPERTISE</h2>
           <div className="flex flex-col gap-6 border-l border-accent/30 pl-6">
             {relatedServices.map((service, i) => (
               <Link 
                 key={i} 
                 to={service.path}
                 className={`group flex items-center gap-4 text-xl md:text-3xl font-display font-bold transition-colors duration-300 ${isDark ? 'text-secondary hover:text-primary' : 'text-secondary hover:text-primary'}`}
               >
                 <span className="group-hover:translate-x-2 transition-transform duration-300">{service.label}</span>
                 <span className="text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">→</span>
               </Link>
             ))}
             <Link 
               to="/work"
               className={`group flex items-center gap-4 text-xl md:text-3xl font-display font-bold transition-colors duration-300 ${isDark ? 'text-secondary hover:text-primary' : 'text-secondary hover:text-primary'}`}
             >
               <span className="group-hover:translate-x-2 transition-transform duration-300">Work Archive</span>
               <span className="text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">→</span>
             </Link>
           </div>
        </div>

        <div className="flex flex-col items-start lg:items-end w-full lg:w-1/2 lg:text-right">
           <h2 className={`text-3xl md:text-5xl font-display font-light mb-2 ${isDark ? 'text-secondary' : 'text-secondary'}`}>READY TO BUILD</h2>
           <h2 className={`text-3xl md:text-5xl font-display font-bold mb-12 ${isDark ? 'text-primary' : 'text-primary'}`}>THE NEXT SYSTEM?</h2>
           
           <div className="inline-block">
             <ProjectButton theme={isDark ? 'light' : 'dark'} />
           </div>
        </div>

      </div>
    </footer>
  );
}
