import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

interface SelectContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: string;
  onValueChange: (val: string) => void;
  placeholder?: string;
  selectedLabel: string;
  setSelectedLabel: (label: string) => void;
}

const SelectContext = createContext<SelectContextType | null>(null);

interface SelectProps {
  children: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  children,
  value: controlledValue,
  defaultValue = '',
  onValueChange,
  placeholder,
  className = '',
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleValueChange = (newVal: string) => {
    if (!isControlled) {
      setUncontrolledValue(newVal);
    }
    onValueChange?.(newVal);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <SelectContext.Provider
      value={{
        open,
        setOpen,
        value,
        onValueChange: handleValueChange,
        placeholder,
        selectedLabel,
        setSelectedLabel,
      }}
    >
      <div ref={containerRef} className={`relative ${className}`}>
        {children}
      </div>
    </SelectContext.Provider>
  );
};

interface SelectTriggerProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
}

export const SelectTrigger: React.FC<SelectTriggerProps> = ({
  children,
  className = '',
  id,
}) => {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error('SelectTrigger must be used within a Select');

  return (
    <button
      type="button"
      id={id}
      onClick={() => ctx.setOpen(!ctx.open)}
      aria-expanded={ctx.open}
      className={`w-full flex items-center justify-between px-4 py-3.5 bg-pearl border rounded-xl text-sm text-navy transition-all duration-200 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-champagne/40 ${
        ctx.open
          ? 'border-champagne bg-white shadow-sm ring-2 ring-champagne/20'
          : 'border-surface-300 hover:border-surface-400 hover:bg-white'
      } ${className}`}
    >
      <div className="flex-1 truncate">{children || <SelectValue />}</div>
      <ChevronDown
        className={`w-4 h-4 text-slateText-muted transition-transform duration-200 shrink-0 ml-2 ${
          ctx.open ? 'rotate-180 text-champagne' : ''
        }`}
      />
    </button>
  );
};

interface SelectValueProps {
  placeholder?: string;
  className?: string;
}

export const SelectValue: React.FC<SelectValueProps> = ({ placeholder, className = '' }) => {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error('SelectValue must be used within a Select');

  const display = ctx.selectedLabel || ctx.value || placeholder || ctx.placeholder || 'Select an option';
  const isPlaceholder = !ctx.selectedLabel && !ctx.value;

  return (
    <span className={`block truncate ${isPlaceholder ? 'text-slateText-light' : 'text-navy font-medium'} ${className}`}>
      {display}
    </span>
  );
};

interface SelectContentProps {
  children: React.ReactNode;
  className?: string;
}

export const SelectContent: React.FC<SelectContentProps> = ({ children, className = '' }) => {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error('SelectContent must be used within a Select');

  return (
    <AnimatePresence>
      {ctx.open && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className={`absolute left-0 right-0 top-full mt-2 z-50 max-h-72 overflow-y-auto rounded-2xl bg-white border border-surface-200 p-1.5 shadow-2xl backdrop-blur-lg ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface SelectGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const SelectGroup: React.FC<SelectGroupProps> = ({ children, className = '' }) => {
  return <div className={`py-1 ${className}`}>{children}</div>;
};

interface SelectLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const SelectLabel: React.FC<SelectLabelProps> = ({ children, className = '' }) => {
  return (
    <div className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] font-bold text-champagne ${className}`}>
      {children}
    </div>
  );
};

interface SelectItemProps {
  children: React.ReactNode;
  value?: string;
  id?: string;
  className?: string;
}

export const SelectItem: React.FC<SelectItemProps> = ({
  children,
  value,
  id,
  className = '',
}) => {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error('SelectItem must be used within a Select');

  const itemVal = value || id || (typeof children === 'string' ? children : '');
  const isSelected = ctx.value === itemVal;

  useEffect(() => {
    if (isSelected) {
      const labelText = typeof children === 'string' ? children : itemVal;
      ctx.setSelectedLabel(labelText);
    }
  }, [isSelected, children, itemVal]);

  return (
    <button
      type="button"
      onClick={() => ctx.onValueChange(itemVal)}
      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors text-left cursor-pointer ${
        isSelected
          ? 'bg-champagne/15 text-navy font-semibold'
          : 'text-slateText-main hover:bg-surface-100 hover:text-navy'
      } ${className}`}
    >
      <span className="truncate">{children}</span>
      {isSelected && <Check className="w-4 h-4 text-champagne shrink-0 ml-2" />}
    </button>
  );
};
