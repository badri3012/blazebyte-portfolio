import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

export default function TransitionProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} className="w-full h-full relative">
        
        {/* Outgoing Page instantly disappears, Incoming Page fades in quickly */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
          className="w-full h-full"
        >
          {children}
        </motion.div>

        {/* Structural Wipe - fast and premium */}
        <motion.div
          initial={{ scaleY: 1, transformOrigin: 'top' }}
          animate={{ scaleY: 0, transformOrigin: 'top' }}
          exit={{ scaleY: 1, transformOrigin: 'bottom' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[60] bg-background pointer-events-none border-b-[8px] border-accent"
        />
        
      </motion.div>
    </AnimatePresence>
  );
}
