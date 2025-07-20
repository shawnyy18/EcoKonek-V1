
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  
  const getNavItems = () => {
    // Admin navigation for admin routes
    if (pathname.startsWith('/admin')) {
      return [
        { href: '/admin', icon: 'ri-dashboard-line', label: 'Dashboard' },
        { href: '/admin/users', icon: 'ri-user-settings-line', label: 'Users' },
        { href: '/admin/content', icon: 'ri-file-text-line', label: 'Content' },
        { href: '/admin/reports', icon: 'ri-bar-chart-line', label: 'Reports' }
      ];
    }
    
    // Regular user navigation
    return [
      { href: '/', icon: 'ri-home-line', label: 'Home' },
      { href: '/donate', icon: 'ri-recycle-line', label: 'Donate' },
      { href: '/learn', icon: 'ri-book-open-line', label: 'Learn' },
      { href: '/community', icon: 'ri-group-line', label: 'Community' },
      { href: '/profile', icon: 'ri-user-line', label: 'Profile' }
    ];
  };

  const navItems = getNavItems();
  
  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 z-50 transition-colors duration-300 shadow-lg">
      <div className={`grid h-20 px-1 ${navItems.length === 4 ? 'grid-cols-4' : 'grid-cols-5'}`}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (pathname.startsWith('/admin') && item.href.startsWith('/admin') && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1.5 transition-all duration-200 px-1 py-2 active:scale-95 hover:scale-105 ${
                isActive 
                  ? 'text-green-500 bg-green-500/10 border-t-2 border-green-500' 
                  : 'text-gray-500 hover:text-green-500 hover:bg-green-500/5 border-t-2 border-transparent'
              }`}
            >
              <div className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 ${
                isActive ? 'bg-green-500/20' : 'hover:bg-green-500/10'
              }`}>
                <i className={`${item.icon} text-xl`}></i>
              </div>
              <span className={`text-xs font-medium text-center leading-tight px-0.5 ${
                isActive ? 'font-semibold' : ''
              }`} style={{ 
                fontSize: '0.625rem',
                lineHeight: '0.75rem',
                wordBreak: 'break-word',
                hyphens: 'auto'
              }}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
