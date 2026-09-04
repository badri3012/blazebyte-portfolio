import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from '../components/sections/Hero';
import ServiceEcosystem from '../components/sections/ServiceEcosystem';
import SelectedWork from '../components/sections/SelectedWork';
import Method from '../components/sections/Method';
import Capabilities from '../components/sections/Capabilities';
import Credibility from '../components/sections/Credibility';
import InsightsPreview from '../components/sections/InsightsPreview';
import Testimonials from '../components/sections/Testimonials';
import CTA from '../components/sections/CTA';
import AmbientPlane from '../components/ui/AmbientPlane';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !bgRef.current) return;
    
    const ctx = gsap.context(() => {
      // Create a master timeline linked to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smooth scrub
        }
      });
      
      tl.to(bgRef.current, { backgroundColor: "#FAF9F6", duration: 0.25 }) // Hero -> Vault
        .to(bgRef.current, { backgroundColor: "#111111", duration: 0.15 }) // Ecosystem
        .to(bgRef.current, { backgroundColor: "#FAF9F6", duration: 0.15 }) // Method -> Capabilities
        .to(bgRef.current, { backgroundColor: "#111111", duration: 0.3 }); // Testimonials -> CTA

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>BlazeByte Studio | Enterprise Digital Systems</title>
        <meta name="description" content="We design powerful websites, growth-focused digital strategies, and intelligent automation systems for modern businesses." />
      </Helmet>

      {/* Ambient Motion Overlays */}
      <AmbientPlane />

      {/* Global Background Layer */}
      <div 
        ref={bgRef} 
        className="fixed inset-0 w-full h-full -z-10 bg-[#FAF9F6]" 
        style={{ willChange: 'background-color' }} 
      />

      <div ref={containerRef} className="w-full relative z-0">
        <div id="hero"><Hero /></div>
        <div id="services" className="scroll-mt-24"><ServiceEcosystem /></div>
        <div id="work" className="scroll-mt-24"><SelectedWork /></div>
        <Credibility />
        <div id="about" className="scroll-mt-24"><Method /></div>
        <Capabilities />
        <div id="insights" className="scroll-mt-24"><InsightsPreview /></div>
        <Testimonials />
        <div id="cta-section"><CTA /></div>
      </div>
    </>
  );
}
