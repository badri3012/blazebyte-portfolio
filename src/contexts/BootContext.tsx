import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type BootState = 'IDLE' | 'BOOTING' | 'READY' | 'HANDOFF' | 'COMPLETE';

interface BootContextType {
  bootState: BootState;
  setBootState: (state: BootState) => void;
  isFirstVisit: boolean;
}

const BootContext = createContext<BootContextType | undefined>(undefined);

export function BootProvider({ children }: { children: ReactNode }) {
  const [bootState, setBootState] = useState<BootState>('IDLE');
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    // Check if this is the first visit in the current session
    const hasVisited = sessionStorage.getItem('blazebyte_has_booted');
    if (hasVisited) {
      setIsFirstVisit(false);
      setBootState('COMPLETE');
    } else {
      setIsFirstVisit(true);
      setBootState('BOOTING');
    }
  }, []);

  const handleSetBootState = (state: BootState) => {
    setBootState(state);
    if (state === 'COMPLETE') {
      sessionStorage.setItem('blazebyte_has_booted', 'true');
    }
  };

  return (
    <BootContext.Provider value={{ bootState, setBootState: handleSetBootState, isFirstVisit }}>
      {children}
    </BootContext.Provider>
  );
}

export function useBoot() {
  const context = useContext(BootContext);
  if (context === undefined) {
    throw new Error('useBoot must be used within a BootProvider');
  }
  return context;
}
