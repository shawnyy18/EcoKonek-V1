
'use client';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  backButtonStyle?: 'default' | 'close';
  showCloseAdmin?: boolean;
  onCloseAdmin?: () => void;
}

export default function Header({ 
  title = 'EcoKonek PH', 
  showBack = false, 
  onBack,
  rightAction,
  backButtonStyle = 'default',
  showCloseAdmin = false,
  onCloseAdmin
}: HeaderProps) {
  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 z-50 transition-colors duration-300">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={onBack}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-95 ${
                backButtonStyle === 'close' 
                  ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={backButtonStyle === 'close' ? 'Exit Admin Panel' : 'Go Back'}
            >
              <i className={`${backButtonStyle === 'close' ? 'ri-close-line' : 'ri-arrow-left-line'} text-lg`}></i>
            </button>
          )}
          {showCloseAdmin && (
            <button
              onClick={onCloseAdmin}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-200 hover:scale-110 active:scale-95"
              title="Exit Admin Panel"
            >
              <i className="ri-close-line text-lg"></i>
            </button>
          )}
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        </div>
        {rightAction && (
          <div>{rightAction}</div>
        )}
      </div>
    </header>
  );
}
