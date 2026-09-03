export interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: "WEB SYSTEMS" | "SEO" | "DIGITAL GROWTH" | "AI AUTOMATION" | "BUSINESS TECHNOLOGY";
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  author: string;
  coverImage?: string;
  content: string; // Markdown or HTML content
  relatedServices?: { label: string; path: string }[];
  relatedProjects?: { label: string; path: string }[];
  featured?: boolean;
}

// The insights archive is currently in development.
// We strictly avoid fabricating placeholder articles to inflate authority.
export const articles: Article[] = [];
