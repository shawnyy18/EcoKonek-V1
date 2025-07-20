
'use client';

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export default function Input({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  required = false,
  className = '',
  icon
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
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full px-4 py-3 ${icon ? 'pl-12' : ''} bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm text-gray-900 placeholder-gray-500`}
        />
      </div>
    </div>
  );
}
