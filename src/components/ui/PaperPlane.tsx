import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PaperPlane = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    className={cn("w-6 h-6 overflow-visible", className)}
  >
    {/* Shadow Plane */}
    <polygon 
      points="22,5 15,25 11,16 2,12" 
      fill="rgba(17,17,17,0.12)" 
      style={{ filter: "blur(2px)" }}
    />
    
    {/* Left Folded Wing (Darker) */}
    <polygon 
      points="22,2 11,13 2,9" 
      fill="#E65100" 
    />
    
    {/* Right Main Wing (Blaze Orange) */}
    <polygon 
      points="22,2 15,22 11,13" 
      fill="#FF5A00" 
    />
    
    {/* Primary Crease Highlight */}
    <line 
      x1="22" y1="2" 
      x2="11" y2="13" 
      stroke="rgba(255,255,255,0.4)" 
      strokeWidth="0.5" 
    />
  </svg>
);
