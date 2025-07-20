
'use client';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({ 
  children, 
  className = '', 
  onClick,
  shadow = 'md',
  padding = 'md'
}: CardProps) {
  const baseClasses = 'bg-white rounded-2xl border border-gray-100 transition-all duration-300';
  
  const shadows = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md hover:shadow-lg',
    lg: 'shadow-lg hover:shadow-xl'
  };
  
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };
  
  const clickableClasses = onClick ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]' : '';
  
  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${shadows[shadow]} ${paddings[padding]} ${clickableClasses} ${className}`}
    >
      {children}
    </div>
  );
}
