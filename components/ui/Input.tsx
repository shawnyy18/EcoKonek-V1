
'use client';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label?: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function Input({
  label,
  icon,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          {...props}
          className={`w-full px-4 py-3 ${icon ? 'pl-12' : ''} bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm text-gray-900 placeholder-gray-500`}
        />
      </div>
    </div>
  );
}
