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
    primary: 'bg-green-500 text-white shadow-lg hover:bg-green-600 active:scale-95',
    secondary: 'bg-green-400 text-white shadow-md hover:bg-green-500 active:scale-95',
    outline: 'border-2 border-green-500 text-green-500 bg-white hover:bg-green-500 hover:text-white active:scale-95',
    ghost: 'text-green-500 bg-transparent hover:bg-green-100 active:scale-95'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
}