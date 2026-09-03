import { SITE_CONFIG } from '../config/site';

export interface InquiryForm {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  budgetRange: string;
  description: string;
}

/**
 * submitProjectInquiry
 * 
 * Secure Web3Forms integration.
 * Routes form submissions to the official BlazeByte Studio email.
 */
export const submitProjectInquiry = async (data: InquiryForm): Promise<{ success: boolean; message: string }> => {
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

  if (!accessKey) {
    console.error("Web3Forms Access Key is missing.");
    return { 
      success: false, 
      message: "The form integration is temporarily unavailable. Please try again later or email us directly." 
    };
  }

  try {
    const payload = {
      access_key: accessKey,
      subject: `New Project Enquiry from ${data.name} - BlazeByte Studio`,
      from_name: data.name,
      ...data,
      source: SITE_CONFIG.name,
      timestamp: new Date().toISOString()
    };

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return { success: true, message: "Inquiry received successfully." };
    } else {
      console.error("Web3Forms API Error:", result);
      return { success: false, message: result.message || "The server rejected the inquiry. Please try again." };
    }
  } catch (error) {
    console.error("Form Submission Error:", error);
    return { success: false, message: "A network error occurred while attempting to submit the inquiry. Please check your connection." };
  }
};
