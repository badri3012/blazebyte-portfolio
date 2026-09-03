/**
 * Centralized Configuration for BlazeByte Studio
 * 
 * All canonical URLs, Open Graph images, and site-wide metadata
 * derive from this file to ensure zero broken links if the domain changes.
 */

export const SITE_CONFIG = {
  name: "BlazeByte Studio",
  url: import.meta.env.VITE_DOMAIN || "https://blazebyte.info",
  email: "blazebytestudio7@gmail.com",
  description: "Creative Technology Studio building digital systems, search visibility, and intelligent automation for modern business."
};

/**
 * Utility to generate absolute canonical URLs
 */
export const getCanonicalUrl = (path: string) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_CONFIG.url}${cleanPath}`;
};
