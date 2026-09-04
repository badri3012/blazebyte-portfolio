/**
 * CustomSelect — Portal-based dropdown
 *
 * The dropdown menu is rendered via React createPortal directly into document.body
 * with position:fixed + getBoundingClientRect coordinates.
 *
 * This guarantees the menu is COMPLETELY outside:
 *   - backdrop-filter stacking contexts (the glass form panel)
 *   - overflow:hidden containers
 *   - GSAP transform parents
 *   - Any other stacking context that would clip or intercept clicks
 */
import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
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
  placeholder = 'Select...',
  className,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedBy,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Compute and update menu position from trigger bounding rect
  const positionMenu = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setMenuStyle({
      position: 'fixed',
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width,
      zIndex: 99999,
      pointerEvents: 'auto',
    });
  }, []);

  // Open dropdown and immediately position the portal
  const openMenu = () => {
    positionMenu();
    setIsOpen(true);
  };

  // Reposition on scroll / resize so the menu tracks the trigger
  useEffect(() => {
    if (!isOpen) return;

    const handleScrollOrResize = () => positionMenu();
    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);
    return () => {
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [isOpen, positionMenu]);

  // Close on outside click — checks both trigger and portal menu
  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }
      setIsOpen(false);
    };
    // Use mousedown so we beat the React synthetic event
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyUp = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keyup', handleKeyUp);
    return () => document.removeEventListener('keyup', handleKeyUp);
  }, [isOpen]);

  const handleSelect = (newValue: string) => {
    onChange({ target: { name, value: newValue } });
    setIsOpen(false);
  };

  const handleTriggerKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (isOpen) {
        setIsOpen(false);
      } else {
        openMenu();
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        openMenu();
        return;
      }
      const currentIndex = options.findIndex((opt) => opt.value === value);
      let nextIndex = currentIndex;
      if (e.key === 'ArrowDown') {
        nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
      } else {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
      }
      handleSelect(options[nextIndex].value);
    }
  };

  const dropdownMenu = isOpen
    ? createPortal(
        <ul
          id={`${id}-listbox`}
          ref={menuRef}
          role="listbox"
          aria-label={placeholder}
          style={menuStyle}
          className="py-1 bg-[#111111] border border-[rgba(255,255,255,0.12)] rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-y-auto max-h-60"
        >
          {options.map((option) => {
            const isSelected = value === option.value;
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                // Use onMouseDown instead of onClick to fire before the outside-click handler
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSelect(option.value);
                }}
                style={{ cursor: 'pointer', pointerEvents: 'auto' }}
                className={cn(
                  'px-4 py-3 text-[14px] font-sans select-none transition-colors duration-150',
                  isSelected
                    ? 'bg-[#FF5A00] text-white'
                    : 'text-[#F5F5F2] hover:bg-[rgba(255,90,0,0.12)] hover:text-[#FF5A00]'
                )}
              >
                {option.label}
              </li>
            );
          })}
        </ul>,
        document.body
      )
    : null;

  return (
    <div className="relative w-full" ref={triggerRef}>
      {/* Trigger button */}
      <div
        id={id}
        role="combobox"
        aria-controls={`${id}-listbox`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        tabIndex={0}
        onKeyDown={handleTriggerKeyDown}
        onMouseDown={(e) => {
          e.preventDefault();
          if (isOpen) {
            setIsOpen(false);
          } else {
            openMenu();
          }
        }}
        className={cn(
          'w-full bg-transparent border-0 border-b p-4 pt-6 text-[15px] font-sans outline-none flex justify-between items-center cursor-pointer transition-all duration-300',
          isOpen
            ? 'border-b-[#FF5A00] shadow-[0_4px_24px_rgba(255,90,0,0.10)] text-[#F5F5F2]'
            : 'border-b-[rgba(255,255,255,0.25)] text-[#F5F5F2] hover:border-b-[rgba(255,255,255,0.35)] hover:bg-[rgba(255,255,255,0.02)] focus:border-b-[#FF5A00] focus:shadow-[0_4px_24px_rgba(255,90,0,0.10)]',
          !value && 'text-[#9CA3AF]',
          className
        )}
      >
        <span className="block truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span
          className={cn(
            'text-[10px] text-[#9CA3AF] pointer-events-none transition-transform duration-300',
            isOpen && 'rotate-180'
          )}
        >
          ▼
        </span>
      </div>

      {/* Portal-rendered dropdown menu — lives in document.body, outside ALL stacking contexts */}
      {dropdownMenu}
    </div>
  );
}
