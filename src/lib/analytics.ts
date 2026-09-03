/**
 * Analytics Tracking Abstraction
 * 
 * Safely handles conversion tracking. If VITE_ANALYTICS_ID is missing,
 * it acts as a no-op, preventing tracking errors on local or 
 * unconfigured environments.
 */

type EventName = 
  | 'PAGE_VIEW' 
  | 'START_PROJECT_CLICK'
  | 'CONTACT_FORM_OPEN'
  | 'CONTACT_FORM_START' 
  | 'CONTACT_FORM_SUBMIT' 
  | 'CONTACT_FORM_SUCCESS' 
  | 'WHATSAPP_CLICK'
  | 'SERVICE_VIEW' 
  | 'PORTFOLIO_INTERACTION'
  | 'WORK_PROJECT_VIEW';

export const trackEvent = (eventName: EventName, metadata?: Record<string, string | number | boolean>) => {
  const analyticsId = import.meta.env.VITE_ANALYTICS_ID;
  
  if (!analyticsId) {
    // Analytics is disabled, safely return
    // Uncomment for local debugging if desired:
    // console.log(`[Analytics Disabled] Event: ${eventName}`, metadata);
    return;
  }

  // Example implementation for a generic provider (e.g., Plausible, Google Analytics)
  // When a real provider is chosen, integrate their specific window function here.
  
  try {
    // Example: Plausible Analytics
    // if (typeof window !== 'undefined' && window.plausible) {
    //   window.plausible(eventName, { props: metadata });
    // }
    
    // Example: generic datalayer push
    if (typeof window !== 'undefined' && Array.isArray((window as any).dataLayer)) {
      (window as any).dataLayer.push({
        event: eventName,
        ...metadata
      });
    }
  } catch (error) {
    console.error("Analytics Tracking Error:", error);
  }
};
