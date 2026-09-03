import { useState, useRef, useEffect } from 'react';
import type { KeyboardEvent } from 'react';
import { cn } from '../../utils/cn';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
}

export default function CustomSelect({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = "Select...",
  className,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedBy,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  const handleSelect = (newValue: string) => {
    onChange({ target: { name, value: newValue } });
    setIsOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(prev => !prev);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        return;
      }
      
      const currentIndex = options.findIndex(opt => opt.value === value);
      let nextIndex = currentIndex;
      
      if (e.key === 'ArrowDown') {
        nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
      } else {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
      }
      
      handleSelect(options[nextIndex].value);
    }
  };

  return (
    <div 
      className="relative w-full" 
      ref={containerRef}
    >
      <div
        id={id}
        role="combobox"
        aria-controls={`${id}-listbox`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full bg-transparent border-0 border-b p-4 pt-6 text-[15px] font-sans outline-none flex justify-between items-center cursor-pointer transition-all duration-300",
          isOpen 
            ? "border-b-[#FF5A00] shadow-[0_4px_24px_rgba(255,90,0,0.10)] text-[#F5F5F2]"
            : "border-b-[rgba(255,255,255,0.14)] text-[#F5F5F2] hover:bg-[rgba(255,255,255,0.02)] focus:border-b-[#FF5A00] focus:shadow-[0_4px_24px_rgba(255,90,0,0.10)]",
          !value && "text-[#71717A]/80", // placeholder styling
          className
        )}
      >
        <span className="block truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span 
          className={cn(
            "text-[10px] text-[#71717A] pointer-events-none transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        >
          ▼
        </span>
      </div>

      {/* Dropdown Options Panel */}
      {isOpen && (
        <ul
          id={`${id}-listbox`}
          ref={listboxRef}
          role="listbox"
          className="absolute z-[100] w-full mt-2 py-2 bg-[#111111] border border-[#111111]/20 rounded-sm shadow-2xl overflow-y-auto max-h-60"
        >
          <li
            role="option"
            aria-selected={!value}
            onClick={() => handleSelect("")}
            className={cn(
              "px-4 py-3 text-sm font-sans cursor-pointer transition-colors duration-200",
              !value ? "bg-[#FF5A00] text-[#FFFFFF]" : "text-[#F5F5F2] hover:bg-[rgba(255,255,255,0.05)]"
            )}
          >
            {placeholder}
          </li>
          {options.map((option) => {
            const isSelected = value === option.value;
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "px-4 py-3 text-sm font-sans cursor-pointer transition-colors duration-200",
                  isSelected 
                    ? "bg-[#FF5A00] text-[#FFFFFF]" 
                    : "text-[#F5F5F2] hover:bg-[rgba(255,255,255,0.05)]"
                )}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
