import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Automate() {
  const containerRef = useRef<HTMLDivElement>(null);
  const darkEnvironmentRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<HTMLDivElement[]>([]);
  const connectionsRef = useRef<HTMLDivElement[]>([]);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%',
          scrub: 1,
          pin: true,
        }
      });

      // 1. EXPANDING TRANSFORMATION (Dark Environment Reveal)
      // The section starts visually transparent/light and then the dark theme explodes outward.
      gsap.set(darkEnvironmentRef.current, { clipPath: 'circle(0% at 50% 50%)' });
      
      tl.to(darkEnvironmentRef.current, {
        clipPath: 'circle(150% at 50% 50%)',
        duration: 1.5,
        ease: "power2.inOut"
      });

      // 2. LOGIC NETWORK ASSEMBLY
      nodesRef.current.forEach((node, index) => {
        gsap.set(node, { opacity: 0, scale: 0.8, y: 20 });
        const connection = connectionsRef.current[index];
        if (connection) gsap.set(connection, { scaleX: 0, transformOrigin: "left center" });

        if (index > 0) {
          tl.to(connection, { scaleX: 1, duration: 0.5, ease: "power2.inOut" }, "-=0.2")
            .to(node, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" }, "<");
        } else {
          tl.to(node, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" }, "-=0.5");
        }
        
        // Signal flash propagating through the network
        const signalDot = node.querySelector('.signal-dot');
        if (signalDot) {
          tl.to(signalDot, { backgroundColor: '#ff5a00', boxShadow: '0 0 15px rgba(255,90,0,0.8)', duration: 0.1 })
            .to(signalDot, { backgroundColor: '#a1a1aa', boxShadow: 'none', duration: 0.3 }, "+=0.2");
        }
      });

      // 3. FINAL HEADLINE RESOLUTION
      tl.to(nodesRef.current, { opacity: 0.1, filter: 'blur(2px)', duration: 1, delay: 0.5 })
        .to(connectionsRef.current, { opacity: 0.1, duration: 1 }, "<")
        .fromTo(headlineRef.current, 
          { clipPath: 'inset(100% 0 0 0)', y: 20 }, 
          { clipPath: 'inset(0% 0 0 0)', y: 0, duration: 1.2, ease: "power4.out" }, 
          "-=0.5"
        );
    });

    return () => mm.revert();
  }, []);

  const addToNodes = (el: HTMLDivElement | null) => {
    if (el && !nodesRef.current.includes(el)) {
      nodesRef.current.push(el);
    }
  };

  const addToConnections = (el: HTMLDivElement | null) => {
    if (el && !connectionsRef.current.includes(el)) {
      connectionsRef.current.push(el);
    }
  };

  const automationNodes = [
    { title: "LEAD RECEIVED", detail: "Incoming signal" },
    { title: "AI QUALIFICATION", detail: "Evaluation & routing" },
    { title: "CRM UPDATE", detail: "Database synchronized" },
    { title: "AUTOMATED RESPONSE", detail: "Instant communication" },
    { title: "TEAM NOTIFICATION", detail: "Context delivered" },
    { title: "FOLLOW-UP SYSTEM", detail: "Continuous engagement" }
  ];

  return (
    // Base is transparent so Grow's background is visible underneath initially
    <section ref={containerRef} className="relative w-full h-screen bg-transparent flex flex-col items-center justify-center overflow-hidden z-0 border-t border-surface">
      
      {/* The Expanding Dark Environment */}
      <div ref={darkEnvironmentRef} className="absolute inset-0 w-full h-full bg-surface-dark z-0" />

      {/* Network Structure */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 z-10 mt-16">
        
        <div className="absolute top-12 text-center w-full">
          <h2 className="text-accent text-sm tracking-[0.3em] font-mono">INTELLIGENT SYSTEMS</h2>
        </div>

        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center max-w-6xl mt-12">
          {automationNodes.map((node, index) => (
            <div key={index} className="flex items-center">
              <div ref={addToNodes} className="flex flex-col items-start bg-primary p-6 border border-text-secondary/20 rounded-lg min-w-[200px] z-10">
                 <div className="signal-dot w-2 h-2 rounded-full bg-text-secondary mb-4 transition-colors" />
                 <div className="text-sm font-mono tracking-widest text-background mb-1">{node.title}</div>
                 <div className="text-xs text-secondary font-sans">{node.detail}</div>
              </div>
              {index < automationNodes.length - 1 && (
                <div ref={addToConnections} className="hidden md:block w-8 lg:w-16 h-[1px] bg-accent/50 z-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Final Typography */}
      <div ref={headlineRef} className="absolute flex flex-col items-center text-center px-4 z-20">
        <h3 className="text-3xl md:text-6xl font-display font-bold tracking-tight text-background">AUTOMATE THE REPETITIVE.</h3>
        <h3 className="text-3xl md:text-6xl font-display font-bold tracking-tight text-background mt-2 mb-12">SCALE THE IMPORTANT.</h3>
        
        <h3 className="text-2xl md:text-4xl font-display font-light tracking-tight text-secondary">SYSTEMS DON'T NEED TO STOP</h3>
        <h3 className="text-2xl md:text-4xl font-display font-light tracking-tight text-accent mt-2">WHEN PEOPLE DO.</h3>
      </div>

    </section>
  );
}
