'use client';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false,
  className = '',
  type = 'button'
}: ButtonProps) {
  const baseClasses = '!rounded-button font-medium transition-all duration-200 flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-[#4CAF50] text-white shadow-lg hover:bg-[#45a049] active:scale-95',
    secondary: 'bg-[#66BB6A] text-white shadow-md hover:bg-[#5cae60] active:scale-95',
    outline: 'border-2 border-[#4CAF50] text-[#4CAF50] bg-white hover:bg-[#4CAF50] hover:text-white active:scale-95',
    ghost: 'text-[#4CAF50] bg-transparent hover:bg-[#4CAF50]/10 active:scale-95'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
}