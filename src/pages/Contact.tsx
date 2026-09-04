import { useState, useRef, useEffect } from 'react';
import type { FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { submitProjectInquiry } from '../lib/api';
import type { InquiryForm } from '../lib/api';
import { trackEvent } from '../lib/analytics';
import { getCanonicalUrl } from '../config/site';
import CustomSelect from '../components/ui/CustomSelect';

const INITIAL_FORM: InquiryForm = {
  name: '',
  company: '',
  email: '',
  phone: '',
  projectType: '',
  budgetRange: '',
  description: ''
};

export default function Contact() {
  const [formData, setFormData] = useState<InquiryForm>(INITIAL_FORM);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof InquiryForm, string>>>({});
  const [hasStarted, setHasStarted] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);

  // Glass panel entrance animation
  useEffect(() => {
    const panel = document.getElementById('glass-form-panel');
    if (panel) {
      const ctx = gsap.context(() => {
        // Panel entrance
        gsap.fromTo(panel,
          { opacity: 0, scale: 0.98, clipPath: 'inset(4% 4% 4% 4%)' },
          { opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power3.out', delay: 0.3, clearProps: 'all' }
        );
        // Stagger children inside the form
        if (formRef.current) {
          gsap.fromTo(formRef.current.children,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.07, ease: 'power3.out', delay: 0.6 }
          );
        }
      });
      return () => ctx.revert();
    }
  }, []);

  const validate = (): boolean => {
    const errors: Partial<Record<keyof InquiryForm, string>> = {};
    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!formData.email.trim()) errors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = "Please enter a valid email address.";
    
    if (formData.phone.trim() && !/^[\d\s\+\-\(\)]+$/.test(formData.phone)) {
      errors.phone = "Please enter a valid phone number.";
    }
    
    if (!formData.projectType) errors.projectType = "Please select a service.";
    if (!formData.description.trim()) errors.description = "A brief project description is required.";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | { target: { name: string; value: string } }) => {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent('CONTACT_FORM_START');
    }
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error on change
    if (validationErrors[name as keyof InquiryForm]) {
      setValidationErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;

    if (!validate()) {
      // Focus first error for accessibility
      const firstErrorKey = Object.keys(validationErrors)[0];
      const el = document.getElementsByName(firstErrorKey)[0];
      if (el) el.focus();
      return;
    }

    setStatus('submitting');
    setErrorMessage('');
    trackEvent('CONTACT_FORM_SUBMIT');

    try {
      const response = await submitProjectInquiry(formData);
      if (response.success) {
        setStatus('success');
        trackEvent('CONTACT_FORM_SUCCESS');
      } else {
        setStatus('error');
        setErrorMessage(response.message);
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage("A critical network error occurred. Please try again later.");
    }
  };

  // Shared input class — strong contrast for readability
  const inputBase = [
    "w-full bg-transparent border-0 border-b border-b-[rgba(255,255,255,0.25)]",
    "p-4 pt-6 text-[#F5F5F2] font-sans text-[15px] outline-none",
    "transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
    "placeholder:text-[#9CA3AF]",
    "focus:border-b-[#FF5A00] focus:shadow-[0_4px_24px_rgba(255,90,0,0.10)]",
    "hover:border-b-[rgba(255,255,255,0.35)] hover:bg-[rgba(255,255,255,0.02)]",
  ].join(" ");
  const labelBase = [
    "text-[10px] font-mono tracking-[0.25em] text-[#D4D4D8] uppercase",
    "transition-colors duration-300 group-focus-within:text-[#F5F5F2]",
  ].join(" ");

  return (
    <>
      <Helmet>
        <title>Start a Project | BlazeByte Studio</title>
        <meta name="description" content="Initiate a project with BlazeByte Studio. Provide your project details, and our engineering team will evaluate the architecture and scope." />
        <link rel="canonical" href={getCanonicalUrl('/contact')} />
      </Helmet>

      {/* Keyframe for the signal line animation */}
      <style>{`
        @keyframes signal-travel {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>

      <main className="w-full min-h-screen bg-background text-primary pt-32 pb-32 px-4 md:px-16 lg:px-32 flex justify-center">
        
        <div className="w-full max-w-4xl flex flex-col">
          
          {/* ──── HEADER — keep as-is ──── */}
          <header className="mb-16">
            <h1 className="text-sm font-mono tracking-[0.3em] text-accent mb-4 uppercase">Project Portal</h1>
            <h2 className="text-4xl md:text-6xl font-display font-light text-secondary uppercase leading-tight mb-6">
              Initiate <span className="font-bold text-primary">Architecture.</span>
            </h2>
            <p className="text-lg font-sans text-secondary max-w-2xl leading-relaxed">
              We partner with serious businesses to engineer scalable digital systems. Provide your initial requirements below, and our technical team will review viability.
            </p>
          </header>

          {/* ════════════════════════════════════════════════════════════════ */}
          {/* ──── GLASS FORM PANEL ──── */}
          {/* ════════════════════════════════════════════════════════════════ */}
          <div className="relative">

            {/* Ambient glows */}
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,90,0,0.07) 0%, transparent 70%)' }} />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(245,245,242,0.03) 0%, transparent 70%)' }} />

            {/* Technical grid behind the panel */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="contact-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                  <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#F5F5F2" strokeWidth="0.4"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#contact-grid)" />
            </svg>

            {/* ── The Glass Panel ── */}
            <div
              id="glass-form-panel"
              className="relative z-10 rounded-lg"
              style={{
                background: 'linear-gradient(135deg, #18181C, #0A0A0C)',
                border: '1px solid rgba(255,255,255,0.10)',
                boxShadow: '0 30px 100px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >

              {/* Travelling signal line across the top */}
              <div className="absolute top-0 left-0 w-full h-[1px] overflow-hidden pointer-events-none">
                <div
                  className="w-1/3 h-full"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,90,0,0.6), transparent)',
                    animation: 'signal-travel 6s cubic-bezier(0.45,0,0.55,1) infinite',
                  }}
                />
              </div>

              {/* System indicator bar */}
              <div className="flex items-center justify-between px-6 md:px-10 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.10)' }}>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A00] animate-pulse" />
                  <span className="font-mono text-[9px] tracking-[0.3em] text-[#A1A1AA] uppercase font-bold">
                    PROJECT INTAKE / 01
                  </span>
                </div>
                <span className="font-mono text-[8px] tracking-[0.2em] text-[#71717A] uppercase hidden sm:block">
                  SYSTEM READY
                </span>
              </div>

              {/* ── Form Body ── */}
              <div className="px-6 md:px-10 py-10 md:py-14">
                <form 
                  ref={formRef}
                  onSubmit={handleSubmit} 
                  className="flex flex-col gap-10 w-full"
                  noValidate
                >
                  
                  {/* Status messages */}
                  {status === 'success' && (
                    <div className="p-8 rounded-md flex flex-col gap-4" style={{ background: 'rgba(255,90,0,0.06)', border: '1px solid rgba(255,90,0,0.25)' }}>
                      <h3 className="text-lg font-display font-bold text-[#F5F5F2] flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#FF5A00]" />
                        TRANSMISSION RECEIVED
                      </h3>
                      <p className="font-sans text-[#A1A1AA] text-sm leading-relaxed">
                        Your project enquiry has been successfully received.<br/>
                        The BlazeByte Studio team will review your request and get back to you.
                      </p>
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="p-8 rounded-md flex flex-col gap-4" style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.25)' }}>
                      <h3 className="text-lg font-display font-bold text-red-400">INTEGRATION REQUIRED</h3>
                      <p className="font-sans text-[#A1A1AA] text-sm">{errorMessage}</p>
                      <div className="text-xs font-mono mt-4 pt-4 border-t border-red-500/15 text-[#A1A1AA]">
                        Contact us directly at <a href="mailto:systems@blazebytestudio.com" className="text-[#F5F5F2] hover:text-[#FF5A00] underline transition-colors">systems@blazebytestudio.com</a>
                      </div>
                    </div>
                  )}

                  {/* Row 1: Name + Company */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
                    <div className="flex flex-col gap-2 group">
                      <label htmlFor="name" className={labelBase}>Full Name <span className="text-[#FF5A00]">*</span></label>
                      <input 
                        type="text" id="name" name="name" 
                        value={formData.name} onChange={handleChange}
                        className={inputBase} placeholder="Your name"
                        aria-invalid={!!validationErrors.name}
                        aria-describedby={validationErrors.name ? "name-error" : undefined}
                      />
                      {validationErrors.name && <span id="name-error" className="text-[10px] text-red-400 font-mono mt-1">{validationErrors.name}</span>}
                    </div>
                    <div className="flex flex-col gap-2 group">
                      <label htmlFor="company" className={labelBase}>Company</label>
                      <input 
                        type="text" id="company" name="company" 
                        value={formData.company} onChange={handleChange}
                        className={inputBase} placeholder="Organization"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email and Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
                    <div className="flex flex-col gap-2 group">
                      <label htmlFor="email" className={labelBase}>Business Email <span className="text-[#FF5A00]">*</span></label>
                      <input 
                        type="email" id="email" name="email" 
                        value={formData.email} onChange={handleChange}
                        className={inputBase} placeholder="your@company.com"
                        aria-invalid={!!validationErrors.email}
                        aria-describedby={validationErrors.email ? "email-error" : undefined}
                      />
                      {validationErrors.email && <span id="email-error" className="text-[10px] text-red-400 font-mono mt-1">{validationErrors.email}</span>}
                    </div>
                    <div className="flex flex-col gap-2 group">
                      <label htmlFor="phone" className={labelBase}>Phone / WhatsApp</label>
                      <input 
                        type="tel" id="phone" name="phone" 
                        value={formData.phone} onChange={handleChange}
                        className={inputBase} placeholder="+1 (555) 000-0000"
                        aria-invalid={!!validationErrors.phone}
                        aria-describedby={validationErrors.phone ? "phone-error" : undefined}
                      />
                      {validationErrors.phone && <span id="phone-error" className="text-[10px] text-red-400 font-mono mt-1">{validationErrors.phone}</span>}
                    </div>
                  </div>

                  {/* Thin divider */}
                  <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }} />

                  {/* Row 3: Service + Budget */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
                    <div className="flex flex-col gap-2 group">
                      <label htmlFor="projectType" className={labelBase}>Service Required <span className="text-[#FF5A00]">*</span></label>
                      <CustomSelect
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        placeholder="Select Service..."
                        options={[
                          { value: 'Web Development', label: 'Web Development' },
                          { value: 'SEO', label: 'SEO' },
                          { value: 'Digital Marketing', label: 'Digital Marketing' },
                          { value: 'AI Automation', label: 'AI Automation' },
                          { value: 'Custom Digital System', label: 'Custom Digital System' },
                          { value: 'Other', label: 'Other' },
                        ]}
                        aria-invalid={!!validationErrors.projectType}
                        aria-describedby={validationErrors.projectType ? "type-error" : undefined}
                      />
                      {validationErrors.projectType && <span id="type-error" className="text-[10px] text-red-400 font-mono mt-1">{validationErrors.projectType}</span>}
                    </div>
                    <div className="flex flex-col gap-2 group">
                      <label htmlFor="budgetRange" className={labelBase}>Budget Range</label>
                      <CustomSelect
                        id="budgetRange"
                        name="budgetRange"
                        value={formData.budgetRange}
                        onChange={handleChange}
                        placeholder="Select Range..."
                        options={[
                          { value: '10k-25k', label: '$10k — $25k' },
                          { value: '25k-50k', label: '$25k — $50k' },
                          { value: '50k-100k', label: '$50k — $100k' },
                          { value: '100k+', label: '$100k+' },
                        ]}
                      />
                    </div>
                  </div>

                  {/* Row 4: Project Details (full width) */}
                  <div className="flex flex-col gap-2 group">
                    <label htmlFor="description" className={labelBase}>Project Details <span className="text-[#FF5A00]">*</span></label>
                    <textarea 
                      id="description" name="description" 
                      value={formData.description} onChange={handleChange}
                      rows={5}
                      className={inputBase + " resize-y min-h-[120px]"}
                      placeholder="Describe the business problem, current architecture, and what needs to be built."
                      aria-invalid={!!validationErrors.description}
                      aria-describedby={validationErrors.description ? "desc-error" : undefined}
                    />
                    {validationErrors.description && <span id="desc-error" className="text-[10px] text-red-400 font-mono mt-1">{validationErrors.description}</span>}
                  </div>
                  
                  {/* Submit area & WhatsApp Fallback */}
                  <div className="pt-6 mt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                      <div className="flex flex-col gap-4 w-full md:w-auto">
                        <p className="text-[10px] font-sans text-[#9CA3AF] max-w-sm leading-relaxed">
                          By submitting, you acknowledge our engineering team will evaluate your request against current studio capacity.
                        </p>
                        
                        <a 
                          href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '917708795342'}?text=${encodeURIComponent(`Hi BlazeByte Studio,\n\nMy name is ${formData.name || '[NAME]'}.\nI am from ${formData.company || '[COMPANY]'}.\nI am interested in ${formData.projectType || '[SERVICE]'}.\n\nI would like to discuss my project.\n\nThank you.`)}`}
                          target="_blank" rel="noopener noreferrer"
                          onClick={() => trackEvent('WHATSAPP_CLICK')}
                          className="flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#71717A] hover:text-[#25D366] transition-colors self-start"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                          OR CHAT ON WHATSAPP
                        </a>
                      </div>
                      
                      <button 
                        type="submit" 
                        disabled={status === 'submitting'}
                        className="group relative overflow-hidden w-full md:w-auto disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 rounded shrink-0"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,90,0,0.12), rgba(255,90,0,0.04))',
                          border: '1px solid rgba(255,90,0,0.25)',
                          padding: '18px 48px',
                        }}
                      >
                        <div className="absolute inset-0 bg-[#FF5A00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-[#FF5A00] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out delay-100" />
                        <span className={`relative z-10 font-bold tracking-[0.2em] text-[13px] text-[#FF5A00] group-hover:text-[#050505] transition-colors duration-300 flex items-center justify-center gap-3 ${status === 'submitting' ? 'opacity-0' : 'opacity-100'}`}>
                          INITIATE PROJECT <span className="group-hover:translate-x-1.5 transition-transform duration-300 text-[15px]">→</span>
                        </span>
                        {status === 'submitting' && (
                          <span className="absolute inset-0 flex items-center justify-center font-mono tracking-widest text-[10px] text-[#FF5A00]">
                            PROCESSING...
                          </span>
                        )}
                      </button>
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
